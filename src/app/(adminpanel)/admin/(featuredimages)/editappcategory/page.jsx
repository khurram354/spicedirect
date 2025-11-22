export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";
import TokenHandler from "@/utils/tokenHandler";
import EditCategoryInApp from "@/components/adminlayout/featuredimages/EditCategoryInApp";
import call_api from "@/helper/Api";

const page = async() => {
  const token = await TokenHandler();
    if(token !== "admin_account") {
      redirect('/admin');
      return null;
    }
  
  async function getallcategories () {
    const response = await call_api.getallcategories();
    return response
  }
  const allcategories = await getallcategories();

  return (
    <>
    <EditCategoryInApp allcategories = {allcategories.categories}/>
    </>
  )
}
export default page