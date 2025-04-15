export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";
import TokenHandler from "@/utils/tokenHandler";
import AddNewSupplier from "@/components/adminlayout/editsuppliercom/AddNewSupplier";

const page = async() => {
    const token = await TokenHandler();
    if(token !== "admin_account") {
      redirect('/admin');
      return null;
    }
  return (
    <>
    <AddNewSupplier/>
    </>
  )
}

export default page