export interface IPlanification {
  id: number
  materia_id: number
  fecha_inicio: string
  fecha_fin: string
  temas: ITheme[]
}

export interface ITheme {
  id: number
  id_planificacion: number
  nombre: string
  unidad: number
  fecha_inicio: string
  fecha_fin: string
  subtemas: ISubtheme[]
}

export interface ISubtheme {
  id: number
  id_tema: number
  nombre: string
  fecha_inicio: string
  fecha_fin: string
  subtemas_anuales: IAnnualSubtheme[]
}

export interface IAnnualSubtheme {
  id: number
  id_subtema: number
  nombre: string
  fecha_inicio: string
  fecha_fin: string
}
