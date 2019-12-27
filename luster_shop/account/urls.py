from django.urls import path, include
from knox import views as knox_views
from .apis import RegisterAPIView, LoginAPIView


app_name = 'account'

urlpatterns = [
    # register api url
    path('register/', RegisterAPIView.as_view(), name='register'),

    # login api url
    path('login/', LoginAPIView.as_view(), name='login'),

    # knox urls
    path('', include('knox.urls')),
]
