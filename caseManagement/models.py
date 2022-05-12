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
    procedure_sub_name = models.CharField(max_length=100, blank=True, null=True)
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
                                  blank=True, null=True,related_name="procedure",
                                  on_delete=models.DO_NOTHING, db_column='procedure_id')
    location = models.CharField(max_length=600, blank=True, null=True)  # lieu
    tags = ArrayField(models.CharField(max_length=200), null=True,
                      blank=True)
    internal_comment = models.CharField(max_length=10000, blank=True, null=True)
    shared_comment = models.CharField(max_length=10000, blank=True, null=True)
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
    position = models.IntegerField(blank=True, null=True)
    sub_name = models.CharField(max_length=525, blank=True, null=True)
    message = models.CharField(max_length=50000, blank=True, null=True)
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
    send_notification = models.BooleanField(default=False)
    lawyer_notification = ArrayField(base_field=models.IntegerField(blank=True, null=True), blank=True, default=list)
    case_management_id = models.ForeignKey(CaseManagement,
                                           blank=True, null=True,related_name='case_management_task',
                                           on_delete=models.DO_NOTHING, db_column='case_management_id')

    def __str__(self):
        return '{}'.format(self.name)

    class Meta:
        db_table = 'case_management_task'


class caseManagementDefaultTask(CommonBase):
    name = models.CharField(max_length=525, blank=True, null=True)
    message = models.CharField(max_length=50000, blank=True, null=True)
    status = models.CharField(max_length=225, blank=True, null=True)
    subject = models.CharField(max_length=225, blank=True, null=True)
    type = models.CharField(max_length=100, blank=True, null=True)
    TJ = models.BooleanField(default=False)
    JCP = models.BooleanField(default=False)
    TCOM = models.BooleanField(default=False)
    REFTJ = models.BooleanField(default=False)
    REFTC = models.BooleanField(default=False)
    CPH = models.BooleanField(default=False)
    JAF = models.BooleanField(default=False)
    CA = models.BooleanField(default=False)

    def __str__(self):
        return '{}'.format(self.name)

    class Meta:
        db_table = 'case_management_default_task'


class caseManagementDocuments(CommonBase):
    case_document = models.FileField(upload_to='case_documents', blank=True, null=True)
    file_name = models.CharField(max_length=100, blank=True, null=True)
    case_management_id = models.ForeignKey(CaseManagement,
                                           blank=True, null=True,related_name='case_management_documents',
                                           on_delete=models.DO_NOTHING, db_column='case_management_id')
    case_task_id = models.ForeignKey(caseManagementTask,
                                     blank=True, null=True,
                                     on_delete=models.SET_NULL, related_name='case_documents',
                                     db_column='case_task_id')

    def __str__(self):
        return '{}'.format(self.case_document)

    class Meta:
        db_table = 'case_management_documents'


class caseManagementChatGroup(CommonBase):
    case_management_id = models.ForeignKey(CaseManagement,
                                           blank=True, null=True,
                                           related_name='case_group',
                                           on_delete=models.DO_NOTHING, db_column='case_management_id')
    group_members = models.ManyToManyField(User,
                                           blank=True,
                                           related_name='related_group_member_id',
                                           db_column='group_members')

    def __str__(self):
        return '{}'.format(self.case_management_id)

    class Meta:
        db_table = 'case_management_group_chat'


class caseManagementGroupMessage(CommonBase):
    group_id = models.ForeignKey(caseManagementChatGroup,
                                 blank=True, null=True,
                                 related_name="group_message",
                                 on_delete=models.DO_NOTHING, db_column='group_id')

    message_send_by = models.ForeignKey(User,
                                        blank=True, null=True,
                                        on_delete=models.DO_NOTHING, db_column='message_send_by')

    message_read_by = ArrayField(base_field=models.IntegerField(blank=True, null=True), blank=True, default=list)
    message = models.CharField(max_length=500000, blank=True, null=True)

    def __str__(self):
        return '{}'.format(self.group_id)

    class Meta:
        db_table = 'case_management_group_message'



