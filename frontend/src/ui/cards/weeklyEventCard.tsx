import { IconArrow } from '@/icons';
import { CalendarEvent } from '@/interfaces/IPlanification.interfaces';
import React from 'react';

interface Props {
  event: CalendarEvent;
  setCurrentPlanification?: (planification: CalendarEvent) => void;
}

function WeeklyEventCard({ event, setCurrentPlanification }: Props) {
  const handleClick = () => {
    setCurrentPlanification!(event)
  }
  return (
    <div className='bg-yellow-100 border border-black px-2 pt-1 pb-2 rounded flex flex-col text-black relative text-sm capitalize' onClick={() => handleClick()}>
      <h3 className='font-semibold'>{event.title}</h3>
      <span >{event.schoolName}</span>
      <span >{event.subjectName}</span>
      <button type='button' className='absolute bottom-1 right-0'>
        <IconArrow color='black' classNames='size-6' />
      </button>
    </div>
  )
};

export default WeeklyEventCard;