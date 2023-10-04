
from django.contrib.auth.models import BaseUserManager
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


class UserManager(BaseUserManager):
    
    #Custom user model where the email address is the unique identifier
    #and has an is_admin field to allow access to the admin app 
    
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError(_("The email must be set"))
        if not password:
            raise ValueError(_("The password must be set"))
        email = self.normalize_email(email)

        user = self.model(email=email, **extra_fields)
        #in order to hash the password
        user.set_password(password)
        user.save()
        return user
    
    
    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_staff', True)  # Set is_staff to True for superusers
        extra_fields.setdefault('is_superuser', True)  # Set is_superuser to True for superusers
        
        if extra_fields.get('role') != "ADM":
            raise ValueError('Superuser must have role of Global Admin')
        return self.create_user(email, password, **extra_fields)