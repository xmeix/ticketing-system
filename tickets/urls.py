from django.urls import path
from . import views

urlpatterns = [
    path('create/',views.create_ticket,name='create-ticket'),   #url: api/tickets/create/
    path('update/<int:id>/',views.update_ticket,name='update-ticket'),    #url: api/tickets/update/<int:id>/
    path('<int:id>/',views.get_ticket,name='ticket'),       #url: api/tickets/<int:id>/
    path('',views.get_all_tickets,name='tickets'),      #url: api/tickets/
]
