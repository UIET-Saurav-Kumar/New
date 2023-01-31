// import MobileNavigation from "./mobile-navigation";
import dynamic from "next/dynamic";
import router, { useRouter } from "next/router";
import NavbarWithTypes from "./navbar/navbar-with-types";
import ShopNavbar from "./navbar/shop-navbar";
import ShopVisitorNavbar from "./navbar/shop-visitor-navbar";

const MobileNavigation = dynamic(() => import('./mobile-navigation'), { ssr: false });

const ShopLayout: React.FC = ({ children }) => {

  const {query,pathname} = useRouter();

  return (

    <div className="flex flex-col transition-colors duration-150">
        {query.utm_source == 'shop_qr' ? <ShopVisitorNavbar/> :  <ShopNavbar />}
        <div>{children}</div>
       {pathname == '/salon-near-me' ? null : <MobileNavigation /> }
    </div>
  );
};

export default ShopLayout;
