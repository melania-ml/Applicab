from django.db import models
from common.models import CommonBase


# Create your models here.


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
