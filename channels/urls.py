from django.urls import path

from .views import ChannelListAPIView
# from .views import BookDetailAPIView, ReviewDetailAPIView

urlpatterns = [
    # path('<int:book>/reviews/<int:pk/', ReviewDetailAPIView.as_view()),
    # path('<int:book>/reviews/', ReviewListAPIView.as_view()),
    # path('<int:pk>/', BookDetailAPIView.as_view()),
    path('channels/', ChannelListAPIView.as_view()),
]
