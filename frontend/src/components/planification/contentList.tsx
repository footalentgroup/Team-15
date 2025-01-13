'use client'

import { Navigation, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import ButtonArrowPink from '@/ui/buttons/buttonArrowPink';
import { IPlanification, ISubtheme } from '@/interfaces/IPlanification.interfaces';
import { IconEdit, IconMenuDotsHorizontal, IconTrash } from '@/icons';
import { DraggableItem } from './draggableItem';
import { useState } from 'react';

interface Props {
  setCurrentItem: (item: ISubtheme) => void;
  data: IPlanification[]
  setInitialData: (data: IPlanification[]) => void;
}

export function ContentSlider({ setCurrentItem, data, setInitialData }: Props) {
  const [currentData, setCurrentData] = useState<IPlanification[]>(data)
  const [showOptions, setShowOptions] = useState(false)
  const [activeId, setActiveId] = useState<number | null>(null)
  const [editItemId, setEditItemId] = useState<number | null>(null)
  const [editValue, setEditValue] = useState('')
  const [showSubthemeOptions, setShowSubthemeOptions] = useState(false)

  const handleShowOptions = (id: number) => {
    setShowOptions(!showOptions)
    setActiveId(id)
  }

  const handleDelete = (themeId: number) => {
    console.log('delete', activeId);
    const newTheme = currentData[0].temas.filter((item) => item.id !== themeId)
    const newData = [{ ...currentData[0], temas: newTheme }]
    setCurrentData(newData)
    setInitialData(newData)
    setShowOptions(false)
  }

  const handleEdit = (currentValue: string) => {
    setEditValue(currentValue)
    setShowOptions(false)
    setEditItemId(activeId)
  }

  const handleSave = () => {
    console.log('save', editValue);
    const newTheme = currentData[0].temas.map((item, i) => {
      if (i === editItemId) {
        return { ...item, nombre: editValue }
      }
      return item
    })

    console.log('newTheme', newTheme);

    const newData = [{ ...currentData[0], temas: newTheme }]
    console.log('newData', newData);
    setCurrentData(newData)

    setEditItemId(null)
    setEditValue('')
  }

  console.log(data);

  return (
    <div className="flex relative">
      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={36}
        slidesPerView={3}
        navigation={{ nextEl: ".next-arrow", prevEl: ".prev-arrow" }}
        pagination={{ clickable: true }}
        style={{ padding: '8px 64px', minWidth: '100%' }}
        allowTouchMove={false}
      >
        {
          currentData.map((item, i) => (
            <div key={i}  >
              {item.temas.map((item, i) => (
                <SwiperSlide key={i} >
                  <div className='h-44 py-2'>
                    <div className="relative w-full min-h-10 flex justify-between items-center border border-black bg-yellow-100 px-2 py-2.5 rounded-md gap-2">

                      {editItemId === i ? (
                        <>
                          <input
                            autoFocus
                            className="w-full bg-yellow-100 border-b border-black"
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleSave();
                              }
                            }}
                          />
                          <button type="button" onClick={handleSave}>💾</button>
                        </>
                      ) : (
                        <>
                          <span className='w-[90%] whitespace-nowrap overflow-hidden overflow-ellipsis font-semibold' title={item.nombre}>
                            {item.nombre}
                          </span>
                          <button type='button' onClick={() => handleShowOptions(i)}><IconMenuDotsHorizontal /></button>
                        </>
                      )}
                      {showOptions && activeId === i && (
                        <div className='absolute top-10 right-1 w-4/5 p-4 flex gap-2 flex-col bg-yellow-100 border border-[#d9d9d9] rounded-md filter drop-shadow-[4px_4px_0px_#d9d9d9]'>
                          <button className='flex justify-between' onClick={() => handleEdit(item.nombre)}>
                            <span>Editar nombre</span>
                            <IconEdit />
                          </button>
                          <div className='horizontal-line w-full h-2' />
                          <button className='flex justify-between' type='button' onClick={() => handleDelete(item.id)}>
                            <span>Eliminar unidad</span>
                            <IconTrash />
                          </button>
                        </div>
                      )}
                    </div>
                    <div className='flex flex-col gap-2 items-center w-full h-full overflow-y-auto pb-14 mt-2'>
                      {item.subtemas.map((item, i) => (
                        <DraggableItem key={i} item={item} setCurrentItem={setCurrentItem} showOptions={showSubthemeOptions} setShowOptions={setShowSubthemeOptions} />
                      ))}
                      {showSubthemeOptions && (
                        <div className='absolute top-10 right-1 w-4/5 p-4 flex gap-2 flex-col bg-yellow-100 border border-[#d9d9d9] rounded-md filter drop-shadow-[4px_4px_0px_#d9d9d9]' >
                          <button className='flex justify-between' onClick={() => handleEdit(item.nombre)}>
                            <span>Editar nombre</span>
                            <IconEdit />
                          </button>
                          <div className='horizontal-line w-full h-2' />
                          <button className='flex justify-between' type='button' onClick={() => handleDelete(item.id)}>
                            <span>Eliminar tema</span>
                            <IconTrash />
                          </button>
                          <button className='flex justify-between' type='button' onClick={() => handleDelete(item.id)}>
                            <span>Añadir nuevo tema</span>
                            <span className='font-bold text-2xl'>+</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </div>
          ))
        }

        <div className="next-arrow bg-white h-full content-center absolute z-10 right-0 top-1/2 -translate-y-1/2 cursor-pointer select-none pe-1" >
          <ButtonArrowPink text='' />
        </div>
        <div className="prev-arrow bg-white h-full content-center absolute z-10 left-0 top-1/2 -translate-y-1/2 cursor-pointer select-none ps-1" >
          <ButtonArrowPink text='' rotate />
        </div>
      </Swiper>
    </div>
  )
}
