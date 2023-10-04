from django.urls import path
from . import views

urlpatterns = [
    path('create/',views.create_ticket,name='create-ticket'),   #url: api/tickets/create/
    path('update/<int:id>/',views.update_ticket,name='update-ticket'),    #url: api/tickets/update/<int:id>/
    # path('<int:id>/',views.get_ticket,name='ticket'),       #url: api/tickets/<int:id>/
    path('reply/<int:id>/', views.create_reply_to_ticket, name='create-reply-to-ticket'),
    path('replies/', views.get_all_reponses, name='replies-to-tickets'),
    path('',views.get_all_tickets,name='tickets'),      #url: api/tickets/
]
