from rest_framework import serializers

from user.models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=128, min_length=6, write_only=True)
    emil_otp = serializers.CharField(max_length=6, min_length=6, write_only=True)
    email_token = serializers.CharField(max_length=16, min_length=16, write_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name',
                  'last_name', 'phone_number', 'password', 'emil_otp', 'email_token']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class LoginSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=128, min_length=6, write_only=True)

    class Meta:
        model = User
        fields = ['password', 'email', 'jwtoken']
        read_only_fields = ['jwtoken']
