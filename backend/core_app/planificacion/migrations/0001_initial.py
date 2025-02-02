# Generated by Django 5.1.4 on 2025-01-03 03:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('materia', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Planificacion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre_unidad', models.CharField(max_length=100)),
                ('nombre_tema', models.CharField(max_length=255)),
                ('fecha_inicio', models.CharField(max_length=10)),
                ('fecha_fin', models.CharField(max_length=10)),
                ('materia', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='planificaciones', to='materia.materia')),
            ],
        ),
    ]
