'use client'
import { IconArrowBackCurved, IconCalendar, IconFlag, IconFollowUp, IconForward, IconHome, } from '@/icons';
import { ICourses } from '@/interfaces/ICourses.interface';
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

function Sidebar({ isVisible, setIsVisible, currentCourse, isExpanded, setIsExpanded, isHome }: Props) {
  const pathname = usePathname()
  console.log("current course have plani", currentCourse?.havePlanification);
  console.log("current course", currentCourse);
  const SIDEBAR_LINK = [
    {
      name: 'Inicio',
      url: '/home',
      icon: <IconHome color={`${pathname.includes('home') && !pathname.includes('homework') ? 'white' : ''}`} />
    },
    {
      name: 'Seguimiento',
      url: '/students',
      icon: <IconFollowUp color={`${pathname.includes('students') ? 'white' : ''}`} />
    },
    {
      name: 'Planificación',
      url: currentCourse?.havePlanification ? '/planification/' + currentCourse?.subjectId : '/planification',
      icon: <IconCalendar color={`${pathname.includes('planification') ? 'white' : ''}`} />
    },
  ]

  if (isExpanded || isVisible) {
    return (
      <aside className={` text-black  z-10 ${isVisible || isExpanded ? 'translate-x-0 bg-black/70' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className='flex flex-col w-72 items-center p-9 gap-12 bg-yellow-200 h-full' onClick={(e) => e.stopPropagation()}>
          <Image src="/PalProfeLogo.svg" alt="Logo" className='mt-6' width={150} height={97} />
          <div>
            <div className='relative'>
              <IconFlag />
              <div className='absolute top-1.5 left-6 flex flex-col capitalize font-semibold'>
                <span>{currentCourse?.courseName.slice(0, 2)} {currentCourse?.subjectName}</span>
                <span>{currentCourse?.schoolName}</span>
              </div>
            </div>
          </div>
          <div className='absolute top-4 right-4 flex items-center justify-center cursor-pointer' onClick={() => isExpanded ? setIsExpanded!(false) : setIsVisible(false)}>
            <IconArrowBackCurved />
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
        {/* {currentCourse && (
          <div className={`absolute top-[9.5rem] ${leftPosition} w-[15%]`}>
            <CourseCard courses={currentCourse} color={currentCourse.color!} setIsVisible={setIsVisible} />
            <span onClick={() => setIsVisible(false)} className='text-red-500 text-2xl absolute top-4 right-4 font-bold'>X</span>
          </div>
        )} */}
      </aside>
    );
  }
  if (!isHome) {
    return (
      <>
        <aside className={`h-screen text-black z-10 transition-transform duration-300 ease-in-out`}>
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
