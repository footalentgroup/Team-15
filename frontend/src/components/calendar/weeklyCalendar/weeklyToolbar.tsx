import { IconArrow } from '@/icons';
import ButtonArrowPink from '@/ui/buttons/buttonArrowPink';
import React from 'react';
import { ToolbarProps } from 'react-big-calendar';
interface Props {
  toolbarProps: ToolbarProps;
}

function WeeklyCustomToolbar({ toolbarProps }: Props) {
  const goToBack = () => {
    const mDate = toolbarProps.date;
    const newDate = new Date(mDate.setMonth(mDate.getMonth()));
    toolbarProps.onNavigate('PREV', newDate);
  };

  const goToNext = () => {
    const mDate = toolbarProps.date;
    const newDate = new Date(mDate.setMonth(mDate.getMonth()));
    toolbarProps.onNavigate('NEXT', newDate);
  };

  const goNextMonth = () => {
    const mDate = toolbarProps.date;
    const newDate = new Date(mDate.setMonth(mDate.getMonth() + 1));
    toolbarProps.onNavigate('NEXT', newDate);
  }

  const goBackMonth = () => {
    const mDate = toolbarProps.date;
    const newDate = new Date(mDate.setMonth(mDate.getMonth() - 1));
    toolbarProps.onNavigate('PREV', newDate);
  }

  /* const goToCurrent = () => {
    const now = new Date();
    props.onNavigate('TODAY', now);
  }; */

  const label = () => {
    const date = toolbarProps.date;
    const month = date.toLocaleString('default', { month: 'long' });
    return month;
  };

  return (
    <div className="w-full pb-8">
      <span className="flex justify-start items-center">
        <span className="capitalize text-[32px] font-semibold">Calendario General</span>
        <button type="button" onClick={goBackMonth}>
          <IconArrow color='black' classNames='size-12 rotate-180' />
        </button>
        <span className="capitalize text-[32px] font-semibold">{label()}</span>
        <button type="button" onClick={goNextMonth}>
          <IconArrow color='black' classNames='size-12' />
        </button>
        <div className='absolute top-1/2 w-full flex justify-between z-50'>
          <div className='ms-2'>
            <ButtonArrowPink text='' onClick={goToBack} rotate />
          </div>
          <div className='me-2'>

            <ButtonArrowPink text='' onClick={goToNext} />
          </div>
        </div>
      </span>
    </div>
  );
};

export default WeeklyCustomToolbar;