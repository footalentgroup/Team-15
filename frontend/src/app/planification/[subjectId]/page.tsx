
import { getCourses } from "@/actions/getCourse.action";
import { getPlanification } from "@/actions/planificationActions";
import Planification from "@/components/planification";
import { IUser } from "@/interfaces/IAuth.interfaces";
import { ICourses } from "@/interfaces/ICourses.interface";
import { IPlanification } from "@/interfaces/IPlanification.interfaces";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function PlanificationPage({ params }: { params: Promise<{ subjectId: string }> }) {
  const { subjectId } = await params;
  const cookieStore = cookies()
  const user = (await cookieStore).get("user");
  const userData: IUser = user ? JSON.parse(user.value).user : null;

  let currentCourseData: ICourses | null = null;

  try {
    const responseCourses = await getCourses();
    const actualCourses: ICourses[] = responseCourses.data as ICourses[];
    const filteredCourses = actualCourses.find((course: ICourses) => course.subjectId === Number(subjectId));
    currentCourseData = filteredCourses ?? null;

  } catch (error) {
    console.error(error)
    redirect('/home')
  }

  if (!user) {
    redirect('/login')
  }

  let planificationData: IPlanification[] | null = null;


  try {
    planificationData = await getPlanification(Number(subjectId));

  } catch (error) {
    console.error(error)
    redirect('/home')
  }

  return (
    <div className="h-screen flex">
      <Planification data={planificationData ?? []} user={userData} currentCourse={currentCourseData ?? {} as ICourses} />
    </div>
  );
}