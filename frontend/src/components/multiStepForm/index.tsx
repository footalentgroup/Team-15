'use client'
import AddCourseForm from "./addCourse";
import AddPlanification from "./addPlanification";
import AddStudentForm from "./addStudents";
import { useState } from 'react';

export default function MultiStepForm() {
  const [activeTab, setActiveTab] = useState(0);

  const formElements = [
    <AddCourseForm setActiveTab={setActiveTab} />,
    <AddStudentForm setActiveTab={setActiveTab} />,
    <AddPlanification />
  ];

  return (
    <div>
      {formElements[activeTab]}
    </div>
  );
};
