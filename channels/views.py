from django.shortcuts import render
from django.views.generic import ListView
from .models import Channel
from rest_framework import generics
from .serializers import ChannelSerializer
# Create your views here.


class ChannelListAPIView(generics.ListCreateAPIView):
    queryset = Channel.objects.all()
    serializer_class = ChannelSerializer
