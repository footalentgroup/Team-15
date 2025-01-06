import { getCourses } from '@/actions/getCourse.action';
import Home from '@/components/home';
import { ICourses } from '@/interfaces/ICourses.interface';
import { redirect } from 'next/navigation';

export default async function HomePage() {

  const response = await getCourses()
  const data: ICourses[] | null = Array.isArray(response.data) ? response.data : null
  console.log('data', data);

  if (!data) {
    redirect('/login')
  }

  return (
    <Home data={data} />
  );
}
