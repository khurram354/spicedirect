export const dynamic = 'force-dynamic';
import CreateSubCategory from "@/components/adminlayout/subcategorycom/CreateSubCategory";
import { redirect } from "next/navigation";
import TokenHandler from "@/utils/tokenHandler";
import call_api from "@/helper/Api";

const page = async() => {
  const token = await TokenHandler();
  if(token !== "admin_account") {
    redirect('/admin');
    return null;
  }
  async function getAllCategories () {
    const resp = await call_api.getallcategories();
    return resp;
  }
  const allCategories = await getAllCategories();
  

  return (
    <>
    <CreateSubCategory categories = { allCategories.categories }/>
    </>
  )
}

export default page