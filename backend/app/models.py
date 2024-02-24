from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

# Create your models here.
class Dashboard(models.Model):
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=200)
    likes = models.CharField(max_length=5)
    shares = models.CharField(max_length=5)
    comments = models.CharField(max_length=5)

class AppUserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('Email is required')
        if not password:
            raise ValueError('Password is required')
        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)
        user.save()
        return user

    def create_super_user(self,email,password=None):
        if not email:
            raise ValueError('Email is required')
        if not password:
            raise ValueError('Password is required')
        user = self.create_user(email,password)
        user.is_superuser = True
        user.save()
        return user

class AppUser(AbstractBaseUser):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=50)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    objects = AppUserManager()
    def _str_(self):
        return self.username


