# Generated by Django 4.1.7 on 2023-02-22 20:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('channels', '0003_rename_users_message_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='channel',
            name='author',
        ),
    ]
