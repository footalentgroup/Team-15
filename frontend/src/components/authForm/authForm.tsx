"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setTempUser, setUserCookie } from "@/actions/authActions";

type AuthFormProps = {
  type: "login" | "register";
};

const AuthForm = ({ type }: AuthFormProps) => {
  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (type === "login") {
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

        if (!response.ok) {
          throw new Error("Error al iniciar sesión");
        }

        const data = await response.json();
        const token = data.access_token;

        if (!token) {
          throw new Error("Token no encontrado");
        }

        localStorage.setItem("token", token);
        localStorage.setItem("username", JSON.stringify(data.user.username));
        await setUserCookie(data);
        router.push("/home");

      } else {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/basic-register/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            first_name,
            last_name,
            email,
            password,
            role: "user"
          }),
        });
        if (!response.ok) {
          throw new Error("Error en la creación del usuario");
        }
        console.log("Se registró la cuenta con:", {
          username,
          first_name,
          last_name,
          email,
          password,
        });
        localStorage.setItem("username", JSON.stringify(username));
        setTempUser({ email, password });
        router.push(`/register/confirm/${email}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al procesar tu solicitud, por favor comunicate con soporte.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-white rounded-md shadow-md"
      >
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-700">
          {type === "login" ? "Iniciar Sesión" : "Registro"}
        </h2>
        <p className="mb-4 text-sm text-center text-gray-600">
          {type === "login" ? (
            <>
              ¿Aún no tienes una cuenta?{" "}
              <Link href="/register" className="text-blue-500 hover:underline">
                Regístrate
              </Link>
            </>
          ) : (
            <>
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Inicia sesión
              </Link>
            </>
          )}
        </p>
        {type === "register" && (
          <>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Nombre de Usuario
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
                className="w-full px-4 py-2 text-sm border rounded-md focus:ring focus:ring-blue-300 focus:outline-none focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Nombre
              </label>
              <input
                type="text"
                id="first_name"
                value={first_name}
                onChange={(event) => setFirstName(event.target.value)}
                required
                className="w-full px-4 py-2 text-sm border rounded-md focus:ring focus:ring-blue-300 focus:outline-none focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="last_name"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Apellido
              </label>
              <input
                type="text"
                id="last_name"
                value={last_name}
                onChange={(event) => setLastName(event.target.value)}
                required
                className="w-full px-4 py-2 text-sm border rounded-md focus:ring focus:ring-blue-300 focus:outline-none focus:ring-opacity-50"
              />
            </div>
          </>
        )}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full px-4 py-2 text-sm border rounded-md focus:ring focus:ring-blue-300 focus:outline-none focus:ring-opacity-50"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="w-full px-4 py-2 text-sm border rounded-md focus:ring focus:ring-blue-300 focus:outline-none focus:ring-opacity-50"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
        >
          {type === "login" ? "Iniciar Sesión" : "Registrarme"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
