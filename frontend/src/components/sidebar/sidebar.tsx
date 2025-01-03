'use client'
import { IconCalendar, IconFollowUp, IconHome, IconNotes, IconResources } from '@/icons';
import ButtonSideBar from '@/ui/buttons/buttonSidebar';
import { usePathname } from 'next/navigation';

interface Props {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}

function Sidebar({ isVisible, setIsVisible }: Props) {
  const pathname = usePathname()
  const SIDEBAR_LINK = [
    {
      name: 'Inicio',
      url: '/home',
      icon: <IconHome color={`${pathname === '/home' ? 'white' : ''}`} />
    },
    {
      name: 'Seguimiento',
      url: '#',
      icon: <IconFollowUp color={`${pathname === '/follow-up' ? 'white' : ''}`} />
    },
    {
      name: 'Planificación',
      url: '#',
      icon: <IconCalendar color={`${pathname === '/planification' ? 'white' : ''}`} />
    },
    {
      name: 'Mis Recursos',
      url: '#',
      icon: <IconResources color={`${pathname === '/resources' ? 'white' : ''}`} />
    },
    {
      name: 'Notas Rápidas',
      url: '#',
      icon: <IconNotes color={`${pathname === '/notes' ? 'white' : ''}`} />
    }
  ]

  return (
    <aside className={`fixed top-0 left-0 h-full w-full text-black  z-10 ${isVisible ? 'translate-x-0 bg-black/70' : '-translate-x-full'} transition-transform duration-300 ease-in-out`} onClick={() => setIsVisible(false)}>
      <div className='flex flex-col w-72 items-center p-9 gap-12 bg-yellow-light h-full border-r-2 border-r-black' onClick={(e) => e.stopPropagation()}>
        <div className="rounded-full w-20 h-20 border-2 border-black bg-white text-center content-center mt-6">Logo</div>
        {/* Esto tiene que ser dinamico */}
        <select className="w-full py-2 px-4 border-2 border-black rounded-md filter drop-shadow-[4px_4px_0px_#000000]">
          <option value="option1" className='font-bold'>San José Historia 4°A</option>
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
    </aside>
  );
}

export default Sidebar;
