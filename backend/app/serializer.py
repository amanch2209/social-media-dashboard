from rest_framework import serializers
from .models import * 
from django.contrib.auth import get_user_model, authenticate

userModel = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = userModel
        fields = '_all_'
    def create(self, clean_data):
        userObj = userModel.objects.create_user(email=clean_data['email'], password=clean_data['password'])
        userObj.username = clean_data['username']
        userObj.save()
        return userObj

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def checkUser(self, clean_data):
        user = authenticate(username=clean_data['email'], password=clean_data['password'])
        if not user:
            raise ValidationError('User Not Found!')
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = userModel
        fields = ['email','username']

class DashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dashboard
        fields = ['title','description','likes','shares','comments']
        