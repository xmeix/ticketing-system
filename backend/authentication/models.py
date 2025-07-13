from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin,BaseUserManager
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from .managers import UserManager
import uuid

  
class UserRole(models.TextChoices):
        ADZ = _('ADZ')
        AFR = _("AFR")
        ADM = _("ADM")
        

# Create your models here.
class User(AbstractBaseUser, PermissionsMixin):
        
    uid = models.UUIDField(unique=True, editable=False, default=uuid.uuid4, verbose_name='Public identifier')    
    first_name = models.CharField(max_length=30, blank=False, null=False)
    last_name = models.CharField(max_length=50, blank=False, null=False)
    email = models.EmailField(_("email address"), unique=True,blank=False, null=False)
    role = models.CharField(max_length=10, choices=UserRole.choices , default=UserRole.ADZ)
    date_joined = models.DateTimeField(default=timezone.now)
    
    
    is_staff = models.BooleanField(_('staff status'), default=False,
        help_text=_('Designates whether the user can log into this admin site.'))
    is_superuser = models.BooleanField(_('superuser status'), default=False,
        help_text=_('Designates whether the user has all permissions without explicitly assigning them.'))

    
    
    USERNAME_FIELD = "email"
    EMAIL_FIELD = 'email'   #useful when get_email_field_name() on User
    REQUIRED_FIELDS = ["first_name", "last_name"]

    objects = UserManager()

    def __str__(self):
        return self.email