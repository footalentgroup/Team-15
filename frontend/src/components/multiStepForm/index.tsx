'use client'
import { Content, PeriodFromAction } from "@/interfaces/ICourses.interface";
import AddCourseForm from "./addCourse";
import AddPlanification from "./addPlanification";
import AddStudentForm from "./addStudents";
import AddToCalendar from "./addToCalendar";
import { useState } from 'react';
import { IPlanification } from "@/interfaces/IPlanification.interfaces";

interface Props {
  onlyPlanification?: boolean;
  subjectIdFromProps?: number;
  periodFromProps?: PeriodFromAction;
  onlyStudents?: number;
  courseIdFromParams?: number;
}

export default function MultiStepForm({ onlyPlanification, subjectIdFromProps, periodFromProps, onlyStudents, courseIdFromParams }: Props) {
  const [activeTab, setActiveTab] = useState(onlyStudents ? 1 : onlyPlanification ? 2 : 0);
  const [contentList, setContentList] = useState<Content[]>([])
  const [courseId, setCourseId] = useState<number | null>(null);
  const [planificationStep, setPlanificationStep] = useState<number>(1);
  const [subjectId, setSubjectId] = useState<number | null>(subjectIdFromProps ? subjectIdFromProps : null);
  const [period, setPeriod] = useState<PeriodFromAction | null>(periodFromProps ? periodFromProps : null);
  const [currentPlanification, setCurrentPlanification] = useState<IPlanification | null>(null);

  const formElements = [
    <AddCourseForm setCourseId={setCourseId} setSubjectId={setSubjectId} setActiveTab={setActiveTab} key={0} setPeriod={setPeriod} />,
    <AddStudentForm courseId={courseId ?? Number(courseIdFromParams)} setActiveTab={setActiveTab} key={1} onlyStudents={onlyStudents ? true : false} />,
    <AddPlanification setActiveTab={setActiveTab} contentList={contentList} setContentList={setContentList} key={2} planificationStep={planificationStep} setPlanificationStep={setPlanificationStep} subjectId={subjectId} setCurrentPlanification={setCurrentPlanification} />,
    <AddToCalendar contentList={contentList} key={3} planificationStep={planificationStep} period={period} currentPlanification={currentPlanification} />
  ];

  return (
    <div>
      {formElements[activeTab]}
    </div>
  );
};
