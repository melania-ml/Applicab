import secrets
import string
import pandas

# Create your views here.
from datetime import datetime, timedelta

from django.contrib.auth.models import update_last_login
from rest_framework import status, permissions, generics
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from common.common_config.responseHandlar import ResponseInfo
from django.contrib.auth import authenticate

from common.common_config.sendEmail import send_email
from user.serializers import *
from static import emailText
from static.responseMessages import *


@authentication_classes([])
@permission_classes([])
class registerClient(APIView):
    serializers_class = UserSerializer

    def post(self, request):
        user = User.objects.filter(email=request.data['email'])
        if user:
            res = ResponseInfo({"data": EMAIL_ALREADY_REGISTERED}, EMAIL_ALREADY_REGISTERED, False,
                               status.HTTP_401_UNAUTHORIZED)
            return Response(res.success_payload(), status.HTTP_401_UNAUTHORIZED)

        secretsGenerator = secrets.SystemRandom()
        emailOtp = secretsGenerator.randrange(100000, 999999)
        setPasswordToken = ''.join(secrets.choice(string.ascii_uppercase + string.digits)
                                   for i in range(16))
        request.data['emil_otp'] = emailOtp
        request.data['password'] = setPasswordToken
        request.data['email_token'] = setPasswordToken.lower()

        clientTitle = Client_title.objects.filter(title=request.data['title']).first()
        clientType = Client_type.objects.filter(client_type=request.data['client_type']).first()

        if clientType:
            request.data['client_type'] = clientType.id
        else:
            clientType = Client_type(client_type=request.data['client_type'])
            clientType.save()
            request.data['client_type'] = clientType.id

        if clientTitle:
            request.data['title'] = clientTitle.id
        else:
            createTitle = Client_title(title=request.data['title'])
            createTitle.save()
            request.data['title'] = createTitle.id
        serializer = self.serializers_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            if request.data['is_invite']:
                stPasswordText = emailText.setPassword() | emailText.commonUrls()
                stPasswordText['otp'] = emailOtp
                stPasswordText['text1'] = stPasswordText['text1'].format(userName=serializer.data['first_name'])
                stPasswordText['button_url'] = stPasswordText['button_url'] + str(serializer.data['id'])

                send_email([serializer.data['email']],
                           'Saisissez ' + str(emailOtp) + ' comme code de confirmation Applicab', 'email.html',
                           stPasswordText)
            res = ResponseInfo(serializer.data, USER_REGISTERED_SUCCESSFULLY, True, status.HTTP_201_CREATED)
            return Response(res.success_payload(), status.HTTP_201_CREATED)
        res = ResponseInfo({"data": serializer.errors}, "something went wrong", False,
                           status.HTTP_401_UNAUTHORIZED)
        return Response(res.success_payload(), status.HTTP_401_UNAUTHORIZED)


@authentication_classes([])
@permission_classes([])
class loginClient(APIView):
    serializers_class = LoginSerializer

    def post(self, request):
        try:
            email = request.data.get('email', None)
            password = request.data.get('password', None)
            user = authenticate(email=email, password=password)
            if user:
                serializer = self.serializers_class(user, context={'request': request})
                update_last_login(None, user)
                res = ResponseInfo(serializer.data, USER_LOGGED_IN_SUCCESSFULLY, True, status.HTTP_200_OK)
                return Response(res.success_payload(), status=status.HTTP_200_OK)
            res = ResponseInfo({}, EMAIL_PASSWORD_INCORRECT, False, status.HTTP_401_UNAUTHORIZED)
            return Response(res.success_payload(), status=status.HTTP_401_UNAUTHORIZED)
        except Exception as err:
            res = ResponseInfo(err, "Something went wrong", False, status.HTTP_401_UNAUTHORIZED)
            return Response(res.success_payload(), status=status.HTTP_401_UNAUTHORIZED)


