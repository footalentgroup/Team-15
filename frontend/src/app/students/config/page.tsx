"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import CuatrimestreConfig from "@/components/studentsMonitoring/config/cuatrimestre";
import HomeworkConfig from "@/components/studentsMonitoring/config/homework";
import ExamConfig from "@/components/studentsMonitoring/config/exam";
import AttitudinalConfig from "@/components/studentsMonitoring/config/attitudinal";
import AttendanceConfig from "@/components/studentsMonitoring/config/attendance";


export default function Config() {
    const [cuatrimestreData, setCuatrimestreData] = useState({});
    const [homeworkData, setHomeworkData] = useState({});
    const [examData, setExamData] = useState({});
    const [attitudinalData, setAttitudinalData] = useState({});
    const [attendanceData, setAttendanceData] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    const validateForm = () => {
        const isValid =
            Object.keys(cuatrimestreData).length > 0 &&
            Object.keys(homeworkData).length > 0 &&
            Object.keys(examData).length > 0 &&
            Object.keys(attitudinalData).length > 0 &&
            Object.keys(attendanceData).length > 0;
        setIsFormValid(isValid);
    };

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
        };

        localStorage.setItem("configData", JSON.stringify(finalData));
        console.log("Datos guardados:", finalData);
    };

    useEffect(() => {
        validateForm();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cuatrimestreData, homeworkData, examData, attitudinalData, attendanceData]);

    return (
        <div className="px-24">
            <form>
                <CuatrimestreConfig onDataChange={setCuatrimestreData} />
                <HomeworkConfig onDataChange={setHomeworkData} />
                <ExamConfig onDataChange={setExamData} />
                <AttitudinalConfig onDataChange={setAttitudinalData} />
                <AttendanceConfig onDataChange={setAttendanceData} />

                <Link href="/students" className="flex gap-4 w-full justify-center my-12">
                    <button
                        type="button"
                        className="min-w-[130px] min-h-12 bg-white text-black border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000]"
                    >
                        Cerrar
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={!isFormValid}
                        className="min-w-[130px] min-h-12 bg-pink-500 text-white border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000] disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                        Guardar
                    </button>
                </Link>

            </form>
        </div>
    );
}
