export const dynamic = "force-dynamic";
import Header from "@/components/headercom/Header";
import Footer from "@/components/Footer";
import Terms from "@/components/terms&conditionscom/Terms";
import call_api from "@/helper/Api";

const page = async() => {
  async function getalltermsandconditions () {
    const resp = await call_api.getallterms();
    if(resp.success){return resp.termsconditions}else{return []}
  }
  const allterms = await getalltermsandconditions();
  return (
    <>
    <Header/>
    <section className="mx-auto md:w-4/6 rounded-sm sm:w-11/12">
    <Terms allterms = {allterms}/>        
    </section>
    <Footer/>
    </>
  )
}
export default page