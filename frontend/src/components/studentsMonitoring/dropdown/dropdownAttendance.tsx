"use client";
import React, { useState, useEffect } from "react";

interface DropdownProps {
    studentId: number;
    attendanceId: number;
}

export default function DropdownAttendance({ studentId, attendanceId }: DropdownProps) {
    const [selectedOption, setSelectedOption] = useState("Sin asignar");
    const [options, setOptions] = useState<string[]>([]);

    useEffect(() => {
        const configData = localStorage.getItem("configData");
        if (!configData) return;

        const parsedConfigData = JSON.parse(configData);
        const currentUrl = window.location.href;

        if (currentUrl.includes("/attendance")) {
            setOptions([
                ...parsedConfigData?.attendance?.conceptualScale ?? [],
                "Sin asignar",
            ]);
        }
    }, []);

    useEffect(() => {
        if (typeof studentId === "undefined" || typeof attendanceId === "undefined") {
            console.error("Error: studentId or attendanceId is undefined");
            return;
        }

        const savedGrade = localStorage.getItem(`attendanceGrade-${studentId}-${attendanceId}`);

        if (savedGrade) {
            const parsedGrade = JSON.parse(savedGrade);
            setSelectedOption(parsedGrade);

        }
    }, [studentId, attendanceId]);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value;
        setSelectedOption(selected);

        localStorage.setItem(`attendanceGrade-${studentId}-${attendanceId}`, JSON.stringify(selected));
    };

    const getOptionBackgroundColor = () => {
        if (selectedOption === "Sin asignar") {
            return "bg-gray-100";
        } else if (selectedOption === "Presente") {
            return "bg-[#E6FAF2]";
        } else if (selectedOption === "Ausente") {
            return "bg-[#FEE6F3]";
        } else if (selectedOption === "Llega tarde") {
            return "bg-[#E6FAFE]";
        }

        const colorChange = options;
        const index = Math.min(colorChange.indexOf(selectedOption), 2);
        switch (index) {
            case 0:
                return "bg-[#FEE6F3]";
            case 1:
                return "bg-[#E6FAFE]";
            case 2:
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
