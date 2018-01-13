from django.contrib import admin
# Register your models here.
from django.contrib.admin.options import ModelAdmin

from apps.invoice.models import Invoice


@admin.register(Invoice)
class InvoiceAdmin(ModelAdmin):
    pass
