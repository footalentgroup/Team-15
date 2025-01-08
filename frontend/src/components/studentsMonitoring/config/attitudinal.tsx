"use client";
import { useState, useEffect } from "react";

const AttitudinalConfig = ({ onDataChange }: { onDataChange: (data: any) => void }) => {
    const [selectedButton, setSelectedButton] = useState<string | null>(null);

    const handleButtonClick = (value: string) => {
        setSelectedButton(value);
    };

    const buttons = ["Diario", "Semanal", "Mensual", "Cuatrimestral", "Trimestral"];
    const [conceptualScale, setConceptualScale] = useState<string[]>([
            "Deficiente", "Bien", "Muy Bien", "Excelente"
        ]);

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
            selectedButton,
            conceptualScale,
        });
    }, [selectedButton, conceptualScale, onDataChange]);

    return (
        <div>
            <h3 className="text-[24px] font-bold mt-12">Actitudinal</h3>
            <h5 className="text-[16px] font-semibold">
                Seleccioná la frecuencia que prefieras para llevar el seguimiento actitudinal
            </h5>

            <div className="flex gap-4 my-6">
                {buttons.map((button) => (
                    <button
                        type="button"
                        key={button}
                        className={`min-w-[170px] min-h-12 text-black border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000] ${selectedButton === button ? "bg-yellow-400" : "bg-white"
                            }`}
                        onClick={() => handleButtonClick(button)}
                    >
                        {button}
                    </button>
                ))}
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
    );
};

export default AttitudinalConfig;
