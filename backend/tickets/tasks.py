from django.utils import timezone
from .models import Ticket, EtatTicket
from server.celery import app
from django.db.models import Q  # Import Q for complex queries

@app.task
def check_ticket_deadlines():
    # Retrieve all open tickets with a deadline that has passed
    # print("hello world")
    expired_tickets = Ticket.objects.filter(~Q(etat=EtatTicket.EXPIRE),~Q(etat=EtatTicket.RESOLU), deadline__lt=timezone.now())
    print(expired_tickets)
    for ticket in expired_tickets:
        # Check if the ticket has been opened by a user
        # if not (ticket.adz or ticket.afr):
             # If no user has opened the ticket, change its state to EXPIRE
        ticket.etat = EtatTicket.EXPIRE
        ticket.save()
        
        