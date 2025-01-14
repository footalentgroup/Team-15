"use client"
import { addCourseAction, setPeriodAction } from "@/actions/addCourse.action";
import { ICourses, Period, PeriodFromAction } from "@/interfaces/ICourses.interface";
import { CourseCard } from "@/ui";
import ButtonContinue from "@/ui/buttons/buttonContinue";
import { startTransition, useActionState, useEffect } from "react"
import { useState } from "react";
import FlagStepIndicator from "./flagStepIndicator";
import DialogInfo from "../dialog/DialogInfo";

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

interface Props {
  setActiveTab: (index: number) => void;
  setCourseId: (id: number) => void;
  setSubjectId: (id: number) => void;
  setPeriod: (period: PeriodFromAction) => void;
}

export default function AddCourseForm({ setActiveTab, setCourseId, setSubjectId, setPeriod }: Props) {
  const [formState, formAction] = useActionState(
    addCourseAction,
    INITIAL_STATE
  );
  const [data, setData] = useState<ICourses>({
    schoolName: '',
    courseName: '',
    subjectName: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [nextStep, setNextStep] = useState(false);
  const [selectedOption, setSelectedOption] = useState("semestral");
  const [periodList, setPeriodList] = useState(Array.from({ length: 2 }));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    setData({
      schoolName: formData.get("schoolName") as string,
      courseName: formData.get("courseName") as string,
      subjectName: formData.get("subjectName") as string
    });

    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    console.log(formState);
    setIsModalOpen(false);
    /*     startTransition(() => {
          formAction(data);
        }); */
    setNextStep(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (formState.success) {
      console.log("formState", formState);
      setCourseId(formState.data.course.id);
      setSubjectId(formState.data.subject.materia.id);
      setActiveTab(1);
    }

    if (formState.error) {
      console.log('error error', formState.data.error);
      console.log('error data', formState.data);
      console.log('error formstate', formState);
      setError(formState.data.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.success, nextStep]);

  const selectOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
    setPeriodList(Array.from({ length: parseInt(e.target.value) }));
  }

  useEffect(() => {
    if (selectedOption === 'trimestral') {
      setPeriodList(Array.from({ length: 3 }));
    } else {
      setPeriodList(Array.from({ length: 2 }));
    }
  }, [selectedOption]);

  const handleConfirmPeriod = async (event: React.FormEvent) => {
    //TODO logica para enviar el periodo seleccionado
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const periodData = Array.from(formData.entries()).reduce((acc, [key, value]) => {
      acc[key] = typeof value === 'string' ? value : value.name;
      return acc;
    }, {} as Period);

    console.log('periodData', periodData);

    startTransition(() => {
      formAction({ data, period: periodData });
    });


    const response = await setPeriodAction(periodData);
    setPeriod(response.data);
    /* setActiveTab(1); */
  }

  return (
    <div className="relative">
      <FlagStepIndicator step={1} title="Cursos" />
      {nextStep ? (
        <>
          <form onSubmit={handleConfirmPeriod} className="w-full h-screen flex flex-col items-center p-9">
            <div className="flex px-4 py-8 justify-start w-full">
              <h2 className="font-bold text-4xl">Personaliza la dicisión del ciclo</h2>
            </div>
            <div className="flex flex-col gap-9 w-[364px] my-14">
              <div className="flex flex-col items-start gap-3">
                <label htmlFor="period" className="text-xl font-semibold">Tipo de division del ciclo: </label>
                <select name="period" id="period" className="border-2 border-black p-2 rounded-md w-9/12" onChange={(e) => selectOnChange(e)} >
                  <option value="semestral">Semestral</option>
                  <option value="trimestral">Trimestral</option>
                  <option value="cuatrimestral">Cuatrimestral</option>
                </select>

              </div>
              <div className="flex flex-col gap-4 min-h-60">
                <h3 className="text-xl font-semibold">Fechas de cada periodo</h3>
                {periodList.map((_, index) => {
                  const periodSuffix = index === 1 ? '2do' : index === 2 ? '3er' : index === 3 ? '4to' : '1er';
                  const periodName = selectedOption === "semestral" ? `${periodSuffix} semestre` : selectedOption === "trimestral" ? `${periodSuffix} trimestre` : `${periodSuffix} cuatrimestre`;
                  return (
                    <div key={index}>
                      <h4 className="mb-2">{periodName}: </h4>
                      <div className="flex gap-4 w-full">
                        <div className="flex flex-col gap-1 flex-1">
                          <input id={`${index} input start`} name={`${index} input start`} required type="date" className="border-2 border-black rounded-md" />
                          <label htmlFor={`${index} input start`} className="text-xs">Seleccioná la fecha de inicio</label>
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                          <input id={`${index} input end`} name={`${index} input end`} required type="date" className="border-2 border-black rounded-md" />
                          <label htmlFor={`${index} input end`} className="text-xs">Seleccioná la fecha de cierre</label>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <ButtonContinue text="Continuar" />
          </form>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="w-full h-screen flex flex-col items-center p-9">
            <div className="flex px-4 py-8 justify-start w-4/6 self-start">
              <h2 className="font-bold text-4xl text-wrap">Comencemos creando un curso</h2>
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
            {error && <p className="text-red-500 my-2">{error}</p>}
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
                    schoolName: data.schoolName || '',
                    subjectName: data.subjectName || '',
                    courseName: data.courseName || ''
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
      )}
      <DialogInfo small={true} text="Comienza configurando tu primer grupo." />
    </div>
  );
}