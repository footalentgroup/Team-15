'use client'

import { Navigation, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { ICourses } from '@/interfaces/ICourses.interface'
import { CourseCard } from '@/ui'
import { useState } from 'react';
interface Props {
  list: ICourses[]
  setIsVisible: (value: boolean) => void
}

export function Slider({ list, setIsVisible }: Props) {
  const [currentCourse, setCurrentCourse] = useState<string>("")

  return (
    <div className="flex relative">
      <Swiper
        modules={[Navigation, Scrollbar, A11y]}
        spaceBetween={36}
        slidesPerView={5}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ hide: true, }}
        style={{ padding: '8px 64px', minWidth: '100%' }}
      >
        {
          list.map((item, i) => (
            <SwiperSlide key={i} onClick={() => setCurrentCourse(item.subjectName)}>
              <CourseCard setIsVisible={setIsVisible} currentCourse={currentCourse} courses={item} color={item.color!} />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}
