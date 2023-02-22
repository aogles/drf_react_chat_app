
from django.views.generic import ListView
from .models import Channel
from .models import Message
from rest_framework import generics
from .serializers import ChannelSerializer
from .serializers import MessageSerializer
from .permissions import IsAuthoOrReadOnly
# from .models import app_model1, app_model2
# from .serializers import app_serializer1, app_serializer2

# Create your views here.


class ChannelListAPIView(generics.ListCreateAPIView):
    queryset = Channel.objects.all()
    serializer_class = ChannelSerializer


class ChannelDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Message.objects.all()
    serializer_class = ChannelSerializer


class MessageListAPIView(generics.ListCreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class MessageDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = (IsAuthoOrReadOnly,)
