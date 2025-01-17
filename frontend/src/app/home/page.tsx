import { getCourses } from '@/actions/getCourse.action';
import Home from '@/components/home';
import { ICourses } from '@/interfaces/ICourses.interface';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const cookieStore = cookies()
  const user = (await cookieStore).get("user");

  if (!user) {
    redirect('/login')
  }

  const response = await getCourses()
  const data: ICourses[] | null = Array.isArray(response.data) ? response.data : null
  console.log('data', data);

  if (!data) {
    redirect('/login')
  }

  if (data.length === 0) {
    redirect('/add-course')
  }

  return (
    <Home data={data} />
  );
}
