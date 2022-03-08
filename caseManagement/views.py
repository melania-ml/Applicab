from django.db.models import Q
from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from caseManagement.models import *
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


class caseManagement(APIView):
    serializers_class = CaseSerializer

    def post(self, request):
        try:
            userId = request.user.id
            reqData = request.data
            reqData['lawyer_id'] = userId

            # Find Nature if exist add id if not create new.
            natureData = Nature.objects.filter().first()
            if nature:
                reqData['nature'] = natureData.id
            else:
                natureData = Nature.objects.create(nature_title=reqData['nature'], is_default=False, user_id=userId)
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