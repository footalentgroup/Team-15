"use client"
import { IconArrowUp, IconUser } from "@/icons";
import { IUser } from "@/interfaces/IAuth.interfaces";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "../sidebar/sidebar";
import { useState } from "react";

interface Props {
  user: IUser
}

function NoContent({ user }: Props) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      <Sidebar isVisible={isVisible} setIsVisible={setIsVisible} isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <div className="h-screen flex flex-col items-center px-16 py-14 relative ms-24">
        <div className='flex w-full justify-between mb-4'>
          <h1 className='text-4xl font-semibold'>Planificación</h1>
          <div className='flex gap-1 items-center'>
            <IconUser />
            <span className='font-semibold capitalize'>{user.username}</span>
          </div>
        </div>
        <Image className="my-9" src="/media/img/planification-reseources-image.svg" alt="Welcome" width={240} height={240} />
        <h2 className="text-4xl font-semibold mb-4">Comienza tu planificación</h2>
        <p className="text-xl">Debes tener cargada la planificación anual para utilizar esta sección</p>
        <Link href="/add-course" className="mt-16 min-w-96 bg-yellow-500 py-6 flex justify-between items-center font-semibold px-4 border-2 border-black rounded-md filter drop-shadow-[4px_4px_0px_#000000]">

          <span className="text-lg">Cargar Planificación</span>
          <IconArrowUp />
        </Link>
      </div>
    </>
  );
}

export default NoContent;