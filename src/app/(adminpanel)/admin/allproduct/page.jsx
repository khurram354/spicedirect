export const dynamic = 'force-dynamic'
import ProductTable from "@/components/adminlayout/productscom/ProductTable";
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
      <ProductTable />
    </>
  )
}
export default page