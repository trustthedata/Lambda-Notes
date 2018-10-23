from rest_framework import viewsets, permissions, status
from .models import PersonalNote
from .serializers import PersonalNoteSerializer, UserSerializer, UserSerializerWithToken, GroupSerializer
from django.contrib.auth.models import User, Group
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

class PersonalNoteViewSet(viewsets.ModelViewSet):
    queryset = PersonalNote.objects.none()
    serializer_class = PersonalNoteSerializer

    def get_queryset(self):
        user = self.request.user

        if user.is_anonymous:
            return PersonalNote.objects.none()

        else:
            return PersonalNote.objects.filter(user=user)

@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

class UserList(APIView):
    '''
    Creates the user 
    '''
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    required_scopes = ['groups']
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAdminUser]