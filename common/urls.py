from common.views import *

from django.urls import include, path
from rest_framework import routers

urlpatterns = [
    path('collection', CompanyViewSet.as_view(), name="company"),
    path('listCreate/<slug:app_label>/<slug:model_name>', GeneralGetAddViewSet.as_view(), name="GeneralGetAddViewSet"),
    path('updateRetrieve/<slug:app_label>/<slug:model_name>/<int:pk>/', GeneralGetUpdateViewSet.as_view(),
         name="GeneralGetUpdateViewSet"),

]
