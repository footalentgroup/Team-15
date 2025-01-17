"use client";
import React, { useState, useEffect } from "react";
import SliderView from "@/components/studentsMonitoring/sliderOptionView";
import Dropdown from "@/components/studentsMonitoring/dropdown";
import { IStudents } from "@/interfaces/IStudents.interface";

export default function Attitudinal() {
    const [mounted, setMounted] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [rangeType, setRangeType] = useState<"diario" | "semanal" | "mensual">("diario");
    const [monthIndex, setMonthIndex] = useState(0);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [studentList, setStudentList] = useState<IStudents[] | null>(null);
    const [selectedButton, setSelectedButton] = useState<string>("");

    const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const colors = ["bg-pink-300", "bg-yellow-100", "bg-green-200", "bg-cyan-200"];

    useEffect(() => {
        const configData = JSON.parse(localStorage.getItem("configData") || "{}");
        const attendanceConfig = configData?.attendance?.selectedButtons || [];
        const studentData = localStorage.getItem("studentsData");

        if (studentData) {
            const parsedData = JSON.parse(studentData);
            const studentsArray = Array.isArray(parsedData) ? parsedData : [];
            setStudentList(studentsArray);
        } else {
            setStudentList(null);
        }

        setSelectedDays(attendanceConfig);
        setMounted(true);
        setSelectedButton(configData?.attitudinal?.selectedButton || "");
    }, []);

    if (!mounted) {
        return null;
    }

    const getDaysInMonth = (monthIndex: number) => {
        const year = new Date().getFullYear();
        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
        const days = [];

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, monthIndex, day);
            const dayName = daysOfWeek[date.getDay()];
            if (dayName !== "Domingo" && selectedDays.includes(dayName)) {
                days.push(`${dayName} ${day.toString().padStart(2, "0")}/${(monthIndex + 1).toString().padStart(2, "0")}`);
            }
        }

        return days;
    };

    const handleMonthChange = (trimesterIndex: number) => {
        const trimesters = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [9, 10, 11],
        ];

        if (rangeType === "mensual") {

            const monthsInTrimester = trimesters[trimesterIndex];
            setMonthIndex(monthsInTrimester[0]);

        } else if (rangeType === "diario" || rangeType === "semanal") {

            setMonthIndex(trimesterIndex);
        }
    };

    const getMonthsInTrimester = (trimesterIndex: number): string[] => {
        const trimesterMonths = [
            ["Enero", "Febrero", "Marzo"],
            ["Abril", "Mayo", "Junio"],
            ["Julio", "Agosto", "Septiembre"],
            ["Octubre", "Noviembre", "Diciembre"]
        ];
        return trimesterMonths[trimesterIndex] || [];
    };

    const getWeekRanges = (monthIndex: number) => {
        const weeks = [];
        const year = new Date().getFullYear();
        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
        let weekStart = 1;

        for (let i = 1; i <= daysInMonth; i++) {
            const currentDay = new Date(year, monthIndex, i).getDay();

            if (currentDay === 6 || i === daysInMonth) {
                weeks.push(`${weekStart} - ${i}`);
                weekStart = i + 1;
            }
        }

        return weeks;
    };


    const getTrimesters = () => {
        return ["1er trimestre", "2do trimestre", "3er trimestre"];
    };

    const getCuatrimesters = () => {
        return ["1er cuatrimestre", "2do cuatrimestre", "3er cuatrimestre", "4to cuatrimestre"];
    };

    const getSemesters = () => {
        return ["1er semestre", "2do semestre"];
    };

    const days = getDaysInMonth(monthIndex);
    const weeks = getWeekRanges(monthIndex);
    const trimesters = getTrimesters();
    const cuatrimesters = getCuatrimesters();
    const semesters = getSemesters();

    return (
        <div>
            <SliderView onMonthChange={handleMonthChange} />
            <div className="relative mt-4">
                <div className="flex gap-4 pb-2">
                    {selectedButton === "Diario" && days.map((day, index) => (
                        <div key={index} className="inline-block">
                            <button
                                type="button"
                                className={`min-w-[170px] min-h-8 text-black border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000] ${colors[index % colors.length]}`}
                            >
                                {day}
                            </button>
                            {studentList && studentList.length > 0 && (
                                <div className="w-[170px] my-2 mt-10 flex flex-col gap-3">
                                    {studentList.slice(0, 7).map((student) => (
                                        <Dropdown key={student.id} />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    {selectedButton === "Semanal" && weeks.map((week, index) => (
                        <div key={index} className="inline-block">
                            <button
                                type="button"
                                className={`min-w-[170px] min-h-8 text-black border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000] ${colors[index % colors.length]}`}
                            >
                                Semana {week}
                            </button>
                            {studentList && studentList.length > 0 && (
                                <div className="w-[170px] my-2 mt-10 flex flex-col gap-3">
                                    {studentList.slice(0, 7).map((student) => (
                                        <Dropdown key={student.id} />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    {selectedButton === "Mensual" && getMonthsInTrimester(Math.floor(monthIndex)).map((month, index) => (
                        <div key={index} className="inline-block">
                            <button
                                type="button"
                                className={`min-w-[170px] min-h-8 text-black border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000] ${colors[index % colors.length]}`}
                            >
                                {month}
                            </button>
                            {studentList && studentList.length > 0 && (
                                <div className="w-[170px] my-2 mt-10 flex flex-col gap-3">
                                    {studentList.slice(0, 7).map((student) => (
                                        <Dropdown key={student.id} />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    {selectedButton === "Cuatrimestral" && cuatrimesters.map((cuatrimestre, index) => (
                        <div key={index} className="inline-block">
                            <button
                                type="button"
                                className={`min-w-[170px] min-h-8 text-black border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000] ${colors[index % colors.length]}`}
                            >
                                {cuatrimestre}
                            </button>
                            {studentList && studentList.length > 0 && (
                                <div className="w-[170px] my-2 mt-10 flex flex-col gap-3">
                                    {studentList.slice(0, 7).map((student) => (
                                        <Dropdown key={student.id} />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    {selectedButton === "Trimestral" && trimesters.map((trimester, index) => (
                        <div key={index} className="inline-block">
                            <button
                                type="button"
                                className={`min-w-[170px] min-h-8 text-black border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000] ${colors[index % colors.length]}`}
                            >
                                {trimester}
                            </button>
                            {studentList && studentList.length > 0 && (
                                <div className="w-[170px] my-2 mt-10 flex flex-col gap-3">
                                    {studentList.slice(0, 7).map((student) => (
                                        <Dropdown key={student.id} />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    {selectedButton === "Semestral" && semesters.map((semester, index) => (
                        <div key={index} className="inline-block">
                            <button
                                type="button"
                                className={`min-w-[170px] min-h-8 text-black border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000] ${colors[index % colors.length]}`}
                            >
                                {semester}
                            </button>
                            {studentList && studentList.length > 0 && (
                                <div className="w-[170px] my-2 mt-10 flex flex-col gap-3">
                                    {studentList.slice(0, 7).map((student) => (
                                        <Dropdown key={student.id} />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
