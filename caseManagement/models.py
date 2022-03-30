from django.contrib.postgres.fields import ArrayField
from django.db import models
from common.models import CommonBase

# Create your models here.
from user.models import User


class Nature(CommonBase):
    nature_title = models.CharField(max_length=100, blank=True, null=True)
    nature_code = models.CharField(max_length=100, blank=True, null=True)
    is_default = models.BooleanField(default=True)
    user_id = models.ForeignKey('user.User',
                                blank=True, null=True,
                                on_delete=models.DO_NOTHING, db_column='user_id')

    def __str__(self):
        return '{}'.format(self.nature_title)

    class Meta:
        db_table = 'nature'


class Procedure(CommonBase):
    procedure_type = models.CharField(max_length=100, blank=True, null=True)
    place = models.CharField(max_length=100, blank=True, null=True)
    room = models.CharField(max_length=100, blank=True, null=True)
    section = models.CharField(max_length=100, blank=True, null=True)
    is_default = models.BooleanField(default=True)
    user_id = models.ForeignKey('user.User',
                                blank=True, null=True,
                                on_delete=models.DO_NOTHING, db_column='user_id')

    def __str__(self):
        return '{}'.format(self.procedure_type)

    class Meta:
        db_table = 'procedure'


class CaseManagement(CommonBase):
    case_name = models.CharField(max_length=100, blank=True, null=True)
    nature = models.ForeignKey(Nature,
                               blank=True, null=True,
                               on_delete=models.DO_NOTHING, db_column='nature_id')
    status = models.CharField(max_length=100, blank=True, null=True)
    type = models.CharField(max_length=100, blank=True, null=True)
    unique_code = models.CharField(max_length=100, blank=True, null=True)
    procedure = models.ForeignKey(Procedure,
                                  blank=True, null=True,
                                  on_delete=models.DO_NOTHING, db_column='procedure_id')
    location = models.CharField(max_length=100, blank=True, null=True)  # lieu
    tags = ArrayField(models.CharField(max_length=200), null=True,
                      blank=True)
    internal_comment = models.CharField(max_length=100, blank=True, null=True)
    shared_comment = models.CharField(max_length=100, blank=True, null=True)
    lawyer_id = models.ForeignKey(User,
                                  blank=True, null=True,
                                  on_delete=models.DO_NOTHING, related_name='related_type_lawyer_id',
                                  db_column='lawyer_id')
    client_id = models.ManyToManyField(User,
                                       blank=True,
                                       related_name='related_type_client_id',
                                       db_column='client_id')
    opposing_contact_id = models.ManyToManyField(User,
                                                 blank=True,
                                                 related_name='related_type_opposing_contact_id',
                                                 db_column='opposing_contact_id')
    customer_contact_id = models.ManyToManyField(User,
                                                 blank=True,
                                                 related_name='related_type_customer_contact_id',
                                                 db_column='customer_contact_id')

    def __str__(self):
        return '{}'.format(self.case_name)

    class Meta:
        db_table = 'case_management'


class caseManagementTask(CommonBase):
    name = models.CharField(max_length=525, blank=True, null=True)
    sub_name = models.CharField(max_length=525, blank=True, null=True)
    message = models.CharField(max_length=525, blank=True, null=True)
    status = models.CharField(max_length=225, blank=True, null=True)
    subject = models.CharField(max_length=225, blank=True, null=True)
    notification_date = models.DateTimeField(auto_now=False, blank=True, null=True)
    type = models.CharField(max_length=100, blank=True, null=True)
    TJ = models.BooleanField(default=False)
    JCP = models.BooleanField(default=False)
    TCOM = models.BooleanField(default=False)
    REFTJ = models.BooleanField(default=False)
    REFTC = models.BooleanField(default=False)
    CPH = models.BooleanField(default=False)
    JAF = models.BooleanField(default=False)
    CA = models.BooleanField(default=False)
    is_default = models.BooleanField(default=False)
    case_management_id = models.ForeignKey(CaseManagement,
                                           blank=True, null=True,
                                           on_delete=models.DO_NOTHING, db_column='case_management_id')

    def __str__(self):
        return '{}'.format(self.name)

    class Meta:
        db_table = 'case_management_task'
