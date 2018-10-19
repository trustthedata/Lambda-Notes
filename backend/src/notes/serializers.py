from rest_framework import serializers
from notes.models import PersonalNote
from django.contrib.auth.models import User, Group

class PersonalNoteSerializer(serializers.ModelSerializer):
  class Meta:
    model = PersonalNote
    fields = ('__all__')

  def create(self, validated_data):
      user = self.context['request'].user
      note = PersonalNote.objects.create(user=user, **validated_data)
      return note

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', "first_name", "last_name")

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ("name", )