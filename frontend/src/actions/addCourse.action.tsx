'use server'

import { Content, ICourses, Period, PeriodFromAction } from "@/interfaces/ICourses.interface";
import { IStudentRequest } from "@/interfaces/IRequests.interface";
import { cookies } from "next/headers";
import { refreshToken } from "./authActions";

const API_URL = process.env.BASE_URL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function addCourseAction(prevState: any, body: { data: ICourses, period: Period }) {
  const { data, period } = body;

  const schoolUrl = `${API_URL}/institucion/register/`;

  const courseUrl = `${API_URL}/curso/register/`;

  const subjectUrl = `${API_URL}/materia/register/`;

  const cookieStore = cookies();
  const user = (await cookieStore).get("user");
  let TOKEN = ''

  if (user) {
    TOKEN = JSON.parse(user.value).access_token;
  }

  if (!TOKEN) {
    refreshToken();
  }

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

    const newPeriod: PeriodFromAction = {
      duracion: period.period,
      periodos: [
        {
          fecha_inicio: period['0 input start'],
          fecha_cierre: period['0 input end']
        },
        {
          fecha_inicio: period['1 input start'],
          fecha_cierre: period['1 input end']
        },
      ]
    };

    if (newPeriod.duracion === 'trimestral') {
      newPeriod.periodos.push({
        fecha_inicio: period['2 input start'],
        fecha_cierre: period['2 input end']
      });
    }

    if (schoolData.detail) {
      throw new Error(schoolData.detail);
    }

    const institucionId = schoolData.institucion.id;

    const courseResponse = await fetch(courseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
      body: JSON.stringify({
        nombre: data.courseName,
        institucion_id: institucionId,
        duracion: newPeriod.duracion,
        periodos: newPeriod.periodos
      })
    });

    const courseData = await courseResponse.json();

    if (courseData.detail) {
      throw new Error(courseData.detail);
    }

    const subjectId = courseData.id;

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

    if (subjectData.detail) {
      throw new Error(subjectData.detail);
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
    return {
      ...prevState,
      data: error,
      success: false,
      error: true
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function AddStudentAction(prevState: any, body: IStudentRequest) {

  const studentsUrl = `${API_URL}/alumno/list-register/`;

  const cookieStore = cookies();
  const user = (await cookieStore).get("user");
  let TOKEN = ''

  if (user) {
    TOKEN = JSON.parse(user.value).access_token;
  }

  if (!TOKEN) {
    refreshToken();
  }

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
    return {
      ...prevState,
      data: error,
      success: false
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function ImportStudentsAction(formData: FormData) {

  const cookieStore = cookies();
  const user = (await cookieStore).get("user");
  let TOKEN = ''

  if (user) {
    TOKEN = JSON.parse(user.value).access_token;
  }

  if (!TOKEN) {
    refreshToken();
  }

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
  } catch (error) {;
    return {
      data: error,
      success: false
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function AddContentAction(prevState: any, list: Content[]) {

  return {
    ...prevState,
    data: list,
    success: true
  }
}

export async function setPeriodAction(period: Period) {
  const cookieStore = cookies();

  const newPeriod: PeriodFromAction = {
    duracion: period.period,
    periodos: [
      {
        fecha_inicio: period['0 input start'],
        fecha_cierre: period['0 input end']
      },
      {
        fecha_inicio: period['1 input start'],
        fecha_cierre: period['1 input end']
      },
    ]
  };

  if (newPeriod.duracion === 'trimestral' || newPeriod.duracion === 'cuatrimestral') {
    newPeriod.periodos.push({
      fecha_inicio: period['2 input start'],
      fecha_cierre: period['2 input end']
    });
  }

  (await cookieStore).set('period', JSON.stringify(newPeriod));

  return {
    data: newPeriod,
    success: true
  }
}

export async function getPeriodAction() {
  const cookieStore = cookies();
  const period = (await cookieStore).get('period');

  return {
    data: period ? JSON.parse(period.value) : null,
    success: true
  }
}

//importa planificacino en formato word
export async function ImportPlanificationAction(formData: FormData) {

  const cookieStore = cookies();
  const user = (await cookieStore).get("user");
  let TOKEN = ''

  if (user) {
    TOKEN = JSON.parse(user.value).access_token;
  }

  if (!TOKEN) {
    refreshToken();
  }

  const planificationUrl = `${API_URL}/planificacion/process_word/`;

  try {
    const response = await fetch(planificationUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`
      },
      body: formData
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error('Ocurrio un error al importar la planificación', responseData);
    }

    responseData.temas = responseData.temas.map((tema: Content, index: number) => {
      return {
        ...tema,
        unidad: index + 1
      }
    });

    return {
      data: responseData.temas,
      success: true
    }
  } catch (error) {
    return {
      data: error,
      success: false
    }
  }
}

//importa planificacion en formato pdf
export async function ImportPlanificationPdfAction(formData: FormData) {

  const cookieStore = cookies();
  const user = (await cookieStore).get("user");
  let TOKEN = ''

  if (user) {
    TOKEN = JSON.parse(user.value).access_token;
  }

  if (!TOKEN) {
    refreshToken();
  }

  const planificationUrl = `${API_URL}/planificacion/extract-pdf-text/`;

  try {
    const response = await fetch(planificationUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`
      },
      body: formData
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error('Ocurrio un error al importar la planificación', responseData);
    }

    responseData.temas = responseData.temas.map((tema: Content, index: number) => {
      return {
        ...tema,
        unidad: index + 1
      }
    });

    return {
      data: responseData.temas,
      success: true
    }
  } catch (error) {
    return {
      data: error,
      success: false
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function AddPlanificationAction(prevState: any, data: { subjectId: number | null, list: Content[] }) {

  const cookieStore = cookies();
  const user = (await cookieStore).get("user");
  let TOKEN = ''

  if (user) {
    TOKEN = JSON.parse(user.value).access_token;
  }

  if (!TOKEN) {
    refreshToken();
  }

  const planificationUrl = `${API_URL}/planificacion/register/`;

  try {
    const response = await fetch(planificationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
      body: JSON.stringify({
        materia_id: data.subjectId ?? 7,
        temas: data.list
      })
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error('Ocurrio un error al importar la planificación', responseData);
    }

    return {
      ...prevState,
      data: responseData,
      success: true
    }
  } catch (error) {
    return {
      ...prevState,
      data: error,
      success: false
    }
  }
}

export async function setCurrentCourseCookieAction(course: ICourses) {
  const cookieStore = cookies();

  (await cookieStore).delete('currentCourse');

  (await cookieStore).set('currentCourse', JSON.stringify(course));

  return {
    data: course,
    success: true
  }
}