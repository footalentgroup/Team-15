import React from "react";
import Link from "next/link";

const Students: React.FC = () => {
    return (
        <div className="mt-24">
            <div className="flex flex-col items-center justify-center text-center mt-4">
                <h4 className="text-[20px]">
                    Para realizar el seguimiento de tus alumnos primero agrega el listado.
                </h4>
                <p className="text-[16px] font-semibold">
                    Podrás realizar el seguimiento de tus alumnos una vez añadidos.
                </p>
                <div className="h-56 flex justify-center m-12">
                    <img src="../media/img/students.png" alt="Welcome" className="h-full" />
                </div>
                <Link href="/students/homework">
                    <button type="button" className="my-12 min-w-[136px] min-h-12 bg-pink-500 text-white border-2 border-black font-semibold px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000]">
                        Comenzar
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Students;
