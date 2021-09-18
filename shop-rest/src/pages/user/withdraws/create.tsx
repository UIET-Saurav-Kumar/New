import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CreateOrUpdateWithdrawForm from "@components/withdraw/withdraw-form";
import Navbar from '@components/layout/navbar/navbar';
import ProfileSidebar from "@components/profile/profile-sidebar";

export default function CreateWithdrawPage() {
  const { t } = useTranslation();
  return (
    <>
    <div className='invitation-status-page bg-gray-100 flex flex-col'>  
      <Navbar label='Referral Activity '/>
      <div className='flex mx-10 space-x-20'>
        <ProfileSidebar className="flex-shrink-0 hidden mt-14 xl:block xl:w-80 ml-8" />  
        <div className="w-full overflow-hidden">
          <div className="py-5 sm:py-8 flex border-b border-dashed border-gray-300">
            <h1 className="text-lg font-semibold text-heading">
              {("Create Withdraw")}
            </h1>
          </div>
          <CreateOrUpdateWithdrawForm />
        </div>
      </div>
    </div>
      
    </>
  );
}

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
