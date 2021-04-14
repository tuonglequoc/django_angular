from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views

from api import views


router = routers.DefaultRouter()
router.register(r'movies', views.MovieViewSet)

urlpatterns = [
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
]
