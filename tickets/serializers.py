from rest_framework import serializers
from tickets.models import Ticket,TicketReponse

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'
        

class TicketReponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketReponse
        fields = '__all__'
