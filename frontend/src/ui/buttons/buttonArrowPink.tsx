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
    <button type="button" onClick={onClick} className="flex items-center gap-2">
      {text && rotate ? (
        <>
          <IconArrow rotate classNames={`${color ? color : 'bg-pink-500 text-white'} rotate-180 size-8 rounded-full border justify-items-center border-black rounded-full filter drop-shadow-[-1px_-1px_0px_#000000]`} />
          <span >{text}</span>
        </>
      ) : (
        <>
          <span>{text}</span>
          <IconArrow classNames={`${color ? color : 'bg-pink-500 text-white'} size-8 rounded-full border justify-items-center border-black rounded-full filter drop-shadow-[1px_1px_0px_#000000]`} />
        </>
      )}
    </button>
  );
};

export default ButtonArrowPink;