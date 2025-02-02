# Generated by Django 5.1.4 on 2025-01-11 05:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('alumno', '0009_rename_curso_id_alumno_curso'),
        ('examen_asignado', '0004_examenasignado_fecha'),
    ]

    operations = [
        migrations.CreateModel(
            name='AlumnoExamen',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateField()),
                ('calificacion', models.FloatField(null=True)),
                ('alumno_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='alumno_examenes', to='alumno.alumno')),
                ('examen_asignado_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='examen_asignado.examenasignado')),
            ],
        ),
    ]
