# Generated by Django 5.1.4 on 2025-01-08 04:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tipo_nota_numerico', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tiponotanumerico',
            name='sistema_notas',
        ),
    ]
