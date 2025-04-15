export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";
import TokenHandler from "@/utils/tokenHandler";
import AddNewSlider from "@/components/adminlayout/edithomeslidercom/AddNewSlider";

const page = async() => {
    const token = await TokenHandler();
    if(token !== "admin_account") {
      redirect('/admin');
      return null;
    }
  return (
    <>
    <AddNewSlider/>
    </>
  )
}

export default page