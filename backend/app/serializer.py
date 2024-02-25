from rest_framework import serializers
from .models import * 
from django.contrib.auth import get_user_model, authenticate

userModel = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = userModel
        fields = '__all__'
    def create(self, clean_data):
        userObj = userModel.objects.create_user(email=clean_data['email'],username=clean_data['username'],password=clean_data['password'])
        userObj.save()
        return userObj

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def checkUser(self, clean_data):
        print("Email : ",clean_data['email'])
        print("Password", clean_data['password'])
        user = authenticate(email=clean_data['email'], password=clean_data['password'])
        print(f'Users : {user}')
        if not user:
            raise ValueError('User Not Found!')
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = userModel
        fields = ['email','username']

class DashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dashboard
        fields = ['title','description','likes','shares','comments']
        