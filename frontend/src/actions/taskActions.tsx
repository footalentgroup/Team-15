"use server"

import { cookies } from "next/headers";
import { refreshToken } from "./authActions";
import { ICreateHomework } from "@/interfaces/IHomework.interfaces";

const API_URL = process.env.BASE_URL;

export async function createNewTaskAction(examen: ICreateHomework) {
  const cookieStore = cookies();
  const user = (await cookieStore).get("user");
  let TOKEN = ''

  if (user) {
    TOKEN = JSON.parse(user.value).access_token;
  }
  refreshToken();

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