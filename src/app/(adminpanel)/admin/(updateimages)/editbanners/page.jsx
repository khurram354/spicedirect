export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";
import TokenHandler from "@/utils/tokenHandler";
import EditBannerTable from "@/components/adminlayout/editbannercom/EditBannerTable";
import call_api from "@/helper/Api";

const page = async() => {
  const token = await TokenHandler();
    if(token !== "admin_account") {
      redirect('/admin');
      return null;
    }
  async function getHomeBanners () {
      const response = await call_api.gethomebanners();
      return response; 
  }
  const banners = await getHomeBanners();  
  return (
    <>
    <EditBannerTable banners = {banners}/>
    </>
  )
}
export default page