"use client";
import React, { useState, useEffect } from "react";

interface DropdownProps {
    onGradeChange: (grade: string | number) => void;
    studentId: number;
    examId: number;
}

export default function DropdownExam({ onGradeChange,
    studentId,
    examId,
}: DropdownProps) {
    const [selectedOption, setSelectedOption] = useState("Sin asignar");
    const [options, setOptions] = useState<string[]>([]);
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [numericValue, setNumericValue] = useState<number | string>("");

    const [minGrade, setMinGrade] = useState(0);
    const [maxGrade, setMaxGrade] = useState(100);
    const [passingGrade, setPassingGrade] = useState(50);

    useEffect(() => {
        const configData = localStorage.getItem("configData");
        if (!configData) return;

        const parsedConfigData = JSON.parse(configData);
        const currentUrl = window.location.href;

        if (currentUrl.includes("/exam")) {
            const gradeTypeExam = parsedConfigData?.exam?.gradeType;

            if (gradeTypeExam === "approved") {
                setOptions(["Sin asignar", "Aprobado", "Desaprobado"]);
            } else if (gradeTypeExam === "numeric") {
                setIsInputVisible(true);
                setMinGrade(parsedConfigData?.exam?.minGrade ?? 0);
                setMaxGrade(parsedConfigData?.exam?.maxGrade ?? 100);
                setPassingGrade(parsedConfigData?.exam?.passingGrade ?? 50);
            } else if (gradeTypeExam === "conceptual") {
                setOptions([
                    ...parsedConfigData?.exam?.conceptualScale ?? [],
                    "Sin asignar",
                ]);
            }
        }
    }, []);

    useEffect(() => {
        if (typeof studentId === "undefined" || typeof examId === "undefined") {
            return;
        }

        const savedGrade = localStorage.getItem(`examGrade-${studentId}-${examId}`);
        if (savedGrade) {
            const parsedGrade = JSON.parse(savedGrade);
            if (typeof parsedGrade === "number") {
                setNumericValue(parsedGrade);
            } else {
                setSelectedOption(parsedGrade);
            }
        }
    }, [studentId, examId]);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value;
        setSelectedOption(selected);
        onGradeChange(selected);

        localStorage.setItem(`examGrade-${studentId}-${examId}`, JSON.stringify(selected));
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        if (value >= minGrade && value <= maxGrade) {
            setNumericValue(value);
            onGradeChange(value);

            localStorage.setItem(`examGrade-${studentId}-${examId}`, JSON.stringify(value));
        } else {
            setNumericValue("");
        }
    };
    const getInputBackgroundColor = () => {
        if (!numericValue) {
            return "bg-gray-100";
        }

        const numeric = Number(numericValue);
        if (!isNaN(numeric) && numeric < passingGrade) {
            return "bg-[#FEE6F3]";
        } else if (!isNaN(numeric) && numeric >= passingGrade) {
            return "bg-[#E6FAF2]";
        }

        return "bg-gray-100";
    };


    const getOptionBackgroundColor = () => {
        if (selectedOption === "Aprobado") {
            return "bg-[#E6FAF2]";
        } else if (selectedOption === "Desaprobado") {
            return "bg-[#FEE6F3]";
        } else if (selectedOption === "Sin asignar") {
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
            {isInputVisible ? (
                <input
                    type="number"
                    value={numericValue}
                    onChange={handleInputChange}
                    min={minGrade}
                    max={maxGrade}
                    className={`border-1 rounded-md p-2 focus:outline-none w-full text-center ${getInputBackgroundColor()}`}
                    placeholder={`Calificación (${minGrade}-${maxGrade})`}
                />
            ) : (
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
            )}
        </div>
    );
}