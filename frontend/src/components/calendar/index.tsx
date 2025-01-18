'use client'
import { useState } from "react";
import WeeklyCalendar from "./weeklyCalendar";
import DailyCalendar from "./dailyCalendar";
import { ICourses } from "@/interfaces/ICourses.interface";
import SelectView from "@/ui/selects/selectView";
import { CalendarEvent } from "@/interfaces/IPlanification.interfaces";
import ButtonContinue from "@/ui/buttons/buttonContinue";

interface Props {
  events: ICourses[];
}

function HomeCalendar({ events }: Props) {
  console.log(events);
  const [isDaily, setIsDaily] = useState(false);
  const [date, setDate] = useState(new Date());
  const [currentPlanification, setCurrentPlanification] = useState<CalendarEvent | null>(null);

  const allSubtopics = events
    .flatMap(event => event.planification?.temas)
    .flatMap(tema => tema?.subtemas);

  const allDatesFromMonthPlanification = events
    .filter(event => event.havePlanification && event.planification)
    .flatMap(event => event.planification?.planificacion_mensual)
    .map(plan => plan);

  const allDatesWithSubtheme = allDatesFromMonthPlanification.map(plan => {
    const subtema = allSubtopics.find(sub => sub?.id === plan?.subtema_id);
    return {
      ...plan,
      subtema,
      planificacion_id: plan?.planificacion_id ?? 0,
      subtema_id: plan?.subtema_id ?? 0,
      fecha: plan?.fecha ?? "",
      tipo_actividad: plan?.tipo_actividad ?? "",
    };
  });

  const newEvents = allDatesWithSubtheme.map((content) => {
    const title = content.subtema?.nombre
    return ({
      title: title,
      start: (new Date(content.fecha)),
      end: (new Date(content.fecha)),
      resource: content,
    }
    )
  }).flat();

  const dailyPlanification = events.flatMap(event => event.planification?.planificacion_diaria);

  const newEvents2 = [...newEvents, dailyPlanification];
  console.log("newEvents2", newEvents2);

  const newEventsWithNames = newEvents.map(newEvent => {
    const correspondingEvent = events.find(event => event.planification?.id === newEvent.resource.planificacion_id);
    return {
      ...newEvent,
      schoolName: correspondingEvent?.schoolName ?? "Unknown School",
      subjectName: correspondingEvent?.subjectName ?? "Unknown Subject",
    };
  });
  console.log("newEventsWithNames", newEventsWithNames);


  console.log("allDatesWithSubtheme", allDatesWithSubtheme);
  return (
    <div className='h-full overflow-hidden mt-8'>
      {isDaily && (
        <span className='text-4xl font-semibold absolute left-20'>Calendario General</span>
      )}
      <div className='flex absolute right-24 me-2'>
        <SelectView options={['Semanal', 'Diario']} value={isDaily ? "Diario" : "Semanal"} isDaily={isDaily} onChange={setIsDaily} />
      </div>
      {/* aca al hacer click en cada dia te debe llevar a la vista diaria de ese dia, o al hacer click en el select te tiene que dejar cambiar a la vista diaria actual */}
      {isDaily ? (
        <DailyCalendar date={date} events={newEventsWithNames} />
      ) : (
        //al hacer click en un dia se setea ese dia en el state
        <WeeklyCalendar date={date} setDate={setDate} setIsDaily={setIsDaily} events={newEventsWithNames} setCurrentPlanification={setCurrentPlanification} />
      )}
      {currentPlanification && (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-20'>
          <div className='w-5/6 h-4/6 flex flex-col gap-8 bg-yellow-100 p-14 filter drop-shadow-[18px_14px_0px_#000000] z-30'>
            <h3 className='text-4xl font-semibold'>Planificación &gt; {currentPlanification.start?.toDateString()}</h3>
            <button className='absolute top-4 right-6 rounded-full px-2 border border-black bg-yellow-light-100 text-xl font-medium' onClick={() => setCurrentPlanification(null)}>
              X
            </button>
            <div className="flex gap-12">
              <div className="me-6">
                <span>Tipo de clase</span>
                <div className='w-min px-2 flex gap-4 font-semibold justify-between items-center border-2 border-black rounded-md p-1 bg-white ilter drop-shadow-[4px_4px_0px_#000000]'>
                  <span>{currentPlanification.resource?.tipo_actividad === "" ? "Teórico" : currentPlanification.resource?.tipo_actividad}</span>
                </div>
              </div>
              <div>
                <span>Tema/s</span>
                <div className='flex gap-4 font-semibold justify-between items-center border-2 border-black rounded-md p-1 bg-white'>
                  <span>{currentPlanification.title}</span>
                </div>
              </div>
              <div>
                <span>Recursos</span>
                <div className='flex gap-4 font-semibold justify-between items-center border-2 border-black rounded-md p-1 bg-white'>
                  <span>{currentPlanification.title}</span>
                  <span className="border border-pink-500 rounded-lg px-1">PDF</span>
                </div>
              </div>
            </div>
            <div className="h-full">
              <span className="text-2xl font-semibold">Detalles de la clase</span>
              <textarea
                className='flex-1 resize-none bg-transparent w-full h-4/5 mt-2 font-medium border-2 border-black rounded-md p-3 overflow-y-auto'
                disabled
                value={typeof currentPlanification.resource?.detalles === 'string' ? currentPlanification.resource.detalles : ""}
              />
            </div>
            <div className="flex justify-center">

              <ButtonContinue text="Editar Planificación" width="w-1/4" onClick={() => setCurrentPlanification(null)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeCalendar;