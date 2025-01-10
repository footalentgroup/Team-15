'use client'

import React from 'react';
import { Calendar, DateLocalizer, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './weeklyCalendar.styles.css';
import { WeeklyEventCard } from '@/ui';

const localizer = momentLocalizer(moment);

moment.locale('es');
interface Props {
  setDate: (date: Date) => void;
  setIsDaily: (isDaily: boolean) => void;
}

function WeeklyCalendar({ setDate, setIsDaily }: Props) {
  const events = [
    {
      start: new Date(2025, 0, 2, 8, 0, 0),
      end: new Date(2025, 0, 2, 12, 0, 0),
      title: 'Revolución Rusa',
      themes: ['Revolución Rusa 1905', 'Fábrica Kirov'],
      course: {
        schoolName: 'Colegio San Agustin',
        subjectName: 'Historia',
        courseName: '1ro A',
      }
    },
    {
      start: new Date(2025, 0, 2, 12, 12, 30, 0),
      end: new Date(2025, 0, 2, 12, 16, 30, 0),
      title: 'Revolución industrial',
      themes: ['Inicios', 'Contexto'],
      course: {
        schoolName: 'Colegio San Agustin',
        subjectName: 'Historia',
        courseName: '1ro A',
      }
    },
  ];

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

  return (
    <div className='h-full max-h-[474px] px-16 weekly-calendar'>
      <Calendar
        components={{
          event: ({ event }) => (
            <WeeklyEventCard event={event} setDate={setDate} setIsDaily={setIsDaily} />
          ),
          timeGutterWrapper: () => <div style={{ display: 'none' }} />,
          timeGutterHeader: () => <div style={{ display: 'none' }} />,
          timeSlotWrapper: () => <div style={{ display: 'none' }} />,
          week: {
            header: () => <div style={{ display: 'none' }} />,
          }
        }}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="work_week"
        views={['work_week']}
        step={60}
        timeslots={2}
        min={minTime}
        max={maxTime}
        formats={formats}
        toolbar={false}
        date={new Date()}
        culture='es'
        style={{ border: 'none!important' }}
      />
    </div>
  );
};

export default WeeklyCalendar;