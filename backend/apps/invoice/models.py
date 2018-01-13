from django.db import models


# Create your models here.


class Invoice(models.Model):
    created_by = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    number = models.TextField(null=False, blank=False)
