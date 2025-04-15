import Header from "@/components/headercom/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/customerservicecom/ContactForm";
import MapLocation from "@/components/customerservicecom/MapLocation";

const page = () => {
  return (
    <>
      <Header />
      <ContactForm />
      <MapLocation/>      
      <Footer />
    </>
  )
}
export default page