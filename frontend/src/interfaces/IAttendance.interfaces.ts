export interface IAttendance {
    id: number
    curso_id:  number | string
    nombre_valoracion: string
    fecha: string
    falta_justificada: boolean
    mes: number
}
