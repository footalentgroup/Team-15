"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setTempUser, setUserCookie } from "@/actions/authActions";
import ButtonContinue from "@/ui/buttons/buttonContinue";

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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const isValidPassword = password.length >= 6 && password.length <= 20 && password.match(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/);
    if (!isValidPassword) {
      setError('La contraseña debe tener entre 6 y 20 caracteres, al menos una letra mayúscula, una letra minúscula y un número.');
      setLoading(false);
      return;
    }
    setError("");
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

        const data = await response.json();

        if (data.error) {
          if (data.error === "Invalid credentials") {
            setError("Credenciales inválidas");
            setLoading(false);
          } else {
            setError(data.error);
            setLoading(false);
          }
          return;
        }

        const token = data.access_token;

        if (!token) {
          setError("Token no encontrado");
          setLoading(false);
          return;
        }

        localStorage.setItem("token", token);
        localStorage.setItem("username", JSON.stringify(data.user.name));
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
        const data = await response.json();
        if (!data.message) {
          for (const [key, value] of Object.entries(data as { [key: string]: string[] })) {
            setError(`${key}: ${value.join(", ")}`);
          }
          return;
        }
        localStorage.setItem("username", JSON.stringify(username));
        setTempUser({ email, password });
        router.push(`/register/confirm/${email}`);
      }
    } catch (error) {
      alert("Hubo un error al procesar tu solicitud, por favor comunicate con soporte.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authform flex items-center justify-center min-h-screen bg-yellow-light-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-white border-2 border-black rounded-md filter drop-shadow-[4px_4px_0px_#000000] "
      >
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-700">
          {type === "login" ? "Iniciar Sesión" : "Registro"}
        </h2>
        <p className="mb-4 text-sm text-center text-gray-600">
          {type === "login" ? (
            <>
              ¿Aún no tienes una cuenta?{" "}
              <Link href="/register" className="text-blue-light-500 hover:underline">
                Regístrate
              </Link>
            </>
          ) : (
            <>
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="text-blue-light-500 hover:underline">
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
        <div className="flex justify-center">
          <ButtonContinue loading={loading} text={type === "login" ? "Iniciar Sesión" : "Registrarme"} />
        </div>
        {error && (
          <p className="mt-4 text-sm text-center text-red-600">{error}</p>
        )}
      </form>
    </div>
  );
};

export default AuthForm;
