import { getCourses } from '@/actions/getCourse.action';
import Home from '@/components/home';
import { ICourses } from '@/interfaces/ICourses.interface';

export default async function HomePage() {

  const response = await getCourses()
  const data: ICourses[] = Array.isArray(response.data) ? response.data : []
  console.log(data);

  if (!data) {
    return <div>loading...</div>
  }

  return (
    <Home data={data} />
  );
}
