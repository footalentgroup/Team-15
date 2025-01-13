'use client'

import { PLanificationMonth } from '@/interfaces/ICourses.interface';
import React from 'react';
import { PlanificationDroppableMonth } from './draggableCalendar/DroppableMonth';

interface Props {
  months: PLanificationMonth[]
  startMonthIndex: number
  endMonthIndex: number
  setCurrentMonthIndex: (index: number) => void
}

function MonthlyCalendar({ months, startMonthIndex, endMonthIndex, setCurrentMonthIndex }: Props) {
  console.log(months);
  return (
    <div className="w-full flex gap-4 h-[460px] px-2 py-4 justify-between">
      {months.slice(startMonthIndex, endMonthIndex).map((month) => (
        <PlanificationDroppableMonth
          key={month.id}
          month={month}
          index={month.id}
          setCurrentMonthIndex={setCurrentMonthIndex}
        />
      ))}
    </div>
  );
};

export default MonthlyCalendar;
