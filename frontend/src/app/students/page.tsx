/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IStudents } from "@/interfaces/IStudents.interface";
import { getStudentsAction } from "@/actions/studentsActions";
import { ICourses } from "@/interfaces/ICourses.interface";
import { useRouter } from "next/navigation";
import withAuth from "@/actions/withAuth";
import { useSnackbar } from "@/contexts/snackbar/SnackbarContext";

const Students: React.FC = () => {
    const [isSaved, setIsSaved] = useState(false);
    const [data, setData] = useState<IStudents[] | null>(null)
    const [studentsLocalData, setStudentsLocalData] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const router = useRouter();
    const [currentCourse, setCurrentCourse] = useState<ICourses | null>(null);
    const { showSnackbar } = useSnackbar();

    const getData = async (currentCourse: ICourses) => {
        if (currentCourse) {
            const courseId = currentCourse.courseId;
            await getStudentsAction(courseId!).then((response) => {
                setData(response);
            });
        }
    };

    useEffect(() => {
        const studentsData = window.localStorage.getItem("studentsData");
        const currentCourse = window.localStorage.getItem("currentCourse");

        if (currentCourse) {
            const course = JSON.parse(currentCourse);
            setCurrentCourse(course);
            getData(course);
        }

        if (currentCourse) {
            const course = JSON.parse(currentCourse);
            const configDataKey = `configData${course.courseId}`;
            const configData = window.localStorage.getItem(configDataKey);

            if (configData) {
                setIsSaved(true);
                window.localStorage.setItem("configData", configData);
            }
        }

        if (studentsData) {
            setStudentsLocalData(true);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [studentsLocalData]);

    useEffect(() => {
        if (isSaved && data && data?.length > 0) {
            setIsModalVisible(true);
            localStorage.setItem("studentsData", JSON.stringify(data));
        }
    }, [isSaved, data]);

    const handleClick = () => {
        router.push("/students/homework");
        showSnackbar("Configuraste el seguimiento exitosamente");
    }


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
                    Debés tener cargada la lista de alumnos y
                    <br />
                    configurar el sistema de seguimiento de notas.
                </p>
                <div className="flex gap-6">
                    {isSaved ? (
                        <button
                            type="button"
                            className={`my-12 min-w-[420px] min-h-[80px] text-black border-2 border-black font-semibold text-[18px] rounded-md filter drop-shadow-general bg-white line-through cursor-not-allowed`}
                        >
                            <i className="pr-4 fa-solid fa-square-check text-green-500"></i>
                            Configurar el sistema de notas
                            <i className="fa-regular fa-copy pl-4"></i>
                        </button>
                    ) : (
                        <Link href="/students/config">
                            <button
                                type="button"
                                className={`my-12 min-w-[420px] min-h-[80px] text-black border-2 border-black font-semibold text-[18px] rounded-md filter drop-shadow-general bg-yellow-500`}
                            >
                                <i className="pr-4 fa-regular fa-square"></i>
                                Configurar el sistema de notas
                                <i className="fa-regular fa-copy pl-4"></i>
                            </button>
                        </Link>
                    )}
                    {(data && data.length > 0) ? (
                        <button type="button" className={`my-12 min-w-[420px] min-h-[80px] text-black border-2 border-black font-semibold text-[18px] rounded-md filter drop-shadow-general bg-white line-through cursor-not-allowed`}>
                            <i className={`pr-4 fa-solid fa-square-check text-green-500`}></i>
                            Cargar la lista de alumnos
                            <i className="fa-solid fa-arrow-up pl-4"></i>
                        </button>
                    ) : (
                        <Link href={`/add-course?page=2&courseId=${currentCourse?.courseId}`} >
                            <button type="button" className={`my-12 min-w-[420px] min-h-[80px] text-black border-2 border-black font-semibold text-[18px] rounded-md filter drop-shadow-general bg-yellow-500`}>
                                <i className={`pr-4 fa-regular fa-square`}></i>
                                Cargar la lista de alumnos
                                <i className="fa-solid fa-arrow-up pl-4"></i>
                            </button>
                        </Link>
                    )}
                </div>
            </div>

            {isModalVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black-modal">
                    <div className="flex flex-col gap-4 bg-yellow-100 p-4 rounded-lg w-[448px] h-[532px] px-6 filter drop-shadow-modal">
                        <div className="flex justify-center">
                            <img src="/media/img/config-done.png" alt="Configuración completa" className="w-[177px]" />
                        </div>
                        <div className="flex justify-between items-center my-2">
                            <h3 className="font-bold text-lg text-[#004027]">¡Listo! Todo está configurado</h3>
                        </div>
                        <p className="text-m text-gray-700 my-2">¡Tu configuración está completa! Ahora estás listo para hacer el seguimiento de tus alumnos.</p>
                        <div className="flex justify-end space-x-4 mt-10">
                            <button
                                className="min-w-[130px] min-h-[48px] bg-pink-500 text-white border-2 border-black font-semibold text-[16px] px-4 rounded-md filter drop-shadow-general"
                                onClick={handleClick}
                            >
                                Continuar
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default withAuth(Students);
