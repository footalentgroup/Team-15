'use server'

import { Course, ICourses, School, Subject } from "@/interfaces/ICourses.interface";
import { getColorByPosition } from "@/utils/getRandomColor";
import { cookies } from "next/headers";
import { refreshToken } from "./authActions";


const API_URL = process.env.BASE_URL;

export async function getCourses() {

  const schoolUrl = `${API_URL}/institucion/list/`;

  const courseUrl = `${API_URL}/curso/list/`;

  const subjectUrl = `${API_URL}/materia/list/`;

  const cookieStore = cookies();
  const user = (await cookieStore).get("user");
  let professorId = 0;
  if (user) {
    professorId = JSON.parse(user.value).user.id;
  }
  let TOKEN = ''

  if (user) {
    TOKEN = JSON.parse(user.value).access_token;
  }

  refreshToken();

  try {
    const schoolResponse = await fetch(schoolUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
    });


    const schoolData = await schoolResponse.json();

    if (!schoolData) {
      throw new Error('No se pudo obtener la institucion');
    }

    const professorSchools = schoolData.filter((school: School) => school.docente === Number(professorId));

    const courseResponse = await fetch(courseUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
    });

    const courseData = await courseResponse.json();

    if (!courseData) {
      throw new Error('No se pudo crear el curso');
    }

    const professorCourses = professorSchools.map((school: School) => {
      return courseData.filter((course: Course) => course.institucion_id === school.id);
    }).flat();


    const subjectResponse = await fetch(subjectUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },

    });

    const subjectData = await subjectResponse.json();

    if (!subjectData) {
      throw new Error('No se pudo crear la materia');
    }

    const professorSubjects = professorCourses.map((course: Course) => {
      return subjectData.filter((subject: Subject) => subject.curso_id === course.id);
    }).flat();

    const result: ICourses[] = [];

    professorSchools.forEach((school: School) => {
      const courses = professorCourses.filter((course: Course) => course.institucion_id === school.id);
      courses.forEach((course: Course) => {
        const subjects = professorSubjects.filter((subject: Subject) => subject.curso_id === course.id);
        subjects.forEach((subject: Subject) => {
          result.push({
            schoolName: school.nombre,
            courseName: course.nombre,
            subjectName: subject.nombre,
            courseId: course.id,
            subjectId: subject.id,
            periodName: course.duracion,
            periods: course.periodos,
            havePlanification: subject.planificacion ? true : false,
            planification: subject.planificacion,
            haveStudents: course.alumnos && course.alumnos.length > 0 ? true : false,
            students: course.alumnos
          });
        });
      });
    });

    result.forEach((course, index) => {
      course.color = getColorByPosition(index);
    });

    return {
      data: result,
      success: true
    }
  } catch (error) {
    return {
      data: error,
      success: false
    }
  }
}