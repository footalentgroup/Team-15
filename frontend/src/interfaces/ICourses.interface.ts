export interface ICourses {
  schoolName: string
  subjectName: string
  courseName: string
  color?: string
}

export interface Month {
  id: number
  month: string
  color: string
  content: Content[]
}

export interface Content {
  id: number
  text: string
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
