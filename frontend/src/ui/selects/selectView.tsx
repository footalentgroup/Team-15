"use client"
import { IconArrow } from '@/icons';
import React, { useState } from 'react';

interface Props {
  options: string[];
  value: string;
  onChange: (value: boolean) => void;
  isDaily: boolean;
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
    <div className="relative me-16">
      <div onClick={handleInputClick} className="flex items-center bg-white min-w-[136px] min-h-12 border-2 border-black font-semibold px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000]">
        <div className="">{getDisplay()}</div>
        <div className="transform rotate-90 text-black">
          <IconArrow color='black' />
        </div>
      </div>
      {showMenu && (
        <div className="absolute top-14 z-10 bg-white rounded-md h-16 w-full justify-items-center content-center border-2 border-black filter drop-shadow-[4px_4px_0px_#000000]">
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