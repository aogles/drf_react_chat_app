from django.urls import path, include

urlpatterns = [
    path('channels/', include('channels.urls')),
]
