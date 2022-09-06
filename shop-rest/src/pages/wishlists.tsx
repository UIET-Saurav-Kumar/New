import Card from '@components/ui/card';
import Seo from '@components/ui/seo';
import WishlistProducts from '@components/product/wishlist-products';
import { useWindowSize } from '@utils/use-window-size';
import dynamic from 'next/dynamic';
import ProfileSidebar from '@components/layout/_dashboard';
import DashboardSidebar from '@components/profile/profile-sidebar';
import DefaultLayout from '@components/layout/default-layout';
import Layout from '@components/layout/layout';
import Head from 'next/head';

export { getStaticProps } from '@utils/general.ssr';
const CartCounterButton = dynamic(
  () => import('@components/cart/cart-counter-button'),
  { ssr: false }
);

const MyWishlistPage = () => {
  const { width } = useWindowSize();
  return (
    <>
    <Head>
    <link rel="canonical" href={`https://buylowcal.com/wishlists`}/>
    </Head>
    <div className='flex lg:p-10  lg:mt-10'>
      <Seo noindex={true} nofollow={true} />
     <div className='hidden lg:block w-1/3'><DashboardSidebar/></div> 
      <Card className="w-full shadow-none sm:shadow">
        <WishlistProducts />
      </Card>
      {width > 1023 && <CartCounterButton />}
    </div>
    </>
  );
};

MyWishlistPage.authenticationRequired = true;

// MyWishlistPage.getLayout = function getLayout(page: React.ReactElement) {
//   return <DashboardSidebar>{page}</DashboardSidebar>;
// };

export default MyWishlistPage;

MyWishlistPage.Layout = Layout;
