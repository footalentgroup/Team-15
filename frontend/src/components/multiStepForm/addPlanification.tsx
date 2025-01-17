"use client"
import { AddPlanificationAction, ImportPlanificationAction, ImportPlanificationPdfAction } from '@/actions/addCourse.action'
import ButtonContinue from '@/ui/buttons/buttonContinue'
import { startTransition, useActionState, useEffect, useState } from 'react'
import LoadingFile from './loadingFile'
import { useRouter } from 'next/navigation'
import { Content } from '@/interfaces/ICourses.interface'
import StepIndicator from './stepIndicator'
import { IconEdit, IconInfo, IconTrash } from '@/icons'
import FlagStepIndicator from './flagStepIndicator'
import OmitModal from './omitModal'
import { IPlanification } from '@/interfaces/IPlanification.interfaces'

const INITIAL_STATE = {
  data: null
}

interface Props {
  contentList: Content[]
  setContentList: (contentList: Content[]) => void
  setActiveTab: (index: number) => void
  planificationStep: number
  setPlanificationStep: (step: number) => void
  subjectId: number | null
  setCurrentPlanification: (planification: IPlanification) => void
}

export default function AddPlanification({ contentList, setContentList, setActiveTab, planificationStep, setPlanificationStep, subjectId, setCurrentPlanification }: Props) {
  const [formState, formAction] = useActionState(
    AddPlanificationAction,
    INITIAL_STATE
  )

  const [contentName, setContentName] = useState("")
  const [contentId, setContentId] = useState(0)
  const [loading, setLoading] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [editValue, setEditValue] = useState<string>("")
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editSubContentIndex, setEditSubContentIndex] = useState<{ contentIndex: number | null, subIndex: number | null }>({ contentIndex: null, subIndex: null });
  const [editSubContent, setEditSubContent] = useState<string>("")
  const [addSubContent, setAddSubContent] = useState<string>("")
  const [isVisibleAddSubContentIndex, setIsVisibleAddSubContentIndex] = useState<number | null>(null);
  const [planificationFile, setPlanificationFile] = useState<File | null>(null)
  const [importError, setImportError] = useState<string | null>(null)

  const handleAddContent = () => {
    if (contentName.trim()) {
      setContentList([...contentList, { unidad: contentId !== 0 ? contentId : contentList.length + 1, tema: contentName, subtemas: [] }])
      setContentName("")
    }
  }

  const handleAddSubContent = (index: number) => {
    if (addSubContent.trim()) {
      setContentList(contentList.map((item, i) => i === index ? { ...item, subtemas: [...item.subtemas, addSubContent] } : item))
      setAddSubContent("")
      setIsVisibleAddSubContentIndex(null)
    }
  }

  const handleEditContentTheme = (index: number) => {
    setEditIndex(index)
    setEditValue(contentList[index].tema)
  }

  const saveEditContentTheme = () => {
    if (editIndex === null) return
    setContentList(contentList.map((item, i) => i === editIndex ? { ...item, tema: editValue } : item))
    setEditIndex(null)
  }

  const handleEditContentSubtheme = (contentIndex: number, subIndex: number) => {
    setEditSubContentIndex({ contentIndex, subIndex });
    setEditSubContent(contentList[contentIndex].subtemas[subIndex])
  }

  const saveEditContentSubtheme = () => {
    if (editSubContentIndex === null) return
    const updatedSubtemas = contentList[editSubContentIndex.contentIndex!].subtemas.map((subtema, i) =>
      i === editSubContentIndex.subIndex ? editSubContent : subtema
    );
    const updatedContentList = contentList.map((item, j) =>
      j === editSubContentIndex.contentIndex ? { ...item, subtemas: updatedSubtemas } : item
    );
    setContentList(updatedContentList);
    setEditSubContentIndex({ contentIndex: null, subIndex: null });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    await startTransition(() => {
      formAction({ subjectId, list: contentList })
    })
  }

  const dummyHandleImportData = async () => {
    setLoading(true)
    setImportError(null)

    if (planificationFile) {
      const formData = new FormData();
      formData.append('file', planificationFile);

      if (planificationFile.type === 'application/pdf') {
        console.log('pdf file');
        try {
          const result = await ImportPlanificationPdfAction(formData)
          console.log('result', result);

          if (result.success) {
            console.log('result', result)
            setContentList(result.data)
            setPlanificationFile(null)
          } else {
            setImportError("Hubo un error al importar los datos. Por favor, intenta de nuevo.")
          }
        } catch (error) {
          console.log(error);
          setImportError("Hubo un error al importar los datos. Por favor, intenta de nuevo.")
        } finally {
          setLoading(false)
        }
      }

      if (planificationFile.type === 'application/msword' || planificationFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        console.log('word file');
        try {
          const result = await ImportPlanificationAction(formData)

          if (result.success) {
            console.log('result', result)
            setContentList(result.data)
            setPlanificationFile(null)
          } else {
            setImportError("Hubo un error al importar los datos. Por favor, intenta de nuevo.")
          }
        } catch (error) {
          console.log(error);
          setImportError("Hubo un error al importar los datos. Por favor, intenta de nuevo.")
        } finally {
          setLoading(false)
        }
      }

      /* formData.append('subjectId', subjectId!.toString()); */
      console.log(subjectId);
    }
    setPlanificationStep(2)
  }

  const handleSkip = () => {
    router.push('/home')
  }

  useEffect(() => {
    if (formState.success) {
      console.log('formState', formState);
      console.log('formState.data', formState.data);
      console.log("formstate.data.planificacion", formState.data.planificacion);
      setCurrentPlanification(formState.data.planificacion)
      setPlanificationStep(3)
      setActiveTab(3)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.success])

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  };

  useEffect(() => {
    if (planificationFile) {
      dummyHandleImportData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planificationFile]);

  return (
    <div className='w-full h-screen relative p-16 pt-4'>
      <FlagStepIndicator step={3} title="Planificación" />
      <div className="flex justify-center py-4">
        <StepIndicator step={planificationStep} />
      </div>
      <form onSubmit={handleSubmit} className="h-5/6 flex flex-col gap-2 rounded-lg">
        {contentList.length > 0 ? (
          <>
            <h3 className="font-bold text-4xl">¿Quieres revisar los contenidos extraídos?</h3>
            <div>
              <div className="text-gray-600 text-xl my-6 mb-8">
                <p>Estos son los temas que hemos extraído de tu documento.</p>
                <p>Podés editarlos, eliminar lo que no necesites o agregar nuevos contenidos si hace falta.</p>
              </div>
            </div>
            <div className="flex content-center gap-4 my-4">
              <div className='flex flex-col gap-2'>
                <input
                  className="w-24 h-12 border-2 border-black p-4 text-xl rounded-md focus-visible:outline-none mr-2"
                  id="contentId"
                  name="contentId"
                  placeholder='15'
                  type="number"
                  value={contentId}
                  onChange={(e) => setContentId(Number(e.target.value))}
                />
                <label htmlFor='contentId' className='text-sm'>N° de unidad</label>
              </div>
              <div className='flex flex-col gap-2'>
                <input
                  className="w-[336px] h-12 border-2 border-black p-4 text-xl rounded-md focus-visible:outline-none mr-2"
                  type="text"
                  id="contentName"
                  name="contentName"
                  placeholder="Revolución francesa"
                  value={contentName}
                  onChange={(e) => setContentName(e.target.value)}
                />
                <label htmlFor='contentName' className='text-sm'>Nombre de la unidad</label>
              </div>

              <ButtonContinue text="Añadir unidad" color="bg-[#fbc82d] h-12" type='button' onClick={handleAddContent} />


            </div>
            <div className='flex flex-col h-4/6 w-9/12 gap-12 self-center'>
              <div className="flex flex-col gap-4 overflow-hidden">
                <ul className="columns-1 sm:columns-2 lg:columns-3 gap-4 mt-4 overflow-y-auto">
                  {contentList.map((content, index) => (
                    <div key={content.tema + index} className='break-inside-avoid mb-4'>
                      <div className='flex flex-col gap-2 items-center'>
                        <li className="w-[310px] min-h-10 flex justify-between items-center border border-black bg-yellow-100 px-2 py-3 rounded-md gap-2">
                          {editIndex === index ? (
                            <>
                              <input
                                className="w-full"
                                type="text"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                              />
                              <button type="button" onClick={saveEditContentTheme}>💾</button>
                            </>
                          ) : (
                            <>
                              <p className='font-semibold'>Unidad {content.unidad}: {truncateText(content.tema, 16)}</p>
                              <div className='flex gap-2 me-2'>
                                <button type="button" onClick={() => setContentList(contentList.filter((_, i) => i !== index))}>
                                  <IconTrash />
                                </button>
                                <button type='button' onClick={() => { handleEditContentTheme(index) }}><IconEdit /></button>
                              </div>
                            </>
                          )}
                        </li>
                        {content.subtemas.map((subtema, i) => (
                          <div key={subtema + i} className="w-[90%] min-h-10 items-center border border-black px-2 py-3 rounded-md gap-2">
                            <li className='flex justify-between' >
                              {editSubContentIndex.contentIndex === index && editSubContentIndex.subIndex === i ? (
                                <>
                                  <input
                                    className="w-full bg-transparent"
                                    autoFocus
                                    type="text"
                                    value={editSubContent}
                                    onChange={(e) => setEditSubContent(e.target.value)}
                                  />
                                  <button type="button" onClick={saveEditContentSubtheme}>💾</button>
                                </>
                              ) : (
                                <>
                                  <p className='font-semibold flex w-[85%] whitespace-nowrap overflow-hidden overflow-ellipsis' title={subtema}>{subtema}</p>
                                  <div className='flex gap-2'>
                                    <button type="button" onClick={() => setContentList(contentList.map((item, j) => j === index ? { ...item, subtemas: item.subtemas.filter((_, k) => k !== i) } : item))}>
                                      <IconTrash />
                                    </button>
                                    <button type='button' onClick={() => handleEditContentSubtheme(index, i)}><IconEdit /></button>
                                  </div>
                                </>
                              )}
                            </li>
                          </div>
                        ))}
                        {isVisibleAddSubContentIndex === index ? (
                          <div className='flex w-[90%] h-10 border-2 rounded-md border-black px-2'>
                            <input
                              type="text"
                              autoFocus
                              value={addSubContent}
                              className='w-full bg-transparent px-2'
                              onChange={(e) => setAddSubContent(e.target.value)}
                            />
                            <button type="button" onClick={() => handleAddSubContent(index)}>💾</button>
                          </div>
                        ) : (
                          <ButtonContinue text="+" color="bg-white w-[90%]" type='button' onClick={() => setIsVisibleAddSubContentIndex(index)} />
                        )}
                      </div>
                    </div>
                  ))}
                  <li>
                  </li>
                </ul>
              </div>
              <div className='flex mt-auto justify-center gap-8'>
                <ButtonContinue type='button' text="Omitir por ahora" color="bg-white" onClick={() => setIsModalOpen(!isModalOpen)} />
                <ButtonContinue text="Continuar" onClick={() => handleSubmit} />
              </div>
            </div>
          </>
        ) : (
          <>
            <h3 className="font-bold text-4xl">¿Quieres subir tu planificación anual?</h3>

            <div className="text-gray-600 mt-2 mb-10 items-center">
              <p>Sube el documento con los temas oficiales y extraeremos los contenidos automáticamente.</p>
              <p>Después, podrás ordenarlos fácilmente en el calendario. </p>
            </div>
            <div className='w-9/12 h-full flex flex-col gap-4 self-center'>

              <div className="flex flex-col gap-4 items-center justify-center">

                <div className="relative flex flex-col items-center justify-center border-2 bg-[#fef1ca] border-gray-500 rounded-lg p-4 h-64 gap-8 py-8 w-full">
                  <p className="font-semibold">Sube aquí tu documento del ministerio (PDF/Word) con los temas oficiales</p>
                  <input
                    type="file"
                    className="absolute top-0 opacity-0 w-full h-full cursor-pointer"
                    onChange={(e) => setPlanificationFile(e.target.files![0])}
                  />
                  <svg width="84" height="105" viewBox="0 0 84 105" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M52.4168 0.416016H10.7502C5.021 0.416016 0.385581 5.10352 0.385581 10.8327L0.333496 94.166C0.333496 99.8952 4.96891 104.583 10.6981 104.583H73.2502C78.9793 104.583 83.6668 99.8952 83.6668 94.166V31.666L52.4168 0.416016ZM73.2502 94.166H10.7502V10.8327H47.2085V36.8744H73.2502V94.166ZM21.1668 68.1764L28.5106 75.5202L36.7918 67.291V88.9577H47.2085V67.291L55.4897 75.5723L62.8335 68.1764L42.0522 47.291L21.1668 68.1764Z" fill="#3A3838" />
                  </svg>
                </div>
                <p>O</p>
                <div className="relative">
                  <input
                    type="file"
                    className="absolute top-0 opacity-0 w-full h-full cursor-pointer z-10"
                    onChange={(e) => setPlanificationFile(e.target.files![0])}
                  />
                  <ButtonContinue text={loading ? 'Procesando lista...' : 'Seleccione archivo desde dispositivo'} color="bg-[#fbc82d]" type='button' />
                </div>
              </div>

              <div className='flex gap-2'>
                <IconInfo />
                <div className='text-gray-600'>
                  <p>¿No tienes el documento a mano?</p>
                  <p>No te preocupes, siempre podrás añadir contenidos manualmente más adelante</p>
                  <p>Presiona en &quot;Omitir por ahora&quot;</p>
                </div>
              </div>
              {importError && <p className="text-red-500 my-2">{importError}</p>}
              <div className="flex justify-center space-x-4 mt-auto">
                <ButtonContinue type='button' text="Omitir por ahora" color="bg-white" onClick={() => setIsModalOpen(!isModalOpen)} />
              </div>
            </div>
          </>
        )}

        {loading &&
          <LoadingFile setLoading={setLoading} />
        }
      </form>
      {isModalOpen && (
        <OmitModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          handleCancel={() => setIsModalOpen(false)}
          handleConfirm={handleSkip}
        />
      )}
    </div>
  )
}

