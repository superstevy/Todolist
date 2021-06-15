from django.db import models
from cloudinary.models import CloudinaryField

class Todo(models.Model):
    todo = models.CharField(max_length=140)
    id = models.CharField(primary_key=True, max_length=3)
