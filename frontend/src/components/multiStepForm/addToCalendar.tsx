'use client'
import { Content, PeriodFromAction, PeriodTime, PLanificationMonth } from "@/interfaces/ICourses.interface"
import ButtonContinue from "@/ui/buttons/buttonContinue"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { DndContext, DragEndEvent, DragOverlay, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { DraggableContent } from "./dnd-kit/DraggableContent"
import { DroppableMonth } from "./dnd-kit/DroppableMonth"
import ButtonArrowPink from "@/ui/buttons/buttonArrowPink"
import StepIndicator from "./stepIndicator"
import FlagStepIndicator from "./flagStepIndicator"
import OmitModal from "./omitModal"
import { INITIAL_MONTHS } from "@/utils/initialMonths"
import { IMonthPlanification, IPlanification, ISubtheme, ITheme } from "@/interfaces/IPlanification.interfaces"
import { createNewMonthPlanificationAction } from "@/actions/planificationActions"

interface Props {
  contentList: Content[]
  planificationStep: number
  period: PeriodFromAction | null
  currentPlanification: IPlanification | null
}

export default function AddToCalendar({ planificationStep, period, currentPlanification }: Props) {
  const monthsLength = period?.duracion === 'semestral' ? 6 : period?.duracion === 'trimestral' ? 3 : 4
  const periodTitle = period?.duracion === 'semestral' ? 'semestre' : period?.duracion === 'trimestral' ? 'trimestre' : 'cuatrimestre'
  const startMonthFromPeriod = Number(period?.periodos[0].fecha_inicio.split('-')[1])
  const periodLength = period !== null ? period.periodos.length : 0
  //const endMonthFromPeriod = Number(period?.periodos[0].fecha_cierre.split('-')[1])
  //const nextStartMonthFromPeriod = Number(period?.periodos[1].fecha_inicio.split('-')[1])
  //const nextEndMonthFromPeriod = Number(period?.periodos[1].fecha_cierre.split('-')[1])

  //const monthLengthFromFirstPeriod = endMonthFromPeriod - startMonthFromPeriod + 1
  //const monthLengthFromNextPeriod = nextEndMonthFromPeriod - nextStartMonthFromPeriod + 1

  const allSubthemes = currentPlanification!.temas.flatMap((theme) => theme.subtemas.map((subtema) => subtema));


  const [currentPeriodIndex, setCurrentPeriodIndex] = useState(0)
  const [currentPeriod, setCurrentPeriod] = useState<PeriodTime | undefined>(period?.periodos[currentPeriodIndex])
  const [currentPeriodTitle, setCurrentPeriodTitle] = useState<string | undefined>(`${currentPeriodIndex + 1}° ${periodTitle}`)
  const [monthContent, setMonthContent] = useState<PLanificationMonth[]>(INITIAL_MONTHS as PLanificationMonth[])
  const [currentMonthIndex, setCurrentMonthIndex] = useState(startMonthFromPeriod - 1)
  const [currentMonthsView, setCurrentMonthsView] = useState(monthContent.slice(startMonthFromPeriod - 1, startMonthFromPeriod - 1 + monthsLength))
  const [activeId, setActiveId] = useState<string | null>(null);
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [newContentList, setNewContentList] = useState<ITheme[]>(currentPlanification!.temas)
  const [currentContent, setCurrentContent] = useState<ISubtheme | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImported, setIsImported] = useState(false);


  const handleRemoveContent = (monthIndex: number, contentIndex: number) => {
    const updatedMonthContent = [...monthContent]
    updatedMonthContent[monthIndex].content?.splice(contentIndex, 1)
    setMonthContent(updatedMonthContent)
  }

  const handlePreviousMonths = () => {
    const newIndex = Math.max(currentMonthIndex - monthsLength, 0)
    const newPeriodIndex = currentPeriodIndex - 1

    setCurrentPeriodIndex(newPeriodIndex)
    setCurrentPeriod(period?.periodos[newPeriodIndex])
    setCurrentPeriodTitle(`${newPeriodIndex + 1}° ${periodTitle}`)
    setCurrentMonthIndex(newIndex)
    setCurrentMonthsView((INITIAL_MONTHS as PLanificationMonth[]).slice(newIndex, newIndex + monthsLength))
  }

  const handleNextMonths = () => {
    const newIndex = Math.min(currentMonthIndex + monthsLength, INITIAL_MONTHS.length - 4)
    const newPeriodIndex = currentPeriodIndex + 1

    if (newPeriodIndex >= period!.periodos.length) {
      return
    }
    setCurrentPeriodIndex(newPeriodIndex)
    setCurrentPeriodTitle(`${newPeriodIndex + 1}° ${periodTitle}`)

    setCurrentMonthIndex(newIndex)
    setCurrentMonthsView((INITIAL_MONTHS as PLanificationMonth[]).slice(newIndex, newIndex + monthsLength))
    setCurrentPeriod(period?.periodos[newPeriodIndex])
  }

  const handleAddPlanification = () => {
    const monthPlanification: IMonthPlanification[] = []
    monthContent.forEach((month) => {
      month.content.forEach((content) => {
        monthPlanification.push(content);
      });
    });

    createNewMonthPlanificationAction(monthPlanification).then((data) => {
      if (data?.success) {
        /* router.push('/home') */
        setIsImported(true)
      } else {
        console.error('Planification failed', data)
      }
    }).catch((error) => {
      console.error('An error occurred', error)
    })
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (over) {
      const [contentSubIndex] = (active.id as string).replace('content-', '').split('-').map(Number);
      const monthIndex = parseInt((over.id as string).replace('month-', ''), 10);

      /* const currentMonth = monthContent[monthIndex] */
      const currentContent = allSubthemes.find((subtheme) => subtheme.id === contentSubIndex)

      if (currentContent) {
        const updatedMonthContent = [...monthContent]
        const newContent: IMonthPlanification = {
          planificacion_id: currentPlanification!.id,
          subtema_id: currentContent.id,
          tipo_actividad: "",
          fecha: updatedMonthContent[monthIndex].date,
          subtema: currentContent
        }
        updatedMonthContent[monthIndex].content.push(newContent)
        setMonthContent(updatedMonthContent)
      }
    }
  }

  const handleDragStart = (event: DragEndEvent) => {
    setActiveId(event.active.id as string);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
  )

  const handleSkip = () => {
    router.push('/home')
  }

  const formatDate = (date: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_year, month, day] = date.split('-')
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    return `${day} de ${months[parseInt(month) - 1]}`
  }

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} sensors={sensors} >
      <div className="w-full h-screen relative">
        <FlagStepIndicator step={3} title="Planificación" />
        <div className="flex justify-center py-4">
          <StepIndicator step={planificationStep} />
        </div>
        <div className='flex flex-col gap-2 p-16 pt-0 h-[89%]'>
          <h3 className="font-bold text-4xl">¿Querés crear tu planificación anual?</h3>
          <div className="text-gray-600 text-xl my-2">
            <p>Ya que tenés los contenidos, arrastralos al mes que elijas para dictarlos. Luego podrás reorganizarlos.</p>
          </div>
          <div className="w-10/12 self-center h-[400px] overflow-y-auto">
            <ul className="columns-1 sm:columns-2 lg:columns-3 gap-4 mt-4 px-6 overflow-y-auto">
              <>
                {newContentList.map((content, index) => (
                  <div key={content.nombre + index} className="flex flex-col gap-2 break-inside-avoid mb-4" >
                    <li className="w-full min-h-10 flex justify-between items-center border border-black bg-yellow-100 px-2 py-3 rounded-md gap-2 font-semibold">
                      Unidad {content.unidad}: {content.nombre}
                    </li>
                    <div className="flex flex-col gap-2 items-center w-full">
                      {content.subtemas.map((subtema) => (
                        <DraggableContent key={subtema.id} content={subtema} index={subtema.id} setCurrentContent={setCurrentContent} />
                      ))
                      }
                    </div>
                  </div>
                ))}
              </>
            </ul>
          </div>
          <>
            <div className="w-full flex justify-between">
              {period && (
                <div className="flex w-full gap-2 items-center py-4">
                  {currentMonthIndex > monthsLength && (
                    <div className="text-end flex gap-2 items-center">
                      <ButtonArrowPink rotate onClick={handlePreviousMonths} text="" />
                    </div>
                  )}
                  <span className="font-semibold text-[22px]">{currentPeriodTitle}</span>
                  <span className="text-gray">({formatDate(currentPeriod!.fecha_inicio)} - {formatDate(currentPeriod!.fecha_cierre)})</span>
                  {period && currentMonthIndex < periodLength && (
                    <div className="text-end flex gap-2 items-center">
                      <ButtonArrowPink onClick={handleNextMonths} text="" />
                    </div>
                  )}
                </div>
              )}

            </div>
            <div className={`flex gap-6 justify-between h-full ${monthsLength > 4 ? "overflow-x-scroll overflow-y-hidden" : ""}`}>
              {currentMonthsView.map((month) => (
                <DroppableMonth key={month.id} month={month} index={month.id} handleDelete={handleRemoveContent} />
              ))}
            </div>
          </>

          <div className="flex justify-center mt-8 gap-8">
            <ButtonContinue type="button" text="Omitir por ahora" onClick={() => setIsModalOpen(!isModalOpen)} color="bg-white" />
            <ButtonContinue type="button" text="Continuar" onClick={handleAddPlanification} />
          </div>
        </div>
      </div>
      <DragOverlay>
        {activeId ? (
          <div className="z-50 flex items-center justify-center w-[310px] h-10 border border-black px-2 rounded-md gap-2 cursor-pointer touch-none">
            <p>{currentContent?.nombre}</p>
          </div>
        ) : null}
      </DragOverlay>
      {isModalOpen && (
        <OmitModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          handleCancel={() => setIsModalOpen(false)}
          handleConfirm={handleSkip}
        />
      )}

      {isImported && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="flex flex-col gap-4 bg-yellow-100 p-4 rounded-lg w-[448px] h-[189px] px-6 filter drop-shadow-[18px_14px_0px_#000000]">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">¡Planificación creada con éxito!</h3>
            </div>
            <p>Tu planificación fue creada con éxito.</p>
            <div className="flex justify-end space-x-4 mt-auto">
              <ButtonContinue type="button" text="Confirmar" onClick={handleSkip} />
            </div>
          </div>
        </div>
      )}

    </DndContext>

  )
}