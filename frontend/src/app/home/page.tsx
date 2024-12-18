import { WeeklyCalendar } from '@/components';
import { Slider } from '@/components/slider/slider';
import { ICourses } from '@/interfaces/ICourses.interface';

const DUMMY_COURSES: ICourses[] = [
  {
    schoolName: 'Colegio San Agustin',
    subjectName: 'Historia',
    courseName: 'Curso 1ro A',
  },
  {
    schoolName: 'Colegio San Agustin',
    subjectName: 'Historia',
    courseName: 'Curso 2do B',
  },
  {
    schoolName: 'Colegio Santa Cecilia',
    subjectName: 'Ciudadania',
    courseName: 'Curso 3ro A',
  },
  {
    schoolName: 'Colegio Santa Cecilia',
    subjectName: 'Ciudadania',
    courseName: 'Curso 2do A',
  },
];

export default function Home() {
  return (
    <div className='p-8 flex flex-col gap-4 h-full'>
      <div className='bg-[#f5f5f5] p-4 rounded-xl'>
        <h2 className='text-[32px] font-semibold mb-4'>Tus Cursos</h2>
        <Slider list={DUMMY_COURSES} />
      </div>
      <div className='bg-[#f5f5f5] p-4 rounded-xl h-full overflow-hidden'>
        <h2 className='text-[32px] font-semibold mb-4'>Calendario General</h2>
        <WeeklyCalendar />
      </div>
    </div>
  );
}
