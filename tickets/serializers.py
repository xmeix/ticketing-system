from rest_framework import serializers
from tickets.models import Ticket,TicketReponse
from authentication.serializers import UserRegistrationSerializer
class TicketSerializer(serializers.ModelSerializer):
    adz = UserRegistrationSerializer()  
    afr = UserRegistrationSerializer() 
    class Meta:
        model = Ticket
        fields = '__all__'
        

class TicketReponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketReponse
        fields = '__all__'
