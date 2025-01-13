'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface Props {
  text?: string;
  onClick?: () => void;
  color?: string;
  icon?: React.ReactNode;
  url: string;
  isExpanded?: boolean;
}

const ButtonSideBar = ({ text, onClick, color, icon, url, isExpanded }: Props) => {
  const pathname = usePathname()
  const isActive = pathname === url || pathname.includes(url)
  return (
    <Link href={url} onClick={onClick} className={`${isActive ? 'bg-[#3a3838] text-white' : 'bg-white'} ${isExpanded ? "w-44" : ""} min-h-12 flex gap-2 items-center ${color ? color : ''} border-2 border-black text-black font-semibold py-2 px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000]`}>
      <div className='!text-white'>
        {icon && icon}
      </div>
      {text}
    </Link>
  );
};

export default ButtonSideBar;