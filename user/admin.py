from django.contrib import admin
from .models import *


# Register All your models here.
# from django.apps import apps
#
#
# models = apps.get_models()
# for model in models:
#     try:
#         admin.site.register(model)
#     except admin.sites.AlreadyRegistered:
#         pass

@admin.register(User)
class GradeAdmin(admin.ModelAdmin):
    list_display = ("id","email")
    radio_fields = {'legal_status': admin.VERTICAL}