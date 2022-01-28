from datetime import datetime, timedelta

import django
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import CIEmailField, ArrayField
from django.core.validators import RegexValidator
from django.db import models
from django.utils.translation import ugettext_lazy as _
import jwt
from django.conf import settings
from static import staticModelChoiceFields


def profile_upload_image_to(instance, filename):
    import os
    filename_base, filename_ext = os.path.splitext(filename)
    return 'user_profile/%s/%s' % (
        instance.id,
        filename
    )


# Create your models here.
class UserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """

    def create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    username = None
    email = CIEmailField(_('email address'), unique=True)
    password = models.CharField(max_length=256)
    first_name = models.CharField(max_length=40,
                                  validators=[RegexValidator(r'^[a-zA-Z ]*$', 'Only characters are allowed.')],
                                  help_text='Enter name', blank=True, null=True)
    name = models.CharField(max_length=40,
                            validators=[RegexValidator(r'^[a-zA-Z ]*$', 'Only characters are allowed.')],
                            help_text='Enter name', blank=True, null=True)
    last_name = models.CharField(max_length=40,
                                 validators=[RegexValidator(r'^[a-zA-Z ]*$', 'Only characters are allowed.')],
                                 help_text='Enter name', blank=True, null=True)
    phone_number = models.CharField(max_length=40,
                                    validators=[RegexValidator(r'^[0-9 ]*$', 'Only numbers are allowed.')],
                                    verbose_name='phone_number', blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    city_of_birth = models.DateField(blank=True, null=True)
    profile = models.ImageField(
        upload_to=profile_upload_image_to, blank=True, null=True)
    is_locked = models.BooleanField(default=False)
    created_date = models.DateTimeField(auto_now=False, default=django.utils.timezone.now)
    updated_date = models.DateTimeField(auto_now=True)
    email_otp_date = models.DateTimeField(auto_now=False, default=django.utils.timezone.now)

    is_active = models.BooleanField(default=False)
    emil_otp = models.IntegerField(default=None, blank=True, null=True)
    email_token = models.CharField(max_length=40, blank=True, null=True)
    # token is used to reset pw
    token = models.CharField(max_length=10, null=True, blank=True)

    user_type = models.CharField(max_length=255,
                                 choices=staticModelChoiceFields.userTypeChoiceFields(),
                                 null=True, blank=True)
    legal_status = models.CharField(max_length=255, choices=staticModelChoiceFields.legalStatusChoiceFields(),
                                    null=True, blank=True)
    title = models.CharField(max_length=255, choices=staticModelChoiceFields.titleChoiceFields(),
                             null=True, blank=True)
    company_name = models.CharField(max_length=255, null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)
    nationality = models.CharField(max_length=255, null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    postal_code = models.IntegerField(null=True, blank=True)
    capital_social = models.IntegerField(null=True, blank=True)
    RCS_city = models.CharField(max_length=255, null=True, blank=True)
    native_city = models.CharField(max_length=255, null=True, blank=True)
    number = models.CharField(max_length=255, null=True, blank=True)
    fixe = models.IntegerField(null=True, blank=True)
    comments = models.CharField(max_length=5000, null=True, blank=True)
    tags = ArrayField(models.CharField(max_length=200), null=True,blank=True)#models.CharField(max_length=255, null=True, blank=True)
    profession = models.CharField(max_length=255, null=True, blank=True)
    status = models.CharField(max_length=255, choices=staticModelChoiceFields.statusChoiceFields(),
                              null=True, blank=True)
    department = models.CharField(max_length=255, choices=staticModelChoiceFields.departmentChoiceFields(),
                                  null=True, blank=True)
    # Used for marital status of client
    client_type = models.CharField(max_length=255, choices=staticModelChoiceFields.clientTypeChoiceFields(),
                                   null=True, blank=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    class Meta:
        db_table = 'user'

    def __str__(self):
        return self.email

    @property
    def jwtoken(self):
        token = jwt.encode({'email': self.email, 'id': self.id, 'exp': datetime.utcnow() + timedelta(hours=24)},
                           settings.SECRET_KEY, algorithm="HS256")
        return token
