from common.views import *

from django.urls import include, path
from rest_framework import routers
from .views import *
urlpatterns = [
    path('getNatureByUser', nature.as_view(), name="nature"),
    path('getProcedureByUser', procedure.as_view(), name="procedure"),
    path('addCases', casesManagement.as_view(), name="addCases"),
    path('getCasesByLawyer', casesManagement.as_view(), name="addCases"),
    path('filterCaseTask', filterCaseTask.as_view(), name="addCases"),
]
