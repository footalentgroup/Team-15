"use client"
import React, { useState } from 'react';
import { Calendar, momentLocalizer, Event, Views, ToolbarProps, DateLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop';
import './draggableCalendar.styles.css'
import CustomToolbar from './draggableCalendar/Toolbar';
import { usePathname } from 'next/navigation';
import { ISubtheme } from '@/interfaces/IPlanification.interfaces';
import { PLanificationMonth } from '@/interfaces/ICourses.interface';

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
  events: ISubtheme[]
  months: PLanificationMonth[]
}

function DraggableCalendarWithExternalEvents({ events, months }: Props) {
  console.log("months inside draggableCalendar", months);
  console.log("events inside draggableCalendar", events);
  const [draggedEvent, setDraggedEvent] = useState<string | null>(null);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [monthIndex, setMonthIndex] = useState(0);
  const [maxIndex] = useState(3);
  const pathname = usePathname()
  const [currentDate, setCurrentDate] = useState(new Date());

  const onEventResize: withDragAndDropProps['onEventResize'] = (data) => {
    const { start, end } = data;
    setAllEvents((prevEvents) =>
      prevEvents.map((event) =>
        event === data.event ? { ...event, start: new Date(start), end: new Date(end) } : event
      )
    );
  };

  const onEventDrop: withDragAndDropProps['onEventDrop'] = (data) => {
    const { start, end } = data;
    setAllEvents((prevEvents) =>
      prevEvents.map((event) =>
        event === data.event ? { ...event, start: new Date(start), end: new Date(end) } : event
      )
    );
  };

  const onDropFromOutside: withDragAndDropProps['onDropFromOutside'] = ({ start, end, allDay }) => {
    if (draggedEvent) {
      setAllEvents((prevEvents) => [
        ...prevEvents,
        {
          start: new Date(start),
          end: new Date(end),
          title: draggedEvent,
          allDay,
        },
      ]);
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
            toolbar: (toolbarProps: ToolbarProps<Event, object>) => <CustomToolbar monthIndex={monthIndex} maxIndex={maxIndex} toolbarProps={toolbarProps} setMonthIndex={setMonthIndex} />,
          }}
          key={pathname}
          className='h-[628px]'
          localizer={localizer}
          events={allEvents}
          date={currentDate}
          onNavigate={(date) => setCurrentDate(date)}
          startAccessor={(event: Event) => (event.start ? new Date(event.start) : new Date())}
          endAccessor={(event: Event) => (event.end ? new Date(event.end) : new Date())}
          onEventDrop={onEventDrop}
          resizable
          onEventResize={onEventResize}
          onDropFromOutside={onDropFromOutside}
          draggableAccessor={() => true}
          views={[Views.MONTH]}
          formats={formats}
          culture='es'
        />
      </div>
      <div className='w-1/5 h-[600px] p-5 pt-14 overflow-hidden'>
        <span className='text-[22px] font-semibold'>Lista de temas</span>
        <div className='flex flex-col gap-2 mt-5 pe-2 h-full overflow-auto'>
          {months[monthIndex].content.map((event, index) => (
            <div key={index}>
              {event.subtemas.map((subtema, i) => (
                <ExternalEvent key={i} title={subtema.nombre} setDraggedEvent={setDraggedEvent} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DraggableCalendarWithExternalEvents;