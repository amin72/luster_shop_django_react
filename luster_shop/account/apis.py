from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import (
    UserSerializer,
    RegisterSerializer,
    LoginSerializer
)


# Register API
class RegisterAPIView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()
        # get the serialized user
        user_serialized_data = UserSerializer(user,
            context=self.get_serializer_context()).data

        return Response({
            "user": user_serialized_data,
            "token": AuthToken.objects.create(user)[1],
        })



# Login API
class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data
        # get the serialized user
        user_serialized_data = UserSerializer(user,
            context=self.get_serializer_context()).data

        return Response({
            "user": user_serialized_data,
            "token": AuthToken.objects.create(user)[1],
        })
