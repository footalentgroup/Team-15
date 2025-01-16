export interface IHomework {
    tarea_asignada_id: number
    fecha: string
    nombre: string
    tipo_calificacion: 'approved' | 'numeric' | 'conceptual'
    tipo_tarea: string
    calificacion?: any
    cuatrimestre?: any
}
