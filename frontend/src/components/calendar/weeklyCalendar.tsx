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

const WeeklyCalendar: React.FC = () => {
  const events = [
    {
      start: new Date(2024, 11, 18, 8, 0, 0),
      end: new Date(2024, 11, 18, 12, 0, 0),
      title: 'Revolución Rusa',
      themes: ['Revolución Rusa 1905', 'Fábrica Kirov'],
      course: {
        schoolName: 'Colegio San Agustin',
        subjectName: 'Historia',
        courseName: '1ro A',
      }
    },
    {
      start: new Date(2024, 11, 18, 12, 30, 0),
      end: new Date(2024, 11, 18, 16, 30, 0),
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

  const dayPropGetter = (date: Date) => {
    const style: React.CSSProperties = {};
    style.border = 'none';
    if (moment(date).isSame(new Date(), 'day')) {
      style.backgroundColor = '#f3f4f6';
    }
    return { style };
  };

  return (
    <div className='h-full'>
      <Calendar
        components={{
          event: ({ event }) => (
            <WeeklyEventCard event={event} />
          ),
          timeGutterWrapper: () => <div style={{ display: 'none' }} />,
          timeGutterHeader: () => <div style={{ display: 'none' }} />,
          timeSlotWrapper: () => <div style={{ display: 'none' }} />,
          week: {
            header: () => <div style={{ display: 'none' }} />,
          }
        }}
        dayPropGetter={dayPropGetter}
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