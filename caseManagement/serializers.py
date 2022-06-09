from rest_framework import serializers
from rest_framework.fields import SerializerMethodField

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


class AddCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CaseManagement
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response["procedure"] = {"id": instance.procedure.id, "name": instance.procedure.procedure_sub_name}
        return response


# Used to upload Multiple document's
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


# For-get : Using for filter foreign key related data
# REF: CaseTaskFilterSerializer
class GetCaseDocumentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = caseManagementDocuments
        fields = '__all__'
        depth = 0


class CaseTaskFilterSerializer(serializers.ModelSerializer):
    case_documents = GetCaseDocumentsSerializer(many=True, read_only=True)

    class Meta:
        model = caseManagementTask
        fields = "__all__"
        depth = 1
        read_only_fields = ['case_documents']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # We pass the "upper serializer" context to the "nested one"
        self.fields['case_documents'].context.update(self.context)


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
        fields = ['id', 'message', 'subject', 'notification_date', 'created_date', 'message_send_by', 'message_read_by']
        depth = 1


class RetrieveCaseGroupMessageSerializer(serializers.ModelSerializer):
    group_message = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = caseManagementChatGroup
        fields = '__all__'
        read_only_fields = ['group_message']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # We pass the "upper serializer" context to the "nested one"
        self.fields['group_message'].context.update(self.context)

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response["group_message"] = sorted(response["group_message"], key=lambda x: x["id"])
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


class DashboardTaskSerializer(serializers.ModelSerializer):
    case_documents = GetCaseDocumentsSerializer(many=True, read_only=True)

    class Meta:
        model = caseManagementTask
        fields = '__all__'
        read_only_fields = ['case_documents']
        depth = 2

    def to_representation(self, instance):
        response = super().to_representation(instance)
        _dict = {
            'start': response['notification_date'],
            'end': response['notification_date'],
            'title': response['sub_name'] if response['sub_name'] else response['name'],
            'task_obj': response
        }
        return _dict


class DashboardClientCaseSerializer(serializers.ModelSerializer):
    GetCaseDocumentsSerializer.Meta.depth = 1
    case_management_documents = GetCaseDocumentsSerializer(many=True, read_only=True)

    class Meta:
        model = CaseManagement
        fields = ["is_deleted", "id", "created_date", "updated_date", "case_name", "status", "type", "unique_code",
                  "procedure", "shared_comment", "lawyer_id", "case_management_documents", "case_group"]
        depth = 1

    def to_representation(self, instance):
        response = super().to_representation(instance)
        caseDict = {"id": response["id"], "is_deleted": response["is_deleted"],
                    "created_date": response["created_date"],
                    "case_group": response["case_group"][0] if len(response["case_group"]) > 0 else None,
                    "updated_date": response["updated_date"], "case_name": response["case_name"],
                    "status": response["status"], "type": response["type"], "unique_code": response["unique_code"],
                    "procedure": response["procedure"], "shared_comment": response["shared_comment"]}
        _dict = {
            'case_management_data': caseDict,
            'case_management_documents': response['case_management_documents'],
            "lawyer_data": response["lawyer_id"]
        }
        return _dict


# Client-case-chat data serializer:
# Used For Appending data Only for clientGroup:
class ClientMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = caseManagementGroupMessage
        fields = ['message', 'message_read_by', 'id']


# Used For Appending data Only for clientGroup:
class clientCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CaseManagement
        fields = ['id', 'case_name', 'lawyer_id', 'procedure', 'unique_code', 'created_date']
        depth = 1


class RetrieveClientGroupSerializer(serializers.ModelSerializer):
    group_message = ClientMessageSerializer(many=True, read_only=True)
    case_management_id = clientCaseSerializer(read_only=True)

    class Meta:
        model = caseManagementChatGroup
        fields = ["id", "group_message", "is_deleted", "created_date", "updated_date", "case_management_id"]

    def to_representation(self, instance):
        response = super().to_representation(instance)
        loginUser = self.context['user'].id
        un_read_count = None
        if len(response["group_message"]) > 0:
            count = sum(loginUser not in groupMessages['message_read_by'] for groupMessages in
                        response["group_message"])
            un_read_count = count if count > 0 else None
        response["group_message"] = sorted(response["group_message"], key=lambda x: x["id"])
        response["group_message"] = response["group_message"].pop() if len(response["group_message"]) > 0 else {
            "message": ""}
        response["un_read_count"] = un_read_count
        return response
