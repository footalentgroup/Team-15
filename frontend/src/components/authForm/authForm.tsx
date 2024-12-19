"use client"
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type AuthFormProps = {
  type: "login" | "register";
};

const AuthForm = ({ type }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (type === "login") {
      console.log("Se inició la sesión con:", { email, password });
      router.push("/home");
    } else {
      console.log("Se registró la cuenta con:", { email, password });
      router.push("/onboarding");
    }
    // API
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
          {type === "login" ? "Iniciar Sesión" : "Registrarse"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;

