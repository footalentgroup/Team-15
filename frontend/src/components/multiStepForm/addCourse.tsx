"use client"
import { addCourseAction } from "@/actions/addCourse.action";
import { CourseCard } from "@/ui";
import ButtonContinue from "@/ui/buttons/buttonContinue";
import { startTransition, useActionState } from "react"
import { useState } from "react";

const INITIAL_STATE = {
  data: null
};

const INPUTS_INFO = [
  {
    label: "Nombre del centro educativo",
    name: "schoolName",
    placeholder: "San Vicente"
  },
  {
    label: "Nombre de la clase/curso",
    name: "courseName",
    placeholder: "4° Grado A"
  },
  {
    label: "Materia",
    name: "subjectName",
    placeholder: "Historia"
  }
]

export default function AddCourseForm({ setActiveTab }: { setActiveTab: (index: number) => void }) {
  const [formState, formAction] = useActionState(
    addCourseAction,
    INITIAL_STATE
  );
  console.log(formState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    startTransition(() => {
      formAction(formData);
    });
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    console.log(formState);
    setIsModalOpen(false);
    startTransition(() => {
      formAction(formState);
    });
    setActiveTab(1);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full h-screen flex flex-col items-center p-9">
        <div className="flex px-4 py-8 justify-start w-full">
          <h2 className="font-bold text-4xl">Configura una clase</h2>
        </div>
        <div className="flex flex-col items-center gap-9 w-[337px] my-14">
          {INPUTS_INFO.map((input) => (
            <div key={input.name} className="flex flex-col px-4 w-full gap-2">
              <label htmlFor={input.name} className="font-semibold text-xl">{input.label}:</label>
              <input
                className="h-14 border-2 border-black p-1 px-4 rounded-md focus-visible:outline-none"
                type="text"
                id={input.name}
                name={input.name}
                placeholder={input.placeholder}
                required
              />
            </div>
          ))}
        </div>
        <ButtonContinue text="Continuar" />
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="flex flex-col gap-2 bg-yellow-100 p-4 rounded-lg size-[448px] px-6 filter drop-shadow-[18px_14px_0px_#000000]">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">Revisa los detalles de tu clase</h3>
              <button type="button" onClick={() => setIsModalOpen(!isModalOpen)}>✖</button>
            </div>
            <p>Tu clase está casi lista y queremos que todo quede perfecto</p>
            <div className="flex justify-center mb-4">
              <CourseCard courses={{
                schoolName: formState.data?.get("schoolName") as string || '',
                subjectName: formState.data?.get("subjectName") as string || '',
                courseName: formState.data?.get("courseName") as string || ''
              }} color="" />
            </div>
            <p>¿Se ve bien? Más Adelante podrás modificar y crear todas las clases que necesites.😊</p>
            <div className="flex justify-end space-x-4 mt-auto">

              <ButtonContinue text="Volver a editar" color="bg-white" onClick={handleCancel} type="button" />
              <ButtonContinue text="Guardar y continuar" onClick={handleConfirm} />

            </div>
          </div>
        </div>
      )}
    </>
  );
}