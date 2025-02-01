import { ICourses } from '@/interfaces/ICourses.interface';
import React from 'react';

type Props = {
  courses: ICourses
  color: string
  setIsVisible?: (value: boolean) => void
  currentCourse?: ICourses | null
  isInModal?: boolean
}


function CourseCard({ courses, color, setIsVisible, currentCourse, isInModal }: Props) {
  const isSelected = currentCourse?.courseId === courses.courseId
  return (
    <div className={`flex flex-col min-h-[7.5rem] ${color ? color : 'bg-pink-100'} ${isInModal ? "w-56" : "cursor-pointer"} border rounded-xl relative p-4 gap-2 text-start items-start text-sm font-medium filter ${isSelected ? 'border-blue-800 drop-shadow-generalBlue' : 'border-black drop-shadow-general'}`} onClick={() => setIsVisible!(true)}>
      <p className="text-2xl font-bold capitalize">{courses.courseName}</p>
      <p className="text-xl capitalize">{courses.subjectName}</p>
      <p className="text-base capitalize">{courses.schoolName}</p>
    </div>

  );
}

export default CourseCard