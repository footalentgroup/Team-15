import { verifyEmailAction } from '@/actions/authActions';
import VerifyEmail from '@/components/auth/verifyEmail';
import { cookies } from 'next/headers';

async function Page({ params }: {
  params: Promise<{
    token: string
  }>
}) {
  const { token } = await params;
  const cookieStore = await cookies();
  const user = (await cookieStore).get("tempUser");
  const password = user ? JSON.parse(user.value).password : '';
  const email = user ? JSON.parse(user.value).email : '';
  console.log('user', user);
  console.log('pass', password);

  const message = await verifyEmailAction(token);
  console.log('message', message);


  return (
    <VerifyEmail mail={email} password={password} />
  );
}


export default Page;