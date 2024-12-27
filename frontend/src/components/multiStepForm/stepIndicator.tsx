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
    <div className='flex gap-2 py-5'>
      {STEPS.map((item, index) => (
        <div key={index} className='flex gap-2 flex-1 items-center'>
          <div className={`size-12 rounded-full text-center py-1 text-[28px] ${step >= item.step ? 'bg-blue-800 text-white font-extrabold leading-9' : 'bg-gray-300'}`} >
            {item.step}
          </div>
          <p className={`text-xl ${step >= item.step ? 'text-blue-800 font-semibold' : ''}`}>{item.title}</p>
        </div>
      ))}
    </div>
  );
}

export default StepIndicator;
