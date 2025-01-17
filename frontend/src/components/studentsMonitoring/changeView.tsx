"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ChangeView = () => {
    const pathname = usePathname();
    const links = ["/students/homework", "/students/exam", "/students/attitudinal", "/students/attendance"];

    return (
        <div className="flex gap-5 justify-end h-12">
            {["Tareas", "Exámenes", "Actitudinal", "Asistencia"].map((label, index) => (
                <Link href={links[index]} key={index}>
                    <button type="button" className={`min-w-[155px] min-h-12 ${pathname === links[index] ? "bg-yellow-500 text-black" : "bg-white text-black"} border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000]`}>
                        {label}
                    </button>
                </Link>
            ))}
        </div>
    );
};

export default ChangeView;
