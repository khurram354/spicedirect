export const dynamic = 'force-dynamic'
import ProductCard from "@/components/productcom/ProductCard";
import Header from "@/components/headercom/Header";
import { Suspense } from 'react';
import Footer from "@/components/Footer";
import call_api from "@/helper/Api";

const page = async() => {
  const fetchAllCategories = async () => {
    const resp = await call_api.getallmenucategories();
    return resp;
  };
  const allcategories = await fetchAllCategories();
  return (
    <>
    <Header/>
    <section className="flex sm:w-5/6 mx-auto mt-5 rounded-sm">
    <Suspense><ProductCard allcategories = {allcategories}/></Suspense>    
    </section>
    <Footer/>
    </>
  )
}
export default page