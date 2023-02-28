from django.urls import path, include

from .views import ChannelListAPIView
from .views import MessageListAPIView
from .views import MessageDetailAPIView, ChannelDetailAPIView


urlpatterns = [
    path('messages/<int:pk>/', MessageDetailAPIView.as_view()),
    # path('<int:channel>/messages/<int:pk/', MessageDetailAPIView.as_view()),
    path('messages/', MessageListAPIView.as_view()),
    path('<int:pk>/', ChannelDetailAPIView.as_view()),
    path('', ChannelListAPIView.as_view()),
]
