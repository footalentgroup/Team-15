import React from 'react';

interface Props {
  text: string;
  onClick?: () => void;
  color?: string;
  type?: "button" | "submit";
  width?: string
  height?: string
  loading?: boolean
}

const ButtonContinue = ({ text, onClick, color, type, width, height, loading }: Props) => {
  return (
    <button type={type ? type : "submit"} onClick={onClick} className={` ${width ?? "min-w-[136px]"} ${height ?? "min-h-12"} ${color ? color : 'bg-pink-500 text-white'} border-2 border-black font-semibold px-4 rounded-md filter drop-shadow-general`}>
      {
        loading ?
          <div className='flex items-center justify-center'>
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-light-500" />
            Cargando...
          </div>
          : text
      }
    </button>
  );
};

export default ButtonContinue;