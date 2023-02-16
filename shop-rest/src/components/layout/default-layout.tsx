// import NavbarWithSearch from '@components/layout/navbar/navbar-with-search';
// import HeaderTop from '@components/home-page-header/HeaderTop';
import HeaderMiddle from '@components/home-page-header/HeaderMiddle';
// import Footer from '@components/footer/Footer';
import { useEffect,useState } from 'react';
import dynamic from 'next/dynamic';
import MobileNavigation from './mobile-navigation';
import { useRouter } from 'next/router';
 

const Footer = dynamic(() => import('@components/footer/Footer'),
 { ssr: false });

const DefaultLayout: React.FC = ({ children }) => {

  const router = useRouter();

  function useScrollDirection() {
    
    const [scrollDirection, setScrollDirection] = useState(null);
 
    useEffect(() => {
      let lastScrollY = typeof window !== "undefined" ?  window.pageYOffset : '';
  
      const updateScrollDirection = () => {
        const scrollY = window.pageYOffset;
        const direction = scrollY > lastScrollY ? "down" : "up";
        if (direction !== scrollDirection && (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5)) {
          setScrollDirection(direction);
        }
        lastScrollY = scrollY > 0 ? scrollY : 0;
      };
      
      window.addEventListener("scroll", updateScrollDirection); // add event listener
      return () => {
        window.removeEventListener("scroll", updateScrollDirection); // clean up
      }
    }, [scrollDirection]);
  
    return scrollDirection;
  };
  
  const scrollDirection = useScrollDirection();

  return (
       
    <div className="relative flex flex-col  transition-colors duration-150">
        {/* <HeaderTop/>  */}
      <div className={` sticky ${ scrollDirection === "down" ? "-top-44" : "top-0"}   transition-all duration-500 sticky z-50 bg-white top-0`}> 
       <HeaderMiddle/> 
      </div>
      <div>{children}</div>
      { router?.pathname == '/salon-near-me' ? null : <MobileNavigation /> }
      { router?.pathname == '/salon-near-me' ? null : <Footer/> }
    </div>

  );
};

export default DefaultLayout;
