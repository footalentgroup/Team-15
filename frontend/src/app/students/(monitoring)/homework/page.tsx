"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { IStudents } from "@/interfaces/IStudents.interface";
import { IHomework } from "@/interfaces/IHomework.interfaces";
import { ICourses } from "@/interfaces/ICourses.interface";
import EmptyState from "@/components/studentsMonitoring/emptyState";
import SliderView from "@/components/studentsMonitoring/sliderOptionView";
import DropdownHomework from "@/components/studentsMonitoring/dropdown/dropdownHomework";
import withAuth from "@/actions/withAuth";

const Homework: React.FC = () => {
    const [mounted, setMounted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [homeworkName, setHomeworkName] = useState("");
    const [homeworkDate, setHomeworkDate] = useState("");
    const [homeworkType, setHomeworkType] = useState("");
    const [homeworkTheme, setHomeworkTheme] = useState("");
    const [studentList, setStudentList] = useState<IStudents[] | null>(null);
    const [homeworkGrade, setHomeworkGrade] = useState<string | number>("Sin asignar");
    const [homeworkGradeType, setHomeworkGradeType] = useState("");
    const [homeworks, setHomeworks] = useState<IHomework[]>([]);
    const [currentCourse, setCurrentCourse] = useState<ICourses | null>(null);

    useEffect(() => {
        const currentCourse = localStorage.getItem("currentCourse");
        if (currentCourse) {
            const parsedData = JSON.parse(currentCourse);
            setCurrentCourse(parsedData);
        }
    }, []);

    const courseId = currentCourse?.courseId || '';

    const [quarterIndex, setQuarterIndex] = useState(0);
    const colors = ["bg-pink-300", "bg-yellow-100", "bg-green-200", "bg-cyan-200"];

    const pathname = usePathname();

    useEffect(() => {
        const studentData = localStorage.getItem("studentsData");
        if (studentData) {
            const parsedData = JSON.parse(studentData);
            const studentsArray = Array.isArray(parsedData) ? parsedData : [];
            setStudentList(studentsArray);
        } else {
            setStudentList(null);
        }

        const savedHomeworks = localStorage.getItem("homeworks");
        if (savedHomeworks) {
            setHomeworks(JSON.parse(savedHomeworks));
        }

        const configData = localStorage.getItem("configData");
        if (configData) {
            const parsedConfig = JSON.parse(configData);
            setHomeworkGradeType(parsedConfig.homework?.gradeType || "");
        }

        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const filteredHomeworks = homeworks.filter(
        (homework) => homework.curso_id === courseId && homework.cuatrimestre === quarterIndex && homework.tarea_asignada_id
    );


    const isExam = pathname.includes("exam");
    const singular = isExam ? "examen" : "tarea";
    const plural = isExam ? "exámenes" : "tareas";

    const handleModalToggle = () => setIsModalOpen(!isModalOpen);

    const handleGradeChange = (grade: string | number) => {
        setHomeworkGrade(grade);
    };

    const handleSaveHomework = () => {
        if (homeworkName.trim() && homeworkDate.trim() && homeworkType.trim()) {
            const newHomework: IHomework = {
                curso_id: courseId,
                tarea_asignada_id: homeworks.length + 1,
                nombre: homeworkName,
                fecha: homeworkDate,
                tipo_calificacion: homeworkGradeType as 'approved' | 'numeric' | 'conceptual',
                tipo_tarea: homeworkType,
                calificacion: homeworkGrade,
                cuatrimestre: quarterIndex,
            };

            const updatedHomeworks = [...homeworks, newHomework];
            setHomeworks(updatedHomeworks);
            localStorage.setItem("homeworks", JSON.stringify(updatedHomeworks));

            handleModalToggle();
            setHomeworkName("");
            setHomeworkDate("");
            setHomeworkGradeType("");
            setHomeworkType("");
            setHomeworkTheme("");
            setHomeworkGrade("");
        } else {
            alert("Por favor, completa los campos requeridos.");
        }
    };

    const handleQuarterChange = (index: number) => {
        setQuarterIndex(index);
    };

    return (
        <div>
            <div>
                <SliderView onCuatrimestreChange={handleQuarterChange} />
            </div>

            <div className="flex gap-4 mt-4 flex-wrap">
                {filteredHomeworks.map((homework, index) => (
                    <div key={homework.tarea_asignada_id}>
                        <button
                            type="button"
                            className={`min-w-[170px] min-h-8 text-black border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-general ${colors[index % colors.length]}`}
                        >
                            {homework.nombre}
                        </button>

                        {studentList && studentList.length > 0 && (
                            <div className="w-[170px] my-2 mt-10 flex flex-col gap-3">
                                {studentList.slice(0, 7).map((student) => (
                                    <DropdownHomework
                                        key={`${student.id}-${homework.tarea_asignada_id}`}
                                        studentId={student.id}
                                        homeworkId={homework.tarea_asignada_id}
                                        onGradeChange={handleGradeChange}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                <div className="flex flex-col items-center w-[170px]">
                    <button
                        type="button"
                        onClick={handleModalToggle}
                        className="min-w-[170px] min-h-8 bg-yellow-100 text-black border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-general"
                    >
                        +
                    </button>
                </div>
            </div>

            {filteredHomeworks.length === 0 && (
                <div>
                    <EmptyState singular={singular} plural={plural} />
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
                    <div className="bg-yellow-100 border-2 border-black p-6 rounded-md shadow-lg max-w-lg w-[500px] relative">
                        <button
                            type="button"
                            onClick={handleModalToggle}
                            className="absolute text-gray-800 text-sm font-bold top-6 right-6"
                        >
                            <i className="fa-solid fa-x"></i>
                        </button>
                        <h2 className="text-lg font-bold mb-4">Tarea</h2>

                        <div className="flex flex-col">
                            <input
                                type="text"
                                placeholder="Título de la tarea"
                                value={homeworkName}
                                onChange={(event) => setHomeworkName(event.target.value)}
                                className="p-2 mb-4 rounded border-2 border-black text-sm w-[170px]"
                            />

                            <input
                                type="date"
                                placeholder="Fecha de la clase"
                                value={homeworkDate}
                                onChange={(event) => setHomeworkDate(event.target.value)}
                                className="p-2 mb-4 rounded w-[170px] border-2 border-gray-500 drop-shadow-general"
                            />

                            <select
                                value={homeworkType}
                                onChange={(event) => setHomeworkType(event.target.value)}
                                className="p-2 mb-4 rounded w-[170px] border-2 border-gray-500 drop-shadow-general"
                            >
                                <option value="">Tipo de tarea</option>
                                <option value="Cuestionario">Cuestionario</option>
                                <option value="Practico">Trabajo práctico</option>
                                <option value="Grupal">Trabajo grupal</option>
                            </select>

                            <select
                                value={homeworkTheme}
                                onChange={(event) => setHomeworkTheme(event.target.value)}
                                disabled
                                className="p-2 mb-4 rounded w-[170px] border-2 border-gray-500 bg-gray-200 text-gray-500 drop-shadow-general cursor-not-allowed disabled:bg-gray-400 disabled:text-white disabled:opacity-75"
                            >
                                <option value="">Tema</option>
                            </select>
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                type="button"
                                onClick={handleModalToggle}
                                className="bg-gray-100 text-black text-semibold px-4 py-2 rounded"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={handleSaveHomework}
                                className="bg-pink-500 text-white text-semibold px-4 py-2 rounded border-2 border-black drop-shadow-general"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default withAuth(Homework);