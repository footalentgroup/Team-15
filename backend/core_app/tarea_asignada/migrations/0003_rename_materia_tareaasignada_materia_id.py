# Generated by Django 5.1.4 on 2025-01-10 21:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tarea_asignada', '0002_tareaasignada_materia'),
    ]

    operations = [
        migrations.RenameField(
            model_name='tareaasignada',
            old_name='materia',
            new_name='materia_id',
        ),
    ]