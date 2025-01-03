'use client'
import ButtonContinue from "@/ui/buttons/buttonContinue";
import { useState } from "react";
import WeeklyCalendar from "./weeklyCalendar";
import DailyCalendar from "./dailyCalendar";
import { ICourses } from "@/interfaces/ICourses.interface";

interface Props {
  events: ICourses[];
}

function HomeCalendar({ events }: Props) {
  const [isDaily, setIsDaily] = useState(false);
  const [date, setDate] = useState(new Date());
  console.log(date);
  return (
    <div className='h-full overflow-hidden mt-8'>
      <div className='flex'>
        <h2 className='text-[32px] font-semibold mb-6'>Calendario General</h2>
        {isDaily ? (
          <ButtonContinue text='Diaria' color='ms-auto me-24 h-12 bg-white text-dark' type='button' onClick={() => setIsDaily(!isDaily)} />
        ) : (
          <ButtonContinue text='Semanal' color='ms-auto me-24 h-12 bg-white text-dark' type='button' onClick={() => setIsDaily(!isDaily)} />
        )}
      </div>
      {/* aca al hacer click en cada dia te debe llevar a la vista diaria de ese dia, o al hacer click en el select te tiene que dejar cambiar a la vista diaria actual */}
      {isDaily ? (
        <DailyCalendar date={date} />
      ) : (
        //al hacer click en un dia se setea ese dia en el state
        <WeeklyCalendar setDate={setDate} setIsDaily={setIsDaily} />
      )}
    </div>
  );
}

export default HomeCalendar;