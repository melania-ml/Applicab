from common.views import *

from django.urls import path
from .views import *
urlpatterns = [
    path('getNatureByUser', nature.as_view(), name="nature"),
    path('getProcedureByUser', procedure.as_view(), name="procedure"),
    path('addCases', casesManagement.as_view(), name="addCases"),
    path('updateCases/<slug:case_id>', casesManagement.as_view(), name="addCases"),
    path('getCasesByLawyer', casesManagement.as_view(), name="addCases"),
    path('filterCaseTask', caseManagementTaskView.as_view(), name="addCases"),
    path('updateCaseTask', caseManagementTaskView.as_view(), name="addCases"),
    path('bulkReplicaCaseTask', caseManagementTaskView.as_view(), name="addCases"),
    path('uploadCaseDocuments', caseManagementDocumentsView.as_view(), name="uploadCaseDocuments"),
    path('bulkUpdateTask', bulkCaseTaskOperationsViewSet.as_view(), name="bulkUpdateTask"),
    path('bulkDeleteTask', bulkCaseTaskOperationsViewSet.as_view(), name="bulkDeleteTask"),
    path('getDeletedTask/<slug:case_id>', caseManagementTaskView.as_view(), name="bulkDeleteTask"),
]
