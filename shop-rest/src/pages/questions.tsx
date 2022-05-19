
import Card from '@components/ui/card';
import Seo from '@components/ui/seo';
import DashboardLayout from '@components/layout/_dashboard';
import MyQuestions from '@components/questions/my-questions';
import DashboardSidebar from '@components/profile/profile-sidebar';
import { defaultLoadScriptProps } from '@react-google-maps/api/dist/LoadScript';
import DefaultLayout from '@components/layout/default-layout';


export { getStaticProps } from '@utils/general.ssr';

const MyQuestionsPage = () => {
  return (
    <div className=''>
      {/* <Seo noindex={true} nofollow={true} /> */}
     {/* <div className='w-1/4'> <DashboardSidebar/> </div> */}
      <Card className="w-full shadow-none sm:shadow">
        <MyQuestions />
      </Card>
    </div>
  );
};

MyQuestionsPage.authenticationRequired = true;

MyQuestionsPage.layout = DefaultLayout;


export default MyQuestionsPage;
