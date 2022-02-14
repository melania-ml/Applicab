# Create your views here.
from django.apps import apps
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from common.common_config.responseHandlar import ResponseInfo, exception_payload
from rest_framework import status, viewsets, generics

from static.responseMessages import *
from .serializers import *


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

    def list(self, request, *args, **kwargs):
        response = super(GeneralGetAddViewSet, self).list(request)
        # prepare response
        res = ResponseInfo(response.data, SUCCESS, True, 200)
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
        res = ResponseInfo(response.data, SUCCESS, True, 200)
        return Response(res.success_payload())

    def partial_update(self, request, *args, **kwargs):
        response = super(GeneralGetUpdateViewSet, self).partial_update(request)
        # prepare response
        message = SUCCESS
        if self.kwargs['model_name'] == 'User':
            message = PROFILE_UPDATE_SUCCESS
        res = ResponseInfo(response.data, message, True, 200)
        return Response(res.success_payload())

    def delete(self, request, *args, **kwargs):
        response = super(GeneralGetUpdateViewSet, self).delete(request)
        # prepare response
        res = ResponseInfo("", RECORD_DELETED_SUCCESSFULLY, True, 200)
        return Response(res.success_payload())


@authentication_classes([])
@permission_classes([])
class FilterViewSet(APIView):

    def post(self, request, app_label, model_name):
        try:
            reqData = request.data
            # Get Dynamic model from req
            model = apps.get_model(app_label=str(app_label), model_name=str(model_name))
            # add model to serializer
            GeneralDepthSerializer.Meta.model = model

            kwargs = reqData['query']
            data = model.objects.filter(**kwargs)
            serializer = GeneralDepthSerializer(data, many=True)
            res = ResponseInfo(serializer.data, SUCCESS, True,
                               status.HTTP_200_OK)
            return Response(res.success_payload(), status=status.HTTP_200_OK)
        except Exception as err:
            res = ResponseInfo(err, SOMETHING_WENT_WRONG, False,
                               status.HTTP_401_UNAUTHORIZED)
            return Response(res.errors_payload(), status=status.HTTP_401_UNAUTHORIZED)
