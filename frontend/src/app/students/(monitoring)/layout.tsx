"use client"
import React from "react";
import AddNewStudent from "@/components/studentsMonitoring/addNewStudent";
import ChangeView from "@/components/studentsMonitoring/changeView";

const MonitoringLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <div className="flex justify-between p-12 pb-0">
                <h2 className="text-[36px] font-bold">Seguimiento</h2>
                <div className="flex gap-6">
                    <div className="flex items-center ml-4 font-semibold gap-2">
                        <i className="fa-solid fa-user"></i>
                        <p>{"Usuario"}</p>
                    </div>
                </div>
            </div>
            <div className="p-12 pt-6 pr-0">
                <div className="pr-12">
                    <ChangeView />
                </div>
                <div>
                    <div className="flex gap-4 h-full overflow-hidden w-full">
                        <div className="mt-10">
                            <AddNewStudent />
                        </div>
                        <div className="overflow-y-hidden">
                            {children}
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 items-center mt-8 mr-12">
                        <button type="button" className="min-w-[200px] min-h-12 bg-white text-black border-2 border-black px-4 rounded-md filter flex items-center gap-2">
                            <div className="relative group">
                                <div className="w-5 h-5 bg-sky-400 rounded-full cursor-pointer text-white px-2 text-xs py-0.5">
                                    <i className="fa-solid fa-info"></i>
                                </div>
                                <div className="absolute right-1 transform -translate-x-6 translate-y-7 bottom-full mb-2 text-sm text-black bg-sky-200 px-4 py-2 rounded opacity-0 group-hover:opacity-100 group-hover:visible transition-opacity w-80 pointer-events-none text-start">
                                    <p>
                                        Acá puedes visualizar gráficos estadísticos de las tareas de todo el curso.
                                    </p>
                                </div>
                            </div>
                            <span className="font-semibold text-sm ">Estadísticas gráficas</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MonitoringLayout;