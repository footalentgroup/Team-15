"use client"
import { IconArrow } from '@/icons';
import React, { useState } from 'react';

interface Props {
  options: string[];
  value: string;
  onChange: (value: boolean) => void;
  isDaily?: boolean;
}

function SelectView({ options, value, onChange, isDaily }: Props) {
  const [showMenu, setShowMenu] = useState(false);

  const handleInputClick = () => {
    setShowMenu(!showMenu);
  };

  const getDisplay = () => {
    if (isDaily) {
      return "Diario";
    } else {
      return "Semanal";
    }
  };

  const handleOptionClick = (option: string) => {
    if (option === "Diario") {
      onChange(true);
    } else {
      onChange(false);
    }

    setShowMenu(false);
  };

  return (
    <div className="relative cursor-pointer select-none z-50">
      <div onClick={handleInputClick} className="flex items-center bg-white min-w-[136px] min-h-12 border border-black font-semibold px-4 rounded-md filter drop-shadow-general">
        <div className="">{getDisplay()}</div>
        <div className="transform rotate-90 text-black">
          <IconArrow color='black' />
        </div>
      </div>
      {showMenu && (
        <div className="absolute top-14 z-10 bg-white rounded-md h-16 w-full justify-items-center content-center border border-black filter drop-shadow-general">
          {options.map(option => (
            <div key={option} onClick={() => handleOptionClick(option)} className={`w-full text-center ${value === option ? "font-bold" : ""}`}>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectView;