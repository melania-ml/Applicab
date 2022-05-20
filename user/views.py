import secrets
import string
import pandas

# Create your views here.
from datetime import datetime, timedelta

from django.contrib.auth.models import update_last_login
from django.db.models import Q
from rest_framework import status, permissions, generics
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView

from caseManagement.models import *
from common.common_config.responseHandlar import ResponseInfo
from django.contrib.auth import authenticate, get_user_model

from common.common_config.sendEmail import send_email
from user.serializers import *
from static import emailText
from static.responseMessages import *


class registerClient(APIView):
    serializers_class = UserSerializer

    def post(self, request):
        lawyer = request.user.id  # Taking logged lawyer details from token
        user = User.objects.filter(email=request.data['email']).first()
        if user and user.client_type.client_type == 'Lawyer' or user and user.client_type.client_type == 'Client':
            res = ResponseInfo({"data": EMAIL_ALREADY_REGISTERED}, EMAIL_ALREADY_REGISTERED, False,
                               status.HTTP_401_UNAUTHORIZED)
            return Response(res.success_payload(), status.HTTP_401_UNAUTHORIZED)

        secretsGenerator = secrets.SystemRandom()
        emailOtp = secretsGenerator.randrange(100000, 999999)
        setPasswordToken = ''.join(secrets.choice(string.ascii_uppercase + string.digits)
                                   for i in range(16))
        request.data['email_otp'] = emailOtp
        request.data['password'] = setPasswordToken
        request.data['email_token'] = setPasswordToken.lower()
        request.data['lawyer_id'] = lawyer
        clientTitle = Client_title.objects.filter(Q(title=request.data['title'], is_default=True) |
                                                  Q(title=request.data['title'], lawyer_id=lawyer)).first()
        clientType = Client_type.objects.filter(Q(client_type=request.data['client_type'], is_default=True) |
                                                Q(client_type=request.data['client_type'], lawyer_id=lawyer)).first()
        if clientType:
            request.data['client_type'] = clientType.id
        else:
            clientType = Client_type(client_type=request.data['client_type'], lawyer_id=lawyer)
            clientType.save()
            request.data['client_type'] = clientType.id

        if clientTitle:
            request.data['title'] = clientTitle.id
        else:
            createTitle = Client_title(title=request.data['title'], legal_status=request.data['legal_status'],
                                       lawyer_id=lawyer)
            createTitle.save()
            request.data['title'] = createTitle.id
        serializer = self.serializers_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            if request.data['is_invite']:
                self.sendSetPasswordOtp(serializer, emailOtp, request.data['client_type'])
            res = ResponseInfo(serializer.data, USER_REGISTERED_SUCCESSFULLY, True, status.HTTP_201_CREATED)
            return Response(res.success_payload(), status.HTTP_201_CREATED)
        res = ResponseInfo({"data": serializer.errors}, "something went wrong", False,
                           status.HTTP_401_UNAUTHORIZED)
        return Response(res.success_payload(), status.HTTP_401_UNAUTHORIZED)

    def delete(self, request):
        try:
            ids = request.data.get('user_ids', None)
            if ids:
                userData = User.objects.filter(id__in=ids)  # .delete()
                for user in userData:
                    if user.is_lawyer:
                        self.deleteLawyer(user)
                    else:
                        self.deleteOtherTypeUser(user)
                res = ResponseInfo({}, CONTACT_DELETED, True, status.HTTP_200_OK)
                return Response(res.success_payload(), status=status.HTTP_200_OK)
            res = ResponseInfo({}, USER_NOT_FOUND, False, status.HTTP_401_UNAUTHORIZED)
            return Response(res.success_payload(), status=status.HTTP_401_UNAUTHORIZED)
        except Exception as err:
            res = ResponseInfo(err, SOMETHING_WENT_WRONG, False, status.HTTP_401_UNAUTHORIZED)
            return Response(res.success_payload(), status=status.HTTP_401_UNAUTHORIZED)

    def deleteOtherTypeUser(self, user):
        user.delete()

    def deleteLawyer(self, user):
        caseData = list(CaseManagement.objects.filter(lawyer_id=user.id).values_list('id', flat=True))
        caseManagementDocuments.objects.filter(case_management_id__in=caseData).hard_delete()
        caseManagementTask.objects.filter(case_management_id__in=caseData).hard_delete()
        groupChat = list(caseManagementChatGroup.objects.filter(
            case_management_id__in=caseData).values_list('id', flat=True))
        caseManagementGroupMessage.objects.filter(group_id__in=groupChat).hard_delete()
        caseManagementChatGroup.objects.filter(case_management_id__in=caseData).hard_delete()
        CaseManagement.objects.filter(id__in=caseData).hard_delete()

        # User-table-records
        Client_type.objects.filter(lawyer_id=user.id).hard_delete()
        Client_title.objects.filter(lawyer_id=user.id).hard_delete()
        Nature.objects.filter(user_id=user.id).hard_delete()
        User.objects.filter(lawyer_id=user.id).delete()
        User.objects.filter(id=user.id).delete()

    def sendSetPasswordOtp(self, serializer, emailOtp, clientType):
        if clientType == "Client":
            stPasswordText = emailText.setPassword() | emailText.commonUrls()
            stPasswordText['otp'] = emailOtp
            stPasswordText['text1'] = stPasswordText['text1'].format(
                userName=serializer.data['last_name'] + " " + serializer.data['first_name'])
            stPasswordText['button_url'] = stPasswordText['button_url'] + str(serializer.data['id'])
        else:
            stPasswordText = emailText.setLawyerPassword() | emailText.commonUrls()
            stPasswordText['otp'] = emailOtp
            stPasswordText['text1'] = stPasswordText['text1'].format(
                userName=serializer.data['last_name'] + " " + serializer.data['first_name'])
            stPasswordText['button_url'] = stPasswordText['button_url'] + str(serializer.data['id'])

        send_email([serializer.data['email']],
                   'Saisissez ' + str(emailOtp) + ' comme code de confirmation Applicab', 'email.html',
                   stPasswordText)


@authentication_classes([])
@permission_classes([])
class loginClient(APIView):
    serializers_class = LoginSerializer

    def post(self, request):
        try:
            email = request.data.get('email', None)
            password = request.data.get('password', None)
            is_admin = request.data.get('is_admin', None)
            user = User.objects.filter(email=email, is_active=True).first()

            # if no email found
            if not user:
                res = ResponseInfo({}, EMAIL_PASSWORD_INCORRECT, False, status.HTTP_401_UNAUTHORIZED)
                return Response(res.success_payload(), status=status.HTTP_401_UNAUTHORIZED)

            # check inactive user's
            if user.status == 'Inactif':
                res = ResponseInfo({}, USER_INACTIVE, False, status.HTTP_401_UNAUTHORIZED)
                return Response(res.success_payload(), status=status.HTTP_401_UNAUTHORIZED)

            # check admin login
            if is_admin != user.is_superuser:
                res = ResponseInfo({}, EMAIL_PASSWORD_INCORRECT, False, status.HTTP_401_UNAUTHORIZED)
                return Response(res.success_payload(), status=status.HTTP_401_UNAUTHORIZED)

            # authenticate check password
            authenticated = user.check_password(password)

            if authenticated:
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
            userData = User.objects.get(email_otp=emailOtp)
            userData.email_otp = None
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
            userData.email_otp = emailOtp
            userData.email_token = setPasswordToken.lower()
            userData.email_otp_date = datetime.now()
            userData.save()
            stPasswordText = emailText.setPassword() | emailText.commonUrls()
            stPasswordText['otp'] = emailOtp
            stPasswordText['text1'] = stPasswordText['text1'].format(
                userName=userData.last_name + " " + userData.first_name)
            stPasswordText['button_url'] = stPasswordText['button_url'] + str(userData.id)
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
            # Send Welcome email
            self.welcomeEmail(userData)
            res = ResponseInfo({"passwordCreated": True}, YOUR_PASSWORD_CHANGED, True, status.HTTP_200_OK)
            return Response(res.success_payload(), status=status.HTTP_200_OK)
        except Exception as err:
            res = ResponseInfo({"passwordCreated": False}, EMAIL_TOKEN_EXPIRES, False, status.HTTP_401_UNAUTHORIZED)
            return Response(res.success_payload(), status=status.HTTP_401_UNAUTHORIZED)

    def welcomeEmail(self, userData):
        if userData.is_lawyer:
            welcomeText = emailText.welcomeLawyerText() | emailText.commonUrls()
            welcomeText['text1'] = welcomeText['text1'].format(userName=userData.last_name + " " + userData.first_name)
        else:
            welcomeText = emailText.welcomeClientText() | emailText.commonUrls()
            welcomeText['text1'] = welcomeText['text1'].format(userName=userData.last_name + " " + userData.first_name)
        send_email([userData.email], 'Bienvenue sur Applicab !', 'email.html', welcomeText)


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
            forgotPasswordText['text1'] = forgotPasswordText['text1'].format(
                userName=userData.last_name + " " + userData.first_name)
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
        res = ResponseInfo(response.data, SUCCESS, True, status.HTTP_200_OK)
        return Response(res.success_payload(), status=status.HTTP_200_OK)

    def partial_update(self, request, *args, **kwargs):
        title = request.data.get('title', None)
        client_type = request.data.get('client_type', None)
        is_invite = request.data.get('is_invite', False)
        email = request.data.get('email', None)
        lawyer = request.user.id
        if title is not None:
            clientTitle = Client_title.objects.filter(title=request.data['title']).first()
            if clientTitle:
                request.data['title'] = clientTitle.id
            else:
                createTitle = Client_title(title=request.data['title'], lawyer_id=lawyer)
                createTitle.save()
                request.data['title'] = createTitle.id

        if client_type is not None:
            clientType = Client_type.objects.filter(client_type=client_type).first()
            if clientType:
                request.data['client_type'] = clientType.id
            else:
                createType = Client_type(client_type=client_type, lawyer_id=lawyer)
                createType.save()
                request.data['client_type'] = createType.id

        if is_invite:
            user_id = request.data.get('id', None)
            lawyer_data = User.objects.filter(id=user_id).first()
            lawyerName = lawyer_data.lawyer_id.first_name + " " + lawyer_data.lawyer_id.last_name if lawyer_data.lawyer_id else None
            is_lawyer = lawyer_data.is_lawyer
            secretsGenerator = secrets.SystemRandom()
            emailOtp = secretsGenerator.randrange(100000, 999999)
            setPasswordToken = ''.join(secrets.choice(string.ascii_uppercase + string.digits)
                                       for i in range(16))
            request.data['email_otp'] = emailOtp
            request.data['email_token'] = setPasswordToken.lower()

            self.sendOtpEmail(emailOtp, email, lawyerName, user_id, is_lawyer)

        response = super(userUpdateViewSet, self).partial_update(request)
        # prepare response
        res = ResponseInfo(response.data, PROFILE_UPDATE_SUCCESS, True, status.HTTP_200_OK)
        return Response(res.success_payload(), status=status.HTTP_200_OK)

    def sendOtpEmail(self, emailOtp, email, lawyerName, user_id, is_lawyer):
        if is_lawyer:
            stPasswordText = emailText.setLawyerPassword() | emailText.commonUrls()
            stPasswordText['otp'] = emailOtp
            stPasswordText['text1'] = stPasswordText['text1'].format(userName=lawyerName)
            stPasswordText['button_url'] = stPasswordText['button_url'] + str(user_id)
        else:
            stPasswordText = emailText.setPassword() | emailText.commonUrls()
            stPasswordText['otp'] = emailOtp
            stPasswordText['text1'] = stPasswordText['text1'].format(userName=lawyerName)
            stPasswordText['button_url'] = stPasswordText['button_url'] + str(user_id)
        send_email([email],
                   'Saisissez ' + str(emailOtp) + ' comme code de confirmation Applicab', 'email.html',
                   stPasswordText)


class uploadUserCsvViewSet(APIView):
    def post(self, request):
        try:
            lawyerId = request.user
            if str(request.data['csv'])[-3:] != 'csv':
                res = ResponseInfo({}, CSV_VALIDATION, False, status.HTTP_401_UNAUTHORIZED)
                return Response(res.success_payload(), status=status.HTTP_401_UNAUTHORIZED)

            csvData = pandas.read_csv(request.data['csv'])
            if len(csvData) > 50:
                res = ResponseInfo({}, "Cannot import more than 50 records", False, status.HTTP_200_OK)
                return Response(res.success_payload(), status=status.HTTP_200_OK)
            successCounter = 0
            nullData = False
            resString = CSV_ROW_VALIDATION
            null = csvData.notnull()
            for _, row in null.iterrows():
                if not row['Type'] or not row['Title'] or not row['Capital Social'] or not row['Number'] \
                        or not row['Mobile'] or not row['Comments'] or not row['Fixe'] or not row['Profession'] \
                        or not row['Department'] or not row['DOB'] or not row['Nationality'] or not row['Native City'] \
                        or not row['Legal Status'] or not row['Country'] or not row['Address'] or not row['City'] \
                        or not row['First Name'] or not row['Last Name'] or not row['RCS City'] or not row['Company Name']:
                    resString += str(_) + ','
                    nullData = True
            if nullData:
                res = ResponseInfo({}, resString, False, status.HTTP_200_OK)
                return Response(res.success_payload(), status=status.HTTP_200_OK)
        except Exception as e:
            res = ResponseInfo([], UPLOAD_VALID_CSV, False, status.HTTP_401_UNAUTHORIZED)
            return Response(res.success_payload(), status=status.HTTP_401_UNAUTHORIZED)

        for _, row in csvData.iterrows():
            try:
                _dict = {'lawyer_id': lawyerId, 'email': row["Email"], 'legal_status': row["Legal Status"],
                         'company_name': row["Company Name"], 'country': row["Country"], 'address': row["Address"],
                         'city': row["City"], 'RCS_city': row["RCS City"], 'first_name': row["First Name"],
                         'nationality': row["Nationality"],
                         'native_city': row["Native City"], 'department': row["Department"],
                         'profession': row["Profession"], 'comments': row["Comments"], 'fixe': row["Fixe"]}
                try:
                    _dict['date_of_birth'] = datetime.strptime(row["DOB"], '%m/%d/%Y')
                except:
                    pass
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
                title = Client_title.objects.filter(title=row["Title"]).first()
                if title:
                    _dict['title'] = title
                else:
                    title = Client_title.objects.create(title=row["Title"], legal_status=row["Legal Status"])
                    _dict['title'] = title

                clientType = Client_type.objects.filter(client_type=row['Type']).first()
                if clientType:
                    _dict['client_type'] = clientType
                else:
                    clientType = Client_type.objects.create(client_type=row['Type'])
                    _dict['client_type'] = clientType
                User.objects.create(**_dict)
                successCounter += 1
            except Exception as e:
                pass
        res = ResponseInfo(
            {"data": str(successCounter) + " record imported out of " + str(len(csvData))},
            USER_REGISTERED_SUCCESSFULLY, True, 200)
        return Response(res.success_payload())


class clientTitleViewSet(APIView):
    serializers_class = clientTitleSerializer

    def post(self, request):
        try:
            if 'legal_status' in request.data:
                query = Q(is_default=True, legal_status=request.data['legal_status']) | \
                        Q(lawyer_id=request.user.id, legal_status=request.data['legal_status'])
            else:
                query = Q(is_default=True) | Q(lawyer_id=request.user.id)
            clientTitle = Client_title.objects.filter(query)
            serializer = self.serializers_class(clientTitle, many=True)
            res = ResponseInfo(serializer.data, SUCCESS, True, status.HTTP_200_OK)
            return Response(res.success_payload(), status=status.HTTP_200_OK)
        except Exception as err:
            res = ResponseInfo([], SOMETHING_WENT_WRONG, False, status.HTTP_401_UNAUTHORIZED)
            return Response(res.success_payload(), status=status.HTTP_401_UNAUTHORIZED)


class clientTypeViewSet(APIView):
    serializers_class = clientTypeSerializer

    def get(self, request):
        try:
            query = Q(is_default=True) | Q(lawyer_id=request.user.id)
            clientType = Client_type.objects.filter(query)
            serializer = self.serializers_class(clientType, many=True)
            res = ResponseInfo(serializer.data, SUCCESS, True, status.HTTP_200_OK)
            return Response(res.success_payload(), status=status.HTTP_200_OK)
        except Exception as err:
            res = ResponseInfo([], SOMETHING_WENT_WRONG, False, status.HTTP_401_UNAUTHORIZED)
            return Response(res.success_payload(), status=status.HTTP_401_UNAUTHORIZED)
