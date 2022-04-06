from rest_framework import serializers
from rest_framework.fields import Field

from caseManagement.models import *


class NatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nature
        fields = '__all__'


class ProcedureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Procedure
        fields = '__all__'


class CaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CaseManagement
        fields = '__all__'
        depth = 0


class CaseDocumentsSerializer(serializers.ModelSerializer):
    case_document = serializers.ListField(child=serializers.FileField(max_length=100000,
                                                                      allow_empty_file=False,
                                                                      use_url=False))

    class Meta:
        model = caseManagementDocuments
        fields = '__all__'

    def create(self, validated_data):
        for dock in validated_data['case_document']:
            caseManagementDocuments.objects.create(case_document=dock, case_task_id=validated_data['case_task_id'],
                                                   case_management_id=validated_data['case_management_id'],
                                                   file_name=str(dock))
        return {"data": "success"}


# For-get : Not-in-use
class GetCaseDocumentsSerializer(serializers.ModelSerializer):
    case_document = serializers.SerializerMethodField()

    class Meta:
        model = caseManagementDocuments
        fields = '__all__'

    def get_case_document(self, caseDock):
        request = self.context.get("request")
        dock_url = caseDock.case_document.url
        return request.build_absolute_uri(dock_url)


class CaseTaskSerializer(serializers.ModelSerializer):
    # caseDocuments = GetCaseDocumentsSerializer(many=True)
    # indexNum = serializers.SerializerMethodField()
    # index = 0

    class Meta:
        model = caseManagementTask
        fields = "__all__"
        # read_only_fields = ['caseDocuments']
        depth = 1

    # def get_indexNum(self, obj):
    #     self.index += 1
    #     return self.index


class CaseDeleteTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = caseManagementDeletedTask
        fields = '__all__'
        depth = 0
