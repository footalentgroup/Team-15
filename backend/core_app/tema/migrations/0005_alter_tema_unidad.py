# Generated by Django 5.1.4 on 2025-01-07 00:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tema', '0004_tema_unidad'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tema',
            name='unidad',
            field=models.IntegerField(),
        ),
    ]
