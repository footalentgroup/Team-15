/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IExam {
  alumno_id: number
  examen_asignado_id: number
  fecha: string
  nombre: string
  tipo_calificacion: 'approved' | 'numeric' | 'conceptual'
  tipo_examen: string
  calificacion?: any
  cuatrimestre?: any
}
