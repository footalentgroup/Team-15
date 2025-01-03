"use client";
import React, { useState } from "react";

export default function SliderView() {
    const [cuatrimestreIndex, setCuatrimestreIndex] = useState(0);

    const cuatrimestres = [
        "Primer Cuatrimestre",
        "Segundo Cuatrimestre",
        "Tercer Cuatrimestre",
        "Cuarto Cuatrimestre",
    ];

    const handlePrev = () => {
        setCuatrimestreIndex(
            cuatrimestreIndex === 0 ? cuatrimestres.length - 1 : cuatrimestreIndex - 1
        );
    };

    const handleNext = () => {
        setCuatrimestreIndex(
            cuatrimestreIndex === cuatrimestres.length - 1 ? 0 : cuatrimestreIndex + 1
        );
    };

    return (
        <div className="flex gap-4 font-semibold text-md items-center my-4">
            <i
                className="fa-solid fa-angle-left cursor-pointer"
                onClick={handlePrev}
            ></i>
            <p className="transition-transform duration-500 ease-in-out w-[180px] text-center">
                {cuatrimestres[cuatrimestreIndex]}
            </p>
            <i
                className="fa-solid fa-angle-right cursor-pointer"
                onClick={handleNext}
            ></i>
        </div>
    );
}
