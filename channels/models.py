from django.db import models
from django.conf import settings
# Create your models here.


class Channel(models.Model):
    channeltitle = models.CharField(max_length=255)
    username = models.CharField(max_length=255)

    def __str__(self):
        return self.title
