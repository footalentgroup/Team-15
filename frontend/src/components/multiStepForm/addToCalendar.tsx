'use client'
import { AddToCalendarAction, } from "@/actions/addCourse.action"
import { Content, Month, PeriodFromAction, PeriodTime } from "@/interfaces/ICourses.interface"
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

interface Props {
  contentList: Content[]
  planificationStep: number
  period: PeriodFromAction | null
}

export default function AddToCalendar({ contentList, planificationStep, period }: Props) {
  console.log(contentList);
  const monthsLength = period?.duracion === 'semestral' ? 6 : period?.duracion === 'trimestral' ? 3 : 4
  const periodTitle = period?.duracion === 'semestral' ? 'semestre' : period?.duracion === 'trimestral' ? 'trimestre' : 'cuatrimestre'
  const [currentPeriodIndex, setCurrentPeriodIndex] = useState(0)
  const [currentPeriod, setCurrentPeriod] = useState<PeriodTime | undefined>(period?.periodos[currentPeriodIndex])
  const [currentPeriodTitle, setCurrentPeriodTitle] = useState<string | undefined>(`${currentPeriodIndex + 1}° ${periodTitle}`)
  const [monthContent, setMonthContent] = useState<Month[]>(INITIAL_MONTHS as Month[])
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0)
  const [currentMonthsView, setCurrentMonthsView] = useState(monthContent.slice(currentMonthIndex, monthsLength))
  const [activeId, setActiveId] = useState<string | null>(null);
  const router = useRouter()
  const [newContentList, setNewContentList] = useState<Content[]>(contentList)
  const [currentContent, setCurrentContent] = useState<Content | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleRemoveContent = (monthIndex: number, contentIndex: number) => {
    const updatedMonthContent = [...monthContent]
    updatedMonthContent[monthIndex].content?.splice(contentIndex, 1)
    setMonthContent(updatedMonthContent)
  }

  const handlePreviousMonths = () => {
    const newIndex = Math.max(currentMonthIndex - monthsLength, 0)
    const newPeriodIndex = currentPeriodIndex - 1
    console.log("newPeriodIndex", newPeriodIndex);
    console.log("currentMonthIndex", newIndex);
    setCurrentPeriodIndex(newPeriodIndex)
    setCurrentPeriod(period?.periodos[newPeriodIndex])
    setCurrentPeriodTitle(`${newPeriodIndex + 1}° ${periodTitle}`)
    setCurrentMonthIndex(newIndex)
    setCurrentMonthsView((INITIAL_MONTHS as Month[]).slice(newIndex, newIndex + monthsLength))
  }

  const handleNextMonths = () => {
    const newIndex = Math.min(currentMonthIndex + monthsLength, INITIAL_MONTHS.length - 4)
    const newPeriodIndex = currentPeriodIndex + 1
    console.log("newPeriodIndex", newPeriodIndex);
    if (newPeriodIndex >= period!.periodos.length) {
      return
    }
    setCurrentPeriodIndex(newPeriodIndex)
    setCurrentPeriodTitle(`${newPeriodIndex + 1}° ${periodTitle}`)
    console.log("currentMonthIndex", newIndex);
    setCurrentMonthIndex(newIndex)
    setCurrentMonthsView((INITIAL_MONTHS as Month[]).slice(newIndex, newIndex + monthsLength))
    setCurrentPeriod(period?.periodos[newPeriodIndex])
  }

  const handleAddPlanification = () => {
    AddToCalendarAction(monthContent).then((data) => {
      if (data.success) {
        router.push('/home')
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
      const [contentSubIndex, contentParentIndex] = (active.id as string).replace('content-', '').split('-').map(Number);
      const monthIndex = parseInt((over.id as string).replace('month-', ''), 10);

      if (!isNaN(contentParentIndex) && !isNaN(contentSubIndex) && !isNaN(monthIndex)) {
        console.log('contentParentIndex', contentParentIndex);
        console.log('contentSubIndex', contentSubIndex);
        console.log('monthIndex', monthIndex);
        console.log("newContentList", newContentList);

        const content = newContentList[contentParentIndex];
        const subContent = content.subtemas[contentSubIndex];
        console.log('content', content);
        console.log('subContent', subContent);
        const updatedMonthContent = [...monthContent];
        console.log('updatedMonthContent', updatedMonthContent);

        const existingContentIndex = updatedMonthContent[monthIndex].content.findIndex(
          (item) => item.tema === subContent
        );

        if (existingContentIndex !== -1) {
          const existingContent = updatedMonthContent[monthIndex].content[existingContentIndex];
          const newContent = { ...existingContent, quantity: (existingContent.quantity || 1) + 1 };

          updatedMonthContent[monthIndex].content[existingContentIndex] = newContent;

          setNewContentList(newContentList.map((item) => item.tema === subContent ? newContent : item));
        } else {
          updatedMonthContent[monthIndex].content.push({ tema: subContent, subtemas: [], quantity: 1 });
        }

        setMonthContent(updatedMonthContent);
      } else {
        console.error('Invalid indices:', { contentParentIndex, contentSubIndex, monthIndex });
      }
    }
  }

  const handleDragStart = (event: DragEndEvent) => {
    console.log('drag start', event.active.id);
    console.log('drag start', event);
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
    const [_year, month, day] = date.split('-')
    console.log("date", _year, month, day);
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
        <div className='flex flex-col gap-2 p-16 pt-0 h-[90%]'>
          <h3 className="font-bold text-4xl">¿Quieres crear tu planificación anual?</h3>
          <div className="text-gray-600 text-xl my-2">
            <p>Ya que tenés los contenidos, arrastralos al mes que elijas para su dictado. Luego podrás cambiar su organización. </p>
          </div>
          <div className="w-10/12 self-center h-[400px] overflow-y-auto">
            <ul className="columns-1 sm:columns-2 lg:columns-3 gap-4 mt-4 px-6 overflow-y-auto">
              <>
                {newContentList.map((content, index) => (
                  <div key={content.tema + index} className="flex flex-col gap-2 break-inside-avoid mb-4" >
                    <li className="w-full min-h-10 flex justify-between items-center border border-black bg-yellow-100 px-2 py-3 rounded-md gap-2 font-semibold">
                      Unidad {content.unidad}: {content.tema}
                    </li>
                    <div className="flex flex-col gap-2 items-center w-full">
                      {content.subtemas.map((subtema, i) => (
                        <DraggableContent key={subtema} content={{ subtemas: [subtema], tema: subtema, quantity: 1 }} index={i} parentIndex={index} setCurrentContent={setCurrentContent} />
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
                  {currentMonthIndex > 0 && (
                    <div className="text-end flex gap-2 items-center">
                      <ButtonArrowPink rotate onClick={handlePreviousMonths} text="" />
                    </div>
                  )}
                  <span className="font-semibold text-[22px]">{currentPeriodTitle}</span>
                  <span className="text-gray">({formatDate(currentPeriod!.fecha_inicio)} - {formatDate(currentPeriod!.fecha_cierre)})</span>
                  {currentMonthIndex < INITIAL_MONTHS.length - monthsLength && currentMonthIndex <= 3 && (
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
            <p>{currentContent?.tema}</p>
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

    </DndContext>

  )
}