"use server"

import { cookies } from "next/headers";
import { refreshToken } from "./authActions";
import { IMonthPlanification, IPlanification } from "@/interfaces/IPlanification.interfaces";

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

export async function createNewMonthPlanificationAction(monthPlanification: IMonthPlanification[]) {
  console.log('Add to Calendar Action', monthPlanification);

  const cookieStore = cookies();
  const user = (await cookieStore).get("user");
  let TOKEN = ''

  if (user) {
    TOKEN = JSON.parse(user.value).access_token;
  }

  if (!TOKEN) {
    refreshToken();
  }

  const monthPlanificationUrl = `${API_URL}/planificacion_mensual/list-register/`;

  try {
    const response = await fetch(monthPlanificationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
      body: JSON.stringify(monthPlanification)
    });

    const responseData = await response.json();
    console.log('responseData', responseData);

    return {
      data: responseData,
      success: true
    }

  } catch (error) {
    console.log('error', error);
  }
}

export async function deleteMonthPlanificationAction(monthPlanificationId: number) {
  console.log('Delete from Calendar Action', monthPlanificationId);

  const cookieStore = cookies();
  const user = (await cookieStore).get("user");
  let TOKEN = ''

  if (user) {
    TOKEN = JSON.parse(user.value).access_token;
  }

  if (!TOKEN) {
    refreshToken();
  }

  const monthPlanificationUrl = `${API_URL}/planificacion_mensual/delete/${monthPlanificationId}/`;

  try {
    const response = await fetch(monthPlanificationUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error('Error al eliminar la planificacion mensual');
    }

    return {
      success: true
    }

  } catch (error) {
    console.log('error', error);
  }
}

export async function updateMonthPlanificationAction(monthPlanification: IMonthPlanification) {
  console.log('Update Month Planification Action', monthPlanification);

  const cookieStore = cookies();
  const user = (await cookieStore).get("user");
  let TOKEN = ''

  if (user) {
    TOKEN = JSON.parse(user.value).access_token;
  }

  if (!TOKEN) {
    refreshToken();
  }

  const monthPlanificationUrl = `${API_URL}/planificacion_mensual/update/${monthPlanification.id}/`;

  try {
    const response = await fetch(monthPlanificationUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
      body: JSON.stringify(monthPlanification)
    });

    console.log(response);

    const responseData = await response.json();
    console.log('responseData', responseData);

    return {
      data: responseData,
      success: true
    }

  } catch (error) {
    console.log('error', error);
  }
}