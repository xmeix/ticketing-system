from django.db import models
from django.utils.translation import gettext_lazy as _
# from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager, User
from authentication.models import User
# Create your models here.
class EtatTicket(models.TextChoices):
        OUVERT = _('OUVERT')
        ENCOURS = _("ENCOURS")
        RESOLU = _("RESOLU")
        EXPIRE = _("EXPIRE")
class Ticket(models.Model):
    
        
    objet= models.CharField(max_length=100)
    description= models.TextField()
    etat= models.CharField(max_length=10, choices=EtatTicket.choices , default=EtatTicket.OUVERT)
    adz = models.ForeignKey(User, on_delete=models.SET_NULL,null=True,blank=True,related_name='assis_dz')       
    afr = models.ForeignKey(User, on_delete=models.SET_NULL,null=True,blank=True,related_name='assis_fr')   
    updatedAt = models.DateTimeField(auto_now=True) #updated at
    createdAt =models.DateTimeField(auto_now_add=True) #created at
    deadline = models.DateTimeField(null=True, blank=True)  # Define the deadline field as per your needs
    piecesjointes = models.FileField(upload_to='ticket_attachments/', blank=True, null=True)

    REQUIRED_FIELDS = ["objet", "description"]

    
    def __str__(self):
        return self.objet


class TicketReponse(models.Model):
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE, related_name='reponses')
    objet = models.CharField(max_length=100)
    description = models.TextField()
    piecesjointes = models.FileField(upload_to='ticket_attachments/', blank=True, null=True)
    createdAt =models.DateTimeField(auto_now_add=True) #created at

    def __str__(self):
        return self.objet