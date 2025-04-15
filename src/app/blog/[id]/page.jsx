import Blog from "@/components/blogcom/Blog"
import Footer from "@/components/Footer"
import Header from "@/components/headercom/Header"
import call_api from "@/helper/Api";
import { notFound } from "next/navigation";

export default async function page ({params}) {
  const id = (await params).id;
  const resp = await call_api.getsingleblog(id); 
  if(!resp){notFound()};
  return (
    <>
    <Header/>
    <Blog blog = { resp }/>
    <Footer/>
    </>
  )
}
