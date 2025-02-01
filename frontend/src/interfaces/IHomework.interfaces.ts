/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IHomework {
  curso_id: number | string
  tarea_asignada_id: number
  fecha: string
  nombre: string
  tipo_calificacion: 'approved' | 'numeric' | 'conceptual'
  tipo_tarea: string
  calificacion?: any
  cuatrimestre?: any
}
export interface ICreateHomework {
  materia_id: number
  subtema_id: number
  periodo_id: number
  titulo: string
  tipo: string
  fecha: string
}
