"use client"
import { AddStudentAction } from "@/actions/addCourse.action";
import ButtonContinue from "@/ui/buttons/buttonContinue";
import ButtonNormal from "@/ui/buttons/buttonNormal";
import { startTransition, useActionState, useState } from "react"
import LoadingFile from "./loadingFile";

const INITIAL_STATE = {
  data: null
};

export default function AddStudentForm({ setActiveTab }: { setActiveTab: (index: number) => void }) {
  const [formState, formAction] = useActionState(
    AddStudentAction,
    INITIAL_STATE
  );
  console.log(formState);
  const [studentName, setStudentName] = useState("");
  const [studentList, setStudentList] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddStudent = () => {
    if (studentName.trim()) {
      setStudentList([...studentList, studentName.trim()]);
      setStudentName("");
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (studentList.length === 0) return;
    startTransition(() => {
      formAction(studentList);
    });
  };

  const handleSkip = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    startTransition(() => {
      formAction(studentList);
    });
    setActiveTab(2);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleImport = () => {
    setIsImportModalOpen(true);
  }

  //cambiar nombre de la funcion y la logica cuando se pueda conectar
  const dummyHandleImportData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStudentList(
        [
          ...studentList,
          "González Juan",
          "Rodríguez María",
          "Pérez Carlos",
          "López Ana",
          "Martínez José",
          "Gómez Laura",
          "Fernández Pablo",
          "Sánchez Marta",
          "Romero Luis",
        ]
      )
      setIsImportModalOpen(false);
    }, 3000);


  }

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full h-screen p-16 flex flex-col">
        <div className="flex flex-col items-baseline gap-2">
          <h2 className="font-semibold text-4xl">¿Quieres añadir tu lista de alumnos?</h2>
          <span className="text-gray-500 text-xl">No te preocupes si ahora no tienes la lista competa, podrás agregar o editar alumnos más tarde</span>
        </div>
        <div className="flex flex-col gap-4 pt-11">
          <label htmlFor="studentName" className="mr-2 font-bold text-2xl">Apellido y nombre del alumno:</label>
          <div className="flex content-center items-center gap-4">
            <input
              className="h-12 border-2 border-black py-2 px-4 text-xl rounded-md focus-visible:outline-none mr-2"
              type="text"
              id="studentName"
              name="studentName"
              placeholder="Introduce nombre"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />

            <ButtonNormal text="Añadir a la lista" color="bg-[#fbc82d]" onClick={handleAddStudent} />
            <span className="text-lg font-bold mx-4">O</span>

            <ButtonNormal text="Importar de excel" onClick={handleImport} />

          </div>
          <span className="text-gray-500 mt-2">ℹ Tu lista quedará ordenará automáticamente por orden alfabético</span>
          <ul className="flex flex-wrap text-wrap gap-2 mt-4 px-32 max-h-[360px] overflow-scroll">
            {studentList.sort().map((student, index) => (
              <li key={index} className="w-48 h-10 flex justify-between items-center border border-black px-2 rounded-md gap-2">
                <p>{student}</p>
                <button type="button" onClick={() => setStudentList(studentList.filter((_, i) => i !== index))}>
                  ✖
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex mt-auto justify-center">
          <ButtonContinue type="button" text="Volver atrás" onClick={() => console.log('deberia volver atras pero todavia no estoy implementado')} color="bg-gray-500 text-white" />
          <div className="flex mx-auto gap-8">
            <ButtonContinue type="button" color="bg-white" text="Omitir por ahora" onClick={handleSkip} />
            <ButtonContinue text="Continuar" onClick={handleConfirm} />
          </div>
        </div>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="flex flex-col gap-4 bg-yellow-100 p-4 rounded-lg w-[448px] h-[189px] px-6 filter drop-shadow-[18px_14px_0px_#000000]">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">Omitir Paso</h3>
              <button type="button" onClick={() => setIsModalOpen(!isModalOpen)}>✖</button>
            </div>
            <p>Puedes añadir esta información más tarde desde el menú de seguimiento.</p>
            <div className="flex justify-end space-x-4 mt-auto">
              <ButtonContinue type="button" text="Cancelar" color="bg-white" onClick={handleCancel} />
              <ButtonContinue text="Omitir este paso" onClick={handleConfirm} />
            </div>
          </div>
        </div>
      )}

      {isImportModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col gap-2 bg-yellow-100 text-black-300 p-10 rounded-lg px-6 filter drop-shadow-[18px_14px_0px_#000000] w-5/6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-3xl mb-2">Importar desde Excel</h3>
                <p className="text-gray-600">Sube tu archivo Excel con la lista de alumnos. Asegúrate de que incluya una única columna para &apos;Apellido&apos; y &apos;Nombre&apos;.</p>
              </div>
              <button type="button" onClick={() => setIsImportModalOpen(!isImportModalOpen)}>✖</button>
            </div>
            <div className="flex flex-col gap-4 items-center justify-center my-8">
              <div className="relative">
                <input
                  type="file"
                  className="absolute top-0 opacity-0 w-full h-full cursor-pointer"
                  onChange={dummyHandleImportData}
                />
                <ButtonContinue text={loading ? 'Procesando lista...' : 'Seleccione archivo desde dispositivo'} type="button" color="bg-yellow-500" onClick={dummyHandleImportData} />
              </div>
              <p>O</p>
              <div className="relative flex flex-col items-center justify-center border-2 border-gray-500 rounded-lg p-4 h-64 gap-8 py-8 w-9/12 bg-yellow-500/25">
                <p className="font-semibold">Arrastre y Suelte aquí</p>
                <input
                  type="file"
                  className="absolute top-0 opacity-0 w-full h-full cursor-pointer"
                  onChange={dummyHandleImportData}
                />
                <svg width="84" height="105" viewBox="0 0 84 105" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M52.4168 0.416016H10.7502C5.021 0.416016 0.385581 5.10352 0.385581 10.8327L0.333496 94.166C0.333496 99.8952 4.96891 104.583 10.6981 104.583H73.2502C78.9793 104.583 83.6668 99.8952 83.6668 94.166V31.666L52.4168 0.416016ZM73.2502 94.166H10.7502V10.8327H47.2085V36.8744H73.2502V94.166ZM21.1668 68.1764L28.5106 75.5202L36.7918 67.291V88.9577H47.2085V67.291L55.4897 75.5723L62.8335 68.1764L42.0522 47.291L21.1668 68.1764Z" fill="#3A3838" />
                </svg>
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-auto">
              <ButtonContinue text="Cancelar" type="button" color="bg-white" onClick={() => setIsImportModalOpen(false)} />
              <ButtonContinue text={loading ? "Cargando..." : "Subir archivo Excel"} onClick={() => {
                dummyHandleImportData()
              }} />
            </div>
          </div>
        </div>
      )}
      {loading && <LoadingFile setLoading={setLoading} />}
    </>
  );
}