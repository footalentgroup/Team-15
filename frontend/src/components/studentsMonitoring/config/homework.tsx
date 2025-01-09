"use client";
import React, { useState, useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HomeworkConfig = ({ onDataChange }: { onDataChange: (data: any) => void }) => {
    const [gradeType, setGradeType] = useState<string | null>("numeric");
    const [minGrade, setMinGrade] = useState<number | "">("");
    const [maxGrade, setMaxGrade] = useState<number | "">("");
    const [passingGrade, setPassingGrade] = useState<number | "">("");
    const [conceptualScale, setConceptualScale] = useState<string[]>([
        "Deficiente", "Bien", "Muy Bien", "Excelente"
    ]);

    const handleGradeTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGradeType(event.target.value);
        if (event.target.value !== "conceptual") {
            setConceptualScale(["Deficiente", "Bien", "Muy Bien", "Excelente"]);
        }
    };

    const handleMinGradeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMinGrade(Number(event.target.value) || "");
    };

    const handleMaxGradeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaxGrade(Number(event.target.value) || "");
    };

    const handlePassingGradeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassingGrade(Number(event.target.value) || "");
    };

    const addConceptualValue = () => {
        setConceptualScale([...conceptualScale, ""]);
    };

    const handleConceptualChange = (index: number, value: string) => {
        const newScale = [...conceptualScale];
        newScale[index] = value;
        setConceptualScale(newScale);
    };

    const removeConceptualValue = (index: number) => {
        const newScale = [...conceptualScale];
        newScale.splice(index, 1);
        setConceptualScale(newScale);
    };

    useEffect(() => {
        onDataChange({
            gradeType,
            minGrade,
            maxGrade,
            passingGrade,
            conceptualScale
        });
    }, [gradeType, minGrade, maxGrade, passingGrade, conceptualScale, onDataChange]);

    return (
        <div>
            <h3 className="text-[24px] font-bold mt-12">Tareas</h3>
            <h5 className="text-[16px] font-semibold">
                Configurá como vas a registrar las notas de las tareas de este curso.
            </h5>

            <div>
                <div>
                    <div className="flex items-center space-x-2 mt-4">
                        <input
                            type="radio"
                            id="approved"
                            name="gradeType"
                            value="approved"
                            checked={gradeType === "approved"}
                            onChange={handleGradeTypeChange}
                            className="cursor-pointer accent-pink-500 w-4 h-4"
                        />
                        <label htmlFor="approved" className="cursor-pointer font-semibold">
                            Aprobado/Desaprobado
                        </label>
                    </div>
                    <div className="flex items-center space-x-2 mt-4">
                        <input
                            type="radio"
                            id="numeric"
                            name="gradeType"
                            value="numeric"
                            checked={gradeType === "numeric"}
                            onChange={handleGradeTypeChange}
                            className="cursor-pointer accent-pink-500 w-4 h-4"
                        />
                        <label htmlFor="numeric" className="cursor-pointer font-semibold">
                            Nota Numérica
                        </label>
                    </div>

                    <div className="ml-6 mt-2">
                        <div className="flex gap-4 items-center">
                            <p className="font-normal text-sm">Rango de notas:</p>
                            <input
                                type="number"
                                min={0}
                                value={minGrade === "" ? "" : minGrade}
                                onChange={handleMinGradeChange}
                                placeholder="Min"
                                className="border-2 border-black rounded-md p-2 bg-white text-black text-bold text-center text-sm w-20"
                            />
                            <input
                                type="number"
                                value={maxGrade === "" ? "" : maxGrade}
                                onChange={handleMaxGradeChange}
                                placeholder="Max"
                                className="border-2 border-black rounded-md p-2 bg-white text-black text-bold text-center text-sm w-20"
                            />
                        </div>
                        {minGrade && maxGrade && maxGrade < minGrade && (
                            <p className="text-red-500 text-sm mt-2">La nota máxima debe ser mayor que la mínima.</p>
                        )}

                        <div className="flex gap-4 items-center mt-2">
                            <p className="font-normal text-sm">Nota mínima para aprobar</p>
                            <input
                                type="number"
                                min={0}
                                value={passingGrade === "" ? "" : passingGrade}
                                onChange={handlePassingGradeChange}
                                className="border-2 border-black rounded-md p-2 bg-white text-black text-bold text-center text-sm w-20"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 mt-4">
                        <input
                            type="radio"
                            id="conceptual"
                            name="gradeType"
                            value="conceptual"
                            checked={gradeType === "conceptual"}
                            onChange={handleGradeTypeChange}
                            className="cursor-pointer accent-pink-500 w-4 h-4"
                        />
                        <label htmlFor="conceptual" className="cursor-pointer font-semibold">
                            Nota Conceptual
                        </label>
                    </div>

                    <div className="ml-6 mt-2">
                        <p className="font-normal text-sm">
                            Escribí la escala en orden de peor a mejor valoración.
                        </p>
                        <div className="flex gap-4 mt-2">
                            {conceptualScale.map((value, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        placeholder={value}
                                        onChange={(event) => handleConceptualChange(index, event.target.value)}
                                        className="border-2 border-black rounded-md p-2 text-black w-40 text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeConceptualValue(index)}
                                        className="absolute translate-x-[130px] text-gray-500 text-sm index-10"
                                    >
                                        <i className="fa-solid fa-times"></i>
                                    </button>

                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addConceptualValue}
                                className="border-1 rounded-[15px] p-2 text-white w-10 text-sm bg-pink-500 drop-shadow-[4px_4px_0px_#000000]"
                            >
                                <i className="fa-solid fa-plus"></i>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeworkConfig;