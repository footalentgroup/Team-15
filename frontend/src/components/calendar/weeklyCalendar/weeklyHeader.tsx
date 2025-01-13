import React from 'react';
import { HeaderProps } from 'react-big-calendar';

const WeeklyCustomHeader: React.FC<HeaderProps> = ({ date, localizer }) => {
  const handleClick = () => {
    console.log('Header clicked:', date);
    // Aquí puedes manejar el evento onClick, por ejemplo, cambiar la vista o mostrar eventos del día
  };

  return (
    <div className="rbc-header" onClick={handleClick}>
      {localizer.format(date, 'dddd', 'es')}
    </div>
  );
};

export default WeeklyCustomHeader;