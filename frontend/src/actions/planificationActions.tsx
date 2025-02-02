"use server"

import { IDailyPlanification, IMonthPlanification, IPlanification } from "@/interfaces/IPlanification.interfaces";
import { refreshToken } from "./authActions";

const API_URL = process.env.BASE_URL;

export async function getPlanification(subjectId: number) {
  const user = await refreshToken();
  let TOKEN = ''

  if (user) {
    TOKEN = user.access_token;
  }

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
  const user = await refreshToken();
  let TOKEN = ''

  if (user) {
    TOKEN = user.access_token;
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

    if (responseData.detail) {
      return {
        success: false,
        error: responseData.detail
      }
    }

    return {
      data: responseData,
      success: true
    }

  } catch (error) {
    alert('Error al crear la planificacion mensual' + error);
  }
}

export async function deleteMonthPlanificationAction(monthPlanificationId: number) {

  const user = await refreshToken();
  let TOKEN = ''

  if (user) {
    TOKEN = user.access_token;
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
    alert('Error al eliminar la planificacion mensual' + error);
  }
}

export async function getAllDailyPlanification() {
  const user = await refreshToken();
  let TOKEN = ''

  if (user) {
    TOKEN = user.access_token;
  }

  const dailyPlanificationUrl = `${API_URL}/planificacion_diaria/list/`;

  try {
    const response = await fetch(dailyPlanificationUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener la planificacion diaria');
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    alert('Error al obtener la planificacion diaria' + error);
  }
}

export async function getAllMonthPlanification() {
  const user = await refreshToken();
  let TOKEN = ''

  if (user) {
    TOKEN = user.access_token;
  }

  const monthPlanificationUrl = `${API_URL}/planificacion_mensual/list/`;

  try {
    const response = await fetch(monthPlanificationUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener la planificacion mensual');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    alert('Error al obtener la planificacion mensual' + error);
  }
}

export async function createDailyPlanificationAction(dailyPlanification: IDailyPlanification) {
  const user = await refreshToken();
  let TOKEN = ''

  if (user) {
    TOKEN = user.access_token;
  }



  const dailyPlanificationUrl = `${API_URL}/planificacion_diaria/register/`;

  try {
    const response = await fetch(dailyPlanificationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
      body: JSON.stringify(dailyPlanification)
    });


    const responseData = await response.json();
    return {
      data: responseData,
      success: true
    }

  } catch (error) {
    alert('Error al crear la planificacion diaria' + error);
  }
}



export async function updateDailyPlanificationAction(dailyPlanification: IDailyPlanification) {
  const user = await refreshToken();
  let TOKEN = ''

  if (user) {
    TOKEN = user.access_token;
  }



  const dailyPlanificationUrl = `${API_URL}/planificacion_diaria/update/${dailyPlanification.id}/`;

  try {
    const response = await fetch(dailyPlanificationUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
      body: JSON.stringify(dailyPlanification)
    });

    const responseData = await response.json();
    return {
      data: responseData,
      success: true
    }

  } catch (error) {
    alert('Error al actualizar la planificacion diaria' + error);
  }
}

export async function updateMonthlyPlanificationAction(monthlyPlanification: IMonthPlanification) {

  const user = await refreshToken();
  let TOKEN = ''

  if (user) {
    TOKEN = user.access_token;
  }



  const dailyPlanificationUrl = `${API_URL}/planificacion_mensual/update/${monthlyPlanification.id}/`;

  try {
    const response = await fetch(dailyPlanificationUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
      body: JSON.stringify(monthlyPlanification)
    });

    const responseData = await response.json();

    return {
      data: responseData,
      success: true
    }

  } catch (error) {
    alert('Error al actualizar la planificacion mensual' + error);
  }
}