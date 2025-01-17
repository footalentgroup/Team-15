'use client'
import { IconCalendar, IconFollowUp, IconForward, IconHome, } from '@/icons';
import { ICourses } from '@/interfaces/ICourses.interface';
import { CourseCard } from '@/ui';
import ButtonSideBar from '@/ui/buttons/buttonSidebar';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface Props {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  data?: ICourses[];
  currentCourse?: ICourses | null;
  isExpanded?: boolean;
  setIsExpanded?: (value: boolean) => void;
  isHome?: boolean;
}

function Sidebar({ isVisible, setIsVisible, data, currentCourse, isExpanded, setIsExpanded, isHome }: Props) {
  const pathname = usePathname()
  const SIDEBAR_LINK = [
    {
      name: 'Inicio',
      url: '/home ',
      icon: <IconHome color={`${pathname === '/home' ? 'white' : ''}`} />
    },
    {
      name: 'Seguimiento',
      url: '/students',
      icon: <IconFollowUp color={`${pathname === '/follow-up' ? 'white' : ''}`} />
    },
    {
      name: 'Planificación',
      url: currentCourse?.havePlanification ? '/planification/' + currentCourse?.subjectId : '/planification',
      icon: <IconCalendar color={`${pathname.includes('planification') ? 'white' : ''}`} />
    },
    /*     {
          name: 'Mis Recursos',
          url: '#',
          icon: <IconResources color={`${pathname === '/resources' ? 'white' : ''}`} />
        },
        {
          name: 'Notas Rápidas',
          url: '#',
          icon: <IconNotes color={`${pathname === '/notes' ? 'white' : ''}`} />
        } */
  ]

  if (isExpanded || isVisible) {
    const index = data ? data!.findIndex((course) => course.courseName === currentCourse?.courseName) : null
    console.log(index);
    const leftPosition =
      index === 0 || index === 1 ? 'left-[22.5rem]' :
        index === 2 ? 'left-[38.5rem]' :
          index === 3 ? 'left-[54.5rem]' :
            'left-[70.5rem]'
    return (
      <aside className={`fixed top-0 left-0 h-full w-full text-black  z-10 ${isVisible || isExpanded ? 'translate-x-0 bg-black/70' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className='flex flex-col w-72 items-center p-9 gap-12 bg-yellow-200 h-full border-r-2 border-r-black' onClick={(e) => e.stopPropagation()}>
          <Image src="/PalProfeLogo.svg" alt="Logo" className='mt-6' width={150} height={97} />
          {/* Esto tiene que ser dinamico */}
          <select className="w-full py-2 px-4 border-2 border-black rounded-md filter drop-shadow-[4px_4px_0px_#000000] capitalize">
            {data && data.map((course) => (
              <option key={course.courseName} value={course.courseName} className='text-xs capitalize font-bold p-0!'>{`${course.schoolName} ${course.subjectName} ${course.courseName}`}</option>
            ))}
          </select>
          <div className='trapezoid absolute top-16 left-[264px] flex items-center justify-center cursor-pointer' onClick={() => isExpanded ? setIsExpanded!(false) : setIsVisible(false)}>
            <IconForward classNames='rotate-180' />
          </div>
          <nav className="mt-4 w-full">
            <ul className="flex flex-col items-center w-full gap-6">
              {SIDEBAR_LINK.map((link) => (
                <ButtonSideBar
                  isExpanded
                  key={link.name}
                  text={link.name}
                  url={link.url}
                  icon={link.icon}
                />
              ))}
            </ul>
          </nav>
        </div>
        {currentCourse && (
          <div className={`absolute top-[9.5rem] ${leftPosition} w-[15%]`}>
            <CourseCard courses={currentCourse} color={currentCourse.color!} setIsVisible={setIsVisible} />
            <span onClick={() => setIsVisible(false)} className='text-red-500 text-2xl absolute top-4 right-4 font-bold'>X</span>
          </div>
        )}
      </aside>
    );
  }
  if (!isHome) {
    return (
      <>
        <aside className={`fixed top-0 left-0 h-full text-black z-10 transition-transform duration-300 ease-in-out`}>
          <div className='flex flex-col w-28 items-center gap-48 bg-yellow-200 h-full' onClick={(e) => e.stopPropagation()}>
            <Image src="/PalProfeLogoMin.svg" alt="Logo" className='mt-16' width={64} height={64} />
            <div className='trapezoid absolute top-16 left-24 flex items-center justify-center cursor-pointer' onClick={() => setIsExpanded!(true)}>
              <IconForward />
            </div>
            <nav className="w-full">
              <ul className="flex flex-col items-center w-full gap-6">
                {SIDEBAR_LINK.map((link) => (
                  <ButtonSideBar
                    key={link.name}
                    url={link.url}
                    icon={link.icon}
                  />
                ))}
              </ul>
            </nav>

          </div>
        </aside>
      </>
    )
  }
}

export default Sidebar;
