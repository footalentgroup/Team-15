import { ITheme } from './IPlanification.interfaces'

export interface ICourses {
  schoolName: string
  subjectName: string
  courseName: string
  color?: string
  courseId?: number
  subjectId?: number
}

export interface Month {
  id: number
  month: string
  color: string
  content: Content[]
}

export interface Content {
  unidad?: number
  tema: string
  subtemas: string[]
  quantity?: number
}

export interface School {
  id: number
  nombre: string
  docente: number
}

export interface Course {
  id: number
  nombre: string
  institucion_id: number
}

export interface Subject {
  id: number
  nombre: string
  curso_id: number
}

export interface Period {
  [key: string]: string
}

export interface PeriodFromAction {
  duracion: string
  periodos: PeriodTime[]
}

export interface PeriodTime {
  fecha_inicio: string
  fecha_cierre: string
}

export interface PLanificationMonth {
  id: number
  month: string
  color: string
  content: ITheme[]
}
