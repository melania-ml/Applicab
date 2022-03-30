from drf_extra_fields.fields import Base64ImageField
from rest_framework import serializers

from user.models import *


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=128, min_length=6, write_only=True)
    email_otp = serializers.CharField(max_length=6, min_length=6, write_only=True)
    email_token = serializers.CharField(max_length=16, min_length=16, write_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'function',
                  'last_name', 'phone_number', 'password', 'email_otp', 'email_token', 'client_type', 'legal_status',
                  'title', 'company_name', 'country', 'nationality', 'address', 'city', 'postal_code', 'capital_social',
                  'RCS_city', 'native_city', 'number', 'fixe', 'comments', 'tags', 'profession', 'status', 'department',
                  'lawyer_id'
                  ]

    def create(self, validated_data):
        if validated_data['email']:
            return User.objects.create_user(**validated_data)
        validated_data.pop('email')
        return User.objects.create(**validated_data)


class LoginSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=128, min_length=6, write_only=True)

    class Meta:
        model = User
        fields = ['password', 'email', 'jwtoken', 'id', 'client_type', 'first_name', 'last_name', 'profile',
                  'last_login']
        read_only_fields = ['jwtoken']
        depth = 1

    def get_profile(self, obj):
        return self.context['request'].build_absolute_uri(obj.image.url)


class userProfileSerializer(serializers.ModelSerializer):
    profile = Base64ImageField(allow_null=True, required=False)

    class Meta:
        model = User
        fields = '__all__'
