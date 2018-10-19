from .views import PersonalNoteViewSet, UserViewSet, GroupViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'api/notes', PersonalNoteViewSet, base_name='notes')
router.register(r'api/users', UserViewSet, base_name='users')
router.register(r'api/groups', GroupViewSet, base_name='groups')
urlpatterns = router.urls

