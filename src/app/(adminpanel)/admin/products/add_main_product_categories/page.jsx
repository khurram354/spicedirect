export const dynamic = 'force-dynamic'
import { redirect } from "next/navigation";
import TokenHandler from "@/utils/tokenHandler";
import FeaturedCategoryTable from "@/components/adminlayout/productscom/ProductTable";
const page = async() => {
  const token = await TokenHandler();
  if(token !== "admin_account") {
    redirect('/admin');
    return null;
  }
  return (
    <>
      <FeaturedCategoryTable />
    </>
  )
}
export default page