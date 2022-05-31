from datetime import datetime

from django.db.models import Q
import random

# Create your views here.
from django.utils.dateparse import parse_date
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
            procedureData = Procedure.objects.filter(Q(user_id=userId) | Q(is_default=True)).order_by('id')
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
    add_serializers_class = AddCaseSerializer
    get_serializers_class = GetCaseSerializer
    task_serializers_class = CaseTaskSerializer

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
            serializer = self.add_serializers_class(data=reqData)
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

            serializer = self.get_serializers_class(caseInformation, many=True, context={'user': self.request.user})

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
            reqType = request.data.get('type', None)
            reqProcedure = request.data.get('procedure', None)
            caseInformation = CaseManagement.objects.filter(pk=case_id).first()
            reqData = request.data
            createDefaultTask = False
            # Find Nature if exist add id if not create new.
            natureData = Nature.objects.filter(nature_title=reqData['nature']).first()
            if natureData:
                reqData['nature'] = natureData.id
            else:
                natureData = Nature.objects.create(nature_title=reqData['nature'], is_default=False,
                                                   user_id=request.user)
                reqData['nature'] = natureData.id

            # Adding default task according status and procedure if change
            if reqType and reqProcedure:
                if reqType != caseInformation.type or reqProcedure != caseInformation.procedure.id:
                    createDefaultTask = True

            # Prepare serializer
            serializer = self.serializers_class(caseInformation, data=reqData)
            if serializer.is_valid():
                serializer.save()

                # update : Chat-member's
                chatGroup = caseManagementChatGroup.objects.filter(case_management_id=serializer.data['id']).first()
                chatGroup.group_members.set(serializer.data['client_id'])
                chatGroup.save()

                if createDefaultTask:
                    self.addDefaultTask(case_id, caseInformation.procedure.procedure_sub_name, reqType)
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

    def delete(self, request):
        try:
            reqData = request.data
            caseManagementDocuments.objects.filter(case_management_id__in=reqData['case_management_id']).hard_delete()
            caseManagementTask.objects.filter(case_management_id__in=reqData['case_management_id']).hard_delete()
            groupChat = list(caseManagementChatGroup.objects.filter(
                case_management_id__in=reqData['case_management_id']).values_list('id', flat=True))
            caseManagementGroupMessage.objects.filter(group_id__in=groupChat).hard_delete()
            caseManagementChatGroup.objects.filter(case_management_id__in=reqData['case_management_id']).hard_delete()
            CaseManagement.objects.filter(id__in=reqData['case_management_id']).hard_delete()
            res = ResponseInfo([], RECORD_DELETED_SUCCESSFULLY, True, status.HTTP_200_OK)
            return Response(res.success_payload(), status=status.HTTP_200_OK)
        except Exception as err:
            res = ResponseInfo(err, SOMETHING_WENT_WRONG, False,
                               status.HTTP_401_UNAUTHORIZED)
            return Response(res.errors_payload(), status=status.HTTP_401_UNAUTHORIZED)

    def addDefaultTask(self, caseId, procedure, type):
        caseManagementTask.objects.filter(case_management_id=caseId).hard_delete()
        _dict = {'type__in': [type, 'Les deuX'], procedure: True}
        defaultTask = caseManagementDefaultTask.objects.filter(**_dict).order_by('id').values()
        self.task_serializers_class.Meta.depth = 0
        position = 0
        for task in defaultTask:
            del task['id']
            del task['created_date']
            del task['updated_date']
            task['case_management_id'] = caseId
            position += 1
            task['position'] = position
            serializer = self.task_serializers_class(data=task)
            if serializer.is_valid():
                serializer.save()


class filterCasesManagement(APIView):
    serializers_class = GetCaseSerializer

    def post(self, request):
        try:
            # Payload data
            reqLimit = request.data.get('limit', 0)
            reqOffset = request.data.get('offset', 0)
            orderBy = request.data.get('orderBy', "created_date")
            reqData = request.data['query']

            # Adding sorting param if needed.
            orderBy = "created_date" if orderBy == " " or orderBy == "" else orderBy

            # Adding pagination if needed
            limit = None if reqLimit == 0 and reqOffset == 0 else reqLimit + reqOffset
            offset = None if reqOffset == 0 else reqOffset

            # Remove blank data from dictionary
            kwargs = dict((k, v) for k, v in reqData.items() if v)

            # formatting filtered date format
            if 'created_date__date' in kwargs:
                reqData['created_date__date'] = datetime.strptime(reqData['created_date__date'], '%d-%m-%Y').date()

            # Database Query and serializer call
            data = CaseManagement.objects.filter(**kwargs).order_by(orderBy)[offset:limit]
            serializer = self.serializers_class(data, context={'user': request.user}, many=True)

            # Preparing response
            res = ResponseInfo(serializer.data, SUCCESS, True,
                               status.HTTP_200_OK)
            return Response(res.success_payload(), status=status.HTTP_200_OK)
        except Exception as err:
            res = ResponseInfo(err, SOMETHING_WENT_WRONG, False,
                               status.HTTP_401_UNAUTHORIZED)
            return Response(res.errors_payload(), status=status.HTTP_401_UNAUTHORIZED)


