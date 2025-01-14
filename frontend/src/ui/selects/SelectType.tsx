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
      <div onClick={handleInputClick} className="flex items-center bg-white border-2 border-black font-semibold px-2 rounded-md filter drop-shadow-[4px_4px_0px_#000000]">
        <div className="">{value}</div>
        <div className="transform rotate-90 text-black">
          <IconArrow color='black' />
        </div>
      </div>
      {showMenu && (
        <div className="absolute top-14 z-10 bg-white rounded-md h-16 w-full justify-items-center content-center border-2 border-black filter drop-shadow-[4px_4px_0px_#000000]">
          {options.map(option => (
            <div key={option} onClick={() => onChange(option)} className={`w-full text-center ${value === option ? "font-bold" : ""}`}>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectType;