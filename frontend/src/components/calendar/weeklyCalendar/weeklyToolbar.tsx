import { IconArrow } from '@/icons';
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
        <span className="capitalize text-4xl">Calendario General</span>
        <button type="button" onClick={goToBack}>
          <IconArrow color='black' classNames='size-12 rotate-180' />
        </button>
        <span className="capitalize text-4xl">{label()}</span>
        <button type="button" onClick={goToNext}>
          <IconArrow color='black' classNames='size-12' />
        </button>
      </span>
    </div>
  );
};

export default WeeklyCustomToolbar;