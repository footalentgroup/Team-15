'use client'
import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/sidebar';
import DraggableCalendarWithExternalEvents from '../calendar/draggableCalendar';
import { ContentSlider } from './contentList';
import MonthlyCalendar from '../calendar/monthCalendat';
import { IconArrow, IconHand, IconUser } from '@/icons';
import { DndContext, DragEndEvent, DragOverlay, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { IMonthPlanification, IPlanification, ISubtheme } from '@/interfaces/IPlanification.interfaces';
import { INITIAL_MONTHS } from '@/utils/initialMonths';
import { ICourses, PLanificationMonth } from '@/interfaces/ICourses.interface';
import { IUser } from '@/interfaces/IAuth.interfaces';
import { DroppableDelete } from '../calendar/draggableCalendar/DroppableDelete';
import { createNewMonthPlanificationAction, deleteMonthPlanificationAction } from '@/actions/planificationActions';
import Image from 'next/image';
import DialogInfo from '../dialog/DialogInfo';
import DailyPlanification from './dailyPlanification';
import { useSnackbar } from "@/contexts/snackbar/SnackbarContext";

interface Props {
  data: IPlanification[]
  user: IUser
  currentCourse: ICourses
}

function Planification({ data, user, currentCourse }: Props) {
  //const monthsLength = currentCourse.periodName === 'semestral' ? 6 : currentCourse.periodName === 'trimestral' ? 3 : 4
  const monthsPeriods = currentCourse.periods?.length
  const periodTitle = currentCourse.periodName === 'semestral' ? 'Semestre' : currentCourse.periodName === 'trimestral' ? 'Trimestre' : 'Cuatrimestre'
  const viewPeriodTitle = currentCourse.periodName === 'semestral' ? 'Semestral' : currentCourse.periodName === 'trimestral' ? 'Trimestral' : 'Cuatrimestral'
  const startMonthFromPeriod = Number(currentCourse.periods![0].fecha_inicio.split('-')[1])
  const endMonthFromPeriod = Number(currentCourse.periods![0].fecha_cierre.split('-')[1])

  const nextEndMonthFromPeriod = Number(currentCourse.periods![1].fecha_cierre.split('-')[1])

  const monthLengthFromFirstPeriod = endMonthFromPeriod - startMonthFromPeriod + 1

  const startDate = currentCourse.periods![0].fecha_inicio
  const endDate = currentCourse.periods![2] ? currentCourse.periods![2].fecha_cierre : currentCourse.periods![1].fecha_cierre

  //el mes en donde comienza el periodo
  const firstStartMonthIndex = startMonthFromPeriod - 1
  //el ultimo mes del periodo, ultimo mes disponible para mostrar
  const lastEndMonthIndex = nextEndMonthFromPeriod


  const [initialData, setInitialData] = useState<IPlanification[]>(data)
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [view, setView] = useState(viewPeriodTitle)
  const [currentItem, setCurrentItem] = useState<ISubtheme | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [months, setMonths] = useState<PLanificationMonth[]>(INITIAL_MONTHS as PLanificationMonth[])
  const [allSubthemes, setAllSubthemes] = useState<ISubtheme[]>([])
  const [isOver, setIsOver] = useState(false)
  const [startMonthIndex, setStartMonthIndex] = useState(firstStartMonthIndex)
  const [endMonthIndex, setEndMonthIndex] = useState(endMonthFromPeriod)
  const [initialPeriodStep, setInitialPeriodStep] = useState(1)
  const [showHelp, setShowHelp] = useState(false)
  //el mes que va a ir cuando clickee en ver el mes
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(0)
  const { showSnackbar } = useSnackbar();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setIsOver(false);

    if (over) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [themeIndex, subthemeIndex, itemMonthIndex] = active.id.toString().split('-').map((index) => parseInt(index));
      const monthIndex = over.id.toString().split('-').map((index) => parseInt(index))[1];
      const isTrash = over.id === 'trash';

      const overMonth = months.find((month) => month.id === monthIndex);
      const subthemeSelected = allSubthemes.find((subtheme) => subtheme.id === subthemeIndex);

      const themeWithSubthemeSelected = data[0].temas.find((theme) => theme.subtemas.some((subtheme) => subtheme.id === subthemeIndex));

      if (overMonth && subthemeSelected && themeWithSubthemeSelected) {
        const newContent = overMonth.content.find((content) => content.subtema_id === subthemeIndex);


        if (!newContent) {
          const newTheme = { ...themeWithSubthemeSelected, subtemas: [subthemeSelected] };
          const plan = data[0].planificacion_mensual.find((plan) => plan.subtema_id === subthemeIndex);

          if (newTheme) {
            const newPlan: IMonthPlanification = {
              planificacion_id: newTheme.id_planificacion,
              subtema_id: subthemeSelected.id,
              tipo_actividad: plan?.tipo_actividad || '',
              fecha: overMonth.date,
              subtema: subthemeSelected!,
              theme: newTheme,
            };

            if (itemMonthIndex !== monthIndex) {
              //elimina del mes actual para agregarlo al overMonth

              const updatedMonths = months.map((month) => {
                if (month.id === itemMonthIndex) {
                  const planificationForDelete = months[itemMonthIndex].content.find((content) => content.subtema_id !== subthemeIndex)
                  const newContent = month.content.filter((content) => content.subtema_id !== subthemeIndex);
                  if (planificationForDelete) {
                    deleteMonthPlanification(planificationForDelete.id!)
                  }
                  return { ...month, content: newContent };
                }
                return month;
              });

              createNewMonthPlanification([newPlan]).then((newItemFromResponse) => {
                const newPlanificationMonthFromResponse = {
                  ...newItemFromResponse?.data.planificacion_mensual,
                  theme: newTheme,
                };
                const newPlanificationMonth = {
                  id: newPlanificationMonthFromResponse[0].id,
                  planificacion_id: newPlanificationMonthFromResponse[0].planificacion_id,
                  subtema_id: newPlanificationMonthFromResponse[0].subtema_id,
                  fecha: newPlanificationMonthFromResponse[0].fecha,
                  theme: newTheme
                };
                const newMonth = { ...overMonth, content: [...overMonth.content, newPlanificationMonth] };
                const finalMonths = updatedMonths.map((month) => (month.id === monthIndex ? newMonth : month));

                setMonths(finalMonths);
              });

            } else {
              const newMonth = { ...overMonth, content: [...overMonth.content, newPlan] };
              const newMonths = months.map((month) => (month.id === monthIndex ? newMonth : month));
              setMonths(newMonths);
            }
          }
        } /* else {
          const newMonth = { ...overMonth, content: overMonth.content.filter((content) => content.subtema_id !== subthemeIndex) };
          const newMonths = months.map((month) => (month.id === monthIndex ? newMonth : month));
        } */
      }

      if (isTrash) {
        const planificationForDelete = months[itemMonthIndex].content.find((content) => content.subtema_id === subthemeIndex)
        const newMonth = months[itemMonthIndex].content.filter((content) => content.subtema_id !== subthemeIndex)
        const newMonths = months.map((month) => {
          if (month.id === itemMonthIndex) {
            return { ...month, content: newMonth }
          }
          return month
        })
        /* const planificationForDelete = initialData[0].planificacion_mensual.find((plan) => plan.id === subthemeSelected?.id) */
        if (planificationForDelete) {
          deleteMonthPlanification(planificationForDelete.id!)
        }
        const newPlanification = initialData[0].planificacion_mensual.filter((plan) => plan.subtema_id !== subthemeIndex)

        setMonths(newMonths);
        setInitialData([{ ...initialData[0], planificacion_mensual: newPlanification }])
      }

    }
  }

  const handleDragStart = (event: DragEndEvent) => {
    setIsOver(true);

    const [themeId, subthemeId] = event.active.id.toString().split('-').map((index) => parseInt(index));

    initialData[0].temas.map((theme) => {
      if (theme.id === themeId) {
        theme.subtemas.map((subtheme) => {
          if (subtheme.id === subthemeId) {
            setCurrentItem(subtheme);
          }
        })
      }
    })
    setActiveId(event.active.id as string);
  };

  const handleNextMonth = () => {
    if (endMonthIndex < months.length) {
      setInitialPeriodStep(initialPeriodStep + 1);
      setStartMonthIndex(startMonthIndex + monthLengthFromFirstPeriod);
      setEndMonthIndex(endMonthIndex + monthLengthFromFirstPeriod);
    }
  }

  const handlePreviousMonth = () => {
    if (startMonthIndex > 0) {
      setInitialPeriodStep(initialPeriodStep - 1);
      setStartMonthIndex(startMonthIndex - monthLengthFromFirstPeriod);
      setEndMonthIndex(endMonthIndex - monthLengthFromFirstPeriod);
    }
  }

  useEffect(() => {
    const allSubthemes = data[0].temas.map((theme) => theme.subtemas).flat();
    setAllSubthemes(allSubthemes);

    const newMonthPlanification = data[0].planificacion_mensual.map((plan) => {
      const theme = data[0].temas.find((tema) =>
        tema.subtemas.some((subtema) => subtema.id === plan.subtema_id)
      );

      if (theme) {
        const subtema = theme.subtemas.find((subtema) => subtema.id === plan.subtema_id);

        return {
          id: plan.id,
          planificacion_id: plan.planificacion_id,
          subtema_id: plan.subtema_id,
          tipo_actividad: plan.tipo_actividad,
          fecha: plan.fecha,
          theme: {
            ...theme,
            subtemas: subtema ? [subtema] : [],
          },
        };
      }
      return null;
    }).filter((item): item is NonNullable<typeof item> => item !== null);

    const newMonths = months.map((month) => {
      const newContent = newMonthPlanification.filter((item) => {
        const [itemYear, itemMonth] = item.fecha!.split('-');
        const [monthYear, monthMonth] = month.date.split('-');

        return itemYear === monthYear && itemMonth === monthMonth;
      });
      return { ...month, content: newContent }
    })

    setMonths(newMonths);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createNewMonthPlanification = async (newMonthPlanification: IMonthPlanification[]) => {
    return await createNewMonthPlanificationAction(newMonthPlanification)
  }

  const deleteMonthPlanification = async (planificationsForDelete: number) => {
    await deleteMonthPlanificationAction(planificationsForDelete)
    showSnackbar("Eliminaste el contenido del calendario");
  }

  /* esto hacia que al cambiar de vista se envien los datos para crear y borrar los datos modificados de cada planificacion mensual
     pero no funcionaba como corresponde en algunos casos, se está usando individualmente en las funciones de drag and drop
     useEffect(() => {
  
      const currentMonthPlanification = initialData[0].planificacion_mensual
      const newMonthPlanification = months.map((month) => month.content).flat()
  
      if (newMonthPlanification.length > 0) {
        const filteredNewMonthPlanification = newMonthPlanification.map((item) => {
          return {
            id: item.id,
            planificacion_id: item.planificacion_id,
            subtema_id: item.subtema_id,
            tipo_actividad: item.tipo_actividad,
            fecha: item.fecha,
          }
        })
  
        if (currentMonthPlanification.length > 0 || newMonthPlanification.length > 0) {
  
          const allPLanifications = currentMonthPlanification.concat(filteredNewMonthPlanification);
          const uniquePlanification = allPLanifications.filter(
            (item, _, array) =>
              array.filter(
                (otro) => item.subtema_id === otro.subtema_id && item.fecha === otro.fecha
              ).length === 1
          );

          const filterSubthemeInUniquePlanification = uniquePlanification.filter((item) => !item.id);
  
          if (uniquePlanification.length > 0) {
            if (data !== initialData) {
              createNewMonthPlanification(uniquePlanification).then((data) => {
                console.log('data', data);
              })
            }
            //busca la primera conincidencia en initialDaata[0].planificacion_mensual de subthema_id  y lo elimnia
            const filterSubthemeInUniquePlanificationByDelete = planificationsForDelete.map((planificationId) => uniquePlanification.find((item) => item.id === planificationId))
            const firstNewData = initialData[0].planificacion_mensual.filter((item) => !filterSubthemeInUniquePlanificationByDelete.some((plan) => plan?.subtema_id === item.subtema_id && plan?.fecha === item.fecha))
            const newData = [{ ...initialData[0], planificacion_mensual: [...firstNewData, ...filterSubthemeInUniquePlanification] }];
            setInitialData(newData)
          }
  
          if (planificationsForDelete.length > 0) {
            deleteMonthPlanification(planificationsForDelete)
          }
        }
      }
  
  
    }, [view]); */

  const handleMonthClick = (index: number) => {
    setCurrentMonthIndex(index)
    setView('Mensual')
  }

  return (
    <>
      <Sidebar isVisible={isVisible} setIsVisible={setIsVisible} isExpanded={isExpanded} setIsExpanded={setIsExpanded} currentCourse={currentCourse} />
      <div className={`h-screen flex flex-col gap-4 px-16 py-14 ${isVisible || isExpanded ? "w-[calc(100%-18rem)]" : "w-[calc(100%-7rem)]"}`}>
        {/* background when is over */}
        <div className={`${isOver ? "absolute w-full h-full bg-[#75757532] top-0 left-0 z-10" : "invisible"}`} />
        {/* más info */}
        <button className='absolute right-4 bottom-2' type='button' onClick={() => setShowHelp(!showHelp)}>
          <Image src={"/media/img/mas-info.svg"} alt='más info' width={48} height={42} title='Presiona para obtener más info' />
        </button>
        {showHelp && view === periodTitle && (
          <DialogInfo
            text='Aquí tienes tu planificación, puedes editarla según prefieras, solo selecciona un tema y arrástralo al mes que desees.'
            left='left-24'
            padding='px-7 py-2'
            handleClose={() => setShowHelp(!showHelp)}
          />
        )}
        {showHelp && view === "Mensual" && (
          <DialogInfo
            text='Arrastrá los temas de la lista a los casilleros del calendario.'
            left='right-6'
            padding='px-7 py-6'
            handleClose={() => setShowHelp(!showHelp)}
            rotate={true}
          />
        )}
        {showHelp && view === "Diaria" && (
          <DialogInfo
            text='Puedes seleccionar el tipo de clase, los temas que abordarás de la planificación anual, incluso enlazar recursos. Además contás con un espacio para tus anotaciones.'
            left='right-12'
            bottom='top-48'
            padding='px-1 py-1'
            handleClose={() => setShowHelp(!showHelp)}
            rotate={true}
          />
        )}

        <>
          <div className='flex justify-between mb-4'>
            <h1 className='text-4xl font-semibold'>Planificación</h1>
            <div className='flex gap-7'>
              <select
                value={view}
                onChange={(e) => setView(e.target.value)}
                className="font-semibold p-2 border border-black bg-yellow-500 rounded-md filter drop-shadow-general"
              >
                <option value={viewPeriodTitle}>Vista {viewPeriodTitle}</option>
                <option value="Mensual">Vista Mensual</option>
                <option value="Diaria">Vista Diaria</option>
              </select>

              <div className='flex gap-1 items-center'>
                <IconUser />
                <span className='font-semibold capitalize'>{user.username}</span>
              </div>
            </div>
          </div>
          {(view === "Cuatrimestral" || view === "Semestral" || view === "Trimestral") && (
            <>
              <div className='flex gap-2 justify-center horizontal-line'>
                <div />
                <div className='flex justify-center items-center gap-2 bg-white py-1 px-4 border-2 border-black rounded-md filter drop-shadow-general'>
                  {initialPeriodStep > 1 && (
                    <button className='cursor-pointer' onClick={handlePreviousMonth}>
                      <IconArrow color='black' classNames='rotate-180 size-6' />
                    </button>
                  )}
                  <span>{initialPeriodStep}° {periodTitle}</span>
                  {initialPeriodStep < monthsPeriods! && (
                    <button className='cursor-pointer' onClick={handleNextMonth}>
                      <IconArrow color='black' classNames='size-6' />
                    </button>
                  )}

                </div>
                <div />
              </div>
              <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                {data.length > 0 ? (
                  <div>
                    <span className='flex text-xl my-2'>Contenidos asignados</span>
                    <ContentSlider data={initialData} setInitialData={setInitialData} setCurrentItem={setCurrentItem} />
                  </div>
                ) : (
                  <>
                    Cargando...
                  </>
                )}
                <div className='flex flex-col h-full overflow-x-auto'>
                  {months.length > 0 ? (
                    <>
                      <span className='flex text-xl my-2'>Calendario {viewPeriodTitle}</span>
                      {isOver && (
                        <DroppableDelete />
                      )}
                      <MonthlyCalendar
                        months={months}
                        startMonthIndex={startMonthIndex}
                        endMonthIndex={endMonthIndex}
                        setCurrentMonthIndex={handleMonthClick}
                      />
                    </>
                  ) : (
                    <>
                      Cargando...
                    </>
                  )}
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
            <DraggableCalendarWithExternalEvents currentMonthIndex={currentMonthIndex} months={months} setMonths={setMonths} startIndex={startMonthIndex} lastIndex={lastEndMonthIndex} />
          )}
          {view === "Diaria" && (
            <DailyPlanification data={initialData} months={months} setMonths={setMonths} date={new Date().toString()} startDate={startDate} endDate={endDate} period_id={currentCourse.periods![0].id} />
          )}
        </>
      </div>
    </>
  );
}

export default Planification;