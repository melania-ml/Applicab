from drf_extra_fields.fields import Base64ImageField
from rest_framework import serializers

from user.models import *


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=128, min_length=6, write_only=True)
    emil_otp = serializers.CharField(max_length=6, min_length=6, write_only=True)
    email_token = serializers.CharField(max_length=16, min_length=16, write_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name',
                  'last_name', 'phone_number', 'password', 'emil_otp', 'email_token', 'user_type', 'legal_status',
                  'title', 'company_name', 'country', 'nationality', 'address', 'city', 'postal_code', 'capital_social',
                  'RCS_city', 'native_city', 'number', 'fixe', 'comments', 'tags', 'profession', 'status', 'department',
                  'client_type', ]

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class LoginSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=128, min_length=6, write_only=True)

    class Meta:
        model = User
        fields = ['password', 'email', 'jwtoken', 'id', 'first_name', 'last_name', 'profile', 'last_login']
        read_only_fields = ['jwtoken']

    def get_profile(self, obj):
        return self.context['request'].build_absolute_uri(obj.image.url)


class userProfileSerializer(serializers.ModelSerializer):
    profile = Base64ImageField(allow_null=True, required=False)

    class Meta:
        model = User
        fields = '__all__'
