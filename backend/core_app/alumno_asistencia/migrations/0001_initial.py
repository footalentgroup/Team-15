# Generated by Django 5.1.4 on 2025-01-11 18:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('alumno', '0009_rename_curso_id_alumno_curso'),
        ('curso', '0003_alter_curso_duracion'),
    ]

    operations = [
        migrations.CreateModel(
            name='AlumnoAsistencia',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre_valoracion', models.CharField(max_length=50)),
                ('valoracion', models.IntegerField()),
                ('fecha', models.DateField()),
                ('alumno_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='alumno_asistencia', to='alumno.alumno')),
                ('curso_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='alumno_asistencia', to='curso.curso')),
            ],
        ),
    ]
