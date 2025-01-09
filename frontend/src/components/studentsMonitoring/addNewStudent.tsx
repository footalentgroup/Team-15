"use client";
import { IStudents } from "@/interfaces/IStudents.interface";
import React, { useEffect, useState } from "react";

export default function AddNewStudent() {
    const [data, setData] = useState<IStudents[] | null>(null)

    useEffect(() => {
        const alumnos = localStorage.getItem("studentsData");
        if (alumnos) {
            const students = JSON.parse(alumnos);
            setData(students);
        }
        console.log('data', data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
            <div className="flex flex-col w-48 h-3/4 gap-4 items-center">
                <button type="button" className="h-6 w-6 mx-16 bg-pink-500 text-white border-2 border-black font-semibold rounded-full filter drop-shadow-[2px_2px_0px_#000000] ">
                    <i className="fa-solid fa-angle-up"></i>
                </button>
                <div className="flex flex-col gap-4">
                    <button type="button" className="min-w-[155px] min-h-8 bg-white text-black border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000]">
                        Agregar alumno
                    </button>
                    {
                        data && data.map((student, index) => (
                            <button
                                key={index}
                                type="button"
                                className="min-w-[155px] min-h-12 bg-white text-black border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000]"
                            >
                                {student.nombre} {student.apellido}
                            </button>
                        ))
                    }
                    {/* <button type="button" className="min-w-[155px] min-h-12 bg-white text-black border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000]">
                        Alumno 1
                    </button>
                    <button type="button" className="min-w-[155px] min-h-12 bg-white text-black border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000]">
                        Alumno 2
                    </button>
                    <button type="button" className="min-w-[155px] min-h-12 bg-white text-black border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000]">
                        Alumno 3
                    </button> */}
                </div>
                <button type="button" className="h-6 w-6 mx-16 bg-pink-500 text-white border-2 border-black font-semibold rounded-full filter drop-shadow-[2px_2px_0px_#000000]">
                    <i className="fa-solid fa-angle-down"></i>
                </button>
            </div>
        </div>
    )
}