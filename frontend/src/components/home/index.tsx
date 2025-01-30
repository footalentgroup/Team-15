'use client'
import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/sidebar';
import ButtonContinue from '@/ui/buttons/buttonContinue';
import { Slider } from '../slider/slider';
import HomeCalendar from '../calendar';
import { ICourses } from '@/interfaces/ICourses.interface';
import { setCurrentCourseCookieAction } from '@/actions/addCourse.action';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { IUser } from '@/interfaces/IAuth.interfaces';
import { IconLogout, IconUser } from '@/icons';
import { deleteUserCookie } from '@/actions/authActions';

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
  user: IUser
}
function Home({ data, user }: Props) {
  const [isVisible, setIsVisible] = useState(false)
  const [currentCourse, setCurrentCourse] = useState<ICourses | null>()
  const [userModal, setUserModal] = useState(false)

  useEffect(() => {
    if (currentCourse) {
      localStorage.setItem('currentCourse', JSON.stringify(currentCourse))
      localStorage.setItem('studentsData', JSON.stringify(currentCourse.students))
      setCurrentCourseCookieAction(currentCourse)
    }
  }, [currentCourse])

  useEffect(() => {
    if (!isVisible) {
      setCurrentCourse(null)
    }
  }, [isVisible])

  const handleAddCourse = async () => {

    localStorage.removeItem('currentCourse')
    await setCurrentCourseCookieAction({} as ICourses)
    redirect('/add-course?newCourse=true')
  }

  const handleLogout = async () => {
    localStorage.removeItem('currentCourse')
    await deleteUserCookie()
    redirect('/login')
  }

  return (
    <>
      <Sidebar isHome isVisible={isVisible} setIsVisible={setIsVisible} data={data} currentCourse={currentCourse} />
      <div className={`px-16 py-14 flex flex-col gap-4 h-full ${isVisible ? "w-[calc(100%-18rem)]" : "w-full"}`}>
        <div className='flex mb-8 min-h-24'>
          {!isVisible &&
            <Image src='/PalProfeLogo.svg' alt='logo' width={150} height={96} />
          }
          <div className='ms-auto flex gap-1 items-center relative cursor-pointer' onClick={() => setUserModal(!userModal)}>
            <IconUser />
            <span className='font-semibold capitalize'>{user.username}</span>
            {userModal && (
              <div className='absolute top-[4.5rem] right-0 w-72 rounded-md border border-[#d9d9d9] bg-yellow-100 filter drop-shadow-light'>
                <div className='flex justify-between items-center h-full px-4 py-3'>
                  <div className='flex gap-2 cursor-pointer' onClick={handleLogout}>
                    <IconLogout />
                    <span className='font-medium capitalize'>Cerrar Sesión</span>
                  </div>
                  <button type='button' className='font-bold cursor-pointer' onClick={() => setUserModal(false)}>X</button>
                </div>
              </div>
            )}
          </div>
        </div>
        <>
          <div className='flex'>
            <h2 className='text-[32px] font-semibold'>Tus Cursos</h2>
            <div className='flex items-center ms-auto gap-4 '>
              <ButtonContinue text='Añadir un curso' color='h-12 bg-yellow-500 text-dark' type='button' onClick={handleAddCourse} />
              {/* <ButtonContinue text='Ver todas los cursos' color='h-12 bg-white text-dark' type='button' /> */}
            </div>
          </div>
          <Slider list={data} setIsVisible={setIsVisible} setCurrentCourse={setCurrentCourse} currentCourse={currentCourse} />
        </>
        <HomeCalendar events={data} />
      </div>
    </>
  );
}

export default Home;