'use client'
import { AddPlanificationAction } from "@/actions/addCourse.action"
import { Content, Month } from "@/interfaces/ICourses.interface"
import ButtonContinue from "@/ui/buttons/buttonContinue"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { DndContext, DragEndEvent, DragOverlay, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { DraggableContent } from "./dnd-kit/DraggableContent"
import { DroppableMonth } from "./dnd-kit/DroppableMonth"
import ButtonArrowPink from "@/ui/buttons/buttonArrowPink"
import StepIndicator from "./stepIndicator"

interface Props {
  contentList: Content[]
  planificationStep: number
}

const MONTHS: Month[] = [
  {
    "id": 0,
    "month": "Enero",
    "color": "bg-green-100",

    "content": []
  },
  {
    "id": 1,
    "month": "Febrero",
    "color": "bg-pink-100",
    "content": []
  },
  {
    "id": 2,
    "month": "Marzo",
    "color": "bg-yellow-100",
    "content": []
  },
  {
    "id": 3,
    "month": "Abril",
    "color": "bg-blue-light-100",
    "content": []
  },
  {
    "id": 4,
    "month": "Mayo",
    "color": "bg-green-100",
    "content": []
  },
  {
    "id": 5,
    "month": "Junio",
    "color": "bg-pink-100",
    "content": []
  },
  {
    "id": 6,
    "month": "Julio",
    "color": "bg-yellow-100",
    "content": []
  },
  {
    "id": 7,
    "month": "Agosto",
    "color": "bg-blue-light-100",
    "content": []
  },
  {
    "id": 8,
    "month": "Septiembre",
    "color": "bg-green-100",
    "content": []
  },
  {
    "id": 9,
    "month": "Octubre",
    "color": "bg-pink-100",
    "content": []
  },
  {
    "id": 10,
    "month": "Noviembre",
    "color": "bg-yellow-100",
    "content": []
  },
  {
    "id": 11,
    "month": "Diciembre",
    "color": "bg-blue-light-100",
    "content": []
  },
]

export default function AddToCalendar({ contentList, planificationStep }: Props) {
  const [monthContent, setMonthContent] = useState(MONTHS)
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0)
  const [currentMonthsView, setCurrentMonthsView] = useState(monthContent.slice(currentMonthIndex, 4))
  const [activeId, setActiveId] = useState<string | null>(null);
  const router = useRouter()
  const [newContentList, setNewContentList] = useState<Content[]>(contentList)

  const handleRemoveContent = (monthIndex: number, contentIndex: number) => {
    const updatedMonthContent = [...monthContent]
    updatedMonthContent[monthIndex].content?.splice(contentIndex, 1)
    setMonthContent(updatedMonthContent)
  }

  const handlePreviousMonths = () => {
    const newIndex = Math.max(currentMonthIndex - 4, 0)
    setCurrentMonthIndex(newIndex)
    setCurrentMonthsView(MONTHS.slice(newIndex, newIndex + 4))
  }

  const handleNextMonths = () => {
    const newIndex = Math.min(currentMonthIndex + 4, MONTHS.length - 4)
    setCurrentMonthIndex(newIndex)
    setCurrentMonthsView(MONTHS.slice(newIndex, newIndex + 4))
  }

  const handleAddPlanification = () => {
    AddPlanificationAction(monthContent).then((data) => {
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
      const contentIndex = parseInt((active.id as string).replace('content-', ''), 10);
      const monthIndex = parseInt((over.id as string).replace('month-', ''), 10);

      const content = newContentList[contentIndex];
      const updatedMonthContent = [...monthContent];

      //revisar logica
      //actualmente busca el indice del contenido en el mes y si existe lo suma
      //deberia buscar el contenido en todos los meses y ahi modificar la cantidad por la cantidad de veces
      //que se encuentra en los meses
      const existingContentIndex = updatedMonthContent[monthIndex].content.findIndex(
        (item) => item.text === content.text
      );

      if (existingContentIndex !== -1) {
        const existingContent = updatedMonthContent[monthIndex].content[existingContentIndex];
        const newContent = { ...existingContent, quantity: (existingContent.quantity || 1) + 1 };

        updatedMonthContent[monthIndex].content[existingContentIndex] = newContent;

        setNewContentList(newContentList.map((item) => item.text === content.text ? newContent : item));
      } else {
        updatedMonthContent[monthIndex].content.push(content);
      }

      setMonthContent(updatedMonthContent);
    }
  };

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

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} sensors={sensors} >

      <div className='w-full h-screen flex flex-col gap-2 p-16'>
        <h3 className="font-bold text-4xl">¿Quieres crear tu planificación anual?</h3>
        <div className="px-32">
          <StepIndicator step={planificationStep} />
          <div className="text-gray-600 text-xl my-2">
            <p>Ya que tenés los contenidos, arrastralos al mes que elijas para su dictado.</p>
            <p>Luego podrás cambiar su organización. </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <ul className="flex flex-wrap text-wrap gap-6 px-32 max-h-[180px] overflow-auto">
            {newContentList.map((content, index) => (
              <DraggableContent key={index} content={content} index={index} />

            ))}
          </ul>
        </div>
        <>
          <div className="w-full flex justify-between">
            {currentMonthIndex > 0 && (
              <div className="w-full text-end flex justify-start gap-2 items-center">
                <ButtonArrowPink rotate onClick={handlePreviousMonths} text="Meses Anteriores" />

              </div>
            )}
            {currentMonthIndex < MONTHS.length - 4 && (
              <div className="w-full text-end flex justify-end gap-2 items-center">
                <ButtonArrowPink onClick={handleNextMonths} text="Próximos Meses" />
              </div>
            )}
          </div>
          <div className="flex gap-6 justify-between">
            {currentMonthsView.map((month) => (
              <DroppableMonth key={month.id} month={month} index={month.id} handleDelete={handleRemoveContent} />
            ))}
          </div>
        </>

        <div className="flex justify-center mt-8 gap-8">
          <ButtonContinue type="button" text="Omitir por ahora" onClick={handleSkip} color="bg-white" />
          <ButtonContinue type="button" text="Continuar" onClick={handleAddPlanification} />
        </div>
      </div>
      <DragOverlay>
        {activeId ? (
          <DraggableContent
            content={newContentList[parseInt(activeId.replace('content-', ''), 10)]}
            index={parseInt(activeId.replace('content-', ''), 10)}
          />
        ) : null}
      </DragOverlay>
    </DndContext>

  )
}