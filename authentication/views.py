from rest_framework import status
from rest_framework.decorators import api_view,authentication_classes, permission_classes
from rest_framework.response import Response
from .serializers import UserRegistrationSerializer, UserLoginSerializer
from django.contrib.auth import login, authenticate
from rest_framework_simplejwt.tokens import RefreshToken 
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication


@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def register(request):
    if request.method == 'POST':
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            # just sending the status of successful login not the user until he loggs in
            return Response(
                {
                    'message': 'Votre compte a été créé avec succès',
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([AllowAny])
def user_login(request):
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data['user']
        
        if user is not None:
            # Authenticate the user using Django's login function
            login(request, user)
            
            # Generate access and refresh tokens
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)
             
            # exclude the password field
            user_data = UserRegistrationSerializer(user).data
            user_data.pop('password', None)  
            user_data.pop('is_superuser', None) 
            
            return Response(
                {
                    'message': 'Connexion réussie',
                    'user': user_data,  # Serialize the user object
                    'access_token': access_token,
                    'refresh_token': refresh_token,
                },
                status=status.HTTP_200_OK,
            )
    
    return Response(
        {'error': 'Identifiants incorrects'},
        status=status.HTTP_401_UNAUTHORIZED,
    )
 

 

@api_view(['POST']) 
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def user_logout(request):
    # Invalidate tokens (optional, can also revoke tokens by blacklisting)
    response = Response({'message': 'Déconnexion réussie'}, status=status.HTTP_200_OK)
    response.delete_cookie('csrftoken')
    
    request.user = None   
    request.auth = None   
    request.session.flush()  
    
    return response



# View using Token Authentication
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def protected_view(request):
    print(request.user.is_authenticated)  
    print(request.user.is_authenticated)  
    user_id = request.user if request.user.id else "Unknown"
    return Response({'message': 'This is ' + str(user_id) + ' a protected view using Token Authentication.'})