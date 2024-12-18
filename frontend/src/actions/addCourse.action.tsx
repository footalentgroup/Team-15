'use server'

import { Month } from "@/interfaces/ICourses.interface";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function addCourseAction(prevState: any, formData: FormData) {
  console.log('addCourseAction', formData);

  return {
    ...prevState,
    data: formData
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function AddStudentAction(prevState: any, list: string[]) {
  console.log('addStudentAction', list);

  return {
    ...prevState,
    data: list
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function AddContentAction(prevState: any, list: string[]) {
  console.log('AddContentAction', list);

  return {
    ...prevState,
    data: list,
    success: true
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function AddPlanificationAction(list: Month[]) {
  console.log('AddPlanificationAction', list);

  return {
    data: list,
    success: true
  }
}