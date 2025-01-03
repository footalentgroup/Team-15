'use client'
import { Content } from "@/interfaces/ICourses.interface";
import AddCourseForm from "./addCourse";
import AddPlanification from "./addPlanification";
import AddStudentForm from "./addStudents";
import AddToCalendar from "./addToCalendar";
import { useState } from 'react';

export default function MultiStepForm() {
  const [activeTab, setActiveTab] = useState(2);
  const [contentList, setContentList] = useState<Content[]>([])
  const [courseId, setCourseId] = useState<number | null>(null);
  const [planificationStep, setPlanificationStep] = useState<number>(1);

  const formElements = [
    <AddCourseForm setCourseId={setCourseId} setActiveTab={setActiveTab} key={0} />,
    <AddStudentForm courseId={courseId} setActiveTab={setActiveTab} key={1} />,
    <AddPlanification setActiveTab={setActiveTab} contentList={contentList} setContentList={setContentList} key={2} planificationStep={planificationStep} setPlanificationStep={setPlanificationStep} />,
    <AddToCalendar contentList={contentList} key={3} planificationStep={planificationStep} />
  ];

  return (
    <div>
      {formElements[activeTab]}
    </div>
  );
};
