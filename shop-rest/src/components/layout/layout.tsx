import Navbar from "@components/layout/navbar/navbar";
import MobileNavigation from "./mobile-navigation";
import Footer from "@components/footer/Footer";


const Layout: React.FC = ({ children }) => (
  <div className="min-h-screen flex flex-col transition-colors duration-150 bg-gray-100">
    <Navbar />
    <div className="flex-grow">{children}</div>
    <Footer/>
    <MobileNavigation search={false} />
  </div>
);

export default Layout;
