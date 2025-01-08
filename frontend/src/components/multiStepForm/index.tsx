'use client'
import { Content, PeriodFromAction } from "@/interfaces/ICourses.interface";
import AddCourseForm from "./addCourse";
import AddPlanification from "./addPlanification";
import AddStudentForm from "./addStudents";
import AddToCalendar from "./addToCalendar";
import { useState } from 'react';

export default function MultiStepForm() {
  const [activeTab, setActiveTab] = useState(0);
  const [contentList, setContentList] = useState<Content[]>([])
  const [courseId, setCourseId] = useState<number | null>(null);
  const [planificationStep, setPlanificationStep] = useState<number>(1);
  const [subjectId, setSubjectId] = useState<number | null>(null);
  const [period, setPeriod] = useState<PeriodFromAction | null>(null);

  const formElements = [
    <AddCourseForm setCourseId={setCourseId} setSubjectId={setSubjectId} setActiveTab={setActiveTab} key={0} setPeriod={setPeriod} />,
    <AddStudentForm courseId={courseId} setActiveTab={setActiveTab} key={1} />,
    <AddPlanification setActiveTab={setActiveTab} contentList={contentList} setContentList={setContentList} key={2} planificationStep={planificationStep} setPlanificationStep={setPlanificationStep} subjectId={subjectId} />,
    <AddToCalendar contentList={contentList} key={3} planificationStep={planificationStep} period={period} />
  ];

  return (
    <div>
      {formElements[activeTab]}
    </div>
  );
};
