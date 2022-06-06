from user.views import *

from django.urls import include, path
from rest_framework import routers

urlpatterns = [
    path('registerClient', registerClient.as_view(), name="registerClient"),
    path('bulkDeleteUser', registerClient.as_view(), name="bulkDeleteUser"),
    path('loginClient', loginClient.as_view(), name="loginClient"),
    path('validateEmailOtp', validateEmailOtp.as_view(), name="validateEmailOtp"),
    path('resendEmailOtp', validateEmailOtp.as_view(), name="resendEmailOtp"),
    path('setPassword/<slug:emailToken>', setPassword.as_view(), name="setPassword"),
    path('forgotPassword', forgotPassword.as_view(), name="forgotPassword"),
    path('changePassword', forgotPassword.as_view(), name="changePassword"),
    path('updateUser/<int:pk>', userUpdateViewSet.as_view(), name="changePassword"),
    path('uploadUserCsv', uploadUserCsvViewSet.as_view(), name="uploadUserCsv"),
    path('getClientTitle', clientTitleViewSet.as_view(), name="getClientTitle"),
    path('getClientType', clientTypeViewSet.as_view(), name="getClientType"),
    path('getTermsAndCondition', termsAndCondition.as_view(), name="termsAndCondition"),
]
