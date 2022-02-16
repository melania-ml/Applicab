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

    def get_url(self, obj):
        return self.context['request'].build_absolute_uri(obj.image.url)