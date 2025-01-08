'use client'
import { IconCalendar, IconFollowUp, IconHome, } from '@/icons';
import { ICourses } from '@/interfaces/ICourses.interface';
import { CourseCard } from '@/ui';
import ButtonSideBar from '@/ui/buttons/buttonSidebar';
import { usePathname } from 'next/navigation';

interface Props {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  data: ICourses[];
  currentCourse: ICourses | null;
}

function Sidebar({ isVisible, setIsVisible, data, currentCourse }: Props) {
  const pathname = usePathname()
  const SIDEBAR_LINK = [
    {
      name: 'Inicio',
      url: '/home',
      icon: <IconHome color={`${pathname === '/home' ? 'white' : ''}`} />
    },
    {
      name: 'Seguimiento',
      url: '/students',
      icon: <IconFollowUp color={`${pathname === '/follow-up' ? 'white' : ''}`} />
    },
    {
      name: 'Planificación',
      url: '/planification',
      icon: <IconCalendar color={`${pathname === '/planification' ? 'white' : ''}`} />
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

  const index = data.findIndex((course) => course.courseName === currentCourse?.courseName)
  console.log(index);
  const leftPosition =
    index === 0 || index === 1 ? 'left-[22.5rem]' :
      index === 2 ? 'left-[38.5rem]' :
        index === 3 ? 'left-[54.5rem]' :
          'left-[70.5rem]'

  return (
    <aside className={`fixed top-0 left-0 h-full w-full text-black  z-10 ${isVisible ? 'translate-x-0 bg-black/70' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
      <div className='flex flex-col w-72 items-center p-9 gap-12 bg-yellow-light h-full border-r-2 border-r-black' onClick={(e) => e.stopPropagation()}>
        <div className="rounded-full w-20 h-20 border-2 border-black bg-white text-center content-center mt-6">Logo</div>
        {/* Esto tiene que ser dinamico */}
        <select className="w-full py-2 px-4 border-2 border-black rounded-md filter drop-shadow-[4px_4px_0px_#000000] capitalize">
          {data.map((course) => (
            <option key={course.courseName} value={course.courseName} className='text-xs capitalize font-bold p-0!'>{`${course.schoolName} ${course.subjectName} ${course.courseName}`}</option>
          ))}
        </select>
        <nav className="mt-4 w-full">
          <ul className="flex flex-col items-center w-full gap-6">
            {SIDEBAR_LINK.map((link) => (
              <ButtonSideBar
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

export default Sidebar;
