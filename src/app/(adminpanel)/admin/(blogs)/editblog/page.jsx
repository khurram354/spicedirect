export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";
import TokenHandler from "@/utils/tokenHandler";
import BlogList from "@/components/blogcom/BlogList";
import call_api from "@/helper/Api";

async function page(){
  const token = await TokenHandler();
  if(token !== "admin_account") {
    redirect('/admin');
    return null;
  }
    async function getAllBlogList() {
        const result = await call_api.getallhomeblog();
        return result;     
    }
    const blogList = await getAllBlogList()
  return (
    <>
    <BlogList blogList={blogList}/>
    </>
  )
}

export default page