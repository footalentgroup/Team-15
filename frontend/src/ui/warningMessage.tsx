"use client"
import { IconInfo } from '@/icons';
import React, { useState } from 'react';

interface Props {
  title: string
  info: string
}

function WarningMessage({ title, info }: Props) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className='px-5 py-1 absolute top-4 left-1/2 -translate-x-1/2 z-50 justify-items-center bg-yellow-light border border-black drop-shadow-general cursor-help select-none rounded'>
      <button className='flex gap-1 flex-wrap w-40 justify-center' onClick={() => setShowInfo(!showInfo)}>
        <IconInfo />
        <span>{title}</span>
      </button>
      {showInfo && <span>{info}</span>}
    </div>
  );
}

export default WarningMessage;