from rest_framework import serializers


class GeneralSerializer(serializers.ModelSerializer):
    class Meta:
        model = None
        fields = '__all__'


class GeneralDepthSerializer(serializers.ModelSerializer):
    class Meta:
        model = None
        fields = '__all__'
        depth = 1
