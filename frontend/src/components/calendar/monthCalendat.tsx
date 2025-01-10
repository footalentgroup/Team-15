'use client'

import { PLanificationMonth } from '@/interfaces/ICourses.interface';
import React from 'react';
import { PlanificationDroppableMonth } from './draggableCalendar/DroppableMonth';

interface Props {
  months: PLanificationMonth[]
  startMonthIndex: number
  endMonthIndex: number
}

function MonthlyCalendar({ months, startMonthIndex, endMonthIndex }: Props) {
  return (
    <div className="w-full flex gap-4 h-[500px] px-2 py-4 justify-between">
      {months.slice(startMonthIndex, endMonthIndex).map((month) => (
        <PlanificationDroppableMonth key={month.id} month={month} index={month.id} />
      ))}
    </div>
  );
};

export default MonthlyCalendar;
