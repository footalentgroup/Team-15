export interface IPlanification {
  id: number
  materia_id: number
  fecha_inicio: string
  fecha_fin: string
  temas: ITheme[]
  planificacion_mensual: IMonthPlanification[]
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
  tema?: ITheme
}

export interface IAnnualSubtheme {
  id: number
  id_subtema: number
  nombre: string
  fecha_inicio: string
  fecha_fin: string
}

export interface IMonthPlanification {
  id?: number
  planificacion_id: number
  subtema_id: number
  tipo_actividad?: string
  fecha: string
  subtema?: ISubtheme
  theme?: ITheme
  detalles?: string
}

//para reemplazar el event por default de react-big-calendar
export interface CalendarEvent {
  id?: string | number
  allDay?: boolean | undefined
  title?: React.ReactNode | undefined
  start?: Date | undefined
  end?: Date | undefined
  resource?: IMonthPlanification | undefined
  schoolName?: string
  subjectName?: string
}
