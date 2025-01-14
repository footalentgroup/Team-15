'use client'

import React from 'react';
import { Calendar, DateLocalizer, momentLocalizer, ToolbarProps, Views } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './weeklyCalendar.styles.css';
import { WeeklyEventCard } from '@/ui';
import { CalendarEvent } from '@/interfaces/IPlanification.interfaces';
import { normalizeDate } from '@/utils/utils';
import WeeklyCustomToolbar from './weeklyCalendar/weeklyToolbar';
import WeeklyCustomHeader from './weeklyCalendar/weeklyHeader';

const localizer = momentLocalizer(moment);

moment.locale('es');
interface Props {
  date: Date;
  setDate: (date: Date) => void;
  setIsDaily: (isDaily: boolean) => void;
  events: CalendarEvent[]
  setCurrentPlanification?: (planification: CalendarEvent) => void;
}

function WeeklyCalendar({ date, events, setDate, setIsDaily, setCurrentPlanification }: Props) {
  console.log("date from calendar", date);
  console.log("events from calendar", events);
  console.log(events[0].start);
  /* const newEvents = events.map((content) => {
    const title = content.subtema?.nombre
    return ({
      title: title,
      start: normalizeDate(new Date(content.fecha)),
      end: normalizeDate(new Date(content.fecha)),
      resource: content,
    }
    )
  }).flat();
  console.log("newEvents", newEvents); */
  const formats = {
    dayFormat: (date: Date, culture?: string, localizer?: DateLocalizer) =>
      localizer!.format(date, 'dddd DD', culture),
  };

  const minTime = new Date();
  minTime.setHours(8, 0, 0);

  const maxTime = new Date();
  maxTime.setHours(18, 0, 0);

  //refactorizar, convertir en un componente sin calendario, que tenga los 5 primeros dias de esa semana, sin sabado y domingo
  //y que se pueda cambiar de semanas con botones
  //al hacer click en un dia, se muestren los eventos de ese dia

  const handleClick = (date: Date) => {
    console.log('Header clicked:', date);
    setDate(date);
    setIsDaily(true);
  }

  return (
    <div className='h-full max-h-[490px] px-16 weekly-calendar'>
      <Calendar
        components={{
          event: ({ event }) => (
            <WeeklyEventCard event={event} setCurrentPlanification={setCurrentPlanification} />
          ),
          timeGutterWrapper: () => <div style={{ display: 'none' }} />,
          timeGutterHeader: () => <div style={{ display: 'none' }} />,
          timeSlotWrapper: () => <div style={{ display: 'none' }} />,
          week: {
            header: WeeklyCustomHeader,
          },
          toolbar: (toolbarProps: ToolbarProps<CalendarEvent, object>) => <WeeklyCustomToolbar toolbarProps={toolbarProps} />,
        }}
        date={date}
        localizer={localizer}
        onNavigate={(date) => handleClick(date)}
        events={events}
        startAccessor={(event: CalendarEvent) => (event.start ? normalizeDate(new Date(event.start)) : new Date('0000-00-00'))}
        endAccessor={(event: CalendarEvent) => (event.end ? new Date(event.end) : new Date('0000-00-00'))}
        defaultView={Views.WORK_WEEK}
        views={[Views.WORK_WEEK]}
        min={minTime}
        max={maxTime}
        formats={formats}
        toolbar={true}
        culture='es'
        style={{ border: 'none!important' }}
      />
    </div>
  );
};

export default WeeklyCalendar;