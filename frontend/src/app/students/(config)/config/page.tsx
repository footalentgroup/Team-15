"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import CuatrimestreConfig from "@/components/studentsMonitoring/config/cuatrimestre";
import HomeworkConfig from "@/components/studentsMonitoring/config/homework";
import ExamConfig from "@/components/studentsMonitoring/config/exam";
import AttitudinalConfig from "@/components/studentsMonitoring/config/attitudinal";
import AttendanceConfig from "@/components/studentsMonitoring/config/attendance";
import { ICourses } from '@/interfaces/ICourses.interface';
import withAuth from "@/actions/withAuth";
import { useSnackbar } from "@/contexts/snackbar/SnackbarContext";

const Config: React.FC = () => {
    const [cuatrimestreData, setCuatrimestreData] = useState({});
    const [homeworkData, setHomeworkData] = useState({});
    const [examData, setExamData] = useState({});
    const [attitudinalData, setAttitudinalData] = useState({});
    const [attendanceData, setAttendanceData] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [currentCourse, setCurrentCourse] = useState<ICourses | null>(null);
    const [showModal, setShowModal] = useState(false);
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        const currentCourse = localStorage.getItem("currentCourse");
        if (currentCourse) {
            const parsedData = JSON.parse(currentCourse);
            setCurrentCourse(parsedData);
        }
    }, []);

    const courseId = currentCourse?.courseId || '';

    const handleSave = () => {
        if (!isFormValid) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        const finalData = {
            cuatrimestre: cuatrimestreData,
            homework: homeworkData,
            exam: examData,
            attitudinal: attitudinalData,
            attendance: attendanceData,
            courseId
        };

        const configKey = `configData${courseId}`;

        localStorage.setItem(configKey, JSON.stringify(finalData));
        showSnackbar("Configuración de notas realizada con éxito");
    };


    useEffect(() => {
        validateForm();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cuatrimestreData, homeworkData, examData, attitudinalData, attendanceData]);

    const validateForm = () => {
        const isValid =
            Object.keys(cuatrimestreData).length > 2 &&
            Object.keys(homeworkData).length > 4 &&
            Object.keys(examData).length > 4 &&
            Object.keys(attitudinalData).length > 1 &&
            Object.keys(attendanceData).length > 2;

        setIsFormValid(isValid);
    };

    const handleCancelClick = () => {
        setShowModal(true);
    };

    const confirmCancel = () => {
        setShowModal(false);
        window.location.href = "/students";
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="px-24 bg-[#FFFAEB]">
            <form>
                <CuatrimestreConfig onDataChange={setCuatrimestreData} />
                <HomeworkConfig onDataChange={setHomeworkData} />
                <ExamConfig onDataChange={setExamData} />
                <AttitudinalConfig onDataChange={setAttitudinalData} />
                <AttendanceConfig onDataChange={setAttendanceData} />

                <div className="flex gap-4 w-full justify-center mt-12 pb-12">

                    <button
                        type="button"
                        onClick={handleCancelClick}
                        className="min-w-[130px] min-h-[48px] bg-white text-black border-2 border-black font-semibold text-[16px] px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000]"
                    >
                        Cancelar
                    </button>
                    <Link href="/students">
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={!isFormValid}
                            className="min-w-[130px] min-h-[48px] bg-pink-500 text-white border-2 border-black font-semibold text-[16px] px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000] disabled:opacity-75 disabled:cursor-not-allowed"
                        >
                            Guardar
                        </button>
                    </Link>
                </div>

            </form>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black-modal">
                    <div className="flex flex-col gap-4 bg-yellow-100 p-4 rounded-lg w-[448px] h-[243px] px-6 filter drop-shadow-modal">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-lg">¿Estas seguro de que querés salir?</h3>
                            <button type="button" onClick={closeModal}>✖</button>
                        </div>
                        <p className="text-m text-gray-700 my-2">Al salir y abandonar el proceso, perderás todos los datos que hayas rellenado en los campos.</p>
                        <div className="flex justify-end space-x-4 my-2">
                            <button
                                onClick={closeModal}
                                className="min-w-[130px] min-h-[48px] bg-white text-black border-2 border-black font-semibold text-[16px] px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000]"
                            >
                                Cancelar
                            </button>

                            <button
                                onClick={confirmCancel}
                                className="min-w-[130px] min-h-[48px] bg-pink-500 text-white border-2 border-black font-semibold text-[16px] px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000]"
                            >
                                Confirmar
                            </button>
                        </div>

                    </div>
                </div>

            )
            }

        </div >
    );
}

export default withAuth(Config);
