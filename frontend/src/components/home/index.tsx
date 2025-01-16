'use client'
import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/sidebar';
import ButtonContinue from '@/ui/buttons/buttonContinue';
import { Slider } from '../slider/slider';
import HomeCalendar from '../calendar';
import { ICourses } from '@/interfaces/ICourses.interface';
import { setCurrentCourseCookieAction } from '@/actions/addCourse.action';
import { redirect } from 'next/navigation';

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
  const [currentCourse, setCurrentCourse] = useState<ICourses | null>(data[0])
  console.log(data);
  console.log('currentCourse', currentCourse);

  useEffect(() => {
    if (currentCourse) {
      console.log('currentCourse', currentCourse)
      //manejar logica para guardar el curso seleccionado y poder usarlo en otras paginas
      localStorage.setItem('currentCourse', JSON.stringify(currentCourse))
      setCurrentCourseCookieAction(currentCourse)
    }
  }, [currentCourse])

  const handleAddCourse = async () => {

    localStorage.removeItem('currentCourse')
    await setCurrentCourseCookieAction({} as ICourses)
    redirect('/add-course')
  }

  return (
    <>
      <Sidebar isHome isVisible={isVisible} setIsVisible={setIsVisible} data={data} currentCourse={currentCourse} />
      <div className='px-10 flex flex-col gap-4 h-full'>
        <>
          <div className='flex py-8'>
            <h2 className='text-[32px] font-semibold mb-4'>Tus Cursos</h2>
            <div className='flex items-center ms-auto gap-4 '>
              <ButtonContinue text='Añadir un curso' color='h-12 bg-yellow-500 text-dark' type='button' onClick={handleAddCourse} />
              <ButtonContinue text='Ver todas los cursos' color='h-12 bg-white text-dark' type='button' />
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