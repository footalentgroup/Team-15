# Generated by Django 5.1.4 on 2025-01-08 07:16

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sistema_notas', '0007_remove_sistemanotas_tipo_nota_conceptual'),
        ('tipo_nota_conceptual', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='tiponotaconceptual',
            name='sistema_notas',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='tipo_nota_conceptual', to='sistema_notas.sistemanotas'),
        ),
    ]