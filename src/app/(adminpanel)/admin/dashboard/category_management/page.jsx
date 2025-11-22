export const dynamic = 'force-dynamic';
import CategoryManagement from "@/components/adminlayout/dashboard/CategoryManagement";
import { redirect } from "next/navigation";
import TokenHandler from "@/utils/tokenHandler";

const page = async() => {
    const token = await TokenHandler();
  if(token !== "admin_account") {
    redirect('/admin');
    return null;
  }
  return (
    <><CategoryManagement/></>
  )
}

export default page