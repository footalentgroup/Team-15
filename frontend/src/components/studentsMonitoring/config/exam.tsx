"use client";
import { useState, useEffect } from "react";

const ExamConfig = ({ onDataChange }: { onDataChange: (data: any) => void }) => {
    const [minGrade, setMinGrade] = useState<number | "">("");
    const [maxGrade, setMaxGrade] = useState<number | "">("");
    const [passingGrade, setPassingGrade] = useState<number | "">("");

    const handleMinGradeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMinGrade(Number(event.target.value) || "");
    };

    const handleMaxGradeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaxGrade(Number(event.target.value) || "");
    };

    const handlePassingGradeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassingGrade(Number(event.target.value) || "");
    };

    useEffect(() => {
        onDataChange({
            minGrade: minGrade === "" ? null : minGrade,
            maxGrade: maxGrade === "" ? null : maxGrade,
            passingGrade: passingGrade === "" ? null : passingGrade,
        });
    }, [minGrade, maxGrade, passingGrade, onDataChange]);

    return (
        <div>
            <h3 className="text-[24px] font-bold mt-12">Exámenes</h3>
            <h5 className="text-[16px] font-semibold">
                Configurá como vas a registrar las notas de los exámenes de este curso.
            </h5>

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
        </div>
    );
};

export default ExamConfig;
