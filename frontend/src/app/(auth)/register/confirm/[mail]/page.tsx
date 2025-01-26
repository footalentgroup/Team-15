import ConfirmMail from '@/components/auth/confirmMail';
import { cookies } from 'next/headers';

async function Page({ params }: {
  params: Promise<{
    mail: string
  }>
}) {
  const { mail } = await params;
  const cookieStore = await cookies();
  const user = (await cookieStore).get("tempUser");
  const password = user ? JSON.parse(user.value).password : '';

  return (
    <>
      <ConfirmMail mail={mail} password={password} />
    </>
  );
}

export default Page;