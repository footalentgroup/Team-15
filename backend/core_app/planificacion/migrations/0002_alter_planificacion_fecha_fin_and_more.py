# Generated by Django 5.1.4 on 2025-01-03 23:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('planificacion', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='planificacion',
            name='fecha_fin',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='planificacion',
            name='fecha_inicio',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ]
