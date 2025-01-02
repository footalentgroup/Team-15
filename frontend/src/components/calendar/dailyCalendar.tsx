import React from 'react';

interface Props {
  date: Date;
  //events: ICourses[];
}

const events = [
  {
    start: new Date(2025, 0, 2, 8, 0, 0),
    end: new Date(2025, 0, 2, 12, 0, 0),
    title: 'Revolución Rusa',
    themes: ['1905', 'Fábrica Kirov'],
    course: {
      schoolName: 'Colegio San Agustin',
      subjectName: 'Historia',
      courseName: '1ro A',
    }
  },
  {
    start: new Date(2025, 0, 2, 12, 12, 30, 0),
    end: new Date(2025, 0, 2, 12, 16, 30, 0),
    title: 'Revolución industrial',
    themes: ['Inicios', 'Contexto'],
    course: {
      schoolName: 'Colegio San Agustin',
      subjectName: 'Historia',
      courseName: '1ro A',
    }
  },
  {
    start: new Date(2025, 0, 2, 12, 12, 30, 0),
    end: new Date(2025, 0, 2, 12, 16, 30, 0),
    title: 'Revolución industrial',
    themes: ['Inicios', 'Contexto'],
    course: {
      schoolName: 'Colegio San Agustin',
      subjectName: 'Historia',
      courseName: '1ro A',
    }
  },
  {
    start: new Date(2025, 0, 2, 12, 12, 30, 0),
    end: new Date(2025, 0, 2, 12, 16, 30, 0),
    title: 'Revolución industrial',
    themes: ['Inicios', 'Contexto'],
    course: {
      schoolName: 'Colegio San Agustin',
      subjectName: 'Historia',
      courseName: '1ro A',
    }
  },
  {
    start: new Date(2025, 0, 2, 12, 12, 30, 0),
    end: new Date(2025, 0, 2, 12, 16, 30, 0),
    title: 'Revolución industrial',
    themes: ['Inicios', 'Contexto'],
    course: {
      schoolName: 'Colegio San Agustin',
      subjectName: 'Historia',
      courseName: '1ro A',
    }
  },
];

function DailyCalendar({ date }: Props) {
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const dayName = days[date.getDay()];
  const dayNumber = date.getDate();
  const fullDate = `${dayName} ${dayNumber}`;
  return (
    <div className='mx-16 w-[90%] h-full max-h-[474px] rounded-xl filter drop-shadow-[4px_4px_0px_#000000]'>
      <div className='bg-yellow-light text-center border-2 border-b-0 border-black content-center h-16 w-full text-lg font-semibold rounded-t-xl'>
        <h2>{fullDate}</h2>
      </div>
      <div className='bg-white h-[410px] border-2 border-black rounded-b-xl flex flex-wrap gap-6 px-28 py-10'>
        {events.map((event, i) => (
          <div key={i} className='flex flex-col bg-yellow-100 border border-black rounded-xl max-h-36 max-w-[230px] items-center justify-center p-2'>
            <h3 className='text-lg font-semibold'>{event.title}</h3>
            <div className='flex flex-wrap gap-1 justify-center text-sm mb-2'>
              <p >{event.course.schoolName}</p>
              <p >{event.course.subjectName}</p>
              <p >{event.course.courseName}</p>
            </div>
            <ul className='flex flex-wrap gap-2 list-disc'>
              {event.themes.map((theme, i) => (
                <li key={i} className='text-sm list-item ms-4'>{theme}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DailyCalendar;