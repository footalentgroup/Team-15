
import { getPlanification } from "@/actions/planificationActions";
import Planification from "@/components/planification";
import { IUser } from "@/interfaces/IAuth.interfaces";
import { IPlanification } from "@/interfaces/IPlanification.interfaces";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function PlanificationPage({ params }: { params: Promise<{ subjectId: string }> }) {
  const { subjectId } = await params;
  const cookieStore = cookies()
  const user = (await cookieStore).get("user");
  const userData: IUser = user ? JSON.parse(user.value).user : null;
  const currentCourse = (await cookieStore).get("currentCourse");
  const currentCourseData = currentCourse ? JSON.parse(currentCourse.value) : null

  if (!user) {
    redirect('/login')
  }

  let planificationData: IPlanification[] | null = null;


  try {
    planificationData = await getPlanification(Number(subjectId));

  } catch (error) {
    console.log('Error al obtener la planificacion', error);
    redirect('/home')
  }

  return (
    <div className="h-screen w-full flex flex-col gap-2 px-16 py-4">
      <Planification data={planificationData ?? []} user={userData} currentCourse={currentCourseData} />
    </div>
  );
}