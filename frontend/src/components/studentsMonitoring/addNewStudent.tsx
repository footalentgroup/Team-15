"use client";
import React, { useEffect, useState } from "react";
import { IStudents } from "@/interfaces/IStudents.interface";
import { IStudentRequest } from "@/interfaces/IRequests.interface";

export default function AddNewStudent() {
    const [data, setData] = useState<IStudents[]>([]);
    const [startIndex, setStartIndex] = useState(0);
    const [isEditMode, setIsEditMode] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [studentName, setStudentName] = useState("");
    const [studentToDelete, setStudentToDelete] = useState<number | null>(null);
    const [editingStudentId, setEditingStudentId] = useState<number | null>(null);
    const [isInputVisible, setIsInputVisible] = useState(false);;

    const showNext = () => {
        setStartIndex((prevIndex) => (prevIndex + 1) % data.length);
    };

    const showPrevious = () => {
        setStartIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
    };

    const studentsToShow = Array.isArray(data) && data.length <= 7
        ? data
        : Array.isArray(data)
            ? isEditMode
                ? data.slice(startIndex, startIndex + 6)
                : data.slice(startIndex, startIndex + 7)
            : [];

    const handleDelete = (id: number) => {
        setStudentToDelete(id);
        setShowModal(true);
    };

    const confirmDelete = () => {
        if (studentToDelete !== null) {
            const updatedData = data.filter(student => student.id !== studentToDelete);
            console.log("Datos después de eliminar:", updatedData);
            setData(updatedData);
            localStorage.setItem("studentsData", JSON.stringify({ alumnos: updatedData }));
        }
        setShowModal(false);
    };


    const cancelDelete = () => {
        setShowModal(false);
    };

    const handleEditClick = (id: number) => {
        setEditingStudentId(id);
    };

    const handleEditModeToggle = () => {
        setIsEditMode((prevMode) => !prevMode);
    
        if (isEditMode) {
            window.location.reload();
        }
    };

    const handleFullNameChange = (id: number, newFullName: string) => {
        const [newName, newLastName] = newFullName.split(" ");

        const updatedData = data.map(student =>
            student.id === id
                ? { ...student, nombre: newName || student.nombre, apellido: newLastName || student.apellido }
                : student
        );
        setData(updatedData);
    };

    const handleBlur = () => {
        localStorage.setItem("studentsData", JSON.stringify(data));
        setEditingStudentId(null);
    };

    const handleAddStudent = () => {
        if (studentName.trim()) {
            const [lastName, ...firstNameParts] = studentName.split(" ");
            const firstName = firstNameParts.join(" ");
    
            const newId = data && data.length > 0 
                ? Math.max(...data.map(student => student.id)) + 1 
                : 1; 
    
            const newStudent = { id: newId, curso_id: 1, nombre: firstName, apellido: lastName };
    
            const updatedData = [...data, newStudent];
            setData(updatedData);
    
            const updatedList = { alumnos: updatedData };
            localStorage.setItem("studentsData", JSON.stringify(updatedList));
    
            setStudentName("");
            setIsInputVisible(false);
        }
    };

    const handleCancelAddStudent = () => {
        setStudentName("");
        setIsInputVisible(false);
    };

    useEffect(() => {
        const alumnos = localStorage.getItem("studentsData"); 
        try {
            const parsedData = alumnos ? JSON.parse(alumnos) : { alumnos: [] };
            const studentsArray = Array.isArray(parsedData.alumnos) ? parsedData.alumnos : [];
            console.log("Datos procesados:", studentsArray);
            setData(studentsArray);
        } catch (error) {
            console.error("Error parsing students data:", error);
            setData([]); 
        }
    }, [])

    return (
        <div>
            <div className="flex flex-col w-48 h-3/4 gap-4 items-center">
                <div className="flex flex-col gap-4">
                    <button
                        type="button"
                        onClick={handleEditModeToggle}
                        className="min-w-[190px] min-h-8 bg-white text-black border-2 border-black font-semibold text-sm px-4 mt-[23px] mb-6 rounded-md filter drop-shadow-[4px_4px_0px_#000000]"
                    >
                        {isEditMode ? "Finalizar edición" : "Editar lista de alumnos"}
                    </button>

                    {isEditMode && (
                        <button
                            onClick={() => setIsInputVisible(true)}
                            type="button"
                            className="min-w-[190px] min-h-12 bg-white text-black border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000] flex justify-center items-center"
                        >
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    )}

                    {isInputVisible && (
                        <div className="flex items-center gap-2 relative">
                            <input
                                type="text"
                                id="studentName"
                                name="studentName"
                                placeholder="Apellido + Nombre"
                                value={studentName}
                                onChange={(event) => setStudentName(event.target.value)}
                                className="max-w-[190px] min-h-12 px-4 pr-10 border-2 border-black rounded-md text-sm"
                            />
                            <button
                                type="button"
                                onClick={handleAddStudent}
                                className="absolute right-9 text-green-600"
                            >
                                <i className="fa-solid fa-check"></i>
                            </button>
                            <button
                                type="button"
                                onClick={handleCancelAddStudent}
                                className="absolute right-4 text-red-600"
                            >
                                <i className="fa-solid fa-x"></i>
                            </button>
                        </div>
                    )}

                    {studentsToShow.map((student, index) => (
                        <div key={index} className="flex items-center gap-2">
                            {editingStudentId === student.id ? (
                                <input
                                    type="text"
                                    value={`${student.nombre} ${student.apellido}`}
                                    onChange={(event) => handleFullNameChange(student.id, event.target.value)}
                                    onBlur={handleBlur}
                                    className="max-w-[190px] min-h-12 px-4 border-2 border-black rounded-md text-sm"
                                />
                            ) : (
                                <button
                                    type="button"
                                    className="min-w-[190px] min-h-12 bg-white text-black border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000] flex justify-between items-center"
                                >
                                    <span className={`${isEditMode ? "" : "mx-auto"}`}>{student.nombre} {student.apellido}</span>

                                    {isEditMode && (
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                className="text-black"
                                                onClick={() => handleEditClick(student.id)}
                                            >
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>
                                            <button
                                                type="button"
                                                className="text-red-700"
                                                onClick={() => handleDelete(student.id)}
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </div>
                                    )}
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex justify-center gap-4 mt-1.5 my-1">
                    <button
                        type="button"
                        onClick={showPrevious}
                        className="h-6 w-6 bg-pink-500 text-white border-2 border-black font-semibold rounded-full filter drop-shadow-[2px_2px_0px_#000000]"
                    >
                        <i className="fa-solid fa-angle-up"></i>
                    </button>
                    <button
                        type="button"
                        onClick={showNext}
                        className="h-6 w-6 bg-pink-500 text-white border-2 border-black font-semibold rounded-full filter drop-shadow-[2px_2px_0px_#000000]"
                    >
                        <i className="fa-solid fa-angle-down"></i>
                    </button>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
                    <div className="bg-yellow-100 border-2 border-black p-6 rounded-md shadow-lg max-w-lg w-[450px] relative">
                        <button
                            type="button"
                            onClick={cancelDelete}
                            className="absolute text-gray-800 text-sm font-bold top-6 right-6"
                        >
                            <i className="fa-solid fa-x"></i>
                        </button>
                        <h2 className="text-lg font-bold mb-4">Eliminar alumno</h2>
                        <p className="my-6 text-gray-700">
                            ¿Estas seguro de querer eliminar este alumno de tu lista? No podrás recuperarlo una vez que lo hagas.
                        </p>
                        <div className="flex justify-end gap-6 mt-8">
                            <button
                                type="button"
                                onClick={confirmDelete}
                                className="bg-white text-black text-semibold px-4 py-2 rounded border-2 border-black drop-shadow-[4px_4px_0px_#000000]"
                            >
                                Aceptar
                            </button>
                            <button
                                type="button"
                                onClick={cancelDelete}
                                className="bg-pink-500 text-white text-semibold px-4 py-2 rounded border-2 border-black drop-shadow-[4px_4px_0px_#000000]"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
