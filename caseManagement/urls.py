from common.views import *

from django.urls import path
from .views import *
urlpatterns = [
    path('getNatureByUser', nature.as_view(), name="nature"),
    path('getProcedureByUser', procedure.as_view(), name="procedure"),
    path('addCases', casesManagement.as_view(), name="addCases"),
    path('bulkDeleteCases', casesManagement.as_view(), name="bulkDeleteCases"),
    path('updateCases/<slug:case_id>', casesManagement.as_view(), name="addCases"),
    path('getCasesByLawyer', casesManagement.as_view(), name="addCases"),
    path('filterCases', filterCasesManagement.as_view(), name="filterCases"),
    path('filterCaseTask', caseManagementTaskView.as_view(), name="addCases"),
    path('updateCaseTask', caseManagementTaskView.as_view(), name="addCases"),
    path('createCaseTask', caseManagementCreateTaskView.as_view(), name="addCases"),
    path('addDefaultCaseTask', caseManagementCreateTaskView.as_view(), name="addCases"),
    path('bulkReplicaCaseTask', caseManagementTaskView.as_view(), name="addCases"),
    path('uploadCaseDocuments', caseManagementDocumentsView.as_view(), name="uploadCaseDocuments"),
    path('bulkUpdateTask', bulkCaseTaskOperationsViewSet.as_view(), name="bulkUpdateTask"),
    path('bulkDeleteTask', bulkCaseTaskOperationsViewSet.as_view(), name="bulkDeleteTask"),
    path('bulkRestoreTask', bulkCaseTaskOperationsViewSet.as_view(), name="bulkRestoreTask"),
    path('getDeletedTask/<slug:case_id>', caseManagementTaskView.as_view(), name="bulkDeleteTask"),
    path('sendMessage', caseGroupMessageViewSet.as_view(), name="sendMessage"),
    path('caseGroupMessages/<slug:case_id>', retrieveCaseGroupMessageViewSet.as_view(), name="sendMessage"),
    path('readGroupMessages', caseGroupMessageViewSet.as_view(), name="readGroupMessages"),
    path('getDashboardData', dashboardViewSet.as_view(), name="getDashboardData"),
]
