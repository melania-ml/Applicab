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
    class Meta:
        model = caseManagementTask
        fields = "__all__"
        depth = 1


class CaseGroupMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = caseManagementGroupMessage
        fields = '__all__'


# Used For Appending data Only..
class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = caseManagementGroupMessage
        fields = ['id', 'message', 'created_date', 'message_send_by', 'message_read_by']
        depth = 1


class RetrieveCaseGroupMessageSerializer(serializers.ModelSerializer):
    group_message = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = caseManagementChatGroup
        fields = '__all__'
        read_only_fields = ['group_message']

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response["group_message"] = sorted(response["group_message"], key=lambda x: x["id"])
        print(response["group_message"])
        return response


# used only for get cases with foreign key fields
class GetCaseSerializer(serializers.ModelSerializer):
    case_group = RetrieveCaseGroupMessageSerializer(many=True, read_only=True)

    class Meta:
        model = CaseManagement
        fields = '__all__'
        depth = 1
        read_only_fields = ['group_message']

    def to_representation(self, instance):
        response = super().to_representation(instance)
        loginUser = self.context['user'].id
        _dict = {'un_read_count': 0}
        if len(response["case_group"]) > 0:
            _dict['id'] = response["case_group"][0]["id"]
            if len(response["case_group"][0]["group_message"]) > 0:
                count = sum(loginUser not in groupMessages['message_read_by'] for groupMessages in
                            response["case_group"][0]["group_message"])
                _dict['un_read_count'] = count
        response["case_group"] = _dict
        return response
