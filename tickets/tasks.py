from django.utils import timezone
from .models import Ticket, EtatTicket
from server.celery import app

@app.task
def check_ticket_deadlines():
    # Retrieve all open tickets with a deadline that has passed
    # print("hello world")
    expired_tickets = Ticket.objects.filter(etat__not=EtatTicket.EXPIRE, deadline__lt=timezone.now())
    print(expired_tickets)
    for ticket in expired_tickets:
        # Check if the ticket has been opened by a user
        # if not (ticket.adz or ticket.afr):
        #     # If no user has opened the ticket, change its state to EXPIRE
        ticket.etat = EtatTicket.EXPIRE
        ticket.save()
        
        