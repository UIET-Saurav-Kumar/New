import Card from "@components/common/card";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import WithdrawList from "@components/withdraw/withdraw-list";
import LinkButton from "@components/ui/link-button";
import { useWithdrawsQuery } from "@data/withdraw/use-withdraws.query";
import {  useState } from "react";
import { SortOrder } from "@ts-types/generated";
import ProfileSidebar from "@components/profile/profile-sidebar";
import SortForm from "@components/common/sort-form";
import Navbar from '@components/layout/navbar/navbar';
import {useWalletCommissionQuery} from '@data/user/use-wallet-commission-query'
import usePrice from "@utils/use-price";

export default function WithdrawsPage() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("created_at");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);


  const {
    data,
    isLoading: loading,
    error,
  } = useWithdrawsQuery(
    {
      limit: 10,
      page,
      orderBy,
      sortedBy,
    },
  );

  const { data:walletData,
    isLoading } = useWalletCommissionQuery({
    limit: 10 as number,
    search:"",
});

const { price: currentBalance } = usePrice(
  walletData && {
      amount: walletData?.balance?.current_balance!,
  }
);

  if (loading) return <Loader text={("Loading...")} />;
  if (error) return <ErrorMessage message={error.message} />;

  function handlePagination(current: any) {
    setPage(current);
  }

  return (
    <>
    <div className='invitation-status-page bg-gray-50 lg:bg-gray-100 flex flex-col'>  
    
      <Navbar label=''/>

      <div className='flex mx-0 lg:mx-10 space-x-8 lg:space-x-20 '>
       <ProfileSidebar className="flex-shrink-0 hidden mt-14 xl:block xl:w-80  ml-8" />  
        <div className="w-full overflow-hidden">
          <div className="flex flex-col  justify-evenly p-4 w-full mx-auto  mt-14">
            <Card className="flex flex-col md:flex-row items-center justify-between mb-8">
              <div className="md:w-1/4 mb-4 md:mb-0">
                <h1 className="text-lg font-semibold text-heading">
                  {("Withdraws")}
                </h1>
              </div>

              <div className="grid grid-cols-1 space-y-4 sm:flex sm:items-center md:flex 
                              md:items-center place-items-center w-full ms-auto">
                <SortForm
                  showLabel={false}
                  className="w-full"
                  onSortChange={({ value }: { value: SortOrder }) => {
                  setColumn(value);
                  }}
                  onOrderChange={({ value }: { value: string }) => {
                    setOrder(value);
                  }}
                  options={[
                    { value: "amount", label: "Amount" },
                    { value: "created_at", label: "Created At" },
                    { value: "updated_at", label: "Updated At" },
                  ]}
                />

                <LinkButton
                  href={`/user/withdraws/create`}
                  className="h-12 ms-4 md:ms-6"
                >
                  <span className="hidden md:block">
                    + {("Request Withdraw")}
                  </span>
                  <span className="md:hidden">+ {("Add")}</span>
                </LinkButton>
              </div>

            </Card>

            <Card>
              
              <div className=" flex items-center font-md">
                <p className="text-gray-700">Wallet Amount :</p>
                <p className=" ml-6 text-gray-600">{currentBalance}</p>
              </div>
            </Card>

            <WithdrawList
              withdraws={data?.withdraws}
              onPagination={handlePagination}
            />

          </div>
        </div>
      </div>
    </div>
      
    </>
  );
}


export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["table", "common", "form"])),
  },
});