class caseManagementTaskView(APIView):
    serializers_class = CaseTaskSerializer
    serializers_filter_class = CaseTaskFilterSerializer

    # Filter Api
    def post(self, request):
        try:
            reqData = request.data

            # Remove blank data from dictionary
            kwargs = dict((k, v) for k, v in reqData.items() if v)
            reqType = kwargs['type'] if 'type' in kwargs else None

            if reqType:
                kwargs['type__in'] = [kwargs['type'], 'Les deuX']
                del kwargs['type']
            if 'send_notification' in reqData:
                if not reqData['send_notification']:
                    kwargs['send_notification'] = False
            taskList = caseManagementTask.objects.filter(**kwargs).order_by("position")
            serializer = self.serializers_filter_class(taskList, many=True, context={'request': request})
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
            sendNotification = request.data.get('send_notification', None)
            taskList = caseManagementTask.objects.filter(id=taskId).first()
            bodyParams = request.data
            if taskList.send_notification:
                bodyParams['send_notification'] = True
            serializer = self.serializers_class(taskList, data=bodyParams)
            if serializer.is_valid():
                serializer.save()

                # prepare Email Notification
                if sendNotification:
                    self.taskNotificationEmail(bodyParams['client_id'])
                    self.sendTaskMessage(bodyParams['case_management_id'], request.user, serializer.data['message'],
                                         serializer.data['subject'], serializer.data['notification_date'])
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

    # get deleted task
    def get(self, request, case_id):
        try:
            deletedTask = caseManagementTask.deleted_objects.filter(case_management_id=case_id)

            # self.serializers_class.Meta.depth = 1
            serializer = self.serializers_class(deletedTask, many=True)

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
            send_email([user.email],
                       'Altata - Notification 🔔', 'email.html',
                       notificationEmailText)

    def sendTaskMessage(self, caseId, lawyerId, message, subject, notificationDate):
        groupId = caseManagementChatGroup.objects.filter(case_management_id=caseId).first()
        notificationDate = notificationDate if notificationDate else None
        if not message or message == "":
            message = "<Blank-message-from-task-make-sure-to-add-message>"
        caseManagementGroupMessage.objects.create(notification_date=notificationDate, subject=subject,
                                                  message_read_by=[lawyerId.id], message=message, group_id=groupId,
                                                  message_send_by=lawyerId)


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
                caseManagementTaskView.sendTaskMessage(self, bodyParams['case_management_id'], request.user,
                                                       serializer.data['message'], serializer.data['subject'],
                                                       serializer.data['notification_date'])

            res = ResponseInfo(serializer.data, TASK_ADDED_SUCCESSFULLY, True,
                               status.HTTP_201_CREATED)
            return Response(res.success_payload(), status=status.HTTP_201_CREATED)

        res = ResponseInfo(serializer.errors, SOMETHING_WENT_WRONG, False,
                           status.HTTP_401_UNAUTHORIZED)
        return Response(res.errors_payload(), status=status.HTTP_401_UNAUTHORIZED)

    # Used For adding Default task to related case as-per filter
    def put(self, request):
        try:
            self.serializers_class.Meta.depth = 0
            caseId = request.data.get('case_management_id', None)
            reqData = request.data
            reqData['type__in'] = [reqData['type'], 'Les deuX']
            procedureType = Procedure.objects.get(pk=reqData['procedure'])
            reqData.pop('type')
            reqData.pop('procedure')
            reqData.pop('case_management_id')
            reqData[procedureType.procedure_sub_name] = True
            defaultTask = caseManagementDefaultTask.objects.filter(**reqData).order_by('id').values()
            position = 0
            for task in defaultTask:
                del task['id']
                position += 1
                task['position'] = position
                task['case_management_id'] = caseId
                serializer = self.serializers_class(data=task)
                if serializer.is_valid():
                    serializer.save()
            res = ResponseInfo([], TASK_ADDED_SUCCESSFULLY, True,
                               status.HTTP_201_CREATED)
            return Response(res.success_payload(), status=status.HTTP_201_CREATED)
        except Exception as err:
            res = ResponseInfo(err, SOMETHING_WENT_WRONG, False,
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
    def post(self, request):
        try:
            taskIds = request.data.get('task_id', None)
            caseManagementTask.deleted_objects.filter(id__in=taskIds).un_delete()
            res = ResponseInfo([], TASK_RESTORED_SUCCESSFULLY, True,
                               status.HTTP_200_OK)
            return Response(res.success_payload(), status=status.HTTP_200_OK)
        except Exception as err:
            res = ResponseInfo(err, SOMETHING_WENT_WRONG, False,
                               status.HTTP_401_UNAUTHORIZED)
            return Response(res.errors_payload(), status=status.HTTP_401_UNAUTHORIZED)

    def put(self, request):
        try:
            updateValue = request.data['update_value']
            ids = request.data['ids']

            instances = caseManagementTask.objects.filter(id__in=ids)
            for instance in instances:
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
            if ids:
                caseManagementTask.objects.filter(id__in=ids).delete()
                res = ResponseInfo([], RECORD_DELETED_SUCCESSFULLY, True, status.HTTP_200_OK)
                return Response(res.success_payload(), status=status.HTTP_200_OK)

            res = ResponseInfo({}, NO_RECORD, False, status.HTTP_401_UNAUTHORIZED)
            return Response(res.success_payload(), status=status.HTTP_401_UNAUTHORIZED)

        except Exception as err:
            res = ResponseInfo(err, SOMETHING_WENT_WRONG, False, status.HTTP_401_UNAUTHORIZED)
            return Response(res.errors_payload(), status=status.HTTP_401_UNAUTHORIZED)


class caseGroupMessageViewSet(APIView):
    serializers_class = CaseGroupMessageSerializer

    def post(self, request):
        try:
            userId = request.user.id
            reqData = request.data
            reqData['message_send_by'] = userId
            reqData['message_read_by'] = [userId]
            serializer = self.serializers_class(data=reqData)

            if serializer.is_valid():
                serializer.save()

                # sending email to lawyer if client sends a message
                group_details = caseManagementChatGroup.objects.get(id=reqData['group_id'])
                if request.user.is_lawyer is False and group_details.case_management_id and group_details.case_management_id.lawyer_id:
                    lawyer_email = group_details.case_management_id.lawyer_id.email
                    case_name = group_details.case_management_id.case_name
                    self.messageEmailNotification(lawyer_email, case_name)

                # Preparing response
                res = ResponseInfo(serializer.data, SUCCESS, True,
                                   status.HTTP_201_CREATED)
                return Response(res.success_payload(), status=status.HTTP_201_CREATED)

            res = ResponseInfo(serializer.errors, SOMETHING_WENT_WRONG, False, status.HTTP_401_UNAUTHORIZED)
            return Response(res.errors_payload(), status=status.HTTP_401_UNAUTHORIZED)
        except Exception as err:
            res = ResponseInfo(err, SOMETHING_WENT_WRONG, False, status.HTTP_401_UNAUTHORIZED)
            return Response(res.errors_payload(), status=status.HTTP_401_UNAUTHORIZED)

    def put(self, request):
        try:
            userId = request.user.id
            reqData = request.data
            chatData = caseManagementGroupMessage.objects.filter(Q(group_id=reqData['group_id']),
                                                                 ~Q(message_read_by__contains=[userId]))
            for chat in chatData:
                chat.message_read_by.append(userId)
                chat.save()
            res = ResponseInfo([], SUCCESS, True, status.HTTP_200_OK)
            return Response(res.success_payload(), status=status.HTTP_200_OK)
        except Exception as err:
            res = ResponseInfo(err, SOMETHING_WENT_WRONG, False, status.HTTP_401_UNAUTHORIZED)
            return Response(res.errors_payload(), status=status.HTTP_401_UNAUTHORIZED)

    def messageEmailNotification(self, lawyer_email, case_name):
        notificationEmailText = emailText.MessageLawyerNotification() | emailText.commonUrls()
        send_email([lawyer_email],
                   case_name + ' - Notification 🔔', 'email.html',
                   notificationEmailText)


class retrieveCaseGroupMessageViewSet(APIView):
    serializers_class = RetrieveCaseGroupMessageSerializer

    def get(self, request, case_id):
        try:
            caseGroup = caseManagementChatGroup.objects.filter(case_management_id=case_id).first()
            serializer = self.serializers_class(caseGroup, context={'request': request})

            res = ResponseInfo(serializer.data, SUCCESS, True,
                               status.HTTP_200_OK)
            return Response(res.success_payload(), status=status.HTTP_200_OK)
        except Exception as err:
            res = ResponseInfo(err, SOMETHING_WENT_WRONG, False, status.HTTP_401_UNAUTHORIZED)
            return Response(res.errors_payload(), status=status.HTTP_401_UNAUTHORIZED)


class dashboardViewSet(APIView):
    serializers_class = DashboardTaskSerializer

    def post(self, request):
        try:
            caseId = request.data.get('case_management_id', None)
            statusData = request.data.get('status', None)
            if caseId and statusData:
                query = {'case_management_id': caseId, 'status': statusData, 'notification_date__isnull': False}
            elif caseId and not statusData:
                query = {'case_management_id': caseId, 'notification_date__isnull': False}
            elif not caseId and not statusData or not caseId and statusData:
                caseId = list(CaseManagement.objects.filter(lawyer_id=request.user.id).values_list('id', flat=True))
                query = {'notification_date__isnull': False, 'case_management_id__in': caseId}
                if statusData:
                    query = {'notification_date__isnull': False, 'status': statusData, 'case_management_id__in': caseId}
            else:
                res = ResponseInfo([], "Please check payload for filter keyword..", False, status.HTTP_401_UNAUTHORIZED)
                return Response(res.errors_payload(), status=status.HTTP_401_UNAUTHORIZED)
            caseTask = caseManagementTask.objects.filter(**query).order_by("notification_date")
            serializer = self.serializers_class(caseTask, many=True)

            res = ResponseInfo(serializer.data, SUCCESS, True, status.HTTP_200_OK)
            return Response(res.success_payload(), status=status.HTTP_200_OK)

        except Exception as err:
            res = ResponseInfo(err, SOMETHING_WENT_WRONG, False, status.HTTP_401_UNAUTHORIZED)
            return Response(res.errors_payload(), status=status.HTTP_401_UNAUTHORIZED)


class clientDashboardViewSet(APIView):
    serializers_class = DashboardClientCaseSerializer
    taskSerializers_class = CaseTaskSerializer

    def get(self, request, case_id):
        try:
            # for case-data lawyer data, documents
            caseData = CaseManagement.objects.filter(id=case_id).first()
            serializer = self.serializers_class(caseData, context={'request': request})

            # for case-task with filtered status
            caseTaskData = caseManagementTask.objects.filter(Q(case_management_id=case_id),
                                                             ~Q(status="Archivé")).order_by("notification_date")
            self.taskSerializers_class.Meta.depth = 0
            taskSerializer = self.taskSerializers_class(caseTaskData, many=True)

            # for calender data with custom object
            query = {'notification_date__isnull': False, 'case_management_id': case_id}
            caseCalender = caseManagementTask.objects.filter(**query).order_by("notification_date")
            calenderSerializer = dashboardViewSet.serializers_class(caseCalender, many=True)

            # merging to final response object
            responseDict = {'case_task': taskSerializer.data, 'calender_data': calenderSerializer.data}
            responseDict.update(serializer.data)

            # prepare for response
            res = ResponseInfo(responseDict, SUCCESS, True, status.HTTP_200_OK)
            return Response(res.success_payload(), status=status.HTTP_200_OK)
        except Exception as err:
            res = ResponseInfo(err, SOMETHING_WENT_WRONG, False, status.HTTP_401_UNAUTHORIZED)
            return Response(res.errors_payload(), status=status.HTTP_401_UNAUTHORIZED)


class clientChatGroupViewSet(APIView):
    serializers_class = RetrieveClientGroupSerializer

    def get(self, request):
        try:
            userId = request.user
            groupData = caseManagementChatGroup.objects.filter(case_management_id__status__in=["Ouvert", "En attente"],
                                                               group_members__in=[userId])
            serializer = self.serializers_class(groupData, many=True, context={'request': request, 'user': userId})

            res = ResponseInfo(serializer.data, SUCCESS, True, status.HTTP_200_OK)
            return Response(res.success_payload(), status=status.HTTP_200_OK)
        except Exception as err:
            res = ResponseInfo(err, SOMETHING_WENT_WRONG, False, status.HTTP_401_UNAUTHORIZED)
            return Response(res.errors_payload(), status=status.HTTP_401_UNAUTHORIZED)
