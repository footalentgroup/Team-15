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
import { CalendarEvent, IMonthPlanification } from '@/interfaces/IPlanification.interfaces';
import { PLanificationMonth } from '@/interfaces/ICourses.interface';
import { normalizeDate } from '@/utils/utils';
import { createNewMonthPlanificationAction, updateMonthlyPlanificationAction } from '@/actions/planificationActions';

const localizer = momentLocalizer(moment);
moment.locale('es');

const DragAndDropCalendar = withDragAndDrop(Calendar);

const ExternalEvent: React.FC<{ title: string, setDraggedEvent: (event: IMonthPlanification) => void, event: IMonthPlanification }> = ({ title, setDraggedEvent, event }) => (
  <div
    draggable
    onDragStart={() => setDraggedEvent(event)}
    onDragEnd={() => { }}
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
  setMonths: (months: PLanificationMonth[]) => void;
  currentMonthIndex?: number;
}
function DraggableCalendarWithExternalEvents({ months, startIndex, lastIndex, setMonths, currentMonthIndex }: Props) {
  /* const newEvents = months.map((content) => (
    content.content.map((event) => {
      const isDefaultDate = event.fecha?.endsWith('01');
      const eventDate = event.fecha ? new Date(event.fecha) : new Date('0000-00-00');
      return (
        {
          title: event.theme ? event.theme.subtemas[0].nombre : '',
          start: !isDefaultDate ? normalizeDate(eventDate) : undefined,
          end: !isDefaultDate ? normalizeDate(eventDate) : undefined,
          resource: event,
          id: event.id
        }
      )
    }
    )
  )).flat();*/
  /*   const eventsForCalendar = events.map((event) => ({
      title: event.nombre,
      start: event.fecha_inicio ? formatDate(new Date(event.fecha_inicio)) : null,
      end: event.fecha_fin ? formatDate(new Date(event.fecha_fin)) : null,
      resource: event
    })); */
  const currentDateFromStartIndex = new Date(new Date().setMonth(currentMonthIndex ? currentMonthIndex : startIndex));
  const [draggedEvent, setDraggedEvent] = useState<IMonthPlanification | null>(null);
  const [allEvents, setAllEvents] = useState<CalendarEvent[]>([]);
  const [monthIndex, setMonthIndex] = useState(currentMonthIndex ? currentMonthIndex : startIndex);
  const [maxIndex] = useState(lastIndex);
  const pathname = usePathname()
  const [currentDate, setCurrentDate] = useState(currentDateFromStartIndex);
  const [error, setError] = useState('');

  const formatDate = (date: stringOrDate) => {
    return moment(date).format('YYYY-MM-DD');
  }

  const getNewEvents = async () => {
    const newEvents = months.map((content) => (
      content.content.map((event) => {
        const isDefaultDate = event.fecha?.endsWith('01');

        const startDate = new Date(event.fecha!)
        startDate.setDate(startDate.getDate() + 1)
        startDate.setHours(0, 0, 0, 0)

        const endDate = new Date(event.fecha!)
        endDate.setDate(endDate.getDate() + 1)
        endDate.setHours(23, 59, 59, 999)
        return (
          {
            title: event.theme ? event.theme.subtemas[0].nombre : '',
            start: !isDefaultDate ? startDate : undefined,
            end: !isDefaultDate ? endDate : undefined,
            resource: event,
            id: event.id
          }
        )
      }
      )
    )).flat();

    setAllEvents(newEvents);
  }

  const onUpdateMonthPlanification = async (monthPlanification: IMonthPlanification) => {
    try {
      const response = await updateMonthlyPlanificationAction(monthPlanification);

      if (response && !response.success) {
        setError("Ocurrio un error al guardar la planificación mensual");
      }

      const newMonths = months.map((month) => {
        const newContent = month.content.map((content) => {
          if (content.id === monthPlanification.id) {
            return { ...content, fecha: monthPlanification.fecha }
          }
          return content;
        });
        return { ...month, content: newContent };
      });
      setMonths(newMonths);

    } catch (error) {
      alert("Ocurrio un error al guardar la planificación mensual" + error);
    }
  }

  const onCreateMonthPlanification = async (monthPlanification: IMonthPlanification) => {
    try {
      const response = await createNewMonthPlanificationAction([monthPlanification]);
      const data = response!.data;

      if (response && !response.success) {
        setError("Ocurrio un error al guardar la planificación mensual");
      }

      const newPlanificationMonthFromResponse = {
        ...data.planificacion_mensual,
        theme: monthPlanification.theme,
      };
      const newPlanificationMonth = {
        id: newPlanificationMonthFromResponse[0].id,
        planificacion_id: newPlanificationMonthFromResponse[0].planificacion_id,
        subtema_id: newPlanificationMonthFromResponse[0].subtema_id,
        fecha: newPlanificationMonthFromResponse[0].fecha,
        theme: monthPlanification.theme
      };

      const newMonths = months.map((month) => {
        if (month.id === monthIndex) {
          return { ...month, content: [...month.content, newPlanificationMonth] }
        }
        return month;
      }
      );
      setMonths(newMonths);

      return data;

    } catch (error) {
      alert("Ocurrio un error al guardar la planificación mensual" + error);
    }
  }

  const onEventDrop: withDragAndDropProps['onEventDrop'] = (data) => {
    const newEvent: CalendarEvent = data.event
    const newDate = new Date(data.start!);

    onUpdateMonthPlanification({
      id: newEvent.id as number,
      planificacion_id: newEvent.resource!.planificacion_id,
      subtema_id: newEvent.resource!.subtema_id,
      tipo_actividad: 'teorico',
      fecha: formatDate(newDate),
      theme: newEvent.resource!.theme,
    });

    setAllEvents((prevEvents) =>
      prevEvents.map((item) =>
        item.id === newEvent!.id ? { ...item, start: new Date(data.start!), end: new Date(data.end!) } : item
      )
    );
  };

  const onDropFromOutside: withDragAndDropProps['onDropFromOutside'] = ({ start, end, allDay }) => {
    if (draggedEvent) {
      setAllEvents((prevEvents) => [
        ...prevEvents,
        {
          start: normalizeDate(new Date(start)),
          end: new Date(end),
          title: draggedEvent.theme!.subtemas[0].nombre,
          allDay,
        },
      ]);

      const newEvent: IMonthPlanification = {
        planificacion_id: draggedEvent.planificacion_id,
        subtema_id: draggedEvent!.subtema_id,
        fecha: formatDate(start),
        tipo_actividad: 'teorico',
        theme: draggedEvent.theme,
      }

      onCreateMonthPlanification(newEvent);

    }
  };

  useEffect(() => {
    getNewEvents();
  }, [months]);

  const filteredMonths = months.map(month => {
    const filteredContent = month.content.reduce((acc: { map: Map<string, boolean>; result: IMonthPlanification[] }, current) => {
      const [year, month] = current.fecha!.split('-');
      const key = `${current.subtema_id}-${year}-${month}`;

      if (!acc.map.has(key)) {
        acc.map.set(key, true);
        acc.result.push(current);
      }

      return acc;
    }, { map: new Map(), result: [] }).result;

    return { ...month, content: filteredContent };
  });

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
          showAllEvents
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
          {filteredMonths[monthIndex].content.map((event, index) => (
            <div key={index}>
              {event.theme && (
                <ExternalEvent key={index} title={event.theme.subtemas[0].nombre} event={event} setDraggedEvent={setDraggedEvent} />
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