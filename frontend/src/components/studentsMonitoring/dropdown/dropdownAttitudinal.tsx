"use client";
import React, { useState, useEffect } from "react";

interface DropdownProps {
    studentId: number;
    attitudinalId: number;
}

export default function DropdownAttitudinal({ studentId, attitudinalId }: DropdownProps) {
    const [selectedOption, setSelectedOption] = useState("Sin asignar");
    const [options, setOptions] = useState<string[]>([]);

    useEffect(() => {
        const configData = localStorage.getItem("configData");
        if (!configData) return;

        const parsedConfigData = JSON.parse(configData);
        const currentUrl = window.location.href;

        if (currentUrl.includes("/attitudinal")) {
            setOptions([
                ...parsedConfigData?.attitudinal?.conceptualScale ?? [], "Sin asignar",
            ]);
        }
    }, []);

    useEffect(() => {
        if (typeof studentId === "undefined" || typeof attitudinalId === "undefined") {
            return;
        }

        const savedGrade = localStorage.getItem(`attitudinalGrade-${studentId}-${attitudinalId}`);

        if (savedGrade) {
            const parsedGrade = JSON.parse(savedGrade);
            setSelectedOption(parsedGrade);

        }
    }, [studentId, attitudinalId]);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value;
        setSelectedOption(selected);

        localStorage.setItem(`attitudinalGrade-${studentId}-${attitudinalId}`, JSON.stringify(selected));
    };

    const getOptionBackgroundColor = () => {
        if (selectedOption === "Sin asignar") {
            return "bg-gray-100";
        } else if (selectedOption === "Excelente") {
            return "bg-[#E6FAF2]";
        } else if (selectedOption === "Muy Bien") {
            return "bg-[#E6FAFE]";
        } else if (selectedOption === "Bien") {
            return "bg-[#FFFAEA]";
        } else if (selectedOption === "Deficiente") {
            return "bg-[#FEE6F3]";
        }

        const colorChange = options;
        const index = Math.min(colorChange.indexOf(selectedOption), 3);
        switch (index) {
            case 0:
                return "bg-[#FEE6F3]";
            case 1:
                return "bg-[#FFFAEA]";
            case 2:
                return "bg-[#E6FAFE]";
            case 3:
                return "bg-[#E6FAF2]";
            default:
                return "bg-gray-100";
        }
    };

    return (
        <div className="flex bg-white border-2 border-gray-600 rounded-md p-2 w-full h-[52px] text-sm">
            <select
                id="status"
                value={selectedOption}
                onChange={handleSelectChange}
                className={`border-1 rounded-md p-2 focus:outline-none w-full text-center ${getOptionBackgroundColor()}`}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}