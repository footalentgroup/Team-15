"""
URL configuration for server project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('autenticacion.urls') ),
    path('institucion/', include('institucion.urls') ),
    path('curso/', include('curso.urls') ),
    path('materia/', include('materia.urls') ),
    path('alumno/', include('alumno.urls') ),
    path('planificacion/', include('planificacion.urls') ),
    path('tema/', include('tema.urls') ),
    path('subtema/', include('subtema.urls') ),
    path('subtema_anual/', include('subtema_anual.urls') ),
    path('sistema_notas/', include('sistema_notas.urls') ),
    path('tipo_nota_numerico/', include('tipo_nota_numerico.urls') ),
    path('planificacion_mensual/', include('planificacion_mensual.urls') ),
    path('tarea_asignada/', include('tarea_asignada.urls') ),
    path('alumno_tarea/', include('alumno_tarea.urls') ),
    path('examen_asignado/', include('examen_asignado.urls') ),
    path('alumno_examen/', include('alumno_examen.urls') ),
    path('alumno_actitudinal/', include('alumno_actitudinal.urls') ),
    path('alumno_asistencia/', include('alumno_asistencia.urls') ),
    path('planificacion_diaria/', include('planificacion_diaria.urls') ),
]

