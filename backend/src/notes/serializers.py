from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_jwt.settings import api_settings
from notes.models import PersonalNote
from django.contrib.auth.models import User, Group

class PersonalNoteSerializer(serializers.ModelSerializer):
  class Meta:
    model = PersonalNote
    fields = ('__all__')

  def create(self, validated_data):
    #   user = self.context['request'].user
      note = PersonalNote.objects.create( **validated_data)
      return note

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ( 'username',  )

class UserSerializerWithToken(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    username = serializers.CharField(
            max_length=32, 
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    password = serializers.CharField(min_length=8, write_only=True)
    token = serializers.SerializerMethodField()
   
    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'],
             validated_data['password'])
        return user

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'token')

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ("name", )