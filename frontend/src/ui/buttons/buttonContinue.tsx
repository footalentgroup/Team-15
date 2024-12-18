import React from 'react';

interface Props {
  text: string;
  onClick?: () => void;
  color?: string;
  type?: "button" | "submit";
}

const ButtonContinue = ({ text, onClick, color, type }: Props) => {
  return (
    <button type={type ? type : "submit"} onClick={onClick} className={`min-w-[136px] min-h-12 ${color ? color : 'bg-pink-500 text-white'} border-2 border-black font-semibold px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000]`}>
      {text}
    </button>
  );
};

export default ButtonContinue;