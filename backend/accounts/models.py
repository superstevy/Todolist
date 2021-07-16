from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Account(models.Model):
    username = models.CharField(max_length=200)
    email = models.EmailField(max_length=100, unique=True)
    owner = models.ForeignKey(
        User, related_name='accounts', on_delete=models.CASCADE, null=True)
