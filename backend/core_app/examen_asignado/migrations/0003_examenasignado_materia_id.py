# Generated by Django 5.1.4 on 2025-01-11 04:21

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('examen_asignado', '0002_examenasignado_periodo_id'),
        ('materia', '0003_remove_materia_tareas_asignadas'),
    ]

    operations = [
        migrations.AddField(
            model_name='examenasignado',
            name='materia_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='examenes_asignados', to='materia.materia'),
        ),
    ]