import ContactUs from "@/components/contact/ContactUs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Partners from "@/components/Partners";
import GrowerPlatform from "@/components/soilManagement/GrowerPlatform";
import Benefit from "@/components/soilManagement/Benefit";
import FAQComponent from "@/components/soilManagement/FAQComponent";
import AgriERPFeatures from "@/components/soilManagement/ErpFeatures";
import CropPlanning from "@/components/cropSowing/CropPlanning";
import Planning from "../../components/cropSowing/Planning";
import HeaderContext from "@/components/contact/HeaderContext";
const cropSowing = () => {
  return (
    <>
      <HeaderContext />
      <Header />
      <CropPlanning />
      <Planning />
      {/* <GrowerPlatform /> */}
      <Partners />
    {/*   <AgriERPFeatures />
      <Benefit />
      <FAQComponent /> */}
      <ContactUs />
      <Footer />
    </>
  );
};
export default cropSowing;
