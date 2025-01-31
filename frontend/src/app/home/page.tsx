import { refreshToken } from '@/actions/authActions';
import { getCourses } from '@/actions/getCourse.action';
import Home from '@/components/home';
import { IUser } from '@/interfaces/IAuth.interfaces';
import { ICourses } from '@/interfaces/ICourses.interface';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const user = await refreshToken();
  const userData: IUser = user ?? null;

  if (!user) {
    redirect('/login')
  }

  const response = await getCourses()
  const data: ICourses[] | null = Array.isArray(response.data) ? response.data : null

  if (!data) {
    redirect('/login')
  }

  if (data.length === 0) {
    redirect('/add-course')
  }

  return (
    <Home data={data} user={userData} />
  );
}
