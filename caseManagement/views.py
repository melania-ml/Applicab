from django.db.models import Q
import random

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from common.common_config.responseHandlar import ResponseInfo
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
                natureData = Nature.objects.create(nature_title=reqData['nature'], is_default=False, user_id=request.user)
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


class caseManagementTaskView(APIView):
    serializers_class = CaseTasSerializer

    def post(self, request):
        try:
            reqData = request.data
            # Remove blank data from dictionary  Q(user_id=userId) | Q(is_default=True)
            kwargs = dict((k, v) for k, v in reqData.items() if v)
            reqType = kwargs['type'] if 'type' in kwargs else None

            if reqType:
                kwargs['type__in'] = [kwargs['type'], 'Les deuX']
                del kwargs['type']

            query = Q(**kwargs)

            if 'case_management_id' in kwargs and 'status' not in kwargs:
                del kwargs['case_management_id']
                query = Q(case_management_id=reqData['case_management_id']) | Q(**kwargs)

            taskList = caseManagementTask.objects.filter(query).order_by("notification_date")

            serializer = self.serializers_class(taskList, many=True)
            # preparing response
            res = ResponseInfo(serializer.data, SUCCESS, True,
                               status.HTTP_200_OK)
            return Response(res.success_payload(), status=status.HTTP_200_OK)
        except Exception as err:
            res = ResponseInfo(err, SOMETHING_WENT_WRONG, False,
                               status.HTTP_401_UNAUTHORIZED)
            return Response(res.errors_payload(), status=status.HTTP_401_UNAUTHORIZED)

    def put(self, request):
        try:
            self.serializers_class.Meta.depth = 0  # Adding depth value for Foreign fields
            taskId = request.data.get('id', None)
            taskList = caseManagementTask.objects.filter(id=taskId).first()
            bodyParams = request.data
            # if it's Default task create replica
            if taskList.is_default:
                _dict = {
                    "message": request.data['message'] if 'message' in request.data else taskList.message,
                    "name": request.data['name'] if 'name' in request.data else taskList.name,
                    "sub_name": request.data['sub_name'] if 'sub_name' in request.data else None,
                    "type": taskList.type,
                    "TJ": taskList.TJ,
                    "JCP": taskList.JCP,
                    "TCOM": taskList.TCOM,
                    "REFTJ": taskList.REFTJ,
                    "REFTC": taskList.REFTC,
                    "CPH": taskList.CPH,
                    "JAF": taskList.JAF,
                    "CA": taskList.CA,
                    "notification_date": request.data[
                        'notification_date'] if 'notification_date' in request.data else taskList.notification_date,
                    "status": request.data['status'] if 'status' in request.data else taskList.status,
                    "subject": request.data['subject'] if 'subject' in request.data else taskList.subject,
                    "case_management_id": request.data[
                        'case_management_id'] if 'case_management_id' in request.data else taskList.case_management_id
                }
                bodyParams = _dict
                serializer = self.serializers_class(data=bodyParams)
                if serializer.is_valid():
                    serializer.save()
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
