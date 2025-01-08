"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Students: React.FC = () => {
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const configData = localStorage.getItem("configData");
        if (configData) {
            setIsSaved(true);
        }
    }, []);

    return (
        <div>
            <div className="flex justify-between p-12 pb-0">
                <h2 className="text-[32px] font-bold">Seguimiento de alumnos</h2>
            </div>
            <div className="flex flex-col items-center justify-center text-center mt-24">
                <div className="h-40 flex justify-center m-4">
                    <img src="../media/img/students.png" alt="Welcome" className="h-full" />
                </div>
                <h4 className="text-[32px] font-semibold">
                    Antes de comenzar
                </h4>
                <p className="text-[16px]">
                    Debes tener cargada la lista de alumnos y
                    <br />
                    configurar el sistema de seguimiento de notas..
                </p>
                <div className="flex gap-4">
                    <Link href="/students/config">
                        <button type="button" className={`my-12 min-w-[300px] min-h-12 text-black border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000]
                        ${isSaved ? 'bg-white line-through' : 'bg-yellow-500'}
                    `}>
                            <i className={`pr-4 ${isSaved ? 'fa-solid fa-square-check text-green-500' : 'fa-regular fa-square'}`}></i>
                            Configurá el sistema de notas
                            <i className="fa-regular fa-copy pl-4"></i>
                        </button>
                    </Link>
                    <button type="button" className="my-12 min-w-[300px] min-h-12 bg-yellow-500 text-black border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000]">
                        <i className="fa-regular fa-square pr-4"></i>
                        Cargá la lista de alumnos
                        <i className="fa-solid fa-arrow-up pl-4"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Students;
