export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";
import TokenHandler from "@/utils/tokenHandler";
import CustomerManagement from "@/components/adminlayout/dashboard/CustomerManagement";

const page = async() => {
  const token = await TokenHandler();
  if(token !== "admin_account") {
    redirect('/admin');
    return null;
  }
  return (
    <>
      <CustomerManagement/>
    </>
  )
}
export default page