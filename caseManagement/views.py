import datetime

from django.db.models import Q
import random

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from common.common_config.responseHandlar import ResponseInfo
from common.common_config.sendEmail import send_email
from static import emailText
from static.responseMessages import *
from .serializers import *


class nature(APIView):
    serializers_class = NatureSerializer

    def get(self, request):
        try:
            userId = request.user
            natureData = Nature.objects.filter(Q(user_id=userId) | Q(is_default=True))
            if not natureData:
                res = ResponseInfo([], USER_NOT_FOUND, False,
                                   status.HTTP_204_NO_CONTENT)
                return Response(res.errors_payload(), status=status.HTTP_204_NO_CONTENT)

            serializer = self.serializers_class(natureData, many=True)
            res = ResponseInfo(serializer.data, SUCCESS, True,
                               status.HTTP_200_OK)
            return Response(res.success_payload(), status=status.HTTP_200_OK)
        except Exception as err:
            res = ResponseInfo(err, SOMETHING_WENT_WRONG, False,
                               status.HTTP_401_UNAUTHORIZED)
            return Response(res.errors_payload(), status=status.HTTP_401_UNAUTHORIZED)


class procedure(APIView):
    serializers_class = ProcedureSerializer

    def get(self, request):
        try:
            userId = request.user
            procedureData = Procedure.objects.filter(Q(user_id=userId) | Q(is_default=True))
            if not procedureData:
                res = ResponseInfo([], USER_NOT_FOUND, False,
                                   status.HTTP_204_NO_CONTENT)
                return Response(res.errors_payload(), status=status.HTTP_204_NO_CONTENT)

            serializer = self.serializers_class(procedureData, many=True)
            res = ResponseInfo(serializer.data, SUCCESS, True,
                               status.HTTP_200_OK)
            return Response(res.success_payload(), status=status.HTTP_200_OK)
        except Exception as err:
            res = ResponseInfo(err, SOMETHING_WENT_WRONG, False,
                               status.HTTP_401_UNAUTHORIZED)
            return Response(res.errors_payload(), status=status.HTTP_401_UNAUTHORIZED)


class casesManagement(APIView):
    serializers_class = CaseSerializer

    def post(self, request):
        try:
            if not request.data or "query" in request.data:
                res = ResponseInfo([], SOMETHING_WENT_WRONG, False,
                                   status.HTTP_204_NO_CONTENT)
                return Response(res.errors_payload(), status=status.HTTP_204_NO_CONTENT)
            userId = request.user.id
            reqData = request.data
            reqData['lawyer_id'] = userId
            reqData['unique_code'] = random.randint(1000, 9999)

            # Find Nature if exist add id if not create new.
            natureData = Nature.objects.filter(nature_title=reqData['nature']).first()
            if natureData:
                reqData['nature'] = natureData.id
            else:
                natureData = Nature.objects.create(nature_title=reqData['nature'], is_default=False,
                                                   user_id=request.user)
                reqData['nature'] = natureData.id

            # Prepare serializer
            serializer = self.serializers_class(data=reqData)
            if serializer.is_valid():
                serializer.save()
                res = ResponseInfo(serializer.data, CASE_INFORMATION_ADDED, True,
                                   status.HTTP_201_CREATED)
                return Response(res.success_payload(), status=status.HTTP_201_CREATED)

            res = ResponseInfo({"data": serializer.errors}, SOMETHING_WENT_WRONG, False,
                               status.HTTP_401_UNAUTHORIZED)
            return Response(res.success_payload(), status=status.HTTP_401_UNAUTHORIZED)
        except Exception as err:
            res = ResponseInfo(err, SOMETHING_WENT_WRONG, False,
                               status.HTTP_401_UNAUTHORIZED)
            return Response(res.errors_payload(), status=status.HTTP_401_UNAUTHORIZED)

    def get(self, request):
        try:
            userId = request.user.id
            caseInformation = CaseManagement.objects.filter(lawyer_id=userId)
            if not caseInformation:
                res = ResponseInfo([], NO_RECORD, False,
                                   status.HTTP_204_NO_CONTENT)
                return Response(res.errors_payload(), status=status.HTTP_204_NO_CONTENT)

            self.serializers_class.Meta.depth = 1  # Adding depth value for ManyToMany fields
            serializer = self.serializers_class(caseInformation, many=True)

            # preparing response
            res = ResponseInfo(serializer.data, SUCCESS, True,
                               status.HTTP_200_OK)
            return Response(res.success_payload(), status=status.HTTP_200_OK)
        except Exception as err:
            res = ResponseInfo(err, SOMETHING_WENT_WRONG, False,
                               status.HTTP_401_UNAUTHORIZED)
            return Response(res.errors_payload(), status=status.HTTP_401_UNAUTHORIZED)

    def patch(self, request, case_id):
        try:
            caseInformation = CaseManagement.objects.filter(pk=case_id).first()
            reqData = request.data
            # Find Nature if exist add id if not create new.
            natureData = Nature.objects.filter(nature_title=reqData['nature']).first()
            if natureData:
                reqData['nature'] = natureData.id
            else:
                natureData = Nature.objects.create(nature_title=reqData['nature'], is_default=False,
                                                   user_id=request.user)
                reqData['nature'] = natureData.id

            # Prepare serializer
            serializer = self.serializers_class(caseInformation, data=reqData)
            if serializer.is_valid():
                serializer.save()
                res = ResponseInfo(serializer.data, RECORD_UPDATED_SUCCESSFULLY, True,
                                   status.HTTP_200_OK)
                return Response(res.success_payload(), status=status.HTTP_200_OK)

            res = ResponseInfo(serializer.errors, SOMETHING_WENT_WRONG, False,
                               status.HTTP_304_NOT_MODIFIED)
            return Response(res.errors_payload(), status=status.HTTP_304_NOT_MODIFIED)
        except Exception as err:
            res = ResponseInfo(err, SOMETHING_WENT_WRONG, False,
                               status.HTTP_401_UNAUTHORIZED)
            return Response(res.errors_payload(), status=status.HTTP_401_UNAUTHORIZED)


