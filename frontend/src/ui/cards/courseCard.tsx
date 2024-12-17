import { ICourses } from '@/interfaces/ICourses.interface';
import React from 'react';

type Props = {
  courses: ICourses
  color: string
}


function CourseCard({ courses, color }: Props) {
  return (
    <div className="flex flex-col min-h-[156px] bg-[#e0e0e0] rounded-xl relative p-4 gap-2 drop-shadow-md text-start items-center text-sm font-medium">
      <p className={`w-48 h-9 px-4 py-2 rounded-xl bg-[#cdedf3] ${color}`}>{courses.schoolName}</p>
      <p className={`w-48 h-9 px-4 py-2 rounded-xl bg-[#f8f9ad] ${color}`}>{courses.subjectName}</p>
      <p className={`w-48 h-9 px-4 py-2 rounded-xl bg-[#fdc9f9] ${color}`}>{courses.courseName}</p>
    </div>

  );
}

export default CourseCard