from rest_framework import serializers
from tickets.models import Ticket,TicketReponse
from authentication.serializers import UserRegistrationSerializer
from authentication.models import User
class TicketSerializer(serializers.ModelSerializer):
    adz = UserRegistrationSerializer(required= False)
    afr = UserRegistrationSerializer(required= False)

    class Meta:
        model = Ticket
        fields = '__all__'
        
class MyTicketSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Ticket
        fields = '__all__'
        

class TicketReponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketReponse
        fields = '__all__'
