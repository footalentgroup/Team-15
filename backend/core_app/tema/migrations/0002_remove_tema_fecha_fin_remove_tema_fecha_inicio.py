# Generated by Django 5.1.4 on 2025-01-04 00:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tema', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tema',
            name='fecha_fin',
        ),
        migrations.RemoveField(
            model_name='tema',
            name='fecha_inicio',
        ),
    ]
