# Generated by Django 3.1.7 on 2021-06-15 20:39

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Todo',
            fields=[
                ('todo', models.CharField(max_length=140)),
                ('id', models.CharField(max_length=3, primary_key=True, serialize=False)),
            ],
        ),
    ]