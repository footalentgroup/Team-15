import { ICourses } from '@/interfaces/ICourses.interface';
import React from 'react';

type Props = {
  courses: ICourses
  color: string
  setIsVisible?: (value: boolean) => void
  currentCourse?: string
}


function CourseCard({ courses, color, setIsVisible, currentCourse }: Props) {
  return (
    <div className={`flex flex-col min-h-[120px] ${color ? color : 'bg-pink-100'} border border-black rounded-xl relative p-4 gap-2 text-start items-start text-sm font-medium filter drop-shadow-[4px_4px_0px_#000000] ${currentCourse === courses.subjectName ? "z-20" : ""}`} onClick={() => setIsVisible!(true)}>
      <p className="text-2xl capitalize">{courses.courseName}</p>
      <p className="capitalize">{courses.subjectName}</p>
      <p className="capitalize">{courses.schoolName}</p>
    </div>

  );
}

export default CourseCard