"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface SliderViewProps {
    onMonthChange: (index: number) => void;
    onCuatrimestreChange: (index: number) => void;
}

export default function SliderView({ onMonthChange, onCuatrimestreChange }: SliderViewProps) {
    const pathname = usePathname();
    const [monthIndex, setMonthIndex] = useState(0);
    const [cuatrimestreIndex, setCuatrimestreIndex] = useState(0);
    const [title, setTitle] = useState("");
    const [isHidden, setIsHidden] = useState(false);

    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const getCuatrimestre = () => {
        switch (cuatrimestreIndex) {
            case 0:
                return "Primer cuatrimestre";
            case 1:
                return "Segundo cuatrimestre";
            case 2:
                return "Tercer cuatrimestre";
            case 3:
                return "Cuarto cuatrimestre";
            default:
                return "Primer cuatrimestre";
        }
    };

    useEffect(() => {
        const configData = localStorage.getItem("configData");

        if (configData) {
            const parsedConfig = JSON.parse(configData);
            const selectedButton = parsedConfig.attitudinal?.selectedButton;
            console.log("Selected Button from attitudinal:", selectedButton);

            if (pathname.includes("/attendance")) {
                setTitle(`Asistencia de ${months[monthIndex]}`);
            } else if (pathname.includes("/attitudinal")) {
                if (selectedButton === "Diario" || selectedButton === "Semanal" || selectedButton === "Mensual") {
                    setTitle(`Seguimiento actitudinal de ${months[monthIndex]}`);
                } else if (selectedButton === "Cuatrimestral" || selectedButton === "Trimestral" || selectedButton === "Semestral") {
                    setTitle("");
                    setIsHidden(true);
                } else {
                    setTitle("Seguimiento actitudinal");
                }
            } else if (pathname.includes("/homework") || pathname.includes("/exam")) {
                setTitle(getCuatrimestre());
            }
        }
    }, [pathname, monthIndex, cuatrimestreIndex]);

    const handlePrevMonth = () => {
        const newIndex = monthIndex === 0 ? months.length - 1 : monthIndex - 1;
        setMonthIndex(newIndex);
        onMonthChange(newIndex);
    };

    const handleNextMonth = () => {
        const newIndex = monthIndex === months.length - 1 ? 0 : monthIndex + 1;
        setMonthIndex(newIndex);
        onMonthChange(newIndex);
    };

    const handlePrevCuatrimestre = () => {
        const newIndex = cuatrimestreIndex === 0 ? 3 : cuatrimestreIndex - 1;
        setCuatrimestreIndex(newIndex);
        onCuatrimestreChange(newIndex);
    };

    const handleNextCuatrimestre = () => {
        const newIndex = cuatrimestreIndex === 3 ? 0 : cuatrimestreIndex + 1;
        setCuatrimestreIndex(newIndex);
        onCuatrimestreChange(newIndex);
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
                        className={`transition-transform duration-500 ease-in-out text-center ${pathname.includes("/attitudinal") ? "w-[380px]" : "w-[250px]"
                            }`}
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
