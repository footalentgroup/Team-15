import React, { useState, useEffect } from "react";

interface DropdownProps {
    onGradeChange: (grade: string | number) => void;
    studentId: number;
    homeworkId: number;
}

export default function DropdownHomework({
    onGradeChange,
    studentId,
    homeworkId,
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

        if (currentUrl.includes("/homework")) {
            const gradeType = parsedConfigData?.homework?.gradeType;

            if (gradeType === "approved") {
                setOptions(["Sin asignar", "Aprobado", "Desaprobado"]);
            } else if (gradeType === "numeric") {
                setIsInputVisible(true);
                setMinGrade(parsedConfigData?.homework?.minGrade ?? 0);
                setMaxGrade(parsedConfigData?.homework?.maxGrade ?? 100);
                setPassingGrade(parsedConfigData?.homework?.passingGrade ?? 50);
            } else if (gradeType === "conceptual") {
                setOptions([...(parsedConfigData?.homework?.conceptualScale ?? []), "Sin asignar"]);
            }
        }
    }, []);

    useEffect(() => {
        if (typeof studentId === "undefined" || typeof homeworkId === "undefined") {
            console.error("Error: studentId or homeworkId is undefined");
            return;
        }

        const savedGrade = localStorage.getItem(`homeworkGrade-${studentId}-${homeworkId}`);
        if (savedGrade) {
            const parsedGrade = JSON.parse(savedGrade);
            if (typeof parsedGrade === "number") {
                setNumericValue(parsedGrade);
            } else {
                setSelectedOption(parsedGrade);
            }
        }
    }, [studentId, homeworkId]);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value;
        setSelectedOption(selected);
        onGradeChange(selected);

        localStorage.setItem(`homeworkGrade-${studentId}-${homeworkId}`, JSON.stringify(selected));
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        if (value >= minGrade && value <= maxGrade) {
            setNumericValue(value);
            onGradeChange(value);

            localStorage.setItem(`homeworkGrade-${studentId}-${homeworkId}`, JSON.stringify(value));
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
            return "bg-red-200";
        } else if (!isNaN(numeric) && numeric >= passingGrade) {
            return "bg-green-200";
        }

        return "bg-gray-100";
    };


    const getOptionBackgroundColor = () => {
        if (selectedOption === "Aprobado") {
            return "bg-green-100";
        } else if (selectedOption === "Desaprobado") {
            return "bg-red-100";
        } else if (selectedOption === "Sin asignar") {
            return "bg-gray-100";
        } else if (selectedOption === "Excelente") {
            return "bg-green-100";
        } else if (selectedOption === "Muy Bien") {
            return "bg-blue-100";
        } else if (selectedOption === "Bien") {
            return "bg-yellow-100";
        } else if (selectedOption === "Deficiente") {
            return "bg-red-100";
        }
        return "bg-gray-100";
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
