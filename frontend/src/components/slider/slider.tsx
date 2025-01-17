'use client'

import { Navigation, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { ICourses } from '@/interfaces/ICourses.interface'
import { CourseCard } from '@/ui'
import ButtonArrowPink from '@/ui/buttons/buttonArrowPink';
import { setCurrentCourseCookieAction } from '@/actions/addCourse.action';
interface Props {
  list: ICourses[]
  setIsVisible: (value: boolean) => void
  setCurrentCourse: (value: ICourses) => void
}

export function Slider({ list, setIsVisible, setCurrentCourse }: Props) {

  const setCurrentCourseCookie = async (course: ICourses) => {
    setCurrentCourse(course)
    await setCurrentCourseCookieAction(course)
  }

  return (
    <div className="flex relative">
      <Swiper
        modules={[Navigation, Scrollbar, A11y]}
        spaceBetween={36}
        slidesPerView={5}
        navigation={{ nextEl: ".next-arrow", prevEl: ".prev-arrow" }}
        pagination={{ clickable: true }}
        scrollbar={{ hide: true, }}
        style={{ padding: '8px 64px', minWidth: '100%' }}
      >
        {
          list.map((item, i) => (
            <SwiperSlide key={i} onClick={() => setCurrentCourseCookie(item)}>
              <CourseCard setIsVisible={setIsVisible} courses={item} color={item.color!} />
            </SwiperSlide>
          ))
        }

        <div className="next-arrow bg-yellow-light-100 h-full content-center absolute z-10 right-0 top-1/2 -translate-y-1/2 cursor-pointer select-none pe-1" >
          <ButtonArrowPink text='' />
        </div>
        <div className="prev-arrow bg-yellow-light-100 h-full content-center absolute z-10 left-0 top-1/2 -translate-y-1/2 cursor-pointer select-none ps-1" >
          <ButtonArrowPink text='' rotate />
        </div>
      </Swiper>
    </div>
  )
}
