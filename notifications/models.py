from django.db import models
from authentication.models import User
# Create your models here.

class Notification(models.Model):
    content = models.TextField()
    createdAt = models.DateTimeField(auto_now_add=True)
    destinataire = models.ForeignKey(User, on_delete=models.CASCADE,null=True,blank=True,related_name='notif_to')   
    

    