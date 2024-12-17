import React from 'react';

interface Props {
  text: string;
  onClick?: () => void;
  color?: string;
  type?: "button" | "submit";
}

const ButtonNormal = ({ text, onClick, color, type }: Props) => {
  return (
    <button type={type ? type : "button"} onClick={onClick} className={`min-w-[136px] min-h-12 ${color ? color : 'bg-white'} border-2 border-black text-black font-semibold py-2 px-4 rounded-md`}>
      {text}
    </button>
  );
};

export default ButtonNormal;