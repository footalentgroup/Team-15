# Generated by Django 5.1.4 on 2025-01-11 18:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('alumno_asistencia', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='alumnoasistencia',
            old_name='curso_id',
            new_name='curso',
        ),
    ]
