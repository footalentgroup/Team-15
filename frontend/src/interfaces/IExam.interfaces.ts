export interface IExam {
    examen_asignado_id: number
    fecha: string
    nombre: string
    tipo_calificacion: 'approved' | 'numeric' | 'conceptual'
    tipo_examen: string
    calificacion?: any
    cuatrimestre?: any
}
