export interface ICourses {
  schoolName: string
  subjectName: string
  courseName: string
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
}
