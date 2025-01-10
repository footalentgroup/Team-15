"use server"

import { cookies } from "next/headers";
import { refreshToken } from "./authActions";
import { IPlanification } from "@/interfaces/IPlanification.interfaces";

const API_URL = process.env.BASE_URL;

export async function getPlanification(subjectId: number) {
  const cookieStore = cookies();
  const user = (await cookieStore).get("user");
  let TOKEN = ''

  if (user) {
    TOKEN = JSON.parse(user.value).access_token;
  }

  refreshToken();

  const response = await fetch(`${API_URL}/planificacion/list/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${TOKEN}`
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener la planificacion");
  }

  const data = await response.json();

  const filteredData = data.filter((planification: IPlanification) => planification.materia_id === subjectId);

  return filteredData;
}