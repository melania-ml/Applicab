import secrets
import string

# Create your views here.
from datetime import datetime, timedelta

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from common.common_config.responseHandlar import ResponseInfo
from django.contrib.auth import authenticate

from common.common_config.sendEmail import send_email
from user.serializers import *
from static import emailText


class registerClient(APIView):
    serializers_class = UserSerializer

    def post(self, request):
        secretsGenerator = secrets.SystemRandom()
        emailOtp = secretsGenerator.randrange(100000, 999999)
        setPasswordToken = ''.join(secrets.choice(string.ascii_uppercase + string.digits)
                                   for i in range(16))
        request.data['emil_otp'] = emailOtp
        request.data['password'] = setPasswordToken
        request.data['email_token'] = setPasswordToken.lower()
        serializer = self.serializers_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            stPasswordText = emailText.setPassword() | emailText.commonUrls()
            stPasswordText['otp'] = emailOtp
            stPasswordText['text1'] = stPasswordText['text1'].format(userName=serializer.data['first_name'])

            send_email([serializer.data['email']],
                       'Saisissez ' + emailOtp + ' comme code de confirmation Applicab', 'email.html', stPasswordText)
            res = ResponseInfo(serializer.data, "Client Register successfully", False, status.HTTP_201_CREATED)
            return Response(res.success_payload(), status.HTTP_201_CREATED)
        return Response({"data": "Email Already Registered"}, status.HTTP_400_BAD_REQUEST)


class loginClient(APIView):
    serializers_class = LoginSerializer

    def post(self, request):
        try:
            email = request.data.get('email', None)
            password = request.data.get('password', None)
            user = authenticate(email=email, password=password)
            if user:
                serializer = self.serializers_class(user)
                res = ResponseInfo(serializer.data, "Client Login successfully", True, status.HTTP_200_OK)
                return Response(res.success_payload(), status=status.HTTP_200_OK)
            res = ResponseInfo({}, "incorrect email or password", False, status.HTTP_401_UNAUTHORIZED)
            return Response(res.success_payload(), status=status.HTTP_401_UNAUTHORIZED)
        except Exception as err:
            res = ResponseInfo(err, "Somthing went wrong", False, status.HTTP_401_UNAUTHORIZED)
            return Response(res.success_payload(), status=status.HTTP_401_UNAUTHORIZED)


class validateEmailOtp(APIView):
    def post(self, request):
        emailOtp = request.data.get('emailOtp', None)
        try:
            userData = User.objects.get(emil_otp=emailOtp)
            userData.emil_otp = None
            userData.save()
            res = ResponseInfo({'validation': True, 'setPasswordToken': userData.email_token},
                               "Otp Validated Successfully", False, status.HTTP_200_OK)
            return Response(res.success_payload(), status=status.HTTP_200_OK)
        except Exception as e:
            res = ResponseInfo({'validation': False}, "Invalid Otp", False, status.HTTP_401_UNAUTHORIZED)
            return Response(res.success_payload(), status=status.HTTP_401_UNAUTHORIZED)

    def put(self, request):
        userid = request.data.get('userId', None)
        try:
            secretsGenerator = secrets.SystemRandom()
            emailOtp = secretsGenerator.randrange(100000, 999999)

            userData = User.objects.get(id=userid)
            userData.emil_otp = emailOtp
            userData.email_otp_date = datetime.now()
            userData.save()
            stPasswordText = emailText.setPassword() | emailText.commonUrls()
            stPasswordText['otp'] = emailOtp
            send_email([userData.email],
                       'Password Set', 'email.html', stPasswordText)
            res = ResponseInfo({'otp_shared': True},
                               "Otp shared Successfully", False, status.HTTP_200_OK)
            return Response(res.success_payload(), status=status.HTTP_200_OK)
        except Exception as e:
            res = ResponseInfo({'otp_shared': False}, "User Not Found", False, status.HTTP_404_NOT_FOUND)
            return Response(res.success_payload(), status=status.HTTP_404_NOT_FOUND)


class setPassword(APIView):
    def post(self, request, emailToken):
        try:
            userData = User.objects.get(email_token=emailToken)
            password = request.data.get('password', None)
            userData.set_password(password)
            userData.email_token = None
            userData.is_active = True
            userData.save()
            res = ResponseInfo({}, "Password registered successfully", False, status.HTTP_200_OK)
            return Response(res.success_payload(), status=status.HTTP_200_OK)
        except Exception as err:
            res = ResponseInfo({}, "Invalid Token", False, status.HTTP_401_UNAUTHORIZED)
            return Response(res.success_payload(), status=status.HTTP_401_UNAUTHORIZED)


class forgotPassword(APIView):
    def post(self, request):
        try:
            userEmail = request.data.get('email', None)
            userData = User.objects.get(email=userEmail)
            forgotPasswordToken = ''.join(secrets.choice(string.ascii_uppercase + string.digits)
                                          for i in range(16))
            userData.forgot_password_token = forgotPasswordToken
            userData.save()

            forgotPasswordText = emailText.forgotPassword() | emailText.commonUrls()
            forgotPasswordText['text1'] = forgotPasswordText['text1'].format(userName=userData.first_name)
            forgotPasswordText['text4'] = forgotPasswordText['text4'].format(userEmail=userData.email)
            send_email([userData.email],
                       'Réinitialisation de ton mot de passe', 'email.html', forgotPasswordText)
            res = ResponseInfo({'email_shared': True}, "Forgot password email send successfully", False, status.HTTP_201_CREATED)
            return Response(res.success_payload(), status.HTTP_201_CREATED)
        except Exception as err:
            print(err)
            res = ResponseInfo({'email_shared': False}, "User Not Found", False, status.HTTP_404_NOT_FOUND)
            return Response(res.success_payload(), status=status.HTTP_404_NOT_FOUND)

    def put(self, request):
        try:
            userEmail = request.data.get('email', None)
            password = request.data.get('password', None)

            userData = User.objects.get(email=userEmail, forgot_password_token__isnull=False)
            userData.set_password(password)
            userData.forgot_password_token = None
            userData.save()

            res = ResponseInfo({'password_changed': True}, "Password changed successfully", False,
                               status.HTTP_200_OK)
            return Response(res.success_payload(), status.HTTP_200_OK)
        except Exception as err:
            res = ResponseInfo({'password_changed': False}, "Email token expired", False, status.HTTP_401_UNAUTHORIZED)
            return Response(res.success_payload(), status=status.HTTP_401_UNAUTHORIZED)