"use client"
import { addCourseAction, setPeriodAction } from "@/actions/addCourse.action";
import { ICourses, Period, PeriodFromAction } from "@/interfaces/ICourses.interface";
import { CourseCard } from "@/ui";
import ButtonContinue from "@/ui/buttons/buttonContinue";
import { startTransition, useActionState, useEffect } from "react"
import { useState } from "react";
import FlagStepIndicator from "./flagStepIndicator";
import DialogInfo from "../dialog/DialogInfo";
import { IconArrow } from "@/icons";
import { useRouter } from "next/navigation";

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
  newCourse?: string;
}

export default function AddCourseForm({ setActiveTab, setCourseId, setSubjectId, setPeriod, newCourse }: Props) {
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
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const schoolNameInput = formData.get("schoolName") as string;
    const courseNameInput = formData.get("courseName") as string;
    const subjectNameInput = formData.get("subjectName") as string;

    const specialCharRegex = /[^a-zA-Z0-9\s°]/;
    if (specialCharRegex.test(courseNameInput)) {
      setError("El nombre del curso no puede contener caracteres especiales, excepto °.");
      return;
    }

    const allSpecialCharRegex = /[^a-zA-Z0-9\s]/;
    if (allSpecialCharRegex.test(schoolNameInput)) {
      setError("El nombre del centro educativo no puede contener caracteres especiales.");
      return;
    }
    if (allSpecialCharRegex.test(subjectNameInput)) {
      setError("El nombre de la materia no puede contener caracteres especiales.");
      return;
    }

    setData({
      schoolName: schoolNameInput,
      courseName: courseNameInput,
      subjectName: subjectNameInput
    });

    setIsModalOpen(true);
    setError('');
  };

  const handleConfirm = () => {
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
      setLoading(false);
      setCourseId(formState.data.course.id);
      setSubjectId(formState.data.subject.materia.id);
      setActiveTab(1);
    }

    if (formState.error) {
      setLoading(false);
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
    setLoading(true)
    setError('');

    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const periodData = Array.from(formData.entries()).reduce((acc, [key, value]) => {
      acc[key] = typeof value === 'string' ? value : value.name;
      return acc;
    }, {} as Period);

    for (let i = 0; i < periodList.length; i++) {
      const startDate = new Date(periodData[`${i} input start`]);
      const endDate = new Date(periodData[`${i} input end`]);

      const today = new Date();
      today.setDate(today.getDate() - 1);
      const twoYearsFromNow = new Date();
      twoYearsFromNow.setFullYear(today.getFullYear() + 2);

      //queda pendiente hacer la validacion para la longitud del periodo

      if (startDate < today || endDate < today) {
        setError(`Las fechas del ${i + 1}° periodo no pueden ser del pasado.`);
        setLoading(false);
        return;
      }

      if (startDate >= endDate) {
        setError(`La fecha de inicio del ${i + 1}° periodo no puede ser posterior a la fecha de cierre.`);
        setLoading(false);
        return;
      }

      if (i > 0) {
        const prevEndDate = new Date(periodData[`${i - 1} input end`]);
        if (startDate <= prevEndDate) {
          setError(`La fecha de inicio del ${i + 1}° periodo no puede ser anterior a la fecha de cierre del periodo anterior.`);
          setLoading(false);
          return;
        }
      }

      if (startDate > twoYearsFromNow || endDate > twoYearsFromNow) {
        setError(`Las fechas del ${i + 1}° periodo no pueden ser mayores a 2 años en el futuro.`);
        setLoading(false);
        return;
      }

    }


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
          <form onSubmit={handleConfirmPeriod} className="w-full h-screen flex flex-col items-center py-14 px-16">
            <div className="flex px-4 py-8 justify-start w-full">
              <h2 className="font-bold text-4xl">Personalizá la división del ciclo</h2>
            </div>
            <div className="flex flex-col gap-9 w-[364px] my-14">
              <div className="flex flex-col items-start gap-3">
                <label htmlFor="period" className="text-xl font-semibold">Tipo de división del ciclo:</label>
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
            <ButtonContinue text="Continuar" loading={loading} />
            {error && <p className="text-red-500 my-2">{error}</p>}

          </form>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="w-full h-screen flex flex-col items-center py-14 px-16">
            <div className="flex px-4 py-8 justify-start w-4/6 self-start">
              {newCourse && (
                <button type="button" onClick={() => router.push('/home')}>
                  <IconArrow color="black" classNames="rotate-180 size-10" />
                </button>
              )}
              <h2 className={`${newCourse && "ms-2"} font-bold text-4xl text-wrap`}>Comencemos creando un curso</h2>
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
            <div className="fixed inset-0 flex items-center justify-center bg-black-modal">
              <div className="flex flex-col gap-2 bg-yellow-100 rounded-lg size-[31.5rem] py-9 px-6 filter drop-shadow-modal">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg my-2">Revisá los detalles de tu curso</h3>
                  <button className="absolute top-4 right-4" type="button" onClick={() => setIsModalOpen(!isModalOpen)}>✖</button>
                </div>
                <p className="text-modal-text">Tu curso está casi listo y queremos que todo quede perfecto.</p>
                <div className="flex justify-center my-6">
                  <CourseCard courses={{
                    schoolName: data.schoolName || '',
                    subjectName: data.subjectName || '',
                    courseName: data.courseName || ''
                  }}
                    color="bg-blue-light-100"
                    isInModal
                  />
                </div>
                <p className="text-modal-text">¿Se ve bien? Más adelante podrás modificar y crear todas las clases que necesites.😊</p>
                <div className="flex justify-center gap-6 mt-auto">

                  <ButtonContinue text="Volver a editar" color="bg-white" onClick={handleCancel} type="button" />
                  <ButtonContinue text="Guardar y continuar" onClick={handleConfirm} />

                </div>
              </div>
            </div>
          )}
        </>
      )}
      {!newCourse && (
        <DialogInfo small={false} text="Empezá configurando un curso a la vez.
Te guiaremos para completar todo lo necesario." />
      )}
    </div>
  );
}