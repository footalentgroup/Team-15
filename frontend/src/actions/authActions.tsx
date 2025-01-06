"use server"

import { IAuth } from "@/interfaces/IAuth.interfaces";
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

  throw new Error("No user found in cookies");

}