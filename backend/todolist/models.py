from django.db import models
class Todo(models.Model):
    todo_input = models.CharField(max_length=140)
    id = models.CharField(primary_key=True, max_length=3)
