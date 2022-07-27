import MobileNavigation from "./mobile-navigation";
import NavbarWithTypes from "./navbar/navbar-with-types";
import ShopNavbar from "./navbar/shop-navbar";

const ShopLayout: React.FC = ({ children }) => {

  return (

    <div className="flex flex-col transition-colors duration-150">
        <ShopNavbar />
        <div>{children}</div>
        <MobileNavigation />
    </div>
  );
};

export default ShopLayout;
