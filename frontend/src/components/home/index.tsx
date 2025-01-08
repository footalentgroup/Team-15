'use client'
import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/sidebar';
import Link from 'next/link';
import ButtonContinue from '@/ui/buttons/buttonContinue';
import { Slider } from '../slider/slider';
import HomeCalendar from '../calendar';
import { ICourses } from '@/interfaces/ICourses.interface';

/* const DUMMY_COURSES: ICourses[] = [
  {
    schoolName: 'Colegio San Agustin',
    subjectName: 'Historia',
    courseName: '1ro A',
    color: 'bg-pink-100'
  },
  {
    schoolName: 'Colegio San Agustin',
    subjectName: 'Historia',
    courseName: '2do B',
    color: 'bg-yellow-100'
  },
  {
    schoolName: 'Colegio Santa Cecilia',
    subjectName: 'Ciudadania',
    courseName: '3ro A',
    color: 'bg-green-100'
  },
  {
    schoolName: 'Colegio Santa Cecilia',
    subjectName: 'Ciudadania',
    courseName: '2do A',
    color: 'bg-blue-light-100'
  },
  {
    schoolName: 'Colegio Santa Cecilia',
    subjectName: 'Ciudadania',
    courseName: '2do A',
    color: 'bg-lime-100'
  },
]; */

interface Props {
  data: ICourses[]
}
function Home({ data }: Props) {
  const [isVisible, setIsVisible] = useState(false)
  const [currentCourse, setCurrentCourse] = useState<ICourses | null>(null)
  console.log(data);

  useEffect(() => {
    if (currentCourse) {
      console.log('currentCourse', currentCourse)
      //manejar logica para guardar el curso seleccionado y poder usarlo en otras paginas
      localStorage.setItem('currentCourse', JSON.stringify(currentCourse))
    }
  }, [currentCourse])

  return (
    <>
      <Sidebar isVisible={isVisible} setIsVisible={setIsVisible} data={data} currentCourse={currentCourse} />
      <div className='px-10 flex flex-col gap-4 h-full'>
        <>
          <div className='flex py-8'>
            <h2 className='text-[32px] font-semibold mb-4'>Tus Clases</h2>
            <div className='flex items-center ms-auto gap-4 '>
              <Link href='/add-course'>
                <ButtonContinue text='Añadir una clase' color='h-12 bg-yellow-500 text-dark' type='button' />
              </Link>
              <ButtonContinue text='Ver todas las clases' color='h-12 bg-white text-dark' type='button' />
            </div>
          </div>
          <Slider list={data} setIsVisible={setIsVisible} setCurrentCourse={setCurrentCourse} />
        </>
        <HomeCalendar events={data} />
      </div>
    </>
  );
}

export default Home;