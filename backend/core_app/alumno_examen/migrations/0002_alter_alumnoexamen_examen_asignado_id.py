# Generated by Django 5.1.4 on 2025-01-11 22:06

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('alumno_examen', '0001_initial'),
        ('examen_asignado', '0004_examenasignado_fecha'),
    ]

    operations = [
        migrations.AlterField(
            model_name='alumnoexamen',
            name='examen_asignado_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='alumno_examenes', to='examen_asignado.examenasignado'),
        ),
    ]
