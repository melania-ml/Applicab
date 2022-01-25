
from user.views import *

from django.urls import include, path
from rest_framework import routers


urlpatterns = [
    path('registerClient', registerClient.as_view(), name="registerClient"),
    path('loginClient', loginClient.as_view(), name="loginClient"),
    path('validateEmailOtp', validateEmailOtp.as_view(), name="validateEmailOtp"),
    path('setPassword/<slug:emailToken>', setPassword.as_view(), name="setPassword"),
]