# Generated by Django 5.1.4 on 2025-01-09 18:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tipo_nota_conceptual', '0008_rename_tipo_tiponotaconceptual_tipo_dato'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tiponotaconceptual',
            name='tipo_dato',
        ),
        migrations.AddField(
            model_name='tiponotaconceptual',
            name='tipo',
            field=models.CharField(default='actitudinal', max_length=50),
        ),
    ]
