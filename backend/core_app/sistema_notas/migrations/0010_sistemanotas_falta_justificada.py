# Generated by Django 5.1.4 on 2025-01-09 22:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sistema_notas', '0009_sistemanotas_asistencia'),
    ]

    operations = [
        migrations.AddField(
            model_name='sistemanotas',
            name='falta_justificada',
            field=models.IntegerField(default=False),
        ),
    ]
