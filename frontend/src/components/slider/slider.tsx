'use client'

import { Navigation, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { ICourses } from '@/interfaces/ICourses.interface'
import { CourseCard } from '@/ui'

export function Slider({ list }: { list: ICourses[] }) {

  return (
    <div className="flex relative">
      <Swiper
        modules={[Navigation, Scrollbar, A11y]}
        spaceBetween={8}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ hide: true, }}
        style={{ padding: '0 64px' }}
      >
        {
          list.map((item, i) => (
            <SwiperSlide key={i}>
              <CourseCard courses={item} color="" />
            </SwiperSlide>
          ))
        }
        <SwiperSlide>
          <div className='flex flex-col min-h-[156px] bg-[#e0e0e0] rounded-xl relative p-4 gap-2 items-center drop-shadow-md text-center justify-center'>
            ➕
          </div>
        </SwiperSlide>
        ...
      </Swiper>
    </div>
  )
}
