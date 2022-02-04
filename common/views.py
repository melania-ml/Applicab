# Create your views here.
from django.apps import apps
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from common.common_config.responseHandlar import ResponseInfo, exception_payload
from rest_framework import status, viewsets, generics
from .serializers import *


@authentication_classes([])
@permission_classes([])
class CompanyViewSet(APIView):
    def get(self, request):
        return Response(exception_payload({'token': 'data'}, "message failure", status.HTTP_200_OK),
                        status=status.HTTP_200_OK)

    def post(self, request, params_id=None):
        res = ResponseInfo({}, "First Message success", False, status.HTTP_200_OK)
        return Response(res.success_payload(), status=status.HTTP_200_OK)


@authentication_classes([])
@permission_classes([])
class GeneralGetAddViewSet(generics.ListCreateAPIView):

    @property
    def model(self):
        return apps.get_model(app_label=str(self.kwargs['app_label']), model_name=str(self.kwargs['model_name']))

    def get_queryset(self):
        model = self.model
        return model.objects.all()

    def get_serializer_class(self):
        GeneralSerializer.Meta.model = self.model
        return GeneralSerializer

    def retrieve(self, request, *args, **kwargs):
        response = super(GeneralGetAddViewSet, self).list(request)
        # prepare response
        res = ResponseInfo(response.data, "Success", True, 200)
        return Response(res.success_payload())


@authentication_classes([])
@permission_classes([])
class GeneralGetUpdateViewSet(generics.RetrieveUpdateDestroyAPIView):

    @property
    def model(self):
        return apps.get_model(app_label=str(self.kwargs['app_label']), model_name=str(self.kwargs['model_name']))

    def get_queryset(self):
        model = self.model
        return model.objects.all()

    def get_serializer_class(self):
        GeneralSerializer.Meta.model = self.model
        return GeneralSerializer

    def retrieve(self, request, *args, **kwargs):
        response = super(GeneralGetUpdateViewSet, self).retrieve(request)
        # prepare response
        res = ResponseInfo(response.data, "Success", True, 200)
        return Response(res.success_payload())
