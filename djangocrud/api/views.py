from django.shortcuts import render
from rest_framework import viewsets, routers
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Movie
from .serializers import MovieSerializer, MovieMiniSerializer



class MovieViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Movie.objects.all().order_by("title")
    serializer_class = MovieSerializer

    def list(self, request, *args, **kwargs):
        movies = Movie.objects.all().order_by("title")
        serializer = MovieMiniSerializer(movies, many = True)
        return Response(serializer.data)