from django.db import models
from django.conf import settings
# Create your models here.


class Channel(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)

    def __str__(self):
        return self.title
