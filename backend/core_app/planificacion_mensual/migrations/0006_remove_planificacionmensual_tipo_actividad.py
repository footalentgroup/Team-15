# Generated by Django 5.1.4 on 2025-01-14 20:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('planificacion_mensual', '0005_remove_planificacionmensual_detalles'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='planificacionmensual',
            name='tipo_actividad',
        ),
    ]
