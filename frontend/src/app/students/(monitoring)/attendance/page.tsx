"use client";
import React, { useState, useEffect } from "react";
import SliderView from "@/components/studentsMonitoring/sliderOptionView";
import { IStudents } from "@/interfaces/IStudents.interface";
import { IAttendance } from "@/interfaces/IAttendance.interfaces";
import { ICourses } from "@/interfaces/ICourses.interface";
import DropdownAttendance from "@/components/studentsMonitoring/dropdown/dropdownAttendance";
import withAuth from "@/actions/withAuth";

const Attendance: React.FC = () => {
    const [mounted, setMounted] = useState(false);
    const [monthIndex, setMonthIndex] = useState(0);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [studentList, setStudentList] = useState<IStudents[] | null>(null);
    const [attendanceData, setAttendanceData] = useState<IAttendance[]>([]);
    const [currentCourse, setCurrentCourse] = useState<ICourses | null>(null);

    useEffect(() => {
        const currentCourse = localStorage.getItem("currentCourse");
        if (currentCourse) {
            const parsedData = JSON.parse(currentCourse);
            setCurrentCourse(parsedData);
        }
    }, []);

    const courseId = currentCourse?.courseId || '';

    const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const colors = ["bg-pink-300", "bg-yellow-100", "bg-green-200", "bg-cyan-200"];

    const getDaysInMonth = (monthIndex: number) => {
        const year = new Date().getFullYear();
        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
        const days: IAttendance[] = [];

        const storedAttendance = JSON.parse(localStorage.getItem("attendanceData") || "[]");

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, monthIndex, day);
            const dayName = daysOfWeek[date.getDay()];

            if (dayName !== "Domingo" && selectedDays.includes(dayName)) {
                const formattedDate = date.toISOString().split("T")[0];

                const newId = storedAttendance.length + days.length + 1;

                const attendanceEntry: IAttendance = {
                    id: newId,
                    curso_id: courseId,
                    nombre_valoracion: dayName,
                    fecha: formattedDate,
                    falta_justificada: false,
                    mes: monthIndex,
                };

                days.push(attendanceEntry);
            }
        }

        return days;
    };

    const saveAttendance = (days: IAttendance[]) => {
        const storedAttendance = JSON.parse(localStorage.getItem("attendanceData") || "[]");

        const updatedAttendance = [...storedAttendance];

        days.forEach((day) => {
            const exists = storedAttendance.some((item: IAttendance) => item.fecha === day.fecha);
            if (!exists) {
                updatedAttendance.push(day);
            }
        });

        const uniqueAttendance = updatedAttendance.filter(
            (item, index, self) => index === self.findIndex((t) => t.fecha === item.fecha)
        );

        localStorage.setItem("attendanceData", JSON.stringify(uniqueAttendance));
    };

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
    }, []);

    useEffect(() => {
        if (mounted) {
            const days = getDaysInMonth(monthIndex);
            setAttendanceData(days);
            if (days.length > 0) {
                saveAttendance(days);
            }
        }
    }, [monthIndex, selectedDays, mounted]);

    useEffect(() => {
        const storedAttendance = JSON.parse(localStorage.getItem("attendanceData") || "[]");
        const filteredAttendance = storedAttendance.filter(
            (attendance: IAttendance) =>
                attendance.mes === monthIndex && attendance.id
        );
        setAttendanceData(filteredAttendance);
    }, [monthIndex, mounted]);

    if (!mounted) {
        return null;
    }

    return (
        <div>
            <SliderView onMonthChange={setMonthIndex} />
            <div className="relative mt-4">
                <div className="flex gap-4 pb-2">
                    {attendanceData.map((attendance, index) => (
                        <div key={attendance.id} className="inline-block">
                            <button
                                type="button"
                                className={`min-w-[170px] min-h-8 text-black border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000] ${colors[index % colors.length]}`}
                                data-date={attendance.fecha}
                            >
                                {`${attendance.nombre_valoracion} ${attendance.fecha.split("-")[2]}/${(monthIndex + 1).toString().padStart(2, "0")}`}
                            </button>
                            {studentList && studentList.length > 0 && (
                                <div className="w-[170px] my-2 mt-10 flex flex-col gap-3">
                                    {studentList.slice(0, 7).map((student) => (
                                        <DropdownAttendance
                                            key={`${student.id}-${attendance.id}`}
                                            studentId={student.id}
                                            attendanceId={attendance.id}
                                        />
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

export default withAuth(Attendance);
