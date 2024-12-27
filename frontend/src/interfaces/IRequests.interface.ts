export interface IStudentRequest {
  alumnos: IStudent[]
}

export interface IStudent {
  curso_id: number
  nombre: string
  apellido: string
}
