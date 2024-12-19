'use client'
import AddCourseForm from "./addCourse";
import AddPlanification from "./addPlanification";
import AddStudentForm from "./addStudents";
import AddToCalendar from "./addToCalendar";
import { useState } from 'react';

export default function MultiStepForm() {
  const [activeTab, setActiveTab] = useState(0);
  const [contentList, setContentList] = useState<string[]>([])
  const [courseId, setCourseId] = useState<number | null>(null);

  const formElements = [
    <AddCourseForm setCourseId={setCourseId} setActiveTab={setActiveTab} key={0} />,
    <AddStudentForm courseId={courseId} setActiveTab={setActiveTab} key={1} />,
    <AddPlanification setActiveTab={setActiveTab} contentList={contentList} setContentList={setContentList} key={2} />,
    <AddToCalendar contentList={contentList} key={3} />
  ];

  return (
    <div>
      {formElements[activeTab]}
    </div>
  );
};
