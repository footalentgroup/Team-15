"use client"
import React, { useState } from 'react';
import { Calendar, momentLocalizer, Views, ToolbarProps, DateLocalizer, stringOrDate } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop';
import './draggableCalendar.styles.css'
import CustomToolbar from './draggableCalendar/Toolbar';
import { usePathname } from 'next/navigation';
import { CalendarEvent, IMonthPlanification } from '@/interfaces/IPlanification.interfaces';
import { PLanificationMonth } from '@/interfaces/ICourses.interface';
import { normalizeDate } from '@/utils/utils';
import { updateMonthPlanificationAction } from '@/actions/planificationActions';

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
  setMonths?: (months: PLanificationMonth[]) => void;
  currentMonthIndex?: number;
}
function DraggableCalendarWithExternalEvents({ months, startIndex, lastIndex, setMonths, currentMonthIndex }: Props) {
  const newEvents = months.map((content) => (
    content.content.map((event) => {
      const isDefaultDate = event.fecha?.endsWith('01');
      return (
        {
          title: event.theme ? event.theme.subtemas[0].nombre : '',
          start: !isDefaultDate ? normalizeDate(new Date(event.fecha)) : undefined,
          end: !isDefaultDate ? normalizeDate(new Date(event.fecha)) : undefined,
          resource: event,
          id: event.id
        }
      )
    }
    )
  )).flat();
  /*   const eventsForCalendar = events.map((event) => ({
      title: event.nombre,
      start: event.fecha_inicio ? formatDate(new Date(event.fecha_inicio)) : null,
      end: event.fecha_fin ? formatDate(new Date(event.fecha_fin)) : null,
      resource: event
    })); */
  const currentDateFromStartIndex = new Date(new Date().setMonth(currentMonthIndex ? currentMonthIndex : startIndex));
  const [draggedEvent, setDraggedEvent] = useState<string | null>(null);
  const [allEvents, setAllEvents] = useState<CalendarEvent[]>(newEvents);
  const [monthIndex, setMonthIndex] = useState(currentMonthIndex ? currentMonthIndex : startIndex);
  const [maxIndex] = useState(lastIndex);
  const pathname = usePathname()
  const [currentDate, setCurrentDate] = useState(currentDateFromStartIndex);
  const [error, setError] = useState('');

  const formatDate = (date: stringOrDate) => {
    return moment(date).format('YYYY-MM-DD');
  }

  const onEventResize: withDragAndDropProps['onEventResize'] = (data) => {
    const { start, end } = data;
    setAllEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.resource!.id === data.event.resource.id ? { ...event, start: new Date(start), end: new Date(end) } : event
      )
    );
  };

  const onEventDrop: withDragAndDropProps['onEventDrop'] = (data) => {
    const newEvent: CalendarEvent = data.event

    setAllEvents((prevEvents) =>
      prevEvents.map((item) =>
        item.id === newEvent!.id ? { ...item, start: new Date(data.start!), end: new Date(data.end!) } : item
      )
    );
  };

  const onUpdateMonthPlanification = async (monthPlanification: IMonthPlanification) => {
    const newMonths = months.map((month) => {
      const newContent = month.content.map((content) => {
        if (content.id === monthPlanification.id) {
          return { ...content, fecha: monthPlanification.fecha }
        }
        return content;
      });
      return { ...month, content: newContent };
    });
    console.log('newMonths', newMonths);
    setMonths!(newMonths);
    try {
      const response = await updateMonthPlanificationAction(monthPlanification);
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
      setAllEvents((prevEvents) => [
        ...prevEvents,
        {
          id: window.crypto.randomUUID(),
          start: normalizeDate(new Date(start)),
          end: new Date(end),
          title: draggedEvent,
          allDay,
        },
      ]);
      console.log(draggedEvent);
      console.log(resource);
      const currentMonthPlanification = allEvents.find((event) => event.title === draggedEvent);
      console.log(currentMonthPlanification);
      const newEvent: IMonthPlanification = {
        planificacion_id: currentMonthPlanification!.resource!.id as number,
        id: currentMonthPlanification!.id as number,
        subtema_id: currentMonthPlanification!.resource!.id as number,
        fecha: formatDate(start),
        tipo_actividad: 'teorico',
      }

      onUpdateMonthPlanification(newEvent);

    }
  };

  const formats = {
    dayFormat: (date: Date, culture?: string, localizer?: DateLocalizer) =>
      localizer!.format(date, 'dddd', culture),
    weekdayFormat: (date: Date, culture?: string, localizer?: DateLocalizer) =>
      localizer!.format(date, 'dddd', culture),
  };
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
          onEventResize={onEventResize}
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