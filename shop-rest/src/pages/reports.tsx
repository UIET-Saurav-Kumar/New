import Card from '@components/ui/card';
import Seo from '@components/ui/seo';
import DashboardLayout from '@components/layout/_dashboard';
import MyReports from '@components/reports/report-view';
import Head from 'next/head';

export { getStaticProps } from '@utils/general.ssr';

const MyReportsPage = () => {
  return (
    <>
    <Head>
    <link rel="canonical" href={`https://buylowcal.com/reports`}/>
    </Head>
      <Seo noindex={true} nofollow={true} />
      <Card className="w-full self-stretch shadow-none sm:shadow">
        <MyReports />
      </Card>
    </>
  );
};

MyReportsPage.authenticationRequired = true;

MyReportsPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default MyReportsPage;
