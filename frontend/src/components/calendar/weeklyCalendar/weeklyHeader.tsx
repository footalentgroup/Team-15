import React from 'react';
import { DateLocalizer } from 'react-big-calendar';

interface HeaderProps {
  date: Date;
  localizer: DateLocalizer;
  label: string;
  setIsDaily: (date: Date) => void;
}

const WeeklyCustomHeader: React.FC<HeaderProps> = ({ date, localizer, setIsDaily }) => {
  return (
    <div className="rbc-header justify-center" onClick={() => setIsDaily(date)}>
      {localizer.format(date, 'dddd DD')}
    </div>
  );
};

export default WeeklyCustomHeader;