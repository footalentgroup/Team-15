# Generated by Django 5.1.4 on 2025-01-08 04:18

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('sistema_notas', '0001_initial'),
        ('tipo_nota_numerico', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='sistemanotas',
            name='tipo_nota_numerico_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='sistema_notas_numerico', to='tipo_nota_numerico.tiponotanumerico'),
        ),
    ]
