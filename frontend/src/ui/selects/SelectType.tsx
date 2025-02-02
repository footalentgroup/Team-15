"use client"
import { IconArrow } from '@/icons';
import React, { useState } from 'react';

interface Props {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

function SelectType({ options, value, onChange }: Props) {
  const [showMenu, setShowMenu] = useState(false);

  const handleInputClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="relative me-16 w-full">
      <div onClick={handleInputClick} className="w-fit flex items-center bg-white border-2 border-black font-semibold px-2 rounded-md filter drop-shadow-general">
        <div className="select-none">{value}</div>
        <div className="transform rotate-90 text-black">
          {showMenu ?
            <IconArrow color='black' classNames='rotate-180' /> :
            <IconArrow color='black' />
          }
        </div>
      </div>
      {showMenu && (
        <div className="absolute top-12 z-10 bg-white rounded-md h-20 w-full justify-items-center content-center border-2 border-black filter drop-shadow-general">
          {options.map(option => (
            <div key={option} onClick={() => {
              onChange(option)
              setShowMenu(false)
            }
            } className={`w-full text-center ${value === option ? "font-bold" : ""}`}>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectType;