# Generated by Django 5.1.4 on 2025-01-09 18:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tipo_nota_conceptual', '0005_alter_tiponotaconceptual_tipo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tiponotaconceptual',
            name='tipo',
            field=models.CharField(default='actitudinal', max_length=50),
        ),
    ]
