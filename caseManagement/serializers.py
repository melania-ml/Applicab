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


class CaseTasSerializer(serializers.ModelSerializer):
    indexNum = serializers.SerializerMethodField()
    index = 0

    class Meta:
        model = caseManagementTask
        fields = "__all__"
        depth = 1

    def get_indexNum(self, obj):
        self.index += 1
        return self.index