# Generated by Django 5.1.4 on 2025-01-10 23:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('alumno', '0001_initial'),
        ('tarea_asignada', '0003_rename_materia_tareaasignada_materia_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='AlumnoTarea',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateField()),
                ('tipo_calificacion', models.CharField(max_length=50)),
                ('calificacion_binaria', models.BooleanField()),
                ('calificacion_numerica', models.FloatField()),
                ('calificacion_conceptual', models.CharField(max_length=60)),
                ('alumno_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='alumno.alumno')),
                ('tarea_asignada_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tarea_asignada.tareaasignada')),
            ],
        ),
    ]