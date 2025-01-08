"use server"

import { IStudents } from "@/interfaces/IStudents.interface";
import { cookies } from "next/headers";
import { refreshToken } from "./authActions";

const API_URL = process.env.BASE_URL;

export async function getStudentsAction(courseId: number) {
  const cookieStore = cookies();
  const user = (await cookieStore).get("user");
  let TOKEN = ''

  if (user) {
    TOKEN = JSON.parse(user.value).access_token;
  }
  refreshToken();

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