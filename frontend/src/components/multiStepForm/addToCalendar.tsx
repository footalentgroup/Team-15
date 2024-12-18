'use client'
import { AddPlanificationAction } from "@/actions/addCourse.action"
import { Month } from "@/interfaces/ICourses.interface"
import ButtonContinue from "@/ui/buttons/buttonContinue"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface Props {
  contentList: string[]
}

const MONTHS: Month[] = [
  {
    "month": "Enero",
    "color": "bg-pink-200",
    "content": []
  },
  {
    "month": "Febrero",
    "color": "bg-blue-200",
    "content": []
  },
  {
    "month": "Marzo",
    "color": "bg-yellow-200",
    "content": []
  },
  {
    "month": "Abril",
    "color": "bg-green-200",
    "content": []
  },
  {
    "month": "Mayo",
    "color": "bg-red-200",
    "content": []
  },
  {
    "month": "Junio",
    "color": "bg-blue-200",
    "content": []
  },
  {
    "month": "Julio",
    "color": "bg-yellow-200",
    "content": []
  },
  {
    "month": "Agosto",
    "color": "bg-green-200",
    "content": []
  },
  {
    "month": "Septiembre",
    "color": "bg-red-200",
    "content": []
  },
  {
    "month": "Octubre",
    "color": "bg-blue-200",
    "content": []
  },
  {
    "month": "Noviembre",
    "color": "bg-yellow-200",
    "content": []
  },
  {
    "month": "Diciembre",
    "color": "bg-green-200",
    "content": []
  },
]

export default function AddToCalendar({ contentList }: Props) {
  const [monthContent, setMonthContent] = useState(MONTHS)
  const [selectedContentIndex, setSelectedContentIndex] = useState<number | null>(null)
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number | null>(null)
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0)
  const [currentMonthsView, setCurrentMonthsView] = useState(monthContent.slice(currentMonthIndex, 4))
  const router = useRouter()

  const handleContentClick = (index: number) => {
    setSelectedContentIndex(index)
  }

  const handleAddContent = () => {
    if (selectedContentIndex !== null && selectedMonthIndex !== null) {
      const content = contentList[selectedContentIndex]
      const updatedMonthContent = [...monthContent]
      updatedMonthContent[selectedMonthIndex].content?.push(content)
      setMonthContent(updatedMonthContent)
      setSelectedContentIndex(null)
      setSelectedMonthIndex(null)
    }
  }

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

  return (
    <div className='w-full h-screen flex flex-col gap-2 p-16'>
      <div>
        <h3 className="font-bold text-4xl">Calendarizá los contenidos</h3>
        <div className="text-gray-600 text-xl my-6 mb-8">
          <p>Ya que tenés los contenidos, arrastralos al mes que elijas  para su dictado.</p>
          <p>Luego podrás cambiar su organización. </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <ul className="flex flex-wrap text-wrap gap-6 mt-4 px-32 max-h-[180px] overflow-scroll">
          {contentList.map((content, index) => (
            <li key={index} className="w-[310px] h-10 flex justify-between items-center border border-black px-2 rounded-md gap-2" onClick={() => handleContentClick(index)}>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      </div>
      <>
        <div className="w-full flex justify-between">
          {currentMonthIndex > 0 && (
            <button type="button" onClick={handlePreviousMonths} className="w-full text-start">
              Meses Anteriores
            </button>
          )}
          {currentMonthIndex < MONTHS.length - 4 && (
            <button type="button" onClick={handleNextMonths} className="w-full text-end">
              Próximos Meses
            </button>
          )}
        </div>
        <div className="flex gap-6 justify-between">
          {currentMonthsView.map((month, index) => (
            <div className="flex flex-col border-2 border-black rounded-lg min-h-[340px] min-w-[310px]" key={index}>
              <div className={`${month.color} p-3 border-b-2 border-black rounded-t-md`}>
                <h4 className="font-bold text-2xl">{month.month}</h4>
              </div>
              <ul className="flex flex-col gap-4 h-full overflow-scroll px-2 py-4">
                {month.content?.map((content, index) => (
                  <li key={index} className="w-full h-10 flex justify-between items-center border border-black px-2 rounded-md gap-2">
                    <p>{content}</p>
                    <button type="button" onClick={() => handleRemoveContent(selectedMonthIndex ?? 0, index)}>✖</button>
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>
      </>
      {selectedContentIndex !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <h4 className="font-bold text-xl mb-4">Selecciona un mes para agregar el contenido</h4>
            <select
              value={selectedMonthIndex ?? ''}
              onChange={(e) => setSelectedMonthIndex(Number(e.target.value))}
              className="border p-2 w-full mb-4"
            >
              <option value="" disabled>Selecciona un mes</option>
              {monthContent.map((month, index) => (
                <option key={index} value={index}>{month.month}</option>
              ))}
            </select>
            <ButtonContinue type="button" text="Agregar" onClick={handleAddContent} />
          </div>
        </div>
      )}
      <div className="flex justify-center mt-8">
        <ButtonContinue type="button" text="Volver atras" onClick={() => console.log('deberia volver atras pero todavia no estoy implementado')} color="bg-gray-500 text-white" />
        <div className="flex mx-auto">
          <ButtonContinue type="button" text="Continuar" onClick={handleAddPlanification} />
        </div>
      </div>
    </div>
  )
}