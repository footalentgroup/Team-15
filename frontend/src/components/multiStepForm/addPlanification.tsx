"use client"
import { AddContentAction } from '@/actions/addCourse.action';
import ButtonContinue from '@/ui/buttons/buttonContinue';
import { startTransition, useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const INITIAL_STATE = {
  data: null
};

export default function AddPlanification() {
  const [formState, formAction] = useActionState(
    AddContentAction,
    INITIAL_STATE
  );
  console.log("formstate", formState);
  const router = useRouter()

  const [contentName, setContentName] = useState("");
  const [contentList, setContentList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const handleAddContent = () => {
    if (contentName.trim()) {
      setContentList([...contentList, contentName.trim()]);
      setContentName("");
    }
  }

  const handleEditItem = (index: number) => {
    setEditIndex(index);
    setEditValue(contentList[index]);
  };

  const saveEditItem = () => {
    if (editIndex === null) return;
    setContentList(contentList.map((item, i) => i === editIndex ? editValue : item));
    setEditIndex(null);
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    startTransition(() => {
      formAction(contentList);
    });
    if (formState.success) {
      router.push('/home')
    }
  };

  const dummyHandleImportData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setContentList([
        "Edad Antigua",
        "Edad Media",
        "Edad Moderna",
        "Edad Contemporánea",
        "Revolución Industrial",
        "Guerras Mundiales",
        "Guerra Fría",
        "Globalización",
        "Historia de América",
        "Historia de Europa",
      ])
    }, 2000);
  };

  useEffect(() => {
    if (formState.success) {
      router.push('/home');
    }
  }, [formState.success, router]);

  return (
    <form onSubmit={handleSubmit} className="w-full h-screen flex flex-col gap-2 p-16 rounded-lg">
      {contentList.length > 0 ? (
        <div className='flex flex-col h-full'>
          <div>
            <h3 className="font-bold text-3xl">Revisá y editá tus contenidos</h3>
            <div className="text-gray-600 my-6 mt-2">
              <p>Estos son los temas que hemos extraído de tu documento.</p>
              <p>Podés editarlos, eliminar lo que no necesites o agregar nuevos contenidos si hace falta.</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex content-center gap-4 my-4">
              <input
                className="h-12 border-2 border-black p-4 text-xl rounded focus-visible:outline-none mr-2"
                type="text"
                id="contentName"
                name="contentName"
                placeholder="Introduce un contenido"
                value={contentName}
                onChange={(e) => setContentName(e.target.value)}
              />

              <ButtonContinue text="Añadir a contenidos" color="bg-[#fbc82d]" type='button' onClick={handleAddContent} />


            </div>
            <ul className="flex flex-wrap gap-6 mt-4">
              {contentList.map((content, index) => (

                <li key={index} className="w-[359px] h-10 flex justify-between items-center border border-black px-2 rounded gap-2">
                  {editIndex === index ? (
                    <>
                      <input
                        className="w-full"
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                      />
                      <button type="button" onClick={saveEditItem}>💾</button>
                    </>
                  ) : (
                    <>
                      <p>{content}</p>
                      <div className='flex gap-2'>
                        <button type='button' onClick={() => { handleEditItem(index) }}>🖊</button>
                        <button type="button" onClick={() => setContentList(contentList.filter((_, i) => i !== index))}>
                          ✖
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className='flex mt-auto justify-center'>
            <ButtonContinue text="Continuar" onClick={() => handleSubmit} />

          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-3xl">¿Quieres crear tu planificación anual?</h3>
              <div className="text-gray-600 my-6">
                <p>Sube el documento con los temas oficiales y extraeremos los contenidos automáticamente.</p>
                <p>Después, podrás ordenarlos fácilmente en el calendario.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 items-center justify-center my-12">

            <div className="relative flex flex-col items-center justify-center border-2 bg-[#fef1ca] border-gray-500 rounded-lg p-4 h-64 gap-8 py-8 w-9/12">
              <p className="font-semibold">Arrastre y Suelte aquí</p>
              <input
                type="file"
                className="absolute top-0 opacity-0 w-full h-full cursor-pointer"
                onChange={(e) => console.log(e.target.files)}
              />
              <svg width="84" height="105" viewBox="0 0 84 105" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M52.4168 0.416016H10.7502C5.021 0.416016 0.385581 5.10352 0.385581 10.8327L0.333496 94.166C0.333496 99.8952 4.96891 104.583 10.6981 104.583H73.2502C78.9793 104.583 83.6668 99.8952 83.6668 94.166V31.666L52.4168 0.416016ZM73.2502 94.166H10.7502V10.8327H47.2085V36.8744H73.2502V94.166ZM21.1668 68.1764L28.5106 75.5202L36.7918 67.291V88.9577H47.2085V67.291L55.4897 75.5723L62.8335 68.1764L42.0522 47.291L21.1668 68.1764Z" fill="#3A3838" />
              </svg>
            </div>
            <p>O</p>
            <div className="relative">
              <input
                type="file"
                className="absolute top-0 opacity-0 w-full h-full cursor-pointer"
                onChange={(e) => console.log(e.target.files)}
              />
              <ButtonContinue text={loading ? 'Procesando lista...' : 'Seleccione archivo desde dispositivo'} color="bg-[#fbc82d]" type='button' onClick={dummyHandleImportData} />
            </div>
          </div>
          <div className="flex justify-center space-x-4 mt-auto">
            <ButtonContinue text="Omitir por ahora" color="bg-white" onClick={() => handleSubmit} />
          </div>
          <div className='text-gray-600 mt-8'>
            <p>ℹ ¿No tienes el documento a mano?</p>
            <p>No te preocupes, siempre podrás añadir contenidos manualmente más adelante</p>
          </div>
        </>
      )}

    </form>
  );
};

