// import NavbarWithSearch from '@components/layout/navbar/navbar-with-search';
// import HeaderTop from '@components/home-page-header/HeaderTop';
import HeaderMiddle from '@components/home-page-header/HeaderMiddle';
import Footer from '@components/footer/Footer';

// import Footer from '@components/footer/Footer';

const DefaultLayout: React.FC = ({ children }) => {
  

  return (
       
    <div className="flex flex-col transition-colors duration-150">
        {/* <HeaderTop/>  */}
        <HeaderMiddle/> 
            <div>{children}</div>
            <Footer/>
    </div>
  );
};

export default DefaultLayout;
