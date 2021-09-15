import Buylowcal from "@components/landing-page/buylowcal-home";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";


export const getServerSideProps: GetServerSideProps = async (context: any) => {
    return {
      props: {
        ...(await serverSideTranslations(context.locale, ["common"])),
      },
    };
  };

export default function buylowcal() {
    return (

        <>

            <Buylowcal/>
            
        </>
    )
}
