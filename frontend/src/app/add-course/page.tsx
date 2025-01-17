import MultiStepForm from "@/components/multiStepForm";
import { ICourses, PeriodFromAction } from "@/interfaces/ICourses.interface";
import { cookies } from "next/headers";

/*   onlyPlanification?: boolean;
  subjectIdFromProps?: number;
  periodFromProps?: PeriodFromAction; */

export default async function AddCourse(props: {
  searchParams?: Promise<{
    page?: string;
    courseId?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page);
  const courseIdFromParams = Number(searchParams?.courseId);

  console.log('page', currentPage);

  const cookieStore = cookies()
  const currentCourse = (await cookieStore).get("currentCourse");

  const currentCourseData: ICourses = currentCourse ? JSON.parse(currentCourse.value) : null

  const period: PeriodFromAction = {
    duracion: currentCourseData && currentCourseData.periodName ? currentCourseData.periodName : "",
    periodos: currentCourseData && currentCourseData.periodName ? currentCourseData.periods ?? [] : []
  }
  const subjectId = currentCourseData && currentCourseData.subjectId ? currentCourseData.subjectId : 0

  return (
    <div className="h-screen flex flex-col">
      <MultiStepForm periodFromProps={period} subjectIdFromProps={subjectId} onlyPlanification={period && subjectId ? true : false} onlyStudents={currentPage} courseIdFromParams={courseIdFromParams} />
    </div>
  );
}
