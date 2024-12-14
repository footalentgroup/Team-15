# filepath: /c:/Users/crist/Desktop/Foo Talent Group/Team-15/backend/core_app/curso/serializers.py
from rest_framework import serializers
from .models import Curso

class CursoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Curso
        fields = ['id', 'institucion', 'nombre']


class UpdateCursoSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=True)
    nombre = serializers.CharField(required=True)

    class Meta:
        model = Curso
        fields = ['id', 'nombre']

