'use client'

import { PLanificationMonth } from '@/interfaces/ICourses.interface';
import React from 'react';
import { PlanificationDroppableMonth } from './draggableCalendar/DroppableMonth';
import { IMonthPlanification } from '@/interfaces/IPlanification.interfaces';

interface Props {
  months: PLanificationMonth[]
  startMonthIndex: number
  endMonthIndex: number
  setCurrentMonthIndex: (index: number) => void
}

function MonthlyCalendar({ months, startMonthIndex, endMonthIndex, setCurrentMonthIndex }: Props) {

  const filteredMonths = months.map(month => {
    const filteredContent = month.content.reduce((acc: { map: Map<string, boolean>; result: IMonthPlanification[] }, current) => {
      const [year, month] = current.fecha!.split('-');
      const key = `${current.subtema_id}-${year}-${month}`;

      if (!acc.map.has(key)) {
        acc.map.set(key, true);
        acc.result.push(current);
      }

      return acc;
    }, { map: new Map(), result: [] }).result;

    return { ...month, content: filteredContent };
  });

  return (
    <div className="w-full flex gap-4 h-[calc(100%-60px)] px-2 py-4 justify-between">
      {filteredMonths.slice(startMonthIndex, endMonthIndex).map((month) => (
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
