/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { Course, ICourses, School, Subject } from "@/interfaces/ICourses.interface";
import { getColorByPosition } from "@/utils/getRandomColor";


const API_URL = process.env.BASE_URL;
const TOKEN = process.env.TOKEN;

export async function getCourses() {
  console.log('estoy usando el getCourses');
  //recibe solo un nombre: la institucion
  const schoolUrl = `${API_URL}/institucion/list/`;
  //recibe el nombre del curso y el id de la institucion:institucion_id
  const courseUrl = `${API_URL}/curso/list/`;
  //recibe el nombre de la materia y el id del curso:curso_id
  const subjectUrl = `${API_URL}/materia/list/`;

  //id del docente para filtrar los resultados
  const professorId = 2;

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

    const professorSchools = schoolData.filter((school: School) => school.docente === professorId);

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
    console.log('error', error);
    return {
      data: error,
      success: false
    }
  }
}