export const dynamic = "force-dynamic";
import {redirect} from 'next/navigation';
import TokenHandler from '@/utils/tokenHandler';
import OrderManagement from '@/components/adminlayout/dashboard/OrderManagement';
const page = async() => {
  const token = await TokenHandler();
  if(token !== "admin_account") {
    redirect('/admin');
    return null;
  }
  
  return (
    <div><OrderManagement/></div>
  )
}
export default page