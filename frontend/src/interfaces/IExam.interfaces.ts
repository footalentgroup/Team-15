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
