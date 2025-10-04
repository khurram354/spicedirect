export const dynamic = 'force-dynamic';
import Footer from "@/components/Footer";
import Header from "@/components/headercom/Header";
import FindUs from "@/components/Home/FindUs";
import Heading from "@/components/Home/Heading";
import HomeBanner from "@/components/Home/HomeBanner";
import HomeSlider from "@/components/Home/HomeSlider";
import OurSupplier from "@/components/Home/OurSupplier";
import ShopByCuisine from "@/components/Home/ShopByCuisine";
import WhoWeServe from "@/components/Home/WhoWeServe";
import call_api from "@/helper/Api";

async function page() {  
  async function getHomeBanners () {
    const response = await call_api.gethomebanners();
    return response;  
}
async function getAllCuisines () {
  const response = await call_api.getallcuisines();
  return response;  
}
async function getallsupplierimages () {
  const resp = await call_api.getallsupplierimages();
  if(resp.success){
      return resp.suppliers;
  }else{return []}     
}
const imagesFiles = await getallsupplierimages();
const banners = await getHomeBanners();
const cuisines = await getAllCuisines();
  return (
    <>
    <Header/>
    <HomeSlider/>
    <FindUs/>
    <Heading heading={'Who We Serve'}/>
    <WhoWeServe/>
    <HomeBanner homeBanners = {banners}/>
    <ShopByCuisine cuisines = {cuisines}/>
     <Heading heading={'Product Partners'}/>
    <OurSupplier suppliers={imagesFiles}/>
    <Footer/>    
    </>    
  )
}

export default page