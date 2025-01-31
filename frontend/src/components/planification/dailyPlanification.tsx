"use client"
import { createNewExamenAction } from '@/actions/examenActions';
import { createDailyPlanificationAction, createNewMonthPlanificationAction, deleteMonthPlanificationAction, updateDailyPlanificationAction } from '@/actions/planificationActions';
import { createNewTaskAction } from '@/actions/taskActions';
import { IconArrow } from '@/icons';
import { PLanificationMonth } from '@/interfaces/ICourses.interface';
import { IDailyPlanification, IMonthPlanification, IPlanification, ISubtheme } from '@/interfaces/IPlanification.interfaces';
import ButtonContinue from '@/ui/buttons/buttonContinue';
import SelectType from '@/ui/selects/SelectType';
import React, { useEffect, useRef, useState } from 'react';

const TYPE_CLASS = ['Examen', 'Clase teórica', 'Clase práctica'];

interface Props {
  date: string;
  startDate: string;
  endDate: string;
  data: IPlanification[]
  months: PLanificationMonth[];
  setMonths: (months: PLanificationMonth[]) => void;
  period_id?: number;
}

function DailyPlanification({ date, data, months, setMonths, period_id }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date(date))
  console.log('currentDate', currentDate);
  console.log("formatedCurrentData", currentDate.toISOString().split('T')[0]);
  const [currentOption, setCurrentOption] = useState(TYPE_CLASS[0]);
  const [currentThemes, setCurrentThemes] = useState<ISubtheme[]>([]);
  /* const [currentResources, setCurrentResources] = useState<string[]>(["Revolucion Francesa"]); */
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
/*   const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
 */  const [currentTheme, setCurrentTheme] = useState<ISubtheme>();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [examName, setExamName] = useState("");
  const [examType, setExamType] = useState("");
  const [currentThemeId, setCurrentThemeId] = useState<number | null>(null);
  const [homeworkName, setHomeworkName] = useState("");
  const [homeworkType, setHomeworkType] = useState("");
  const [detailsInput, setDetailsInput] = useState("");
  const detailsInputRef = useRef(detailsInput);
  const [currentDailyPlanification, setCurrentDailyPlanification] = useState<IDailyPlanification>();


  const handleNextDay = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  };

  const handlePreviousDay = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  };

  const formattedDate = currentDate.toLocaleDateString('es-ES', { weekday: 'long', month: 'long', day: 'numeric' })

  const handleConfirmTheme = async () => {
    console.log('currentTheme', currentTheme);
    setCurrentThemeId(currentTheme!.id_tema);
    if (currentTheme) {
      const monthPlanification: IMonthPlanification = {
        fecha: currentDate.toISOString().split('T')[0],
        subtema_id: currentTheme.id,
        planificacion_id: data[0].id,
        tipo_actividad: currentOption,
      }

      const response = await createNewMonthPlanificationAction([monthPlanification]);
      console.log('response', response);
      console.log('monthPlanification', monthPlanification);

      const monthIndex = new Date(currentDate).getMonth();
      console.log('monthIndex', monthIndex);
      const updatedTheme = data[0].temas.find((theme) => theme.id === currentTheme.id_tema);
      let newUpdatedTheme
      if (updatedTheme) {
        const updatedSubtema = updatedTheme.subtemas.find((subtema) => subtema.id === currentTheme!.id);
        newUpdatedTheme = [{
          ...updatedTheme,
          subtemas: updatedSubtema ? [updatedSubtema] : [],
        }];
      }
      const newMonthPlanification = { ...monthPlanification, id: response!.data.planificacion_mensual[0].id, theme: newUpdatedTheme![0] };

      const newMonths = months.map((month) => {
        if (month.id === monthIndex) {
          return { ...month, content: [...month.content, newMonthPlanification] }
        }
        return month;
      }
      );
      console.log('newMonths', newMonths);

      setMonths(newMonths);
      setCurrentThemes([...currentThemes, currentTheme]);
      setCurrentTheme(undefined);
      setIsThemeModalOpen(!isThemeModalOpen);
    }
  }

  const handleCreateHomework = async () => {
    console.log('create homework');
    const newHomework = {
      materia_id: data[0].materia_id,
      subtema_id: currentTheme!.id,
      periodo_id: period_id!,
      titulo: homeworkName,
      tipo: homeworkType,
      fecha: currentDate.toISOString().split('T')[0],
    }

    console.log('newHomework', newHomework);
    const response = await createNewTaskAction(newHomework);
    console.log('response', response);

    if (response.success) {
      setIsTaskModalOpen(!isTaskModalOpen);
      console.log('tarea creada');
    }

    if (!response.success) {
      console.log('error', response);
    }
  }

  const handleCreateExamen = async () => {
    console.log('create examen');
    const newExam = {
      materia_id: data[0].materia_id,
      tema_id: currentThemeId ?? 1,
      periodo_id: period_id!,
      titulo: examName,
      tipo: examType,
      fecha: currentDate.toISOString().split('T')[0],
    }

    console.log('newExam', newExam);
    const response = await createNewExamenAction(newExam);
    console.log('response', response);

    if (response.success) {
      setIsExamModalOpen(!isExamModalOpen);
      console.log('examen creado');
    }

    if (!response.success) {
      console.log('error', response);
    }
  }

  useEffect(() => {
    /* resetear estados al cambiar de fecha */
    setCurrentOption(TYPE_CLASS[0]);
    setCurrentThemes([]);
    setCurrentTheme(undefined);
    setCurrentThemeId(null);
    setExamName("");
    setExamType("");

    console.log('data', data);


    const monthlyPlanification = data.flatMap(event => event.planificacion_mensual);
    const filteredFirstDayInMonthlyPlanification = monthlyPlanification.filter(event => {
      return !event.fecha!.endsWith('-01') && event.fecha === currentDate.toISOString().split('T')[0];
    });
    const dailyPlanification = data.flatMap(event => event.planificacion_diaria);
    const allSubtopics = data.flatMap(event => event.temas).flatMap(tema => tema.subtemas);
    /* let combinedList = [] */
    const formattedCurrentDate = currentDate.toISOString().split('T')[0];
    console.log('formattedCurrentDate', formattedCurrentDate);
    if (dailyPlanification.length > 0) {
      const singleDailyPlanification = dailyPlanification.find(event => event.fecha === formattedCurrentDate);
      if (singleDailyPlanification) {
        setCurrentDailyPlanification(singleDailyPlanification);
        setDetailsInput(singleDailyPlanification.detalle);
      } else {
        setCurrentDailyPlanification(undefined);
        setDetailsInput("");
      }
      console.log('singleDailyPlanification', singleDailyPlanification);
      /* combinedList = dailyPlanification.map(dailyItem => {
        const matchingItem = filteredFirstDayInMonthlyPlanification.find(monthlyItem => monthlyItem!.fecha === dailyItem!.fecha);
        const subtema_id = matchingItem ? matchingItem.subtema_id : undefined;
        const subtema = allSubtopics.find(sub => sub?.id === subtema_id);
        const newDate = new Date(dailyItem!.fecha);

        return {
          ...dailyItem,
          title: subtema?.nombre ?? "-",
          start: newDate,
          end: newDate,
          resource: { ...dailyItem, subtema_id: subtema_id, subtema },
        };
      });

      console.log('combined list', combinedList);

      const filteredEvents = combinedList.filter(event => event.fecha === formattedCurrentDate);

      if (filteredEvents.length > 0 && filteredEvents[0].resource.subtema_id) {
        setCurrentThemes([filteredEvents[0].resource.subtema!]);
        setCurrentThemeId(filteredEvents[0].resource.subtema!.id_tema);
      }
      console.log(filteredEvents); */
    }

    const updatedMonthlyPlanification = filteredFirstDayInMonthlyPlanification.map(monthlyItem => {
      const subtema = allSubtopics.find(sub => sub?.id === monthlyItem.subtema_id);
      return {
        ...monthlyItem,
        title: subtema?.nombre ?? "-",
        start: new Date(monthlyItem.fecha!),
        end: new Date(monthlyItem.fecha!),
        resource: { ...monthlyItem, subtema_id: monthlyItem.subtema_id, subtema },
      };
    });

    console.log('updatedMonthlyPlanification', updatedMonthlyPlanification);

    const filteredEvents = updatedMonthlyPlanification.filter(event => event.fecha === formattedCurrentDate);

    if (filteredEvents.length > 0 && filteredEvents[0].resource.subtema_id) {
      const newCurrentThemes = filteredEvents.map(event => event.resource.subtema!);
      setCurrentThemes(newCurrentThemes);
      setCurrentThemeId(filteredEvents[0].resource.subtema!.id_tema);
    }
    console.log(filteredEvents);

  }, [currentDate]);

  const handleDeleteTheme = async (theme: ISubtheme) => {
    const currentMonthPlanification = data[0].planificacion_mensual.find(
      (plan) => plan.fecha === currentDate.toISOString().split('T')[0] && plan.subtema_id === theme.id
    );
    if (currentMonthPlanification) {
      const response = await deleteMonthPlanificationAction(currentMonthPlanification.id!);
      if (response!.success) {
        setCurrentThemes(currentThemes.filter(currentTheme => currentTheme !== theme));
      } else {
        console.log('error', response);
      }
    }
  }

  const updateDailyPlanification = async () => {
    if (currentDailyPlanification && detailsInputRef.current) {
      const updatedDailyPlanification: IDailyPlanification = {
        ...currentDailyPlanification,
        detalle: detailsInputRef.current,
      }
      console.log('updatedDailyPlanification', updatedDailyPlanification);
      console.log('detailsInput', detailsInputRef.current);
      await updateDailyPlanificationAction(updatedDailyPlanification);
    }
  }

  const createDailyPlanification = async () => {
    if (!currentDailyPlanification && detailsInputRef.current) {
      const newDailyPlanification: IDailyPlanification = {
        fecha: currentDate.toISOString().split('T')[0],
        detalle: detailsInputRef.current,
        planificacion_id: data[0].id,
        tipo_clase: currentOption,
      }
      console.log('newDailyPlanification', newDailyPlanification);
      console.log('detailsInput', detailsInputRef.current);
      await createDailyPlanificationAction(newDailyPlanification);
    }
  }

  useEffect(() => {
    detailsInputRef.current = detailsInput;
  }, [detailsInput]);

  useEffect(() => {
    return () => {
      if (currentDailyPlanification) {
        updateDailyPlanification();
      } else {
        createDailyPlanification();
      }
    };
  }, []);

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
          <ButtonContinue text='Crear tarea' type='button' height='h-10' onClick={() => setIsTaskModalOpen(!isTaskModalOpen)} />
          <ButtonContinue text='Crear Exámen' type='button' height='h-10' onClick={() => setIsExamModalOpen(!isExamModalOpen)} />
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <span>Tipo de clase</span>
        <div className='w-max  h-8 mb-2'>
          <SelectType options={TYPE_CLASS} value={currentOption} onChange={setCurrentOption} />
        </div>
        <span>Tema/s</span>
        <div className='flex gap-4 mb-2 h-8'>
          <ButtonContinue text='+' type='button' width='w-8 ps-3 text-lg rounded-xl border-none filter drop-shadow-[-1px_-1px_0px_#000000]' height='h-8' onClick={() => setIsThemeModalOpen(!isThemeModalOpen)} />
          {currentThemes.map((theme, index) => (
            <div key={index} className='flex gap-4 font-semibold justify-between items-center border-2 border-black rounded-md p-2 bg-white'>
              <span>{theme.nombre}</span>
              <button className='cursor-pointer' onClick={() => handleDeleteTheme(theme)}>
                X
              </button>
            </div>
          ))}
        </div>
        {/* <span>Recursos</span>
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
        </div> */}
      </div>
      <div className='flex flex-col h-full'>
        <span className='text-[22px] font-semibold mb-2'>Detalles de la clase</span>
        <textarea value={detailsInput} onChange={(e) => setDetailsInput(e.target.value)} className='resize-none bg-transparent flex-1 w-full h-full font-medium border-2 border-black rounded-md p-3 overflow-y-auto' />
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
                            <li key={subtema.id} className={` ${currentTheme?.nombre === subtema.nombre && "border-2 border-blue-light-500"} w-3/4 p-1 flex items-center border border-black px-2 rounded-md gap-2 cursor-pointer touch-none`} onClick={() => setCurrentTheme(subtema)}
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

      {isTaskModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
          <div className="bg-yellow-100 border-2 border-black p-6 rounded-md shadow-lg max-w-lg w-[500px] relative">
            <button
              type="button"
              onClick={() => setIsTaskModalOpen(!isTaskModalOpen)}
              className="absolute text-gray-800 text-sm font-bold top-6 right-6"
            >
              <i className="fa-solid fa-x"></i>
            </button>
            <h2 className="text-lg font-bold mb-4">Tarea</h2>

            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Título de la tarea"
                value={homeworkName}
                onChange={(event) => setHomeworkName(event.target.value)}
                className="p-2 mb-4 rounded border-2 border-black text-sm w-[170px]"
              />

              <select
                value={homeworkType}
                onChange={(event) => setHomeworkType(event.target.value)}
                className="p-2 mb-4 rounded w-[170px] border-2 border-gray-500 drop-shadow-general"
              >
                <option value="">Tipo de tarea</option>
                <option value="Cuestionario">Cuestionario</option>
                <option value="Practico">Trabajo práctico</option>
                <option value="Grupal">Trabajo grupal</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setIsTaskModalOpen(!isTaskModalOpen)}
                className="bg-gray-100 text-black text-semibold px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleCreateHomework}
                className="bg-pink-500 text-white text-semibold px-4 py-2 rounded border-2 border-black drop-shadow-general"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {isExamModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
          <div className="bg-yellow-100 border-2 border-black p-6 rounded-md shadow-lg max-w-lg w-[500px] relative">
            <button
              type="button"
              onClick={() => setIsExamModalOpen(!isExamModalOpen)}
              className="absolute text-gray-800 text-sm font-bold top-6 right-6"
            >
              <i className="fa-solid fa-x"></i>
            </button>
            <h2 className="text-lg font-bold mb-4">Examen</h2>

            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Título del examen"
                value={examName}
                onChange={(event) => setExamName(event.target.value)}
                className="p-2 mb-4 rounded border-2 border-black text-sm w-[170px]"
              />

              <select
                value={examType}
                onChange={(event) => setExamType(event.target.value)}
                className="p-2 mb-4 rounded w-[170px] border-2 border-gray-500 drop-shadow-general"
              >
                <option value="">Tipo de examen</option>
                <option value="Regular">Examen Regular</option>
                <option value="Recuperatorio">Examen Recuperatorio</option>
              </select>

            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setIsExamModalOpen(!isExamModalOpen)}
                className="bg-gray-100 text-black text-semibold px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleCreateExamen}
                className="bg-pink-500 text-white text-semibold px-4 py-2 rounded border-2 border-black drop-shadow-general"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DailyPlanification;