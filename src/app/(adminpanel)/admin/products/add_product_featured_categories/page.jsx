export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";
import TokenHandler from "@/utils/tokenHandler";
import MainCategoryTable from "@/components/adminlayout/productscom/MainCategoryTable";

const page = async() => {
  const token = await TokenHandler();
  if(token !== "admin_account") {
    redirect('/admin');
    return null;
  }
  return (
    <>
      <MainCategoryTable />
    </>
  )
}
export default page