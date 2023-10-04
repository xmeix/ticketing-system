from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from rest_framework.decorators import api_view,authentication_classes, permission_classes
from rest_framework import status
from .models import Ticket
from .serializers import TicketSerializer
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .permissions import HasRolePermission



@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated]) 
def get_all_tickets(request):
    
    

    tickets = Ticket.objects.all()
    serializer = TicketSerializer(tickets, many=True)
    return JsonResponse(serializer.data, safe=False)


@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_ticket(request, id):
    
    try:
        ticket = Ticket.objects.get(id=id)
    except Ticket.DoesNotExist:
        return JsonResponse({"error": "Ticket not found"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = TicketSerializer(ticket)
    return JsonResponse(serializer.data)



@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated, HasRolePermission])
def create_ticket(request):
    
    create_ticket.required_role = 'AFR'

    serializer = TicketSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
    else:
        errors = {}
        for field, field_errors in serializer.errors.items():
            errors[field] = field_errors[0]
        return JsonResponse({"error": errors}, status=status.HTTP_400_BAD_REQUEST)
    
    

@api_view(['PUT'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated, HasRolePermission])
def update_ticket(request, id):
    
    update_ticket.required_role = 'ADZ'

    # permission depends on state we want to update 
    try:
        ticket = Ticket.objects.get(id=id)
    except Ticket.DoesNotExist:
        return JsonResponse({"error": "Ticket non trouvé"}, status=status.HTTP_404_NOT_FOUND)
    
    data = request.data
    
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
        return JsonResponse(serializer.data)
    return JsonResponse({"error":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)





# @api_view(['DELETE'])
# def delete_ticket(request, id):
#     ticket = get_object_or_404(Ticket, id=id)
#     ticket.delete()
#     return JsonResponse({'message': 'Ticket deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