class caseManagementTaskView(APIView):
    serializers_class = CaseTaskSerializer
    serializers_deleted_task_class = CaseDeleteTaskSerializer

    # Filter Api
    def post(self, request):
        try:
            userid = request.user.id
            reqData = request.data

            # Remove blank data from dictionary
            kwargs = dict((k, v) for k, v in reqData.items() if v)
            reqType = kwargs['type'] if 'type' in kwargs else None

            if reqType:
                kwargs['type__in'] = [kwargs['type'], 'Les deuX']
                del kwargs['type']
            deletedTask = list(
                caseManagementDeletedTask.objects.filter(case_management_id=reqData['case_management_id'],
                                                         lawyer_id=userid).values_list("case_task_id", flat=True))

            if 'send_notification' in reqData:
                kwargs['send_notification'] = reqData['send_notification']

            query = Q(~Q(id__in=deletedTask), **kwargs)

            if 'case_management_id' in kwargs and 'status' not in kwargs and 'send_notification' not in reqData:
                del kwargs['case_management_id']
                query = Q(~Q(id__in=deletedTask), case_management_id=reqData['case_management_id']) | Q(
                    ~Q(id__in=deletedTask), **kwargs)

            taskList = caseManagementTask.objects.filter(query).order_by("position")
            serializer = self.serializers_class(taskList, many=True)
            # preparing response
            res = ResponseInfo(serializer.data, SUCCESS, True,
                               status.HTTP_200_OK)
            return Response(res.success_payload(), status=status.HTTP_200_OK)
        except Exception as err:
            res = ResponseInfo(err, SOMETHING_WENT_WRONG, False,
                               status.HTTP_401_UNAUTHORIZED)
            return Response(res.errors_payload(), status=status.HTTP_401_UNAUTHORIZED)

    # Update/replica Api
    def put(self, request):
        try:
            self.serializers_class.Meta.depth = 0  # Adding depth value for Foreign fields
            taskId = request.data.get('id', None)
            taskList = caseManagementTask.objects.filter(id=taskId).first()
            bodyParams = request.data

            # if it's Default task create replica
            if taskList.is_default:
                taskList.id = None
                taskList.is_default = False
                taskList.case_management_id = CaseManagement.objects.get(pk=request.data['case_management_id'])
                serializer = self.serializers_class(taskList, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    # prepare Email Notification
                    if bodyParams['send_notification']:
                        self.taskNotificationEmail(bodyParams['client_id'])

                    res = ResponseInfo(serializer.data, SUCCESS, True,
                                       status.HTTP_201_CREATED)
                    return Response(res.success_payload(), status=status.HTTP_201_CREATED)

                res = ResponseInfo(serializer.errors, SOMETHING_WENT_WRONG, False,
                                   status.HTTP_401_UNAUTHORIZED)
                return Response(res.errors_payload(), status=status.HTTP_401_UNAUTHORIZED)

            # if its not default simply updating
            serializer = self.serializers_class(taskList, data=bodyParams)
            if serializer.is_valid():
                serializer.save()

                # prepare Email Notification
                if bodyParams['send_notification']:
                    self.taskNotificationEmail(bodyParams['client_id'])

                res = ResponseInfo(serializer.data, SUCCESS, True,
                                   status.HTTP_201_CREATED)
                return Response(res.success_payload(), status=status.HTTP_201_CREATED)
            res = ResponseInfo(serializer.errors, SOMETHING_WENT_WRONG, False,
                               status.HTTP_401_UNAUTHORIZED)
            return Response(res.errors_payload(), status=status.HTTP_401_UNAUTHORIZED)
        except Exception as err:
            res = ResponseInfo(err, SOMETHING_WENT_WRONG, False,
                               status.HTTP_401_UNAUTHORIZED)
            return Response(res.errors_payload(), status=status.HTTP_401_UNAUTHORIZED)

    # Creating Bulk replica
    def patch(self, request):
        try:
            self.serializers_class.Meta.depth = 0  # Adding depth value for Foreign fields
            taskId = request.data.get('task_ids', None)
            caseId = request.data.get('case_management_id', None)

            # Return if taskId array missing
            if not taskId:
                res = ResponseInfo([], NO_RECORD, False,
                                   status.HTTP_204_NO_CONTENT)
                return Response(res.errors_payload(), status=status.HTTP_204_NO_CONTENT)

            # Preparing list for replica
            bulk_list = list()
            taskList = caseManagementTask.objects.filter(id__in=taskId)
            for task in taskList:
                task.id = None
                task.is_default = False
                task.case_management_id = CaseManagement.objects.get(pk=caseId)
                bulk_list.append(task)
            replicaTask = caseManagementTask.objects.bulk_create(bulk_list)

            serializer = self.serializers_class(replicaTask, many=True)

            # preparing for response
            res = ResponseInfo(serializer.data, SUCCESS, True,
                               status.HTTP_201_CREATED)
            return Response(res.success_payload(), status=status.HTTP_201_CREATED)
        except Exception as err:
            res = ResponseInfo(err, SOMETHING_WENT_WRONG, False,
                               status.HTTP_401_UNAUTHORIZED)
            return Response(res.errors_payload(), status=status.HTTP_401_UNAUTHORIZED)

    def get(self, request, case_id):
        try:
            userId = request.user.id
            deletedTask = caseManagementDeletedTask.objects.filter(lawyer_id=userId, case_management_id=case_id)

            self.serializers_deleted_task_class.Meta.depth = 1
            self.serializers_deleted_task_class.Meta.fields = ['id', 'case_task_id']
            serializer = self.serializers_deleted_task_class(deletedTask, many=True)

            # preparing response
            res = ResponseInfo(serializer.data, SUCCESS, True,
                               status.HTTP_200_OK)
            return Response(res.success_payload(), status=status.HTTP_200_OK)
        except Exception as err:
            res = ResponseInfo(err, SOMETHING_WENT_WRONG, False,
                               status.HTTP_401_UNAUTHORIZED)
            return Response(res.errors_payload(), status=status.HTTP_401_UNAUTHORIZED)

    def taskNotificationEmail(self, client_id):
        userData = User.objects.filter(id__in=client_id)
        for user in userData:
            notificationEmailText = emailText.taskNotification() | emailText.commonUrls()
            notificationEmailText['text1'] = notificationEmailText['text1'].format(userName=user.first_name)
            send_email([user.email],
                       'Altata - Notification 🔔 Nom du dossier -  Objet du message', 'email.html',
                       notificationEmailText)


class caseManagementCreateTaskView(APIView):
    serializers_class = CaseTaskSerializer

    def post(self, request):
        bodyParams = request.data
        self.serializers_class.Meta.depth = 0  # Adding depth value for Foreign fields
        serializer = self.serializers_class(data=bodyParams)

        if serializer.is_valid():
            serializer.save()
            # prepare Email Notification
            if bodyParams['send_notification'] and 'client_id' in bodyParams:
                caseManagementTaskView.taskNotificationEmail(self, bodyParams['client_id'])

            res = ResponseInfo(serializer.data, TASK_ADDED_SUCCESSFULLY, True,
                               status.HTTP_201_CREATED)
            return Response(res.success_payload(), status=status.HTTP_201_CREATED)

        res = ResponseInfo(serializer.errors, SOMETHING_WENT_WRONG, False,
                           status.HTTP_401_UNAUTHORIZED)
        return Response(res.errors_payload(), status=status.HTTP_401_UNAUTHORIZED)


class caseManagementDocumentsView(APIView):
    serializers_class = CaseDocumentsSerializer

    def post(self, request):
        try:
            serializer = self.serializers_class(data=request.data)
            if serializer.is_valid():
                serializer.save()
                res = ResponseInfo("All documents uploaded successfully", SUCCESS, True, status.HTTP_201_CREATED)
                return Response(res.success_payload(), status.HTTP_201_CREATED)
            res = ResponseInfo({"data": serializer.errors}, "something went wrong", False,
                               status.HTTP_401_UNAUTHORIZED)
            return Response(res.success_payload(), status.HTTP_401_UNAUTHORIZED)

        except Exception as err:
            res = ResponseInfo(err, SOMETHING_WENT_WRONG, False,
                               status.HTTP_401_UNAUTHORIZED)
            return Response(res.errors_payload(), status=status.HTTP_401_UNAUTHORIZED)


class bulkCaseTaskOperationsViewSet(APIView):
    def put(self, request):
        try:
            updateValue = request.data['update_value']
            ids = request.data['ids']

            instances = caseManagementTask.objects.filter(id__in=ids)
            for instance in instances:
                if instance.is_default:
                    instance.id = None
                    instance.is_default = False
                    instance.case_management_id = CaseManagement.objects.get(pk=request.data['case_management_id'])

                serializer = CaseTaskSerializer(instance, data=updateValue)
                if serializer.is_valid():
                    serializer.save()

            # Preparing response
            res = ResponseInfo([], RECORD_UPDATED_SUCCESSFULLY, True,
                               status.HTTP_200_OK)
            return Response(res.success_payload(), status=status.HTTP_200_OK)
        except Exception as err:
            res = ResponseInfo(err, SOMETHING_WENT_WRONG, False, status.HTTP_401_UNAUTHORIZED)
            return Response(res.errors_payload(), status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request):
        try:
            ids = request.data.get('ids', None)
            caseId = request.data.get('case_management_id', None)
            if not ids or not caseId:
                res = ResponseInfo([], NO_RECORD, False, status.HTTP_204_NO_CONTENT)
                return Response(res.errors_payload(), status=status.HTTP_204_NO_CONTENT)

            caseTasks = caseManagementTask.objects.filter(id__in=ids)
            for task in caseTasks:
                _dist = {'lawyer_id': request.user.id, 'case_management_id': caseId, 'case_task_id': task.id}
                serializer = CaseDeleteTaskSerializer(data=_dist)
                if serializer.is_valid():
                    serializer.save()

            # Preparing response
            response = []
            if serializer.errors:
                response = serializer.errors
            res = ResponseInfo(response, RECORD_DELETED_SUCCESSFULLY, True, status.HTTP_200_OK)
            return Response(res.success_payload(), status=status.HTTP_200_OK)
        except Exception as err:
            res = ResponseInfo(err, SOMETHING_WENT_WRONG, False, status.HTTP_401_UNAUTHORIZED)
            return Response(res.errors_payload(), status=status.HTTP_401_UNAUTHORIZED)
