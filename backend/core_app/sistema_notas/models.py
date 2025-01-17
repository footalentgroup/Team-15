from django.db import models
from asistencia.models import Asistencia
from curso.models import Curso
from tipo_nota_binario.models import TipoNotaBinario
from tipo_nota_numerico.models import TipoNotaNumerico

class SistemaNotas(models.Model):
    curso = models.OneToOneField(Curso, on_delete=models.CASCADE, related_name='sistema_notas')
    porcentaje_examenes = models.IntegerField()
    porcentaje_tareas = models.IntegerField()
    porcentaje_actitudinal = models.IntegerField()
    # se puede mejorar esto de abajo | Esto es de tarea
    tipo_nota_tarea = models.CharField(max_length=50)
    tipo_nota_numerico = models.ForeignKey(TipoNotaNumerico, on_delete=models.CASCADE, related_name='sistema_notas_numerico', null=True, blank=True)
    tipo_nota_binario = models.ForeignKey(TipoNotaBinario, on_delete=models.CASCADE, related_name='sistema_notas_binario', null=True, blank=True)
    #
    asistencia = models.OneToOneField(Asistencia, on_delete=models.CASCADE, related_name='asistencia', null=True, blank=True)
    falta_justificada = models.BooleanField(default=False)
    # se puede mejorar esto de abajo
    tipo_nota_examen = models.CharField(max_length=50, null=True, blank=True)
    examen_tipo_nota_numerico = models.ForeignKey(TipoNotaNumerico, on_delete=models.CASCADE, related_name='sistema_notas_examen_numerico', null=True, blank=True)
    examen_tipo_nota_binario = models.ForeignKey(TipoNotaBinario, on_delete=models.CASCADE, related_name='sistema_notas_examen_binario', null=True, blank=True)
    #