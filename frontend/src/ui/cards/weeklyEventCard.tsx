import { Event } from '@/interfaces/ICalendar.interfaces';
import React from 'react';

interface Props {
  event: Event;
  setDate: (date: Date) => void;
  setIsDaily: (isDaily: boolean) => void;
}

function WeeklyEventCard({ event, setDate, setIsDaily }: Props){
  const date = new Date()
  const handleClick = () => {
    setDate(date)
    setIsDaily(true)
  }
  return (
    <div className='bg-yellow-100 border border-black px-2 pt-1 pb-2 rounded flex flex-col text-black relative' onClick={() => handleClick()}>
      <h3 className='text-sm'>{event.title}</h3>
      <ul className='list-disc text-xs'>
        <li className='list-item ms-4'>{event.course.schoolName}</li>
        <li className='list-item ms-4'>{event.course.subjectName}</li>
      </ul>
      <button type='button' className='absolute bottom-1 right-4'>➡</button>
    </div>
  )
};

export default WeeklyEventCard;