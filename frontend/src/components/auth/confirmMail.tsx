"use client"

import { login } from '@/actions/authActions';
import ButtonContinue from '@/ui/buttons/buttonContinue';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function ConfirmMail({ mail, password }: { mail: string, password: string }) {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const formattedMail = mail.replace('%40', '@');

  const handleContinue = async () => {
    try {
      const response = await login(formattedMail, password);
      if (response.user) {
        router.push("/onboarding");
      }
    } catch (error) {
      console.error(error);
      setError("Error al iniciar sesión");
    }
  };


  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center gap-4 bg-yellow-100 p-8 border-2 border-black rounded-md filter drop-shadow-general'>
        <h2 className='font-bold text-xl'>Confirmación de email</h2>
        <h3>Se ha enviado un email de confirmacion a <span className='font-bold'>{formattedMail}</span></h3>
        <p>Por favor revisa tu casilla de correo y sigue las instrucciones para completar el registro</p>
        <ButtonContinue text='Continuar' onClick={handleContinue} />
        {error && <p className='text-red-500'>{error}</p>}
      </div>
    </div>
  );
}

export default ConfirmMail;