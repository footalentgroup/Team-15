'use server'

import { Content, ICourses, Month, Period, PeriodFromAction } from "@/interfaces/ICourses.interface";
import { IStudentRequest } from "@/interfaces/IRequests.interface";
import { cookies } from "next/headers";
import { refreshToken } from "./authActions";

const API_URL = process.env.BASE_URL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function addCourseAction(prevState: any, body: { data: ICourses, period: Period }) {
  console.log('estoy usando el addCourseAction', body);
  const { data, period } = body;
  //recibe solo un nombre: la institucion
  const schoolUrl = `${API_URL}/institucion/register/`;
  //recibe el nombre del curso y el id de la institucion:institucion_id
  const courseUrl = `${API_URL}/curso/register/`;
  //recibe el nombre de la materia y el id del curso:curso_id
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

  console.log('TOKEN', TOKEN);

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
    console.log('schoolData', schoolData);

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
    console.log('responseData', responseData);
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
      success: false,
      error: true
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function AddStudentAction(prevState: any, body: IStudentRequest) {
  console.log('addStudentAction', body);

  const studentsUrl = `${API_URL}/alumno/register/`;

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
    console.log('responseData', responseData);

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
export async function AddContentAction(prevState: any, list: Content[]) {
  console.log('AddContentAction', list);

  return {
    ...prevState,
    data: list,
    success: true
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function AddToCalendarAction(list: Month[]) {
  console.log('Add to Calendar Action', list);

  return {
    data: list,
    success: true
  }
}

export async function setPeriodAction(period: Period) {
  const cookieStore = cookies();
  console.log('setPeriodAction', period);

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
  console.log('newPeriod', newPeriod);

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

export async function ImportPlanificationAction(formData: FormData) {
  console.log('import planification', formData);

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
    console.log('responseData', responseData);

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
    console.log('error', error);
    return {
      data: error,
      success: false
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function AddPlanificationAction(prevState: any, data: { subjectId: number | null, list: Content[] }) {
  console.log('AddPlanification', data);

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
    console.log('responseData', responseData);

    if (!response.ok) {
      throw new Error('Ocurrio un error al importar la planificación', responseData);
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