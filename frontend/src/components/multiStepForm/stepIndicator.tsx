import React from 'react';

const STEPS = [
  {
    step: 1,
    title: 'Sube tu documento',
  },
  {
    step: 2,
    title: 'Revisa el contenido',
  },
  {
    step: 3,
    title: 'Calendariza tus contenidos',
  },
]

interface Props {
  step: number;
}

const StepIndicator = ({ step }: Props) => {
  return (
    <div className='flex gap-6 py-5'>
      {STEPS.map((item, index) => (
        <div key={index} className='flex gap-2 flex-1 items-center min-w-max'>
          <div className={`size-8 rounded-full text-center pt-[2px] text-xl ${step >= item.step ? 'bg-blue-800 text-white font-bold' : 'bg-gray-300 text-white'}`} >
            {item.step}
          </div>
          <p className={`${step >= item.step ? 'text-blue-800 font-semibold' : 'text-gray-300'}`}>{item.title}</p>
        </div>
      ))}
    </div>
  );
}

export default StepIndicator;
