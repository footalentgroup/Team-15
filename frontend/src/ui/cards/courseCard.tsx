import { ICourses } from '@/interfaces/ICourses.interface';
import React from 'react';

type Props = {
  courses: ICourses
  color: string
  setIsVisible?: (value: boolean) => void
  currentCourse?: ICourses | null
}


function CourseCard({ courses, color, setIsVisible, currentCourse }: Props) {
  const isSelected = currentCourse?.courseId === courses.courseId
  return (
    <div className={`flex flex-col min-h-[120px] ${color ? color : 'bg-pink-100'} border rounded-xl relative p-4 gap-2 text-start items-start text-sm font-medium filter ${isSelected ? 'border-blue-800 drop-shadow-generalBlue' : 'border-black drop-shadow-general'} cursor-pointer`} onClick={() => setIsVisible!(true)}>
      <p className="text-2xl capitalize">{courses.courseName}</p>
      <p className="capitalize">{courses.subjectName}</p>
      <p className="capitalize">{courses.schoolName}</p>
    </div>

  );
}

export default CourseCard