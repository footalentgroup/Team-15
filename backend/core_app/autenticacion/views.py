import secrets
import string
from django.shortcuts import render
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from autenticacion.models import CustomUser
from autenticacion.permissions import IsAdminUser
from .serializer import CustomUserSerializer
from rest_framework import generics
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.tokens import AccessToken

class GoogleOAuthService(APIView):
    client_id = settings.GOOGLE_OAUTH_CLIENT_ID
    client_secret = settings.GOOGLE_OAUTH_CLIENT_SECRET
    redirect_uri = settings.GOOGLE_OAUTH_REDIRECT_URI

    def post(self, request):
        authorization_code = request.data.get("code")
        token = self.exchange_authorization_code_for_token(authorization_code)
        if token:
            user_profile = self.get_user_profile(token)
            email = user_profile.get("email")
            if email:
                try:
                    user = CustomUser.objects.get(email=email)
                except CustomUser.DoesNotExist:
                    # Generar una contraseña aleatoria
                    alphabet = string.ascii_letters + string.digits
                    random_password = ''.join(secrets.choice(alphabet) for i in range(12))
                    
                    # Crear el usuario sin el username para obtener el id
                    user = CustomUser(
                        first_name=user_profile.get("given_name", ""),
                        last_name=user_profile.get("family_name", ""),
                        email=email,
                        role='user'
                    )
                    user.set_password(random_password)  # Establecer la contraseña aleatoria
                    user.save()

                    # Generar un nombre de usuario único con el id
                    user.username = f"{user.first_name}{user.last_name}_{user.id}"
                    user.save()

                refresh = RefreshToken.for_user(user)
                user_data = CustomUserSerializer(user).data
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'user': user_data
                }, status=status.HTTP_200_OK)
            else:
                return Response({"error": "No email found in user profile"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Error al obtener el access token"}, status=status.HTTP_400_BAD_REQUEST)

    def exchange_authorization_code_for_token(self, authorization_code):
        token_request_data = {
            "code": authorization_code,
            "client_id": self.client_id,
            "client_secret": self.client_secret,
            "redirect_uri": self.redirect_uri,
            "grant_type": "authorization_code"
        }
        response = requests.post("https://oauth2.googleapis.com/token", data=token_request_data)
        if response.status_code == 200:
            json_response = response.json()
            return json_response.get("access_token")
        else:
            return None

    def get_user_profile(self, access_token):
        headers = {
            "Authorization": f"Bearer {access_token}"
        }
        response = requests.get("https://www.googleapis.com/oauth2/v3/userinfo", headers=headers)
        if response.status_code == 200:
            return response.json()
        else:
            return {"error": "Error al obtener el perfil del usuario"}



class BasicLoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        if user.check_password(password):
            token = user.get_token()
            user_data = CustomUserSerializer(user).data
            return Response({
                'refresh': str(token),
                'access': str(token.access_token),
                'user': user_data
            })
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        


class RegisterUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        token = user.get_token()
        user_data = CustomUserSerializer(user).data

        return Response({
            'refresh': str(token),
            'access': str(token.access_token),
            'user': user_data
        }, status=status.HTTP_201_CREATED)
    
    
class UpdateUserView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()

    def get_object(self):
        # Obtiene el ID del usuario desde la URL
        user_id = self.kwargs.get('pk')
        try:
            user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        return user

    def update(self, request, *args, **kwargs):
        instance = self.get_object()  # instance obtiene el usuario a actualizar
        serializer = self.get_serializer(instance, data=request.data, partial=True)  # partial=True permite actualizaciones parciales
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        user_data = CustomUserSerializer(user).data

        return Response({
            'user': user_data
        }, status=status.HTTP_200_OK)


class DeleteUserView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def get_object(self):
        # Obtiene el ID del usuario desde la URL
        user_id = self.kwargs.get('pk')
        try:
            user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        return user

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()  # instance obtiene el usuario a eliminar
        if isinstance(instance, Response):
            return instance  # Retorna la respuesta de error si el usuario no se encuentra
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)