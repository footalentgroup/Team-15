'use server'

import { ICourses, Month } from "@/interfaces/ICourses.interface";
import { IStudentRequest } from "@/interfaces/IRequests.interface";

const API_URL = process.env.BASE_URL;
const TOKEN = process.env.TOKEN;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function addCourseAction(prevState: any, data: ICourses) {
  console.log('estoy usando el addCourseAction', data);
  //recibe solo un nombre: la institucion
  const schoolUrl = `${API_URL}/institucion/register/`;
  //recibe el nombre del curso y el id de la institucion:institucion_id
  const courseUrl = `${API_URL}/curso/register/`;
  //recibe el nombre de la materia y el id del curso:curso_id
  const subjectUrl = `${API_URL}/materia/register/`;


  try {
    const schoolResponse = await fetch(schoolUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
      body: JSON.stringify({
        nombre: data.schoolName
      })
    });


    const schoolData = await schoolResponse.json();

    if (!schoolData) {
      throw new Error('No se pudo crear la institucion');
    }

    const courseId = schoolData.institucion.id;

    const courseResponse = await fetch(courseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
      body: JSON.stringify({
        nombre: data.courseName,
        institucion_id: courseId
      })
    });

    const courseData = await courseResponse.json();

    if (!courseData) {
      throw new Error('No se pudo crear el curso');
    }

    const subjectId = courseData.curso.id;

    const subjectResponse = await fetch(subjectUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
      body: JSON.stringify({
        nombre: data.subjectName,
        curso_id: subjectId
      })
    });

    const subjectData = await subjectResponse.json();

    if (!subjectData) {
      throw new Error('No se pudo crear la materia');
    }

    const responseData = {
      school: schoolData,
      course: courseData,
      subject: subjectData
    }
    return {
      ...prevState,
      data: responseData,
      success: true
    }
  } catch (error) {
    console.log('error', error);
    return {
      ...prevState,
      data: error,
      success: false
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function AddStudentAction(prevState: any, body: IStudentRequest) {
  console.log('addStudentAction', body);

  const studentsUrl = `${API_URL}/alumno/register/`;

  try {
    const response = await fetch(studentsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
      body: JSON.stringify(body)
    });

    const responseData = await response.json();

    return {
      ...prevState,
      data: responseData,
      success: true
    }
  } catch (error) {
    console.log('error', error);
    return {
      ...prevState,
      data: error,
      success: false
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function ImportStudentsAction(formData: FormData) {
  console.log('ImportStudentsAction', formData);

  const studentsUrl = `${API_URL}/alumno/process_excel/`;

  try {
    const response = await fetch(studentsUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`
      },
      body: formData
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error('Ocurrio un error al importar estudiantes', responseData);
    }

    return {
      data: responseData,
      success: true
    }
  } catch (error) {
    console.log('error', error);
    return {
      data: error,
      success: false
    }
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