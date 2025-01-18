"use client"
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, Views, ToolbarProps, DateLocalizer, stringOrDate } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop';
import './draggableCalendar.styles.css'
import CustomToolbar from './draggableCalendar/Toolbar';
import { usePathname } from 'next/navigation';
import { CalendarEvent, IDailyPlanification } from '@/interfaces/IPlanification.interfaces';
import { PLanificationMonth } from '@/interfaces/ICourses.interface';
import { normalizeDate } from '@/utils/utils';
import { createDailyPlanification, getAllDailyPlanification } from '@/actions/planificationActions';

const localizer = momentLocalizer(moment);
moment.locale('es');

const DragAndDropCalendar = withDragAndDrop(Calendar);

const ExternalEvent: React.FC<{ title: string, setDraggedEvent: (event: string) => void }> = ({ title, setDraggedEvent }) => (
  <div
    draggable
    onDragStart={(e) => setDraggedEvent((e.target as HTMLElement).outerText)}
    onDragEnd={(e) => console.log((e.target as HTMLElement).outerText)}
    className='h-8 w-min max-w-full p-1 bg-yellow-100 border border-black rounded-md margin-10 padding-10 border-1 cursor-pointer'
  >
    <span className='flex whitespace-nowrap overflow-hidden overflow-ellipsis' title={title}>
      {title}
    </span>
  </div>
);

interface Props {
  months: PLanificationMonth[]
  startIndex: number
  lastIndex: number
  currentMonthIndex?: number;
}

