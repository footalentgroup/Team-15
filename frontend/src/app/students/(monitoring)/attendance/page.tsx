"use client";
import React, { useState, useEffect } from "react";
import SliderView from "@/components/studentsMonitoring/sliderOptionView";
import Dropdown from "@/components/studentsMonitoring/dropdown";
import { IStudents } from "@/interfaces/IStudents.interface";
import { IAttendance } from "@/interfaces/IAttendance.interfaces";

export default function Attendance() {
    const [mounted, setMounted] = useState(false);
    const [monthIndex, setMonthIndex] = useState(0);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [studentList, setStudentList] = useState<IStudents[] | null>(null);

    const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const colors = ["bg-pink-300", "bg-yellow-100", "bg-green-200", "bg-cyan-200"];

    useEffect(() => {
        const configData = JSON.parse(localStorage.getItem("configData") || "{}");
        const attendanceConfig = configData?.attendance?.selectedButtons || [];
        const studentData = localStorage.getItem("studentsData");
        
        if (studentData) {
            const parsedData = JSON.parse(studentData);
            const studentsArray = Array.isArray(parsedData.alumnos) ? parsedData.alumnos : [];
            setStudentList(studentsArray);
        } else {
            setStudentList(null);
        }
    
        setSelectedDays(attendanceConfig);
        setMounted(true);
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
                const formattedDate = date.toISOString().split("T")[0];
                days.push({ dayName, formattedDate, day });
            }
        }

        return days;
    };

    const handleMonthChange = (index: number) => {
        setMonthIndex(index);
    };

    const days = getDaysInMonth(monthIndex);

    return (
        <div>
            <SliderView onMonthChange={handleMonthChange} />
            <div className="relative mt-4">
                <div className="flex gap-4 pb-2">
                    {days.map(({ dayName, formattedDate, day }, index) => (
                        <div key={index} className="inline-block">
                            <button
                                type="button"
                                className={`min-w-[170px] min-h-8 text-black border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000] ${colors[index % colors.length]}`}
                                data-date={formattedDate} 
                            >
                                {`${dayName} ${day.toString().padStart(2, "0")}/${(monthIndex + 1).toString().padStart(2, "0")}`}
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
