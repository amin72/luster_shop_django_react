from django.urls import path, include
from knox import views as knox_views
from .apis import RegisterAPIView, LoginAPIView, UserAPIView


app_name = 'account'

urlpatterns = [
    # register api url
    path('register/', RegisterAPIView.as_view(), name='register'),

    # login api url
    path('login/', LoginAPIView.as_view(), name='login'),

    # get user api url
    path('user/', UserAPIView.as_view(), name='user'),

    # logout api url
    path('logout/', knox_views.LogoutView.as_view(), name='logout'),

    # knox urls
    path('', include('knox.urls')),
]
