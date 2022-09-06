
import Card from '@components/ui/card';
import Seo from '@components/ui/seo';
import DashboardSidebar from '@components/profile/profile-sidebar';
import MyQuestions from '@components/questions/my-questions';
import dynamic from 'next/dynamic';
import Layout from '@components/layout/layout';
import { useWindowSize } from '@utils/use-window-size';
import Head from 'next/head';


export { getStaticProps } from '@utils/general.ssr';
const CartCounterButton = dynamic(
  () => import('@components/cart/cart-counter-button'),
  { ssr: false }
);

const MyQuestionsPage = () => {
  const { width } = useWindowSize();

  return (
    <>
    <Head>
    <link rel="canonical" href={`https://buylowcal.com/questions`}/>
    </Head>
    <div className='flex lg:p-10  lg:mt-10'>
      <Seo noindex={true} nofollow={true} />
      <div className='hidden lg:block w-1/3'><DashboardSidebar/></div> 
      <Card className="w-full h-screen lg:h-auto shadow-none sm:shadow">
        <MyQuestions />
      </Card>
      {width > 1023 && <CartCounterButton />}
    </div>
    </>
  );
};

MyQuestionsPage.authenticationRequired = true;

// MyQuestionsPage.layout = DefaultLayout;


export default MyQuestionsPage;

MyQuestionsPage.Layout = Layout;
