"use client";
import React, { useState, useEffect } from "react";
import SliderView from "@/components/studentsMonitoring/sliderOptionView";
import { IStudents } from "@/interfaces/IStudents.interface";
import { IAttitudinal } from "@/interfaces/IAttitudinal.interfaces";
import { ICourses } from "@/interfaces/ICourses.interface";
import DropdownAttitudinal from "@/components/studentsMonitoring/dropdown/dropdownAttitudinal";
import withAuth from "@/actions/withAuth";

const Attitudinal: React.FC = () => {
    const [mounted, setMounted] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [rangeType, setRangeType] = useState<"diario" | "semanal" | "mensual">("diario");
    const [monthIndex, setMonthIndex] = useState(0);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [studentList, setStudentList] = useState<IStudents[] | null>(null);
    const [attitudinalData, setAttitudinalData] = useState<IAttitudinal[]>([]);
    const [currentCourse, setCurrentCourse] = useState<ICourses | null>(null);
    const [selectedButton, setSelectedButton] = useState<string>("");

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
    const trimesters = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [9, 10, 11],
    ];

    const getDaysInMonth = (monthIndex: number) => {
        const year = new Date().getFullYear();
        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
        const days: IAttitudinal[] = [];

        const storedAttitudinal = JSON.parse(localStorage.getItem("attitudinalData") || "[]");

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, monthIndex, day);
            const dayName = daysOfWeek[date.getDay()];

            if (dayName !== "Domingo" && selectedDays.includes(dayName)) {
                const formattedDate = date.toISOString().split("T")[0];

                const newId = storedAttitudinal.length + days.length + 1;

                const attitudinalEntry: IAttitudinal = {
                    id: newId,
                    curso_id: courseId,
                    nombre_valoracion: dayName,
                    fecha: formattedDate,
                    mes: monthIndex,
                };

                days.push(attitudinalEntry);
            }
        }

        return days;
    };

    const getWeek = (monthIndex: number) => {
        const weeks: IAttitudinal[] = [];
        const year = new Date().getFullYear();
        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
        let weekStart = 1;

        const storedAttitudinal = JSON.parse(localStorage.getItem("attitudinalData") || "[]");

        for (let i = 1; i <= daysInMonth; i++) {
            const currentDay = new Date(year, monthIndex, i).getDay();

            if (currentDay === 6 || i === daysInMonth) {
                const range = `${weekStart} - ${i}`;
                const formattedStartDate = new Date(year, monthIndex, weekStart).toISOString().split("T")[0];
                const formattedEndDate = new Date(year, monthIndex, i).toISOString().split("T")[0];

                const newId = storedAttitudinal.length + weeks.length + 1;

                const weekEntry: IAttitudinal = {
                    id: newId,
                    curso_id: courseId,
                    nombre_valoracion: `Semana ${range}`,
                    fecha: `${formattedStartDate} a ${formattedEndDate}`,
                    mes: monthIndex,
                };

                weeks.push(weekEntry);
                weekStart = i + 1;
            }
        }

        return weeks;
    };

    const getMonths = () => {
        const year = new Date().getFullYear();
        const months: IAttitudinal[] = [];

        const storedAttitudinal = JSON.parse(localStorage.getItem("attitudinalData") || "[]");
        const monthNames = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];

        for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
            const formattedDate = `${year}-${(monthIndex + 1).toString().padStart(2, '0')}-01`;

            const newId = storedAttitudinal.length + months.length + 1;

            const monthEntry: IAttitudinal = {
                id: newId,
                curso_id: courseId,
                nombre_valoracion: monthNames[monthIndex],
                fecha: formattedDate,
                mes: monthIndex,
            };

            months.push(monthEntry);
        }

        return months;
    };

    const getTrimesters = () => {
        const year = new Date().getFullYear();
        const trimesters = [
            { name: "1er trimestre", startMonth: 0, endMonth: 2 },
            { name: "2do trimestre", startMonth: 3, endMonth: 5 },
            { name: "3er trimestre", startMonth: 6, endMonth: 8 },
            { name: "4to trimestre", startMonth: 9, endMonth: 11 },
        ];

        const trimestersEntries: IAttitudinal[] = [];
        const storedAttitudinal = JSON.parse(localStorage.getItem("attitudinalData") || "[]");

        trimesters.forEach((trimester, index) => {
            const startDate = new Date(year, trimester.startMonth, 1).toISOString().split("T")[0];
            const endDate = new Date(year, trimester.endMonth + 1, 0).toISOString().split("T")[0];

            const newId = storedAttitudinal.length + trimestersEntries.length + 1;

            const trimesterEntry: IAttitudinal = {
                id: newId,
                curso_id: courseId,
                nombre_valoracion: trimester.name,
                fecha: `${startDate} a ${endDate}`,
                mes: index
            };

            trimestersEntries.push(trimesterEntry);
        });

        return trimestersEntries;
    };

    const getCuatrimesters = () => {
        const year = new Date().getFullYear();
        const cuatrimesters = [
            { name: "1er cuatrimestre", startMonth: 0, endMonth: 3 },
            { name: "2do cuatrimestre", startMonth: 4, endMonth: 7 },
            { name: "3er cuatrimestre", startMonth: 8, endMonth: 11 }
        ];

        const cuatrimestersEntries: IAttitudinal[] = [];
        const storedAttitudinal = JSON.parse(localStorage.getItem("attitudinalData") || "[]");

        cuatrimesters.forEach((cuatrimester, index) => {
            const startDate = new Date(year, cuatrimester.startMonth, 1).toISOString().split("T")[0];
            const endDate = new Date(year, cuatrimester.endMonth + 1, 0).toISOString().split("T")[0];

            const newId = storedAttitudinal.length + cuatrimestersEntries.length + 1;

            const cuatrimesterEntry: IAttitudinal = {
                id: newId,
                curso_id: courseId,
                nombre_valoracion: cuatrimester.name,
                fecha: `${startDate} a ${endDate}`,
                mes: index
            };

            cuatrimestersEntries.push(cuatrimesterEntry);
        });

        return cuatrimestersEntries;
    };

    const getSemesters = () => {
        const year = new Date().getFullYear();
        const semesters = [
            { name: "1er semestre", startMonth: 0, endMonth: 5 },
            { name: "2do semestre", startMonth: 6, endMonth: 11 },
        ];

        const semestersEntries: IAttitudinal[] = [];
        const storedAttitudinal = JSON.parse(localStorage.getItem("attitudinalData") || "[]");

        semesters.forEach((semester, index) => {
            const startDate = new Date(year, semester.startMonth, 1).toISOString().split("T")[0];
            const endDate = new Date(year, semester.endMonth + 1, 0).toISOString().split("T")[0];

            const newId = storedAttitudinal.length + semestersEntries.length + 1;

            const semesterEntry: IAttitudinal = {
                id: newId,
                curso_id: courseId,
                nombre_valoracion: semester.name,
                fecha: `${startDate} a ${endDate}`,
                mes: index
            };

            semestersEntries.push(semesterEntry);
        });

        return semestersEntries;
    };

    const saveAttitudinal = (entries: IAttitudinal[]) => {
        const storedAttitudinal = JSON.parse(localStorage.getItem("attitudinalData") || "[]");
        const updatedAttitudinal = [...storedAttitudinal];

        entries.forEach((entry) => {
            const exists = storedAttitudinal.some((item: IAttitudinal) => item.fecha === entry.fecha);
            if (!exists) {
                updatedAttitudinal.push(entry);
            }
        });

        const uniqueAttitudinal = updatedAttitudinal.filter(
            (item, index, self) => index === self.findIndex((t) => t.fecha === item.fecha)
        );

        localStorage.setItem("attitudinalData", JSON.stringify(uniqueAttitudinal));
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
        setSelectedButton(configData?.attitudinal?.selectedButton || "");
    }, []);

    useEffect(() => {
        if (mounted) {
            const configData = JSON.parse(localStorage.getItem("configData") || "{}");
            const selectedConfigButton = configData?.attitudinal?.selectedButton || "";

            let entries: IAttitudinal[] = [];

            if (selectedConfigButton === "Diario") {
                entries = getDaysInMonth(monthIndex);
            } else if (selectedConfigButton === "Semanal") {
                entries = getWeek(monthIndex);
            } else if (selectedConfigButton === "Mensual") {
                entries = getMonths();
            } else if (selectedConfigButton === "Trimestral") {
                entries = getTrimesters();
            } else if (selectedConfigButton === "Cuatrimestral") {
                entries = getCuatrimesters();
            } else if (selectedConfigButton === "Semestral") {
                entries = getSemesters();
            }

            saveAttitudinal(entries);

            if (entries.length > 0) {
                setAttitudinalData(entries);
            }
        }
    }, [selectedDays, monthIndex, mounted]);

    useEffect(() => {
        const storedAttitudinal = JSON.parse(localStorage.getItem("attitudinalData") || "[]");
        const selectedConfigButton = JSON.parse(localStorage.getItem("configData") || "{}")?.attitudinal?.selectedButton || "";

        let filteredAttitudinal = [];

        if (selectedConfigButton === "Trimestral" || selectedConfigButton === "Cuatrimestral" || selectedConfigButton === "Semestral") {
            filteredAttitudinal = storedAttitudinal.filter(
                (attitudinal: IAttitudinal) => attitudinal.id
            );
        } else if (selectedConfigButton === "Diario" || selectedConfigButton === "Semanal") {
            filteredAttitudinal = storedAttitudinal.filter(
                (attitudinal: IAttitudinal) =>
                    attitudinal.mes === monthIndex && attitudinal.id
            );
        } else if (selectedConfigButton === "Mensual") {
            filteredAttitudinal = storedAttitudinal.filter(
                (attitudinal: IAttitudinal) => attitudinal.id
            );
        }

        setAttitudinalData(filteredAttitudinal);
    }, [monthIndex, mounted]);


    if (!mounted) {
        return null;
    }

    const handleMonthChange = (trimesterIndex: number) => {
        if (rangeType === "mensual") {

            const monthsInTrimester = trimesters[trimesterIndex];
            setMonthIndex(monthsInTrimester[0]);

        } else if (rangeType === "diario" || rangeType === "semanal") {

            setMonthIndex(trimesterIndex);
        }
    };


    return (
        <div>
            <SliderView onMonthChange={handleMonthChange} />
            <div className="relative mt-4">
                <div className="flex gap-4 pb-2">
                    {selectedButton === "Diario" &&
                        attitudinalData
                            .filter((attitudinal) => attitudinal.curso_id === courseId)
                            .map((attitudinal, index) => (
                                <div key={attitudinal.id} className="inline-block">
                                    <button
                                        type="button"
                                        className={`min-w-[170px] min-h-8 text-black border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-general ${colors[index % colors.length]}`}
                                        data-date={attitudinal.fecha}
                                    >
                                        {`${attitudinal.nombre_valoracion} ${attitudinal.fecha.split("-")[2]}/${(monthIndex + 1).toString().padStart(2, "0")}`}
                                    </button>
                                    {studentList && studentList.length > 0 && (
                                        <div className="w-[170px] my-2 mt-10 flex flex-col gap-3">
                                            {studentList.slice(0, 7).map((student) => (
                                                <DropdownAttitudinal
                                                    key={`${student.id}-${attitudinal.id}`}
                                                    studentId={student.id}
                                                    attitudinalId={attitudinal.id}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                    {selectedButton === "Semanal" &&
                        attitudinalData
                            .filter((attitudinal) => attitudinal.curso_id === courseId)
                            .map((attitudinal, index) => (
                                <div key={attitudinal.id} className="inline-block">
                                    <button
                                        type="button"
                                        className={`min-w-[170px] min-h-8 text-black border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-general ${colors[index % colors.length]}`}
                                        data-date={attitudinal.fecha}
                                    >
                                        {`${attitudinal.nombre_valoracion}`}
                                    </button>
                                    {studentList && studentList.length > 0 && (
                                        <div className="w-[170px] my-2 mt-10 flex flex-col gap-3">
                                            {studentList.slice(0, 7).map((student) => (
                                                <DropdownAttitudinal
                                                    key={`${student.id}-${attitudinal.id}`}
                                                    studentId={student.id}
                                                    attitudinalId={attitudinal.id}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                    {selectedButton === "Mensual" &&
                        attitudinalData
                            .filter((attitudinal) => attitudinal.curso_id === courseId)
                            .filter((attitudinal) => {
                                const currentTrimester = trimesters[monthIndex];
                                return currentTrimester.includes(attitudinal.mes);
                            })
                            .map((attitudinal, index) => (
                                <div key={attitudinal.id} className="inline-block">
                                    <button
                                        type="button"
                                        className={`min-w-[170px] min-h-8 text-black border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-general ${colors[index % colors.length]}`}
                                        data-date={attitudinal.fecha}
                                    >
                                        {`${attitudinal.nombre_valoracion}`}
                                    </button>
                                    {studentList && studentList.length > 0 && (
                                        <div className="w-[170px] my-2 mt-10 flex flex-col gap-3">
                                            {studentList.slice(0, 7).map((student) => (
                                                <DropdownAttitudinal
                                                    key={`${student.id}-${attitudinal.id}`}
                                                    studentId={student.id}
                                                    attitudinalId={attitudinal.id}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                    {selectedButton === "Cuatrimestral" &&
                        attitudinalData
                            .filter((attitudinal) => attitudinal.curso_id === courseId)
                            .map((attitudinal, index) => (
                                <div key={attitudinal.id} className="inline-block">
                                    <button
                                        type="button"
                                        className={`min-w-[170px] min-h-8 text-black border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-general ${colors[index % colors.length]}`}
                                        data-date={attitudinal.fecha}
                                    >
                                        {`${attitudinal.nombre_valoracion}`}
                                    </button>
                                    {studentList && studentList.length > 0 && (
                                        <div className="w-[170px] my-2 mt-10 flex flex-col gap-3">
                                            {studentList.slice(0, 7).map((student) => (
                                                <DropdownAttitudinal
                                                    key={`${student.id}-${attitudinal.id}`}
                                                    studentId={student.id}
                                                    attitudinalId={attitudinal.id}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                    {selectedButton === "Trimestral" &&
                        attitudinalData
                            .filter((attitudinal) => attitudinal.curso_id === courseId)
                            .map((attitudinal, index) => (
                                <div key={attitudinal.id} className="inline-block">
                                    <button
                                        type="button"
                                        className={`min-w-[170px] min-h-8 text-black border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-general ${colors[index % colors.length]}`}
                                        data-date={attitudinal.fecha}
                                    >
                                        {`${attitudinal.nombre_valoracion}`}
                                    </button>
                                    {studentList && studentList.length > 0 && (
                                        <div className="w-[170px] my-2 mt-10 flex flex-col gap-3">
                                            {studentList.slice(0, 7).map((student) => (
                                                <DropdownAttitudinal
                                                    key={`${student.id}-${attitudinal.id}`}
                                                    studentId={student.id}
                                                    attitudinalId={attitudinal.id}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                    {selectedButton === "Semestral" &&
                        attitudinalData
                            .filter((attitudinal) => attitudinal.curso_id === courseId)
                            .map((attitudinal, index) => (
                                <div key={attitudinal.id} className="inline-block">
                                    <button
                                        type="button"
                                        className={`min-w-[170px] min-h-8 text-black border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-general ${colors[index % colors.length]}`}
                                        data-date={attitudinal.fecha}
                                    >
                                        {`${attitudinal.nombre_valoracion}`}
                                    </button>
                                    {studentList && studentList.length > 0 && (
                                        <div className="w-[170px] my-2 mt-10 flex flex-col gap-3">
                                            {studentList.slice(0, 7).map((student) => (
                                                <DropdownAttitudinal
                                                    key={`${student.id}-${attitudinal.id}`}
                                                    studentId={student.id}
                                                    attitudinalId={attitudinal.id}
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

export default withAuth(Attitudinal);