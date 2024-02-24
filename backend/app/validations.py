from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

userModel = get_user_model()

def custom_validation(data):
    email = data['email']
    username = data['username']
    password = data['password']

    print(email)

    if not email:
        raise ValidationError('Invalid Email')
    if not password or len(password)<8:
        raise ValidationError('Choose Another Password with min 8 characters')
    if not username:
        raise ValidationError('Choose Another Username')
    return data

def validate_email(data):
    email = data['email'].strip()
    if not email:
        raise ValidationError('Email is required')
    return True

def validate_username(data):
    username = data['username'].strip()
    if not username:
        raise ValidationError('Username is required')
    return True

def validate_password(data):
    password = data['password'].strip()
    if not password:
        raise ValidationError('Password is required')
    return True
