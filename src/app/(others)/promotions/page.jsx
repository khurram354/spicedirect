export const dynamic = "force-dynamic";
import Header from "@/components/headercom/Header";
import Footer from "@/components/Footer";


const page = () => {
  return (
    <>
    <Header/>
    <div style={{ width: "100%", height: "100vh" }}>
      <embed
        src="data/spiceDirectPromotions.pdf"
        type="application/pdf"
        width="100%"
        height="100%"
      />
    </div>
    <Footer/>
    </>
  )
}

export default page