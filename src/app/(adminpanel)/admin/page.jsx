export const dynamic = 'force-dynamic';
import Login from '@/components/users/Login';
import TokenHandler from '@/utils/tokenHandler';
import { redirect } from 'next/navigation';

async function page () {
  const token = await TokenHandler();
  if(token === "admin_account") {
      redirect('/admin/dashboard/order_management');
    }
 
  return (
    <>
    <Login/>
    </>
  )
}

export default page