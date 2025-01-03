"use client"
import React from "react";
import SearchBar from "@/components/searchBar/searchBar";

const HeaderStudentMonitoring = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-gray-100 h-viewport px-6">
            <div className="flex justify-between p-12 pb-0">
                <h2 className="text-[32px] font-bold">Seguimiento de alumnos</h2>
                <div className="flex gap-6">
                    <div>
                        <SearchBar />
                    </div>
                    <div className="flex items-center ml-4 font-semibold gap-2">
                        <i className="fa-solid fa-user"></i>
                        <p>{"Usuario"}</p>
                    </div>
                </div>
            </div>
            <div>{children}</div>
        </div>
    );
};

export default HeaderStudentMonitoring;
