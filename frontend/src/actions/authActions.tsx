"use server"

import { IAuth } from "@/interfaces/IAuth.interfaces";
import { redirect } from 'next/navigation';
import { cookies } from "next/headers";

const API_URL = process.env.BASE_URL;


export async function setUserCookie(data: IAuth) {
  const cookieStore = cookies();

  (await cookieStore).set("user", JSON.stringify(data), {
    httpOnly: true,
    path: '/',
  });
}

export async function refreshToken() {
  const cookieStore = cookies();
  const user = (await cookieStore).get("user");

  if (user) {
    const userData = JSON.parse(user.value);
    const response = await fetch(`${API_URL}/auth/refresh-token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_token: userData.refresh_token,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al refrescar el token");
    }

    const data = await response.json();
    const updatedUserData = {
      ...userData,
      access_token: data.access_token,
    };

    return updatedUserData;
  }

  redirect('/login')
  throw new Error("No user found in cookies");

}

export async function setTempUser({ email, password }: { email: string, password: string }) {
  const cookieStore = cookies();
  const user = { email, password };
  (await cookieStore).set("tempUser", JSON.stringify(user), {
    httpOnly: true,
  });
}

export async function login(email: string, password: string) {
  const cookieStore = cookies();

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/basic-login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const responseData = await response.json();

    if (!responseData.user) {
      throw new Error(responseData.message || "Error al iniciar sesión");
    }

    (await cookieStore).set('user', JSON.stringify(responseData), { httpOnly: true, secure: true, path: '/' });
    (await cookieStore).delete('tempUser');

    return responseData;

  } catch (error) {
    console.error(error);
  }

}

export async function verifyEmailAction(token: string) {
  try {
    const response = await fetch(`${API_URL}/auth/verify-email/${token}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("response", response);

    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUserCookie() {
  const cookieStore = cookies();

  (await cookieStore).delete("user");
}

export async function resetCookies() {
  const cookieStore = cookies();
  (await cookieStore).delete("user");
  (await cookieStore).delete("currentCourse");
  (await cookieStore).delete("period");
}