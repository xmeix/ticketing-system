from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import status
from rest_framework.response import Response  
from .models import Ticket,TicketReponse
from .serializers import TicketSerializer, TicketReponseSerializer,MyTicketSerializer
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .permissions import HasRolePermission,HasADZRolePermission,HasBothRolePermission
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.core.files.storage import FileSystemStorage
from django.db.models import Q 


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_all_tickets(request):
    
    # print(" tickets ... ")
    tickets = Ticket.objects.all()
    ticketsReponses = TicketReponse.objects.all()

    filtered_tickets = []
    filtered_replies = []
    print(request.user.role)
    if request.user.role == "ADZ": 
        filtered_tickets = Ticket.objects.filter(Q(etat="OUVERT") | Q(adz=request.user.id))
        print(filtered_tickets)
        filtered_replies = TicketReponse.objects.filter(ticket__in=filtered_tickets)
    elif request.user.role == "AFR": 
        filtered_tickets = Ticket.objects.filter(afr=request.user.id)
        filtered_replies = TicketReponse.objects.filter(ticket__in=filtered_tickets)
    else:
        filtered_tickets = tickets
        filtered_replies = ticketsReponses
        
    repSerializer = TicketSerializer(filtered_replies, many=True)
    serializer = TicketSerializer(filtered_tickets, many=True)
    return Response({"tickets": serializer.data, "replies": repSerializer.data}, status=status.HTTP_200_OK) 


# @api_view(['GET'])
# @authentication_classes([JWTAuthentication])
# @permission_classes([IsAuthenticated])
# def get_all_reponses(request):
    
#     ticketsReponses = TicketReponse.objects.all()
#     serializer = TicketSerializer(ticketsReponses, many=True)
#     return Response(serializer.data, status=status.HTTP_200_OK)  # Use Response
 


@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated, HasBothRolePermission])
def create_ticket(request):
    
    ticket_data = request.data.copy()
    print(request.user.id)
    ticket_data['afr'] = request.user.id
    print(ticket_data)
    print(request.FILES)
    # handle saving file:
    if 'attachment' in request.FILES:
        uploaded_file = request.FILES['piecesjointes']
        fs = FileSystemStorage()
        saved_file = fs.save(uploaded_file.name,uploaded_file)
        file_url = fs.url(saved_file)
        print(file_url)
        # store its url
        ticket_data['piecesjointes'] = file_url

        if not uploaded_file.name:
            return Response({"error": "Votre fichier ne possède pas de nom"}, status=status.HTTP_400_BAD_REQUEST)

    
    ticket_serializer = MyTicketSerializer(data=ticket_data)
        
    if ticket_serializer.is_valid():
        ticket_serializer.save()
        return Response(ticket_serializer.data, status=status.HTTP_201_CREATED)
    return Response(ticket_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

 
 
 
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
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
 
    

@api_view(['PATCH'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated, HasADZRolePermission])
def update_ticket(request, id):
    
    
    # permission depends on state we want to update 
    print('updating ticket with id = '+str(id) )
    try:
        ticket = Ticket.objects.get(id=id)
    except Ticket.DoesNotExist:
        return Response({"error": "Ticket n'existe pas'"}, status=status.HTTP_404_NOT_FOUND)
    
    data = request.data #this gonna contain mainly ( etat = smthg)
    
    if 'etat' in data and data['etat'] == 'ENCOURS':
        # here we will update the adz field inside ticket
        # because it will be assigned to it
        data['adz'] = request.user.id
    
    #pas necessaire: ----------------------------------------
    data_to_update = {}
    #verify if theres the field we want to update 
    # inside the request and inside the ticket model
    #then we put it in the object to update it
    for field in data:
        if hasattr(ticket,field):
            data_to_update[field] = data[field]
    # -------------------------------------------------------
    
    serializer = MyTicketSerializer(instance=ticket, data=data_to_update, partial=True)
   
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)   
    
    return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST) 





 