"use server"

import { IStudents } from "@/interfaces/IStudents.interface";
import { refreshToken } from "./authActions";
import { cookies } from "next/headers";

const API_URL = process.env.BASE_URL;
const OFFLINE = process.env.NEXT_PUBLIC_OFFLINE;

export async function getStudentsAction(courseId: number) {
  const user = await refreshToken();
  let TOKEN = ''

  if (user) {
    TOKEN = user.access_token;
  }

  if (OFFLINE === "true") {
    const cookieStore = cookies();
    const currentStudents = (await cookieStore).get("currentStudents")
    const parsedCurrentStudents = JSON.parse(currentStudents!.value);

    return parsedCurrentStudents.alumnos;
  }

  const response = await fetch(`${API_URL}/alumno/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${TOKEN}`
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener los alumnos");
  }

  const data = await response.json();

  const filteredData = data.filter((student: IStudents) => student.curso_id === courseId);

  return filteredData;
}

export async function deleteStudentAction(id: number, courseId: number) {
  const user = await refreshToken();
  let TOKEN = '';

  if (user) {
    TOKEN = user.access_token;
  }

  const response = await fetch(`${API_URL}/alumno/delete/${id}/`, {
    method: "DELETE",
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar el alumno");
  }

  const updatedStudents = await getStudentsAction(courseId);

  return updatedStudents;
}

export async function updateStudentAction(id: number, courseId: number) {
  const user = await refreshToken();
  let TOKEN = ''

  if (user) {
    TOKEN = user.access_token;
  }

  const response = await fetch(`${API_URL}/alumno/update/${id}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${TOKEN}`
    },
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el alumno");
  }

  const updatedStudents = await getStudentsAction(courseId);

  return updatedStudents;
}