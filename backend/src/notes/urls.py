from .views import NoteViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'api/notes', NoteViewSet, base_name='notes')
urlpatterns = router.urls

