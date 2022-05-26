import jwt
from django.conf import settings
from django.db.models import Q
from rest_framework import exceptions
from rest_framework.authentication import get_authorization_header, BaseAuthentication

from user.models import *


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
            clientType = list(Client_type.objects.filter(client_type__in=['Client', 'Lawyer']).values_list('id', flat=True))
            user = User.objects.get(Q(email=userEmail, client_type__in=clientType) | Q(email=userEmail, is_superuser=True))
            if not user:
                raise exceptions.AuthenticationFailed({'status': 403,'message': 'No user Found from this token','success': False})
            return user, token

        except jwt.ExpiredSignatureError as ex:
            raise exceptions.AuthenticationFailed({'status': 403,'message': 'connectez-vous à votre compte','success': False})

        except jwt.DecodeError as ex:
            raise exceptions.AuthenticationFailed({'status': 403,'message': 'connectez-vous à votre compte','success': False})