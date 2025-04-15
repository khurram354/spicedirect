export const dynamic = 'force-dynamic'
import AddCategoryTable from "@/components/adminlayout/categorycom/AddCategoryTable";
import { redirect } from "next/navigation";
import TokenHandler from "@/utils/tokenHandler";
const page = async() => {
  const token = await TokenHandler();
  if(token !== "admin_account") {
    redirect('/admin');
    return null;
  }
  return (
    <>
      <AddCategoryTable />
    </>
  )
}
export default page