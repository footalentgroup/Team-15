# Generated by Django 5.1.4 on 2025-01-09 16:13

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sistema_notas', '0007_remove_sistemanotas_tipo_nota_conceptual'),
        ('tipo_nota_numerico', '0002_remove_tiponotanumerico_sistema_notas'),
    ]

    operations = [
        migrations.RenameField(
            model_name='sistemanotas',
            old_name='tipo_nota',
            new_name='tipo_nota_tarea',
        ),
        migrations.AddField(
            model_name='sistemanotas',
            name='tipo_nota_examen',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='tipo_nota_numerico.tiponotanumerico'),
        ),
    ]
