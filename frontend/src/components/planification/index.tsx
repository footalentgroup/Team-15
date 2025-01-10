'use client'
import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/sidebar';
import DraggableCalendarWithExternalEvents from '../calendar/draggableCalendar';
import { ContentSlider } from './contentList';
import MonthlyCalendar from '../calendar/monthCalendat';
import { IconArrow, IconHand, IconUser } from '@/icons';
import { DndContext, DragEndEvent, DragOverlay, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { IPlanification, ISubtheme } from '@/interfaces/IPlanification.interfaces';
import { INITIAL_MONTHS } from '@/utils/initialMonths';
import { PLanificationMonth } from '@/interfaces/ICourses.interface';
import { IUser } from '@/interfaces/IAuth.interfaces';
import { DroppableDelete } from '../calendar/draggableCalendar/DroppableDelete';

interface Props {
  data: IPlanification[]
  user: IUser
}

function Planification({ data, user }: Props) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [view, setView] = useState("Cuatrimestral")
  const [currentItem, setCurrentItem] = useState<ISubtheme | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [months, setMonths] = useState<PLanificationMonth[]>(INITIAL_MONTHS as PLanificationMonth[])
  const [allSubthemes, setAllSubthemes] = useState<ISubtheme[]>([])
  const [isOver, setIsOver] = useState(false)
  const [startMonthIndex, setStartMonthIndex] = useState(0)
  const [endMonthIndex, setEndMonthIndex] = useState(4)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log('drag end', event);
    setActiveId(null);

    console.log('active', active);
    console.log('over', over);

    setIsOver(false);

    if (over) {
      const [themeIndex, subthemeIndex] = active.id.toString().split('-').map((index) => parseInt(index));
      const monthIndex = over.id.toString().split('-').map((index) => parseInt(index))[1];
      const isTrash = over.id === 'trash';
      console.log('themeIndex', themeIndex);
      console.log('subthemeIndex', subthemeIndex);
      console.log('monthIndex', monthIndex);

      if (monthIndex !== undefined) {
        const newMonths = months.map((month, index) => {
          if (index === monthIndex) {
            const theme = data[0].temas.find((theme) => theme.id === themeIndex);
            const isThemeInMonth = month.content.findIndex((content) => content.id === themeIndex);
            if (theme && isThemeInMonth === -1) {
              const newTheme = { ...theme, subtemas: theme.subtemas.filter((subtheme) => subtheme.id === subthemeIndex) }
              return { ...month, content: [...month.content, newTheme] }
            }
          }
          return month;
        })
        setMonths(newMonths);
      }

      if (isTrash) {
        console.log('delete', active.id);
        const newMonths = months.map((month) => {
          const newContent = month.content.map((content) => {
            const newSubtemas = content.subtemas.filter((subtema) => subtema.id !== subthemeIndex)
            return { ...content, subtemas: newSubtemas }
          })
          return { ...month, content: newContent }
        })
        setMonths(newMonths);
      }

    }
  }

  const handleDragStart = (event: DragEndEvent) => {
    console.log('drag start', event.active.id);
    console.log('drag start', event);
    console.log('currentItem', currentItem);
    setIsOver(true);
    if (event.over) {
      console.log('over', event.over.id);
    }

    const [themeId, subthemeId] = event.active.id.toString().split('-').map((index) => parseInt(index));

    data[0].temas.map((theme) => {
      if (theme.id === themeId) {
        theme.subtemas.map((subtheme) => {
          if (subtheme.id === subthemeId) {
            console.log('subtheme', subtheme);
            setCurrentItem(subtheme);
          }
        })
      }
    })
    setActiveId(event.active.id as string);
  };

  const handleNextMonth = () => {
    if (endMonthIndex < months.length) {
      setStartMonthIndex(startMonthIndex + 4);
      setEndMonthIndex(endMonthIndex + 4);
    }
  }

  const handlePreviousMonth = () => {
    if (startMonthIndex > 0) {
      setStartMonthIndex(startMonthIndex - 4);
      setEndMonthIndex(endMonthIndex - 4);
    }
  }

  useEffect(() => {
    const allSubthemes = data[0].temas.map((theme) => theme.subtemas).flat();
    setAllSubthemes(allSubthemes);
  }, []);

  return (
    <>
      <Sidebar isVisible={isVisible} setIsVisible={setIsVisible} isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <div className="ms-12 h-screen w-full flex flex-col gap-2 px-16 py-4">
        {/* background when is over */}
        <div className={`${isOver ? "absolute w-full h-full bg-[#75757532] top-0 left-0 z-10" : "invisible"}`} />
        <>
          <div className='flex justify-between mb-8'>
            <h1 className='text-4xl font-semibold'>Planificación</h1>
            <div className='flex gap-7'>
              <select
                value={view}
                onChange={(e) => setView(e.target.value)}
                className="font-semibold p-2 border border-black bg-yellow-500 rounded-md filter drop-shadow-[4px_4px_0px_#000000]"
              >
                <option value="Cuatrimestral">Vista Cuatrimestral</option>
                <option value="Mensual">Vista Mensual</option>
                <option value="Diaria">Vista Diaria</option>
              </select>

              <div className='flex gap-1 items-center'>
                <IconUser />
                <span className='font-semibold capitalize'>{user.username}</span>
              </div>
            </div>
          </div>
          {view === "Cuatrimestral" && (
            <>
              <div className='flex gap-2 justify-center horizontal-line'>
                <div />
                <div className='flex justify-center items-center gap-2 bg-white py-1 px-4 border-2 border-black rounded-md filter drop-shadow-[4px_4px_0px_#000000]'>
                  <button className='cursor-pointer' onClick={handlePreviousMonth}>
                    <IconArrow color='black' classNames='rotate-180 size-6' />
                  </button>
                  <span>{startMonthIndex === 0 ? "1" : startMonthIndex === 4 ? "2" : "3"}° Cuatrimestre</span>
                  <button className='cursor-pointer' onClick={handleNextMonth}>
                    <IconArrow color='black' classNames='size-6' />
                  </button>
                </div>
                <div />
              </div>
              <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <div>
                  <span className='flex text-xl mt-4 mb-2'>Contenidos asignados</span>
                  <ContentSlider data={data} setCurrentItem={setCurrentItem} />
                </div>
                <div className='flex flex-col h-full max-h-[60%]'>
                  <span className='flex text-xl my-4'>Calendario cuatrimestral</span>
                  {isOver && (
                    <DroppableDelete />
                  )}
                  <MonthlyCalendar
                    months={months}
                    startMonthIndex={startMonthIndex}
                    endMonthIndex={endMonthIndex}
                  />
                </div>
                <DragOverlay>
                  {activeId ? (
                    <div className={`z-50 flex items-center justify-center w-[310px] h-10 border border-black px-2 rounded-md gap-2 touch-none cursor-grab bg-yellow-100`}>
                      <span className='w-[90%] whitespace-nowrap overflow-hidden overflow-ellipsis'>{currentItem?.nombre}</span>
                      <IconHand color={`${isOver ? '#01caf8' : 'black'}`} />
                    </div>
                  ) : null}
                </DragOverlay>
              </DndContext>
            </>
          )
          }
          {view === "Mensual" && (
            <DraggableCalendarWithExternalEvents months={months} events={allSubthemes} />
          )}
        </>
      </div>
    </>
  );
}

export default Planification;