"use client";
import { useState, useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AttendanceConfig = ({ onDataChange }: { onDataChange: (data: any) => void }) => {
    const [selectedButtons, setSelectedButtons] = useState<string[]>([]);
    const [justificationOption, setJustificationOption] = useState<string>("");

    const handleButtonClick = (value: string) => {
        if (selectedButtons.includes(value)) {
            setSelectedButtons(selectedButtons.filter((button) => button !== value));
        } else {
            setSelectedButtons([...selectedButtons, value]);
        }
    };

    const handleJustificationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setJustificationOption(event.target.value);
    };

    const buttons = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const [conceptualScale, setConceptualScale] = useState<string[]>(["Ausente", "Llega tarde", "Presente"]);

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
            selectedButtons,
            conceptualScale,
            justificationOption,
        });
    }, [selectedButtons, conceptualScale, justificationOption, onDataChange]);

    return (
        <div>
            <h3 className="text-[32px] font-bold mt-12">Asistencia</h3>
            <h5 className="text-[22px] font-semibold">
                Seleccioná los días de la semana en los que debés llevar asistencia en este curso.
            </h5>

            <div className="flex gap-4 my-6">
                {buttons.map((button) => (
                    <button
                        type="button"
                        key={button}
                        className={`min-w-[170px] min-h-12 text-black border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-general ${selectedButtons.includes(button) ? "bg-yellow-400" : "bg-white"
                            }`}
                        onClick={() => handleButtonClick(button)}
                    >
                        {button}
                    </button>
                ))}
            </div>

            <div className="ml-6 mt-2">
                <h5 className="font-semibold text-[22px]">
                    Escala de Seguimiento
                </h5>
                <p className="font-normal text-[20px]">
                    Escribí la escala en orden de peor a mejor valoración.
                </p>
                <div className="flex gap-4 mt-2 mb-4">
                    {conceptualScale.map((value, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <input
                                type="text"
                                placeholder={value}
                                onChange={(event) => handleConceptualChange(index, event.target.value)}
                                className="border-2 border-black rounded-md p-2 text-black w-40 text-sm h-[48px]"
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
                        className="border-1 rounded-[15px] p-2 text-white w-10 text-sm bg-pink-500 drop-shadow-general w-[48px]"
                    >
                        <i className="fa-solid fa-plus"></i>
                    </button>
                </div>

                <label className="my-4">
                    <span className="text-[20px] mb-4">¿Registrás faltas justificadas?</span>

                    <div className="flex items-center space-x-4 mt-4">
                        <div>
                            <input
                                type="radio"
                                id="yes"
                                name="justificado"
                                value="Sí"
                                checked={justificationOption === "Sí"}
                                onChange={handleJustificationChange}
                                className="appearance-none form-radio text-blue-500 checked:bg-green-400 h-4 w-4 border-2 border-black cursor-pointer text-[20px]"
                            />
                            <label htmlFor="yes" className="ml-2 cursor-pointer">Sí</label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                id="no"
                                name="justificado"
                                value="No"
                                checked={justificationOption === "No"}
                                onChange={handleJustificationChange}
                                className="appearance-none form-radio text-blue-500 checked:bg-green-400 h-4 w-4 border-2 border-black cursor-pointer text-[20px]"
                            />
                            <label htmlFor="no" className="ml-2 cursor-pointer">No</label>
                        </div>
                    </div>
                </label>
            </div>
        </div>
    );
};

export default AttendanceConfig;
