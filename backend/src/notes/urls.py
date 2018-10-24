from django.urls import path
from .views import PersonalNoteViewSet, UserList, current_user, GroupViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('notes', PersonalNoteViewSet, base_name='notes')
# router.register('users', UserViewSet, base_name='users')
router.register('groups', GroupViewSet, base_name='groups')

urlpatterns = [
  path('current_user/', current_user),
  path('users/', UserList.as_view())
]

urlpatterns += router.urls
