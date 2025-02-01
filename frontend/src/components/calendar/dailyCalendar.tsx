import { CalendarEvent } from '@/interfaces/IPlanification.interfaces';
import React from 'react';

interface Props {
  date: Date;
  //events: ICourses[];
  events: CalendarEvent[]
}

const ClassTypeFlag: React.FC<{ type?: string }> = ({ type }) => {
  const color = type === "" ? "bg-blue-light-500" : type === "Examen" || type === "examen" ? "bg-pink-100" : "bg-green-500"
  const text = type === "" ? "Clase teórica" : type === "Examen" || type === "examen" ? "Clase evaluativa" : "Clase práctica"
  return (
    <div className={`w-20.5 rounded-[4px] px-1 ${color}`}>
      <p className="text-xs text-center font-semibold">{text}</p>
    </div>
  )
}

function DailyCalendar({ date, events }: Props) {
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const dayName = days[date.getDay()];
  const dayNumber = date.getDate();
  const fullDate = `${dayName} ${dayNumber}`;
  const currentEvents = events.filter(event => event.start!.getDate() === date.getDate());
  return (
    <div className='h-full rounded-xl filter drop-shadow-general content-end'>
      <div className='mx-28 bg-yellow-light text-center border-2 border-b-0 border-black content-center h-16 text-lg font-semibold rounded-t-xl'>
        <h2>{fullDate}</h2>
      </div>
      <div className='min-h-72 bg-white grid grid-cols-4 grid-rows-2 mx-28 border-2 border-black rounded-b-xl gap-2.5 p-12'>
        {currentEvents.map((event, i) => (
          <div key={i} className='flex flex-col bg-yellow-100 border border-black rounded-xl max-h-36 items-center justify-center p-2'>
            <h3 className='text-lg font-semibold capitalize'>{event.title}</h3>
            <div className='flex flex-wrap gap-1 justify-center text-sm mb-2 capitalize'>
              <p >{event.schoolName}</p>
              <p >{event.subjectName}</p>
            </div>
            <ClassTypeFlag type={event.resource?.tipo_actividad} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DailyCalendar;