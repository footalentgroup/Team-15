import NoContent from "@/components/planification/noContent";
import { IUser } from "@/interfaces/IAuth.interfaces";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

export default async function PlanificationPage() {
  const cookieStore = cookies()
  const user = (await cookieStore).get("user");
  const userData: IUser = user ? JSON.parse(user.value).user : null;

  if (!user) {
    redirect('/login')
  }

  return (
    <NoContent user={userData} />
  );
}