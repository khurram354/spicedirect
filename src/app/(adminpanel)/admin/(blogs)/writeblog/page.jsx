export const dynamic = 'force-dynamic'
import BlogTemplete from "@/components/adminlayout/createblog/BlogTemplete";
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
      <BlogTemplete />
    </>
  )
}
export default page