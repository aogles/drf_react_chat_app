from django.urls import path, include

from .views import ChannelListAPIView
from .views import MessageListAPIView
from .views import MessageDetailAPIView

urlpatterns = [
    path('<int:channel>/messages/<int:pk/', MessageDetailAPIView.as_view()),
    path('<int:channel>/messages/', MessageListAPIView.as_view()),
    # path('<int:pk>/', BookDetailAPIView.as_view()),
    path('channels/', ChannelListAPIView.as_view()),
]
