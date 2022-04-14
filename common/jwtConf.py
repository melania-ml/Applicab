import jwt
from django.conf import settings
from rest_framework import exceptions
from rest_framework.authentication import get_authorization_header, BaseAuthentication

from user.models import User


class jwtBaseAuthentication(BaseAuthentication):
    def authenticate(self, request):
        authHeader = get_authorization_header(request)
        authData = authHeader.decode('utf-8')
        autToken = authData.split(" ")
        if len(autToken) != 2:
            raise exceptions.AuthenticationFailed({'status': 403,'message': 'Token is not valid','success': False})
        token = autToken[1]
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms="HS256")
            userEmail = payload['email']
            user = User.objects.get(email=userEmail)
            if not user:
                raise exceptions.AuthenticationFailed({'status': 403,'message': 'No user Found from this token','success': False})
            return user, token

        except jwt.ExpiredSignatureError as ex:
            raise exceptions.AuthenticationFailed({'status': 403,'message': 'connectez-vous à votre compte','success': False})

        except jwt.DecodeError as ex:
            raise exceptions.AuthenticationFailed({'status': 403,'message': 'connectez-vous à votre compte','success': False})