@authentication_classes([])
@permission_classes([])
class validateEmailOtp(APIView):
    def post(self, request):
        emailOtp = request.data.get('emailOtp', None)
        try:
            userData = User.objects.get(emil_otp=emailOtp)
            userData.emil_otp = None
            userData.save()
            res = ResponseInfo({'validation': True, 'setPasswordToken': userData.email_token},
                               OTP_VALID_SUCCESSFULLY, True, status.HTTP_200_OK)
            return Response(res.success_payload(), status=status.HTTP_200_OK)
        except Exception as e:
            res = ResponseInfo({'validation': False}, INVALID_OTP, False, status.HTTP_401_UNAUTHORIZED)
            return Response(res.success_payload(), status=status.HTTP_401_UNAUTHORIZED)

    def put(self, request):
        userid = request.data.get('userId', None)
        try:
            secretsGenerator = secrets.SystemRandom()
            setPasswordToken = ''.join(secrets.choice(string.ascii_uppercase + string.digits)
                                       for i in range(16))
            emailOtp = secretsGenerator.randrange(100000, 999999)

            userData = User.objects.get(id=userid)
            userData.emil_otp = emailOtp
            userData.email_token = setPasswordToken.lower()
            userData.email_otp_date = datetime.now()
            userData.save()
            stPasswordText = emailText.setPassword() | emailText.commonUrls()
            stPasswordText['otp'] = emailOtp
            stPasswordText['text1'] = stPasswordText['text1'].format(userName=userData.first_name)
            stPasswordText['button_url'] = stPasswordText['button_url'] + str(userData.id)
            print(stPasswordText)
            send_email([userData.email],
                       'Saisissez ' + str(emailOtp) + ' comme code de confirmation Applicab', 'email.html',
                       stPasswordText)
            res = ResponseInfo({'otp_shared': True},
                               OTP_SHARED_SUCCESSFULLY, True, status.HTTP_200_OK)
            return Response(res.success_payload(), status=status.HTTP_200_OK)
        except Exception as e:
            res = ResponseInfo({'otp_shared': False}, USER_NOT_FOUND, False, status.HTTP_404_NOT_FOUND)
            return Response(res.success_payload(), status=status.HTTP_404_NOT_FOUND)


@authentication_classes([])
@permission_classes([])
class setPassword(APIView):
    def post(self, request, emailToken):
        try:
            userData = User.objects.get(email_token=emailToken)
            password = request.data.get('password', None)
            userData.set_password(password)
            userData.email_token = None
            userData.is_active = True
            userData.save()
            res = ResponseInfo({"passwordCreated": True}, YOUR_PASSWORD_CHANGED, True, status.HTTP_200_OK)
            return Response(res.success_payload(), status=status.HTTP_200_OK)
        except Exception as err:
            res = ResponseInfo({"passwordCreated": False}, EMAIL_TOKEN_EXPIRES, False, status.HTTP_401_UNAUTHORIZED)
            return Response(res.success_payload(), status=status.HTTP_401_UNAUTHORIZED)


@authentication_classes([])
@permission_classes([])
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
            forgotPasswordText['button_url'] = forgotPasswordText['button_url'] + forgotPasswordToken
            send_email([userData.email],
                       'Réinitialisation de ton mot de passe', 'email.html', forgotPasswordText)
            res = ResponseInfo({'email_shared': True}, "Forgot password email send successfully", True,
                               status.HTTP_201_CREATED)
            return Response(res.success_payload(), status.HTTP_201_CREATED)
        except Exception as err:
            res = ResponseInfo({'email_shared': False}, USER_NOT_FOUND, False, status.HTTP_401_UNAUTHORIZED)
            return Response(res.success_payload(), status=status.HTTP_401_UNAUTHORIZED)

    def put(self, request):
        try:
            userforgotPasswordToken = request.data.get('forgotPasswordToken', None)
            password = request.data.get('password', None)

            userData = User.objects.get(forgot_password_token=userforgotPasswordToken,
                                        forgot_password_token__isnull=False)
            userData.set_password(password)
            userData.forgot_password_token = None
            userData.save()

            res = ResponseInfo({'password_changed': True}, YOUR_PASSWORD_CHANGED, True,
                               status.HTTP_200_OK)
            return Response(res.success_payload(), status.HTTP_200_OK)
        except Exception as err:
            res = ResponseInfo({'password_changed': False}, EMAIL_TOKEN_EXPIRES, False,
                               status.HTTP_401_UNAUTHORIZED)
            return Response(res.success_payload(), status=status.HTTP_401_UNAUTHORIZED)


