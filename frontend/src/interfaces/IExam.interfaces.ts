/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IExam {
  curso_id: number | string
  examen_asignado_id: number
  fecha: string
  nombre: string
  tipo_calificacion: 'approved' | 'numeric' | 'conceptual'
  tipo_examen: string
  calificacion?: any
  cuatrimestre?: any
}

export interface ICreateExamen {
  materia_id: number
  tema_id: number
  periodo_id: number
  titulo: string
  tipo: string
  fecha: string
  es_recuperatorio?: boolean
}
