import Address from "@components/address/address";
import Schedule from "@components/checkout/schedule";
import Layout from "@components/layout/layout";
import VerifyCheckout from "@components/checkout/verify-checkout";
import { useEffect } from "react";
import { useUI } from "@contexts/ui.context";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useModalAction } from "@components/ui/modal/modal.context";
import BackButton from "@components/ui/back-button";

export default function CheckoutPage() {
  const { data, refetch } = useCustomerQuery();
  const { isAuthorize } = useUI();
  const { openModal } = useModalAction();

  useEffect(() => {
    if (!isAuthorize) {
      return openModal("LOGIN_VIEW");
    }
    if (isAuthorize) {
      refetch();
    }
  }, [isAuthorize]);

  return (

    <div className="py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
      <div className="sticky z-50 top-12 w-full bg-white  px-2 py-3"><BackButton/></div>
      <div className="flex flex-col lg:flex-row items-center lg:items-start m-auto lg:space-s-8 w-full max-w-5xl">
        <div className="lg:max-w-2xl w-full space-y-6">
          <div className="shadow-700 bg-light p-5 md:p-8">
            
            <Address
              id={data?.me?.id!}
              heading="Billing Address / Shipping-address"
              addresses={data?.me?.address?.filter(
                (address: any) => address.type === "billing"
              )}
              // count={1}
              type="billing"
            />

          </div>
          {/* <div className="shadow-700 bg-light p-5 md:p-8">
            <Address
              id={data?.me?.id!}
              heading="text-shipping-address"
              addresses={data?.me?.address?.filter(
                (address: any) => address.type === "shipping"
              )}
              count={2}
              type="shipping"
            />
          </div> */}
          <div className="shadow-700 bg-light p-5 md:p-8">
            <Schedule count={2} />
          </div>

        </div>
        
        <div className="w-full lg:w-96 mb-10 sm:mb-12 lg:mb-0 mt-10">
          <VerifyCheckout />
        </div>
      </div>
    </div>
  );
}
CheckoutPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
