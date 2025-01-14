"use client";
import React, { useState, useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CuatrimestreConfig = ({ onDataChange }: { onDataChange: (data: any) => void }) => {
    const [examPercentage, setExamPercentage] = useState<number | "">(0);
    const [taskPercentage, setTaskPercentage] = useState<number | "">(0);
    const [attitudePercentage, setAttitudePercentage] = useState<number | "">(0);

    const handleExamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value) || "";
        const remaining = 100 - (value || 0) - (taskPercentage || 0) - (attitudePercentage || 0);
        if (remaining >= 0) {
            setExamPercentage(value);
        } else {
            setExamPercentage(100 - (taskPercentage || 0) - (attitudePercentage || 0));
        }
    };

    const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value) || "";
        const remaining = 100 - (value || 0) - (examPercentage || 0) - (attitudePercentage || 0);
        if (remaining >= 0) {
            setTaskPercentage(value);
        } else {
            setTaskPercentage(100 - (examPercentage || 0) - (attitudePercentage || 0));
        }
    };

    const handleAttitudeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value) || "";
        const remaining = 100 - (value || 0) - (examPercentage || 0) - (taskPercentage || 0);
        if (remaining >= 0) {
            setAttitudePercentage(value);
        } else {
            setAttitudePercentage(100 - (examPercentage || 0) - (taskPercentage || 0));
        }
    };

    const handleSaveData = () => {
        if (examPercentage && taskPercentage && attitudePercentage) {
            onDataChange({
                examPercentage: examPercentage,
                taskPercentage: taskPercentage,
                attitudePercentage: attitudePercentage,
            });
        }
    };

    useEffect(() => {
        handleSaveData();
    }, [examPercentage, taskPercentage, attitudePercentage]);

    return (
        <div>
            <h3 className="text-[32px] font-bold pt-8">Cuatrimestre</h3>
            <h5 className="text-[22px] font-semibold">
                Elegí el porcentaje de incidencia en la nota de cierre para cada aspecto a evaluar.
            </h5>
            <p className="text-[20px]">La suma de los 3 debe dar el 100%.</p>
            <div className="flex gap-4 my-6">
                <label className="flex flex-col items-center justify-center">
                    <p className="text-[14px]">Éxamenes</p>
                    <input
                        type="number"
                        min={0}
                        max={100}
                        value={examPercentage === "" ? "" : examPercentage}
                        onChange={handleExamChange}
                        className="border-2 border-black rounded-md p-2 bg-lime-100 text-black text-bold text-center text-[28px]"
                    />
                </label>
                <label className="flex flex-col items-center justify-center">
                    <p className="text-[14px]">Tareas</p>
                    <input
                        type="number"
                        min={0}
                        max={100}
                        value={taskPercentage === "" ? "" : taskPercentage}
                        onChange={handleTaskChange}
                        className="border-2 border-black rounded-md p-2 bg-lime-100 text-black text-bold text-center text-[28px]"
                    />
                </label>
                <label className="flex flex-col items-center justify-center">
                    <p className="text-[14px]">Actitudinal</p>
                    <input
                        type="number"
                        min={0}
                        max={100}
                        value={attitudePercentage === "" ? "" : attitudePercentage}
                        onChange={handleAttitudeChange}
                        className="border-2 border-black rounded-md p-2 bg-lime-100 text-black text-bold text-center text-[28px]"
                    />
                </label>
            </div>
        </div>
    );
}

export default CuatrimestreConfig;
