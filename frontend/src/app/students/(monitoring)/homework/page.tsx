"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import EmptyState from "@/components/studentsMonitoring/emptyState";
import SliderView from "@/components/studentsMonitoring/sliderOptionView";
import Dropdown from "@/components/studentsMonitoring/dropdown";
import { IStudents } from "@/interfaces/IStudents.interface";

export default function Homework() {
    const [mounted, setMounted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [taskDate, setTaskDate] = useState("");
    const [taskType, setTaskType] = useState("");
    const [taskTheme, setTaskTheme] = useState("");
    const [studentList, setStudentList] = useState<IStudents[] | null>(null);

    const [tasks, setTasks] = useState<{ name: string; date: string; type: string; theme: string }[]>([]);
    const colors = ["bg-pink-300", "bg-yellow-100", "bg-green-200", "bg-cyan-200"];

    const pathname = usePathname();

    useEffect(() => {
        const studentData = localStorage.getItem("studentsData");
        const studentList: IStudents[] = studentData ? JSON.parse(studentData) : null;

        setMounted(true);
        setStudentList(studentList);
    }, []);

    if (!mounted) {
        return null;
    }

    const isExam = pathname.includes("exam");
    const singular = isExam ? "examen" : "tarea";
    const plural = isExam ? "exámenes" : "tareas";

    const handleModalToggle = () => setIsModalOpen(!isModalOpen);

    const handleSaveTask = () => {
        const isTaskNameValid = taskName.trim() !== "";
        const isTaskDateValid = taskDate.trim() !== "";
        const isTaskTypeValid = taskType.trim() !== "";

        const taskThemeSelect = document.querySelector<HTMLSelectElement>("select[disabled]");
        const isTaskThemeValid = taskThemeSelect ? true : taskTheme.trim() !== "";

        if (isTaskNameValid && isTaskDateValid && isTaskTypeValid && isTaskThemeValid) {
            setTasks([...tasks, { name: taskName, date: taskDate, type: taskType, theme: taskTheme }]);
            handleModalToggle();
            setTaskName("");
            setTaskDate("");
            setTaskType("");
            setTaskTheme("");
        } else {
            alert("Por favor, completa los campos requeridos.");
        }
    };

    return (
        <div>
            <div>
                <SliderView />
            </div>

            <div className="flex gap-4 mt-4 flex-wrap">
                {tasks.map((task, index) => (
                    <div key={index}>
                        <button

                            type="button"
                            className={`min-w-[170px] min-h-8 text-black border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000] ${colors[index % colors.length]}`}
                        >
                            {task.name}
                        </button>
                        {studentList && studentList.length > 0 && (
                            <div className="w-[170px] my-2 mt-10 flex flex-col gap-3">
                                {studentList.map((student) => (
                                    <Dropdown key={student.id} />
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                <div className="flex flex-col items-center w-[170px]">
                    <button
                        type="button"
                        onClick={handleModalToggle}
                        className="min-w-[170px] min-h-8 bg-yellow-100 text-black border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000]"
                    >
                        +
                    </button>
                </div>
            </div>

            {tasks.length === 0 && (
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
                                value={taskName}
                                onChange={(event) => setTaskName(event.target.value)}
                                className="p-2 mb-4 rounded border-2 border-black text-sm w-[170px]"
                            />

                            <input
                                type="date"
                                placeholder="Fecha de la clase"
                                value={taskDate}
                                onChange={(event) => setTaskDate(event.target.value)}
                                className="p-2 mb-4 rounded w-[170px] border-2 border-gray-500 drop-shadow-[4px_4px_0px_#000000]"
                            />

                            <select
                                value={taskType}
                                onChange={(event) => setTaskType(event.target.value)}
                                className="p-2 mb-4 rounded w-[170px] border-2 border-gray-500 drop-shadow-[4px_4px_0px_#000000]"
                            >
                                <option value="">Tipo de tarea</option>
                                <option value="Cuestionario">Cuestionario</option>
                                <option value="Practico">Trabajo práctico</option>
                                <option value="Grupal">Trabajo grupal</option>
                            </select>

                            <select
                                value={taskTheme}
                                onChange={(event) => setTaskTheme(event.target.value)}
                                disabled
                                className="p-2 mb-4 rounded w-[170px] border-2 border-gray-500 bg-gray-200 text-gray-500 drop-shadow-[4px_4px_0px_#000000] cursor-not-allowed disabled:bg-gray-400 disabled:text-white disabled:opacity-75"
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
                                onClick={handleSaveTask}
                                className="bg-pink-500 text-white text-semibold px-4 py-2 rounded border-2 border-black drop-shadow-[4px_4px_0px_#000000]"
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
