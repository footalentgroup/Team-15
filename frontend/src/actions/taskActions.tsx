"use server"

import { ICreateHomework } from "@/interfaces/IHomework.interfaces";
import { refreshToken } from "./authActions";

const API_URL = process.env.BASE_URL;

export async function createNewTaskAction(examen: ICreateHomework) {
  const user = await refreshToken();
  let TOKEN = ''

  if (user) {
    TOKEN = user.access_token;
  }

  const response = await fetch(`${API_URL}/tarea_asignada/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${TOKEN}`
    },
    body: JSON.stringify(examen),
  });

  if (!response.ok) {
    throw new Error("Error al crear el examen");
  }

  const data = await response.json();
  return {
    data: data,
    success: true
  }
}