class userUpdateViewSet(generics.RetrieveUpdateDestroyAPIView):

    def get_queryset(self):
        return User.objects.all()

    def get_serializer_class(self):
        return userProfileSerializer

    def retrieve(self, request, *args, **kwargs):
        response = super(userUpdateViewSet, self).retrieve(request)
        # prepare response
        res = ResponseInfo(response.data, SUCCESS, True, 200)
        return Response(res.success_payload())

    def partial_update(self, request, *args, **kwargs):
        title = request.data.get('title', None)
        if title is not None:
            clientTitle = Client_title.objects.filter(title=request.data['title']).first()
            if clientTitle:
                request.data['title'] = clientTitle.id
            else:
                createTitle = Client_title(title=request.data['title'])
                createTitle.save()
                request.data['title'] = createTitle.id

        response = super(userUpdateViewSet, self).partial_update(request)
        # prepare response
        res = ResponseInfo(response.data, PROFILE_UPDATE_SUCCESS, True, 200)
        return Response(res.success_payload())


class uploadUserCsvViewSet(APIView):
    def post(self, request):
        csvData = pandas.read_csv(request.data['csv'])
        successCounter = 0
        creatList = []
        _dict = {"email": "",
                 "first_name": "",
                 "name": "",
                 "phone_number": None,
                 "number": None,
                 "legal_status": "",
                 "title": None,
                 "company_name": "",
                 "country": "",
                 "address": "",
                 "city": "",
                 "native_city": "",
                 "nationality": "",
                 "RCS_city": "",
                 "fixe": None,
                 "comments": "",
                 "profession": "",
                 "department": "",
                 "date_of_birth": None,
                 "client_type": None,
                 "capital_social": None}
        for _, row in csvData.iterrows():
            try:
                if type(row["Email"]) is str:
                    _dict['email'] = row["Email"]
                    if type(row["Legal Status"]) is str: _dict['legal_status'] = row["Legal Status"]
                    if type(row["Company Name"]) is str: _dict['company_name'] = row["Company Name"]
                    if type(row["Country"]) is str: _dict['country'] = row["Country"]
                    if type(row["Address"]) is str: _dict['address'] = row["Address"]
                    if type(row["City"]) is str: _dict['city'] = row["City"]
                    if type(row["RCS City"]) is str: _dict['RCS_city'] = row["RCS City"]
                    if type(row["First Name"]) is str: _dict['first_name'] = row["First Name"]
                    if type(row["DOB"]) is str: _dict['date_of_birth'] = datetime.strptime(row["DOB"], '%m/%d/%Y')
                    if type(row["Nationality"]) is str: _dict['nationality'] = row["Nationality"]
                    if type(row["Native City"]) is str: _dict['native_city'] = row["Native City"]
                    if type(row["Department"]) is str: _dict['department'] = row["Department"]
                    if type(row["Profession"]) is str: _dict['profession'] = row["Profession"]
                    if type(row["Comments"]) is str: _dict['comments'] = row["Comments"]
                    if type(row["Fixe"]) is str: _dict['fixe'] = int(row["Fixe"])
                    try:
                        _dict['capital_social'] = int(row["Capital Social"])
                    except:
                        _dict['capital_social'] = None
                    try:
                        _dict['phone_number'] = int(row["Number"])
                    except:
                        _dict['phone_number'] = None
                    try:
                        _dict['number'] = int(row["Mobile"])
                    except:
                        _dict['number'] = None
                    if type(row["Title"]) is str:
                        title = Client_title.objects.filter(title=row["Title"]).first()
                        if title:
                            _dict['title'] = title
                        else:
                            title = Client_title.objects.create(title=row["Title"],legal_status=row["Legal Status"])
                            _dict['title'] = title

                    if type(row["Type"]) is str:
                        clientType = Client_type.objects.filter(client_type=row['Type']).first()
                        if clientType:
                            _dict['client_type'] = clientType
                        else:
                            clientType = Client_type.objects.create(client_type=row['Type'])
                            _dict['client_type'] = clientType
                    creatList.append(_dict)
                    User.objects.create(**_dict)
                    successCounter += 1
            except Exception as e:
                pass
        res = ResponseInfo({"success": True, "data": str(successCounter) + " record imported out of " + str(len(csvData))}, USER_REGISTERED_SUCCESSFULLY, True, 200)
        return Response(res.success_payload())
