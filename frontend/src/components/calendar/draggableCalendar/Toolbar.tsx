import { IconArrow } from '@/icons';
import React from 'react';
import { ToolbarProps } from 'react-big-calendar';
interface Props {
  toolbarProps: ToolbarProps;
  monthIndex: number;
  maxIndex: number;
  minIndex: number;
  setMonthIndex: (index: number) => void;
}

function CustomToolbar({ toolbarProps, monthIndex, maxIndex, minIndex, setMonthIndex }: Props) {
  const goToBack = () => {
    const mDate = toolbarProps.date;
    const newDate = new Date(mDate.setMonth(mDate.getMonth()));
    toolbarProps.onNavigate('PREV', newDate);
    setMonthIndex(monthIndex - 1);
  };

  const goToNext = () => {
    const mDate = toolbarProps.date;
    console.log("mDate", mDate);
    const newDate = new Date(mDate.setMonth(mDate.getMonth()));
    console.log("newDate", newDate);
    toolbarProps.onNavigate('NEXT', newDate);
    setMonthIndex(monthIndex + 1);
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
    <div className="w-full py-2">
      <span className="flex justify-start items-center">
        {monthIndex > minIndex ? (
          <button type="button" onClick={goToBack}>
            <IconArrow color='black' classNames='size-12 rotate-180' />
          </button>
        ) : (
          <div className="w-12" />
        )
        }
        <span className="capitalize text-4xl">{label()}</span>
        {monthIndex < maxIndex && <button type="button" onClick={goToNext}>
          <IconArrow color='black' classNames='size-12' />
        </button>}
      </span>
    </div>
  );
};

export default CustomToolbar;