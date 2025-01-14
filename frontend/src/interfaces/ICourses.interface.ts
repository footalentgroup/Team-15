import {
  IMonthPlanification,
  IPlanification,
} from './IPlanification.interfaces'

export interface ICourses {
  schoolName: string
  subjectName: string
  courseName: string
  color?: string
  courseId?: number
  subjectId?: number
  periodName?: string
  periods?: PeriodTime[]
  havePlanification?: boolean
  planification?: IPlanification
}

export interface Month {
  id: number
  month: string
  color: string
  content: Content[]
  date: string
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
  institucion_id: number
  nombre: string
  duracion: string
  periodos: PeriodTime[]
  materias: Subject[]
}

export interface Subject {
  id: number
  nombre: string
  curso_id: number
  planificacion: IPlanification
}

export interface Period {
  [key: string]: string
}

export interface PeriodFromAction {
  duracion: string
  periodos: PeriodTime[]
}

export interface PeriodTime {
  id?: number
  curso_id?: number
  fecha_inicio: string
  fecha_cierre: string
}

export interface PLanificationMonth {
  id: number
  month: string
  color: string
  content: IMonthPlanification[]
  date: string
}
