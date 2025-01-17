"use client"

import { login } from '@/actions/authActions';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ProgressBar from '../multiStepForm/progressBar';

function VerifyEmail({ mail, password }: { mail: string, password: string }) {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const formattedMail = mail.replace('%40', '@');

  const handleContinue = async () => {
    try {
      console.log("Iniciando sesión...");
      await login(formattedMail, password);
      router.push("/onboarding");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Error al iniciar sesión");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      handleContinue();
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className='h-screen flex items-center justify-center'>
      <div className="flex flex-col gap-4 bg-yellow-100 p-4 rounded-lg w-[448px] h-[189px] px-6 filter drop-shadow-[18px_14px_0px_#000000]">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Procesando datos</h3>
        </div>
        <p>Estamos verificando el email. Esto no tomará más de unos segundos</p>
        <div className="relative w-full bg-gray-200 rounded-full h-4">
          <ProgressBar />
        </div>
        {error && <p className='text-red-500'>{error}</p>}
      </div>
    </div>
  );
}

export default VerifyEmail;