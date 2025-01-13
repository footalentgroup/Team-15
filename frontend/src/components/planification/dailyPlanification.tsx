"use client"
import { IconArrow } from '@/icons';
import { IPlanification } from '@/interfaces/IPlanification.interfaces';
import ButtonContinue from '@/ui/buttons/buttonContinue';
import SelectType from '@/ui/selects/SelectType';
import React, { useState } from 'react';

const TYPE_CLASS = ['Examen', 'Clase teórica', 'Clase práctica'];

interface Props {
  date: string;
  startDate: string;
  endDate: string;
  data: IPlanification[]
}

function DailyPlanification({ date, startDate, endDate, data }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date(date))
  const [currentOption, setCurrentOption] = useState(TYPE_CLASS[0]);
  const [currentThemes, setCurrentThemes] = useState<string[]>(["Revolución Francesa"]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentResources, setCurrentResources] = useState<string[]>(["Revolucion Francesa"]);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
/*   const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
 */  const [currentTheme, setCurrentTheme] = useState<string>('');
  console.log('currentDate', currentDate);
  console.log("startDate", startDate);
  console.log("endDate", endDate);

  const handleNextDay = () => {
    if (currentDate >= new Date(endDate)) {
      return
    }
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1)))
  }

  const handlePreviousDay = () => {
    if (currentDate <= new Date(startDate)) {
      return
    }
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1)))
  }
  const formattedDate = currentDate.toLocaleDateString('es-ES', { weekday: 'long', month: 'long', day: 'numeric' })

  const handleConfirmTheme = () => {
    setCurrentThemes([...currentThemes, currentTheme]);
    setIsThemeModalOpen(!isThemeModalOpen);
  }

  return (
    <div className='relative h-3/5'>
      <div className='flex justify-between items-center'>
        <div className='flex justify-start items-center'>
          <button className='cursor-pointer' onClick={handlePreviousDay}>
            <IconArrow color='black' classNames='rotate-180 size-8' />
          </button>
          <span className='text-[22px] font-semibold capitalize'>{formattedDate}</span>
          <button className='cursor-pointer' onClick={handleNextDay}>
            <IconArrow color='black' classNames='size-8' />
          </button>
        </div>
        <div className='flex gap-6'>
          <ButtonContinue text='Crear tarea' type='button' height='h-10' />
          <ButtonContinue text='Crear Exámen' type='button' height='h-10' />
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <span>Tipo de clase</span>
        <div className='w-28 h-8 mb-2'>
          <SelectType options={TYPE_CLASS} value={currentOption} onChange={setCurrentOption} />
        </div>
        <span>Tema/s</span>
        <div className='flex gap-4 mb-2 h-8'>
          <ButtonContinue text='+' type='button' width='w-8 ps-3 text-lg rounded-xl border-none filter drop-shadow-[-1px_-1px_0px_#000000]' height='h-8' onClick={() => setIsThemeModalOpen(!isThemeModalOpen)} />
          {currentThemes.map((theme, index) => (
            <div key={index} className='flex gap-4 font-semibold justify-between items-center border-2 border-black rounded-md p-2 bg-white'>
              <span>{theme}</span>
              <button className='cursor-pointer' onClick={() => setCurrentThemes(currentThemes.filter((item) => item !== theme))}>
                X
              </button>
            </div>
          ))}
        </div>
        <span>Recursos</span>
        <div className='flex gap-4 mb-4 h-8 items-center'>
          <ButtonContinue text='+' type='button' width='w-8 ps-3 text-lg rounded-xl border-none filter drop-shadow-[-1px_-1px_0px_#000000]' height='h-8' />
          {currentResources.map((theme, index) => (
            <div key={index} className='h-full flex gap-4 font-semibold justify-between items-center border-2 border-black rounded-md p-2 bg-white'>
              <span>{theme}</span>
              <button className='cursor-pointer'>
                X
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-col h-full'>
        <span className='text-[22px] font-semibold mb-2'>Detalles de la clase</span>
        <textarea className='resize-none bg-transparent flex-1 w-full h-full font-medium border-2 border-black rounded-md p-3 overflow-y-auto' />
      </div>

      {isThemeModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className='flex flex-col gap-4 bg-yellow-light-100 p-10 w-4/6 h-4/6 rounded-xl filter drop-shadow-[18px_14px_0px_#000000]'>
            <button type="button" className='absolute top-4 right-4' onClick={() => setIsThemeModalOpen(!isThemeModalOpen)}>✖</button>

            <div>
              <h3 className='text-[22px] font-semibold'>Agregá un tema a la planificación diaria</h3>
              <span>Aquí se muestran las unidaddes que asignaste a este cuatrimestre</span>
            </div>

            <div className="w-10/12 self-center h-[400px] overflow-y-auto">
              {data.map((item, index) => (
                <ul key={index} className="columns-1 sm:columns-2 lg:columns-3 gap-4 mt-4 px-6 h-[90%] overflow-hidden">
                  <>
                    {item.temas.map((content, index) => (
                      <div key={content.nombre + index} className="flex flex-col gap-2 break-inside-avoid mb-4 h-full" >
                        <li className="w-full min-h-10 p-3 flex justify-between items-center border border-black bg-yellow-100 px-2 py-3 rounded-md gap-2 font-semibold">
                          Unidad {content.unidad}: {content.nombre}
                        </li>
                        <div className="flex flex-col gap-2 items-center w-full  overflow-y-auto">
                          {content.subtemas.map((subtema) => (
                            <li key={subtema.id} className={` ${currentTheme === subtema.nombre && "border-2 border-blue-light-500"} w-3/4 p-1 flex items-center border border-black px-2 rounded-md gap-2 cursor-pointer touch-none`} onClick={() => setCurrentTheme(subtema.nombre)}
                            >
                              <span className='flex w-[90%] whitespace-nowrap overflow-hidden overflow-ellipsis' title={subtema.nombre}>{subtema.nombre}</span>
                            </li>
                          ))
                          }
                        </div>
                      </div>
                    ))}
                  </>
                </ul>
              ))}
            </div>

            <div className='flex justify-center'>
              <ButtonContinue text='Agregar tema' type='button' width='w-40' height='h-10' onClick={handleConfirmTheme} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DailyPlanification;