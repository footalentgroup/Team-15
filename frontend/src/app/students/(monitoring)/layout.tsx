"use client"
import React from "react";
import AddNewStudent from "@/components/studentsMonitoring/addNewStudent";
import ChangeView from "@/components/studentsMonitoring/changeView";

const MonitoringLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="p-12 pt-6">
            <ChangeView />
            <div>
                <div className="flex gap-4">
                    <div className="mt-10">
                        <AddNewStudent />
                    </div>
                    <div>
                        {children}
                        <div className="flex gap-6">
                            <img src="../../media/img/arrow.png" alt="Arrow" className="h-32 mt-4 ml-20" />
                            <div className="self-center">
                                <h5 className="text-[20px]">
                                    Aun no tienes tareas creadas.
                                </h5>
                                <p className="text-[16px] font-semibold">
                                    Crea tu primera tarea para hacer el seguimiento.
                                </p>
                            </div>
                            <img src="../../media/img/no-data-s.png" alt="No data" className="h-72 self-end mt-20 " />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-2 items-end mt-20">
                    <div className="relative group">
                        <div className="w-5 h-5 bg-sky-400 rounded-full cursor-pointer text-white px-2 text-xs py-0.5">
                            <i className="fa-solid fa-info"></i>
                        </div>
                        <div className="absolute right-1 transform -translate-x-6 translate-y-7 bottom-full mb-2 text-sm text-black bg-sky-200 p-4 rounded opacity-0 group-hover:opacity-100 group-hover:visible transition-opacity w-80 pointer-events-none">
                            Acá puedes visualizar gráficos estadísticos de las tareas de todo el curso.
                        </div>
                    </div>
                    <button type="button" className="min-w-[155px] min-h-12 bg-white text-black border-2 border-black font-semibold text-sm px-4 rounded-md filter">
                        Estadísticas gráficas
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MonitoringLayout;