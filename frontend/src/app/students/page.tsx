"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IStudents } from "@/interfaces/IStudents.interface";
import { getStudentsAction } from "@/actions/studentsActions";
import { ICourses } from "@/interfaces/ICourses.interface";
import { useRouter } from "next/navigation";

const Students: React.FC = () => {
    const [isSaved, setIsSaved] = useState(false);
    const [data, setData] = useState<IStudents[] | null>(null)
    const [studentsLocalData, setStudentsLocalData] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const router = useRouter();

    const getData = async (currentCourse: ICourses) => {
        if (currentCourse) {
            const courseId = currentCourse.courseId;
            await getStudentsAction(courseId!).then((response) => {
                setData(response);
            });
        }
    }

    useEffect(() => {
        const configData = window.localStorage.getItem("configData");
        const studentsData = window.localStorage.getItem("studentsData");
        const currentCourse = window.localStorage.getItem("currentCourse");
        if (currentCourse) {
            const course = JSON.parse(currentCourse);
            getData(course);
        }
        if (configData) {
            setIsSaved(true);
        }
        if (studentsData) {
            setStudentsLocalData(true);
        }

        //if (configData && data && data?.length > 0) {
        //logica para guardar los alumnos en la aplicacion general y redirigir
        //localStorage.setItem("studentsData", JSON.stringify(data));
        //router.push("/students/homework");
        //}
        // eslint-disable-next-line react-hooks/exhaustive-deps

        if (configData && studentsLocalData) {
            //setIsModalVisible(true);
            setTimeout(() => {
                //setIsModalVisible(false);
                router.push("/students/homework");
            }, 2000);
        }
    }, [data, studentsLocalData]);

    console.log('data', data);

    return (
        <div>
            <div className="flex justify-between p-12 pb-0">
                <h2 className="text-[32px] font-bold">Seguimiento</h2>
            </div>
            <div className="flex flex-col items-center justify-center text-center mt-24">
                <div className="h-[240px] flex justify-center m-4">
                    <img src="../media/img/students.png" alt="Welcome" className="h-full" />
                </div>
                <h4 className="text-[28px] font-semibold">
                    Antes de comenzar
                </h4>
                <p className="text-[18px] mb-6">
                    Debes tener cargada la lista de alumnos y
                    <br />
                    configurar el sistema de seguimiento de notas..
                </p>
                <div className="flex gap-6">
                    <Link href="/students/config">
                        <button type="button" className={`my-12 min-w-[420px] min-h-[80px] text-black border-2 border-black font-semibold text-[18px] rounded-md filter drop-shadow-[4px_4px_0px_#000000]
                        ${isSaved ? 'bg-white line-through' : 'bg-yellow-500'}
                    `}>
                            <i className={`pr-4 ${isSaved ? 'fa-solid fa-square-check text-green-500' : 'fa-regular fa-square'}`}></i>
                            Configurá el sistema de notas
                            <i className="fa-regular fa-copy pl-4"></i>
                        </button>
                    </Link>
                    <Link href="/students/add-new">
                        <button type="button" className={`my-12 min-w-[420px] min-h-[80px] text-black border-2 border-black font-semibold text-[18px] rounded-md filter drop-shadow-[4px_4px_0px_#000000] ${studentsLocalData ? ' bg-white line-through' : 'bg-yellow-500'}`}>
                            <i className={`pr-4 ${studentsLocalData ? "fa-solid fa-square-check text-green-500" : "fa-regular fa-square"}`}></i>
                            Cargá la lista de alumnos
                            <i className="fa-solid fa-arrow-up pl-4"></i>
                        </button>
                    </Link>
                </div>
            </div>

            {isModalVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
                    <div className="bg-yellow-100 border-2 border-black p-6 rounded-md shadow-lg max-w-lg w-[450px] relative">
                        <h2 className="text-lg font-bold text-center">Redirigiendo...</h2>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Students;
