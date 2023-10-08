
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.db.models import Q 
from .models import Notification
from .serializers import NotificationSerializer

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_notifications(request):

    filtered_notifications = []    
    print(request.user.role)
    
    if request.user.role == "AFR": 
        filtered_notifications = Notification.objects.filter(destinataire=request.user.id)
        
    else:
        filtered_notifications = []
        
    serializer = NotificationSerializer(filtered_notifications, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK) 

 