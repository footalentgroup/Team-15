import { CalendarEvent } from '@/interfaces/IPlanification.interfaces';
import React from 'react';

interface Props {
  date: Date;
  //events: ICourses[];
  events: CalendarEvent[]
}

function DailyCalendar({ date, events }: Props) {
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const dayName = days[date.getDay()];
  const dayNumber = date.getDate();
  const fullDate = `${dayName} ${dayNumber}`;
  const currentEvents = events.filter(event => event.start!.getDate() === date.getDate());
  return (
    <div className='mx-16 w-[90%] h-full max-h-[474px] rounded-xl filter drop-shadow-[4px_4px_0px_#000000] mt-20'>
      <div className='bg-yellow-light text-center border-2 border-b-0 border-black content-center h-16 w-full text-lg font-semibold rounded-t-xl'>
        <h2>{fullDate}</h2>
      </div>
      <div className='bg-white h-[410px] border-2 border-black rounded-b-xl flex flex-wrap gap-6 px-28 py-10'>
        {currentEvents.map((event, i) => (
          <div key={i} className='flex flex-col bg-yellow-100 border border-black rounded-xl max-h-36 max-w-[230px] items-center justify-center p-2'>
            <h3 className='text-lg font-semibold'>{event.title}</h3>
            <div className='flex flex-wrap gap-1 justify-center text-sm mb-2'>
              <p >{event.schoolName}</p>
              <p >{event.subjectName}</p>
            </div>
            <span>{event.resource?.tipo_actividad}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DailyCalendar;