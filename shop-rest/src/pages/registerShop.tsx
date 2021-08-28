
import Header from '@components/shop-home-page/header';
import HeroHome from '@components/shop-home-page/hero-home';
import FeaturesBlocks from '@components/shop-home-page/features-blocks';
import Footer2 from '@components/shop-home-page/footer2';
import Features from '@components/shop-home-page/features';
// import '/css/styles.scss';

function registerShop() {

  return (
      
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page sections */}
        <HeroHome />
        <Features/>
        <FeaturesBlocks />
        {/* <Testimonials /> */}
        {/* <Newsletter /> */}

      </main>

      {/*  Site footer */}
      <Footer2 />

    </div>
  );
}

export default registerShop;