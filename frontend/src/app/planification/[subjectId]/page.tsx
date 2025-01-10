
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

  if (!user) {
    redirect('/login')
  }

  const planificationData: IPlanification[] = await getPlanification(Number(subjectId));

  if (!planificationData) {
    redirect('/login')
  }

  return (
    <div className="h-screen w-full flex flex-col gap-2 px-16 py-4">
      <Planification data={planificationData} user={userData} />
    </div>
  );
}