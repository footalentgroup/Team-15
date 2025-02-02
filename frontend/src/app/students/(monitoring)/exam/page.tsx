"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { IStudents } from "@/interfaces/IStudents.interface";
import { IExam } from "@/interfaces/IExam.interfaces";
import { ICourses } from "@/interfaces/ICourses.interface";
import EmptyState from "@/components/studentsMonitoring/emptyState";
import SliderView from "@/components/studentsMonitoring/sliderOptionView";
import DropdownExam from "@/components/studentsMonitoring/dropdown/dropdownExam";
import withAuth from "@/actions/withAuth";
import Snackbar from "@/ui/snackbars/successBar";

const Exam: React.FC = () => {
    const [mounted, setMounted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [examName, setExamName] = useState("");
    const [examDate, setExamDate] = useState("");
    const [examType, setExamType] = useState("");
    const [examTheme, setExamTheme] = useState("");
    const [studentList, setStudentList] = useState<IStudents[] | null>(null);;
    const [examGrade, setExamGrade] = useState<string | number>("Sin asignar");
    const [examGradeType, setExamGradeType] = useState("");
    const [exams, setExams] = useState<IExam[]>([]);
    const [currentCourse, setCurrentCourse] = useState<ICourses | null>(null);
    const [showSnackbar, setShowSnackbar] = useState(false);

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

        const savedExams = localStorage.getItem("exams");
        if (savedExams) {
            setExams(JSON.parse(savedExams));
        }

        const configData = localStorage.getItem("configData");
        if (configData) {
            const parsedConfig = JSON.parse(configData);
            setExamGradeType(parsedConfig.exam?.gradeType || "");
        }

        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const filteredExams = exams.filter(
        (exam) => exam.curso_id === courseId && exam.cuatrimestre === quarterIndex && exam.examen_asignado_id
    );

    const isExam = pathname.includes("exam");
    const singular = isExam ? "examen" : "tarea";
    const plural = isExam ? "exámenes" : "tareas";

    const handleModalToggle = () => setIsModalOpen(!isModalOpen);

    const handleGradeChange = (grade: string | number) => {
        setExamGrade(grade);
    };

    const handleSaveExam = () => {
        if (examName.trim() && examDate.trim() && examType.trim()) {
            const newExam: IExam = {
                curso_id: courseId,
                examen_asignado_id: exams.length + 1,
                nombre: examName,
                fecha: examDate,
                tipo_calificacion: examGradeType as 'approved' | 'numeric' | 'conceptual',
                tipo_examen: examType,
                calificacion: examGrade,
                cuatrimestre: quarterIndex,
            };

            const updatedExams = [...exams, newExam];
            setExams(updatedExams);
            localStorage.setItem("exams", JSON.stringify(updatedExams));
            setShowSnackbar(true);

            handleModalToggle();
            setExamName("");
            setExamDate("");
            setExamGradeType("");
            setExamType("");
            setExamTheme("");
            setExamGrade("");
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
                {filteredExams.map((exam, index) => (
                    <div key={exam.examen_asignado_id}>
                        <button
                            type="button"
                            className={`min-w-[170px] min-h-8 text-black border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-general ${colors[index % colors.length]}`}
                        >
                            {exam.nombre}
                        </button>

                        {studentList && studentList.length > 0 && (
                            <div className="w-[170px] my-2 mt-10 flex flex-col gap-3">
                                {studentList.slice(0, 7).map((student) => (
                                    <DropdownExam
                                        key={`${student.id}-${exam.examen_asignado_id}`}
                                        studentId={student.id}
                                        examId={exam.examen_asignado_id}
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

            {filteredExams.length === 0 && (
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
                        <h2 className="text-lg font-bold mb-4">Examen</h2>

                        <div className="flex flex-col">
                            <input
                                type="text"
                                placeholder="Título del examen"
                                value={examName}
                                onChange={(event) => setExamName(event.target.value)}
                                className="p-2 mb-4 rounded border-2 border-black text-sm w-[170px]"
                            />

                            <input
                                type="date"
                                placeholder="Fecha de la clase"
                                value={examDate}
                                onChange={(event) => setExamDate(event.target.value)}
                                className="p-2 mb-4 rounded w-[170px] border-2 border-gray-500 drop-shadow-general"
                            />

                            <select
                                value={examType}
                                onChange={(event) => setExamType(event.target.value)}
                                className="p-2 mb-4 rounded w-[170px] border-2 border-gray-500 drop-shadow-general"
                            >
                                <option value="">Tipo de examen</option>
                                <option value="Regular">Examen Regular</option>
                                <option value="Recuperatorio">Examen Recuperatorio</option>
                            </select>

                            <select
                                value={examTheme}
                                onChange={(event) => setExamTheme(event.target.value)}
                                disabled
                                className="p-2 mb-4 rounded w-[170px] border-2 border-gray-500 bg-gray-200 text-gray-500 drop-shadow-general cursor-not-allowed disabled:bg-gray-400 disabled:text-white disabled:opacity-75"
                            >
                                <option value="">Unidad</option>
                                <option value="1">Unidad 1</option>
                                <option value="2">Unidad 2</option>
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
                                onClick={handleSaveExam}
                                className="bg-pink-500 text-white text-semibold px-4 py-2 rounded border-2 border-black drop-shadow-general"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showSnackbar && (
                <Snackbar message="Creaste un exámen con éxito" onClose={() => setShowSnackbar(false)} />
            )}

        </div>
    )
}

export default withAuth(Exam);