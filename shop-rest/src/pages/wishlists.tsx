import Card from '@components/ui/card';
import Seo from '@components/ui/seo';
import WishlistProducts from '@components/product/wishlist-products';
import { useWindowSize } from '@utils/use-window-size';
import dynamic from 'next/dynamic';
import ProfileSidebar from '@components/layout/_dashboard';
import DashboardSidebar from '@components/profile/profile-sidebar';

export { getStaticProps } from '@utils/general.ssr';
const CartCounterButton = dynamic(
  () => import('@components/cart/cart-counter-button'),
  { ssr: false }
);
const MyWishlistPage = () => {
  const { width } = useWindowSize();
  return (
    <>
      <Seo noindex={true} nofollow={true} />
      <Card className="w-full shadow-none sm:shadow">
        <WishlistProducts />
      </Card>
      {width > 1023 && <CartCounterButton />}
    </>
  );
};

MyWishlistPage.authenticationRequired = true;

// MyWishlistPage.getLayout = function getLayout(page: React.ReactElement) {
//   return <DashboardSidebar>{page}</DashboardSidebar>;
// };

export default MyWishlistPage;
