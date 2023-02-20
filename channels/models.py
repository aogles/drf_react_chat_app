from django.db import models
from django.conf import settings
# Create your models here.


class Channel(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)

    def __str__(self):
        return self.title


class Message(models.Model):
    text = models.TextField()
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE, blank=True)
    users = models.ForeignKey(settings.AUTH_USER_MODEL,
                              on_delete=models.CASCADE, blank=True)

    def __str__(self):
        return self.text[:50]
