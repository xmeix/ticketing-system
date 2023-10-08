from rest_framework import serializers
from .models import Notification
from authentication.serializers import UserRegistrationSerializer

class NotificationSerializer(serializers.ModelSerializer):
    destinataire = UserRegistrationSerializer(required= False)

    class Meta:
        model = Notification
        fields = '__all__'