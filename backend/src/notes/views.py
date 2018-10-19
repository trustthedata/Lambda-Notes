from rest_framework import viewsets, permissions
from .models import PersonalNote
from .serializers import PersonalNoteSerializer, UserSerializer, GroupSerializer
from django.contrib.auth.models import User, Group
# from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope

class PersonalNoteViewSet(viewsets.ModelViewSet):
    queryset = PersonalNote.objects.none()
    serializer_class = PersonalNoteSerializer

    def get_queryset(self):
        user = self.request.user

        if user.is_anonymous:
            return PersonalNote.objects.none()

        else:
            return PersonalNote.objects.filter(user=user)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    required_scopes = ['groups']
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAdminUser]