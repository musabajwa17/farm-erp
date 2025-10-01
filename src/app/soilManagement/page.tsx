import ContactUs from "@/components/contact/ContactUs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Partners from "@/components/Partners";
import GrowerPlatform from "@/components/soilManagement/GrowerPlatform";
import Benefit from "@/components/soilManagement/Benefit";
const soilManagement = () => {
  return <>
    <Header />
    <GrowerPlatform />
    <Benefit />
    <Partners />
    <ContactUs />
    <Footer />
  </>;
}
export default soilManagement;