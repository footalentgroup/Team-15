import { refreshToken } from "@/actions/authActions";
import NoContent from "@/components/planification/noContent";
import { IUser } from "@/interfaces/IAuth.interfaces";
import { redirect } from 'next/navigation';

export default async function PlanificationPage() {
  const user = await refreshToken();
  const userData: IUser = user ?? null;

  if (!user) {
    redirect('/login')
  }

  return (
    <NoContent user={userData} />
  );
}