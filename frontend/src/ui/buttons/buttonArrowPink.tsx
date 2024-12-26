import { IconArrow } from '@/icons';
import React from 'react';

interface Props {
  onClick?: () => void;
  color?: string;
  text: string;
  rotate?: boolean;
}

const ButtonArrowPink = ({ onClick, color, text, rotate }: Props) => {
  return (
    <button type="button" onClick={onClick} className={`size-8 ${color ? color : 'bg-pink-500 text-white'} border justify-items-center border-black rounded-full filter drop-shadow-[1px_1px_0px_#000000]`}>
      {text && rotate ? (
        <>
          <IconArrow rotate />
          <span className="text-white">{text}</span>
        </>
      ) : (
        <>
          <span className="text-white">{text}</span>
          <IconArrow />
        </>
      )}
    </button>
  );
};

export default ButtonArrowPink;