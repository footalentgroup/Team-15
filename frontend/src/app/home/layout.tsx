import Link from 'next/link';
import '../globals.css';

const SIDEBAR_LINK = [
  {
    name: 'Home',
    link: '/home',
    icon: '1'
  },
  {
    name: 'Seguimiento',
    link: '#',
    icon: '2'
  },
  {
    name: 'Planificación',
    link: '#',
    icon: '3'
  },
  {
    name: 'Mis Recursos',
    link: '#',
    icon: '4'
  },
  {
    name: 'Notas Rápidas',
    link: '#',
    icon: '5'
  }
]

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="flex h-screen">
      <aside className="fixed top-0 left-0 h-full w-64 text-black flex flex-col items-center p-9 gap-12 border-r-2 border-r-gray-400">
        <div className="rounded-full w-20 h-20 border-2 border-black bg-white text-center content-center mt-6">Logo</div>
        <select className="min-w-20 py-2 px-4 rounded border-2 border-black">
          <option value="option1">inti</option>
        </select>
        <nav className="mt-4 w-full">
          <ul className="flex flex-col items-center w-full gap-6">
            {SIDEBAR_LINK.map((link) => (
              <li key={link.name} className="flex w-full h-12 bg-gray-200 rounded-md border-2 border-black font-semibold gap-2 px-4 py-2 items-center">
                {/* Reemplazar por iconos */}
                <span>{link.icon}</span>
                <Link className="w-full" href={link.link}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="ms-64 overflow-y-auto h-full w-full bg-gray-200">
        {children}
      </main>
    </div>
  );
}