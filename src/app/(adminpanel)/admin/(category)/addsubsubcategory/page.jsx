export const dynamic = 'force-dynamic';
import CreateSubSubCategory from "@/components/adminlayout/subcategorycom/CreateSubSubCategory";
import { redirect } from "next/navigation";
import TokenHandler from "@/utils/tokenHandler";
import call_api from "@/helper/Api";

const page = async() => {
  const token = await TokenHandler();
  if(token !== "admin_account") {
    redirect('/admin');
    return null;
  }
  async function getAllSubcategories () {
    const resp = call_api.getallsubcategories();
    return resp;
  }
  const allsubcategories = await getAllSubcategories(); 
  return (
    <>
    <CreateSubSubCategory allsubcategories = {allsubcategories.subcategories}/>
    </>
  )
}

export default page