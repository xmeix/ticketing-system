from django.contrib import admin
from .models import Ticket
# Register your models here.

# class TicketAdmin(admin.ModelAdmin):
#     list = ('objet','description','etat','adz','afr','updatedAt','createdAt')
    
#     admin.site.register(Ticket)


admin.site.register(Ticket)