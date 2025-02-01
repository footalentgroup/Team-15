"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface SliderViewProps {
    onMonthChange?: (index: number) => void;
    onCuatrimestreChange?: (index: number) => void;
}

export default function SliderView({ onMonthChange, onCuatrimestreChange }: SliderViewProps) {
    const pathname = usePathname();
    const [monthIndex, setMonthIndex] = useState(0);
    const [cuatrimestreIndex, setCuatrimestreIndex] = useState(0);
    const [title, setTitle] = useState("");
    const [isHidden, setIsHidden] = useState(false);
    const [isMensual, setIsMensual] = useState(false);

    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const trimestres = ["1er Trimestre", "2do Trimestre", "3er Trimestre", "4to Trimestre"];

    const getCuatrimestre = () => {
        switch (cuatrimestreIndex) {
            case 0:
                return "Primer cuatrimestre";
            case 1:
                return "Segundo cuatrimestre";
            case 2:
                return "Tercer cuatrimestre";
            default:
                return "Primer cuatrimestre";
        }
    };

    useEffect(() => {
        const configData = localStorage.getItem("configData");

        if (configData) {
            const parsedConfig = JSON.parse(configData);
            const selectedButton = parsedConfig.attitudinal?.selectedButton;

            if (pathname.includes("/attendance")) {
                setTitle(`Asistencia de ${months[monthIndex]}`);
            } else if (pathname.includes("/attitudinal")) {
                if (selectedButton === "Mensual") {
                    setTitle(trimestres[monthIndex]);
                    setIsMensual(true);
                } else if (selectedButton === "Cuatrimestral" || selectedButton === "Trimestral" || selectedButton === "Semestral") {
                    setTitle("");
                    setIsHidden(true);
                    setIsMensual(false);
                } else {
                    setTitle(`Seguimiento actitudinal de ${months[monthIndex]}`);
                    setIsMensual(false);
                }
            } else if (pathname.includes("/homework") || pathname.includes("/exam")) {
                setTitle(getCuatrimestre());
            }
        }
    }, [pathname, monthIndex, cuatrimestreIndex]);

    const handlePrevMonth = () => {
        const length = isMensual ? trimestres.length : months.length;
        const newIndex = monthIndex === 0 ? length - 1 : monthIndex - 1;
        setMonthIndex(newIndex);
        if (onMonthChange) onMonthChange(newIndex);
    };

    const handleNextMonth = () => {
        const length = isMensual ? trimestres.length : months.length;
        const newIndex = monthIndex === length - 1 ? 0 : monthIndex + 1;
        setMonthIndex(newIndex);
        if (onMonthChange) onMonthChange(newIndex);
    };

    const handlePrevCuatrimestre = () => {
        const newIndex = cuatrimestreIndex === 0 ? 2 : cuatrimestreIndex - 1;
        setCuatrimestreIndex(newIndex);
        if (onCuatrimestreChange) onCuatrimestreChange(newIndex);
    };

    const handleNextCuatrimestre = () => {
        const newIndex = cuatrimestreIndex === 2 ? 0 : cuatrimestreIndex + 1;
        setCuatrimestreIndex(newIndex);
        if (onCuatrimestreChange) onCuatrimestreChange(newIndex);
    };

    return (
        <div className="flex font-semibold text-[20px] items-center my-4 h-[30px]">
            {pathname.includes("/homework") || pathname.includes("/exam") ? (
                <>
                    <i
                        className="fa-solid fa-angle-left cursor-pointer"
                        onClick={handlePrevCuatrimestre}
                    ></i>
                    <p className="transition-transform duration-500 ease-in-out w-[250px] text-center">
                        {title}
                    </p>
                    <i
                        className="fa-solid fa-angle-right cursor-pointer"
                        onClick={handleNextCuatrimestre}
                    ></i>
                </>
            ) : (
                <>
                    <i
                        className={`fa-solid fa-angle-left cursor-pointer ${isHidden ? "hidden" : ""}`}
                        onClick={handlePrevMonth}
                    ></i>
                    <p
                        className={`transition-transform duration-500 ease-in-out text-center ${pathname.includes("/attitudinal") && !isMensual ? "w-[380px]" : "w-[250px]"}`}
                    >
                        {title}
                    </p>
                    <i
                        className={`fa-solid fa-angle-right cursor-pointer ${isHidden ? "hidden" : ""}`}
                        onClick={handleNextMonth}
                    ></i>
                </>
            )}
        </div>
    );
}