function DraggableCalendarWithExternalEvents({ months, startIndex, lastIndex, currentMonthIndex }: Props) {
  const currentDateFromStartIndex = new Date(new Date().setMonth(currentMonthIndex ? currentMonthIndex : startIndex));
  const [draggedEvent, setDraggedEvent] = useState<string | null>(null);
  const [allEvents, setAllEvents] = useState<CalendarEvent[]>([]);
  const [monthIndex, setMonthIndex] = useState(currentMonthIndex ? currentMonthIndex : startIndex);
  const [maxIndex] = useState(lastIndex);
  const pathname = usePathname()
  const [currentDate, setCurrentDate] = useState(currentDateFromStartIndex);
  const [error, setError] = useState('');
  const [planificationId] = useState<number | null>(months[0].content[0].planificacion_id);

  const getNewEvents = async () => {
    const dailyPlanifications = await getAllDailyPlanification();
    console.log('dailyPlanifications', dailyPlanifications);

    const newEvents = dailyPlanifications.map((event: IDailyPlanification) => {
      return (
        {
          title: event.detalle,
          start: normalizeDate(new Date(event.fecha)),
          end: normalizeDate(new Date(event.fecha)),
          resource: event,
          id: event.planificacion_id
        }
      )
    });
    setAllEvents(newEvents);
  }

  //para actualizar la fecha nueva del evento
  const updateDailyPlanification = async (dailyPlanification: IDailyPlanification) => {
    const newDailyPlanification = {
      planificacion_id: dailyPlanification.planificacion_id,
      tipo_clase: dailyPlanification.tipo_clase,
      fecha: dailyPlanification.fecha,
      detalle: dailyPlanification.detalle,
    }
    try {
      const response = await createDailyPlanification(newDailyPlanification);
      console.log('response', response);

      const data = response!.data;

      console.log('respuesta de actualizar la fecha', data);

      if (response && !response.success) {
        setError("Ocurrio un error al guardar la planificación mensual");
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  const formatDate = (date: stringOrDate) => {
    return moment(date).format('YYYY-MM-DD');
  }

  const onEventDrop: withDragAndDropProps['onEventDrop'] = (data) => {
    const newEvent: CalendarEvent = data.event

    const newEvents = allEvents.map((item) =>
      item.id === newEvent.id ? { ...item, start: new Date(data.start!), end: new Date(data.end!) } : item
    );
    const itemUpdated = newEvents.find((item) => item.id === newEvent.id);

    const newDailyPlanification: IDailyPlanification = {
      id: itemUpdated!.id as number,
      planificacion_id: itemUpdated!.id as number,
      tipo_clase: 'teorico',
      fecha: formatDate(itemUpdated!.start!),
      detalle: itemUpdated!.title as string,
    }

    updateDailyPlanification(newDailyPlanification);
    setAllEvents(newEvents);
    getNewEvents();
  };

  const oncreateNewDailyPlanification = async (dailyPlanification: IDailyPlanification) => {
    const newDailyPlanification = {
      planificacion_id: dailyPlanification.planificacion_id,
      tipo_clase: dailyPlanification.tipo_clase,
      fecha: dailyPlanification.fecha,
      detalle: dailyPlanification.detalle,
    }
    try {
      const response = await createDailyPlanification(newDailyPlanification);
      console.log('response', response);

      const data = response!.data;

      console.log('respuesta de actualizar la fecha', data);

      if (response && !response.success) {
        setError("Ocurrio un error al guardar la planificación mensual");
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  const onDropFromOutside: withDragAndDropProps['onDropFromOutside'] = ({ start, end, allDay, resource }) => {
    if (draggedEvent) {
      const newEvents = [...allEvents, {
        id: allEvents.length + 1,
        start: normalizeDate(new Date(start)),
        end: new Date(end),
        title: draggedEvent,
        allDay,
      }];
      console.log("newEvents", newEvents);
      setAllEvents(newEvents);
      console.log(draggedEvent);
      console.log(resource);
      const currentMonthPlanification = newEvents.find((event) => event.title === draggedEvent);
      console.log(currentMonthPlanification);
      const newEvent: IDailyPlanification = {
        planificacion_id: planificationId as number,
        fecha: formatDate(start),
        tipo_clase: 'teorico',
        detalle: draggedEvent,
      }

      oncreateNewDailyPlanification(newEvent);
      getNewEvents();
    }
  };

  const formats = {
    dayFormat: (date: Date, culture?: string, localizer?: DateLocalizer) =>
      localizer!.format(date, 'dddd', culture),
    weekdayFormat: (date: Date, culture?: string, localizer?: DateLocalizer) =>
      localizer!.format(date, 'dddd', culture),
  };

  useEffect(() => {
    getNewEvents();
  }, []);

  return (
    <div className='flex w-full'>
      <div className='w-4/5 h-full planification-calendar'>
        <DragAndDropCalendar
          components={{
            toolbar: (toolbarProps: ToolbarProps<CalendarEvent, object>) => <CustomToolbar monthIndex={monthIndex} minIndex={startIndex} maxIndex={maxIndex} toolbarProps={toolbarProps} setMonthIndex={setMonthIndex} />,
          }}
          key={pathname}
          className='h-[628px]'
          localizer={localizer}
          events={allEvents}
          date={currentDate}
          onNavigate={(date) => setCurrentDate(date)}
          startAccessor={(event: CalendarEvent) => (event.start ? normalizeDate(new Date(event.start)) : new Date('0000-00-00'))}
          endAccessor={(event: CalendarEvent) => (event.end ? new Date(event.end) : new Date('0000-00-00'))}
          onEventDrop={onEventDrop}
          resizable
          onDropFromOutside={onDropFromOutside}
          draggableAccessor={() => true}
          views={[Views.MONTH]}
          formats={formats}
          culture='es'
        />
        {error && <span className='text-red-500'>{error}</span>}
      </div>
      <div className='w-1/5 h-[600px] p-5 pt-14 overflow-hidden'>
        <span className='text-[22px] font-semibold'>Lista de temas</span>
        <div className='flex flex-col gap-2 mt-5 pe-2 h-full overflow-auto'>
          {months[monthIndex].content.map((event, index) => (
            <div key={index}>
              {event.theme && (
                <ExternalEvent key={index} title={event.theme.subtemas[0].nombre} setDraggedEvent={setDraggedEvent} />
              )}
            </div>
          ))}
          {months[monthIndex].content.length === 0 && (
            <span className='text-[18px]'>No hay temas agregados para este mes. Volvé a la vista por periodo para agregar.</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DraggableCalendarWithExternalEvents;