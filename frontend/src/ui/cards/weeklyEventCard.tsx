import { Event } from '@/interfaces/ICalendar.interfaces';
import React from 'react';

interface WeeklyEventCardProps {
  event: Event;
}

const WeeklyEventCard: React.FC<WeeklyEventCardProps> = ({ event }) => (
  <div className='p-2 text-black font-medium border-none'>
    <div className='bg-gray-100 p-2 rounded'>
      <h3 className='text-lg'>{event.title}</h3>
      <ul className='list-disc text-sm'>
        {event.themes.map((theme) => (
          <li key={theme} className='list-item ms-6'>{theme}</li>
        ))}
      </ul>
    </div>
    <div className='flex flex-wrap gap-2 my-2 text-sm'>
      <p className='p-2 bg-blue-200 rounded'>{event.course.schoolName}</p>
      <p className='p-2 bg-yellow-200 rounded'>{event.course.subjectName}</p>
      <p className='p-2 bg-pink-200 rounded'>{event.course.courseName}</p>
      <button type='button' className='ms-auto'>➡</button>
    </div>
  </div>
);

export default WeeklyEventCard;