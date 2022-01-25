# Create your views here.
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from common.common_config.responseHandlar import ResponseInfo, exception_payload
from rest_framework import status
from functools import wraps
import jwt

from django.http import JsonResponse


class CompanyViewSet(APIView):
    @permission_classes([AllowAny])
    def get(self, request):
        return Response(exception_payload({'token': 'data'}, "message failure", status.HTTP_200_OK),
                        status=status.HTTP_200_OK)

    def post(self, request, params_id=None):
        res = ResponseInfo({}, "First Message success", False, status.HTTP_200_OK)
        return Response(res.success_payload(), status=status.HTTP_200_OK)
