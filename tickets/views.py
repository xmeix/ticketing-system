from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import status
from rest_framework.response import Response  # Import Response
from .models import Ticket,TicketReponse
from .serializers import TicketSerializer, TicketReponseSerializer
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .permissions import HasRolePermission



@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated]) 
def get_all_tickets(request):
    #ajout de contraintes apres la creation de reactproject
    #pour afr on envoie que ces tickets, ticketsReponses
    tickets = Ticket.objects.all()
    serializer = TicketSerializer(tickets, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)  # Use Response


@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated]) 
def get_all_reponses(request):
    #ajout de contraintes apres la creation de reactproject
    #pour afr on envoie que ces tickets, ticketsReponses
    ticketsReponses = TicketReponse.objects.all()
    serializer = TicketSerializer(ticketsReponses, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)  # Use Response




# don't think ill need this
# @api_view(['GET'])
# @authentication_classes([SessionAuthentication, TokenAuthentication])
# @permission_classes([IsAuthenticated])
# def get_ticket(request, id):
    
#     try:
#         ticket = Ticket.objects.get(id=id)
#     except Ticket.DoesNotExist:
#         return Response({"error": "Ticket non trouvé"}, status=status.HTTP_404_NOT_FOUND)
    
#     serializer = TicketSerializer(ticket)
#     return Response(serializer.data, status=status.HTTP_200_OK)  



@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated, HasRolePermission])
def create_ticket(request):
    
    create_ticket.required_role = 'AFR'
    
    ticket_data = request.data
    ticket_data['afr'] = request.user.id # created by assistante FR
    serializer = TicketSerializer(data=ticket_data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)  
    else:
        errors = {}
        for field, field_errors in serializer.errors.items():
            errors[field] = field_errors[0]
        return Response({"error": errors}, status=status.HTTP_400_BAD_REQUEST)  
 
 
@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated, HasRolePermission])
def create_reply_to_ticket(request,id):
    
    create_reply_to_ticket.required_role = 'ADZ'
    
    reply_data = request.data
    reply_data['ticket'] = id #assign the ticket which she replied to
    reply_data['createdBy'] = request.user.id # created by assistante DZ
    serializer = TicketReponseSerializer(data=reply_data)
    
    if serializer.is_valid():
        serializer.save()
        
        # Update the Ticket's etat to 'RESOLU'
        ticket = Ticket.objects.get(id=id)
        ticket.etat = 'RESOLU'
        ticket.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
    

@api_view(['PUT'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated, HasRolePermission])
def update_ticket(request, id):
    
    update_ticket.required_role = 'ADZ'
    # permission depends on state we want to update 
    try:
        ticket = Ticket.objects.get(id=id)
    except Ticket.DoesNotExist:
        return Response({"error": "Ticket non trouvé"}, status=status.HTTP_404_NOT_FOUND)

    
    
    data = request.data #this gonna contain mainly ( etat = smthg)
    
    if data['etat'] == 'ENCOURS':
        # here we will update the adz field inside ticket, because it will be assigned to it
        data['adz'] = request.user.id
    
    data_to_update = {}
    #verify if thers the field we want to update 
    # inside the request and inside the ticket model
    #then we put it in the object to update it
    for field in data:
        if hasattr(ticket,field):
            data_to_update[field] = data[field]
    
    serializer = TicketSerializer(instance=ticket, data=data_to_update, partial=True)
   
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)  # Utiliser Response
    return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)  # Utiliser Response





# @api_view(['DELETE'])
# def delete_ticket(request, id):
#     ticket = get_object_or_404(Ticket, id=id)
#     ticket.delete()
#     return JsonResponse({'message': 'Ticket deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
