/*
este componente esta completamente comentado por que es una version en la que se utiliza dailyPlanification en vez de la actual que es con MonthlyPlanification

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
import { CalendarEvent, IDailyPlanification, IMonthPlanification } from '@/interfaces/IPlanification.interfaces';
import { PLanificationMonth } from '@/interfaces/ICourses.interface';
import { normalizeDate } from '@/utils/utils';
import { createDailyPlanificationAction, getAllDailyPlanification, updateDailyPlanificationAction } from '@/actions/planificationActions';

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
  currentMonthIndex?: number;
}

function DraggableCalendarWithExternalEvents({ months, startIndex, lastIndex, currentMonthIndex }: Props) {
  const currentDateFromStartIndex = new Date(new Date().setMonth(currentMonthIndex ? currentMonthIndex : startIndex));
  const [draggedEvent, setDraggedEvent] = useState<IMonthPlanification | null>(null);
  const [allEvents, setAllEvents] = useState<CalendarEvent[]>([]);
  const [monthIndex, setMonthIndex] = useState(currentMonthIndex ? currentMonthIndex : startIndex);
  const [maxIndex] = useState(lastIndex);
  const pathname = usePathname()
  const [currentDate, setCurrentDate] = useState(currentDateFromStartIndex);
  const [error, setError] = useState('');
  const [planificationId] = useState<number | undefined>(months[0].content[0].planificacion_id);

  const getNewEvents = async () => {
    const dailyPlanifications = await getAllDailyPlanification();

    const eventsFromMonthsFiltered = months.flatMap(month =>
      month.content.map(content => ({
        fecha: content.fecha,
        title: content.theme?.subtemas[0].nombre
      }))
    );

    const newEvents = dailyPlanifications.map((event: IDailyPlanification) => {
      const startDate = new Date(event.fecha)
      startDate.setDate(startDate.getDate() + 1)
      startDate.setHours(0, 0, 0, 0)

      const endDate = new Date(event.fecha)
      endDate.setDate(endDate.getDate() + 1)
      endDate.setHours(23, 59, 59, 999)
      return (
        {
          title: event.title,
          start: startDate,
          end: endDate,
          resource: event,
          id: event.id
        }
      )
    });

    const newEventsWithNames = newEvents.map((newEvent: CalendarEvent) => {
      const correspondingEvent = eventsFromMonthsFiltered.find(item => item.fecha === newEvent.resource?.fecha)
      return {
        ...newEvent,
        title: correspondingEvent ? correspondingEvent.title : "-"

      };
    })

    setAllEvents(newEventsWithNames);
  }

  //para actualizar la fecha nueva del evento
  const updateDailyPlanification = async (dailyPlanification: IDailyPlanification) => {
    const newDailyPlanification = {
      id: dailyPlanification.id,
      planificacion_id: dailyPlanification.planificacion_id,
      tipo_clase: dailyPlanification.tipo_clase,
      fecha: dailyPlanification.fecha,
      detalle: dailyPlanification.detalle,
      title: dailyPlanification.title,
    }
    try {
      const response = await updateDailyPlanificationAction(newDailyPlanification);
<<<<<<< HEAD
=======
      const data = response!.data;
>>>>>>> 344eab2b1e23578927572609a932a79ba919d46d

      if (response && !response.success) {
        setError("Ocurrio un error al guardar la planificación mensual");
      }
    } catch (error) {
      alert ("Ocurrio un error al guardar la planificación mensual" + error);
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
      planificacion_id: itemUpdated!.resource?.planificacion_id as number,
      tipo_clase: 'teorico',
      fecha: formatDate(itemUpdated!.start!),
      detalle: "-",
      title: itemUpdated!.resource?.subtema?.nombre as string,
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
      title: dailyPlanification.title,
    }
    try {
      const response = await createDailyPlanificationAction(newDailyPlanification);

      if (response && !response.success) {
        setError("Ocurrio un error al guardar la planificación mensual");
      }
    } catch (error) {
      alert ("Ocurrio un error al guardar la planificación mensual" + error);
    }
  }

  const onDropFromOutside: withDragAndDropProps['onDropFromOutside'] = ({ start, end, allDay, resource }) => {
    if (draggedEvent) {
      const newEvents = [...allEvents, {
        id: allEvents.length + 1,
        start: normalizeDate(new Date(start)),
        end: new Date(end),
        title: draggedEvent.subtema?.nombre,
        allDay,
        resource: months[monthIndex].content.find((event) => event.theme!.subtemas[0].nombre === draggedEvent),
      }];

      setAllEvents(newEvents);

      const newMonthPlanification: IMonthPlanification = {
        id: draggedEvent!.id as number,
        planificacion_id: planificationId as number,
        subtema_id: draggedEvent!.subtema_id as number,
        fecha: formatDate(start),
      }

      const newEvent: IDailyPlanification = {
        planificacion_id: planificationId as number,
        fecha: formatDate(start),
        tipo_clase: 'teorico',
        detalle: "-",
        title: draggedEvent.subtema?.nombre,
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

export default DraggableCalendarWithExternalEvents; */