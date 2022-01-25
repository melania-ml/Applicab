
from common.views import *

from django.urls import include, path
from rest_framework import routers


urlpatterns = [
    path('collection', CompanyViewSet.as_view(), name="company"),
]