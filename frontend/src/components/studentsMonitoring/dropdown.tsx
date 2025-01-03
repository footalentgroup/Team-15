"use client";
import React, { useState, useEffect } from "react";

export default function Dropdown() {
    const [selectedOption, setSelectedOption] = useState("Sin asignar");
    const [isAttendancePage, setIsAttendancePage] = useState(false);

    // Verificar si la URL contiene la palabra "attendance"
    useEffect(() => {
        if (window.location.href.includes("attendance")) {
            setIsAttendancePage(true);
        }
    }, []);

    // Manejar cambio de selección
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    // Función para determinar el color de fondo
    const getBackgroundColor = () => {
        switch (selectedOption) {
            case "Aprobado":
                return "bg-green-100 text-gray-800";
            case "Reprobado":
                return "bg-red-200 text-gray-800";
            case "Presente":
                return "bg-green-200 text-gray-800";
            case "Ausente":
                return "bg-red-300 text-gray-800";
            case "Llegada tarde":
                return "bg-blue-100 text-gray-800";
            case "Sin asignar":
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    // Función para renderizar opciones dinámicamente
    const renderOptions = () => {
        if (isAttendancePage) {
            return (
                <>
                    <option value="Presente">Presente</option>
                    <option value="Ausente">Ausente</option>
                    <option value="Llegada tarde">Llegada tarde</option>
                    <option value="Sin asignar">Sin asignar</option>
                </>
            );
        } else {
            return (
                <>
                    <option value="Sin asignar">Sin asignar</option>
                    <option value="Aprobado">Aprobado</option>
                    <option value="Reprobado">Desaprobado</option>
                </>
            );
        }
    };

    return (
        <div className="flex bg-white border-2 border-gray-600 rounded-md p-2 w-full h-[52px] text-sm">
            <select
                id="status"
                value={selectedOption}
                onChange={handleChange}
                className={`border-1 rounded-md p-2 focus:outline-none w-full text-center ${getBackgroundColor()}`}
            >
                {renderOptions()}
            </select>
        </div>
    );
}
