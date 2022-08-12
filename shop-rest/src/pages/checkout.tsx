import Address from "@components/address/address";
import Schedule from "@components/checkout/schedule";
import Layout from "@components/layout/layout";
import VerifyCheckout from "@components/checkout/verify-checkout";
import { useEffect, useState } from "react";
import { useUI } from "@contexts/ui.context";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useModalAction } from "@components/ui/modal/modal.context";
import BackButton from "@components/ui/back-button";
import { useCart } from "@contexts/quick-cart/cart.context";

export default function CheckoutPage() {
  const { data, refetch } = useCustomerQuery();
  const { isAuthorize } = useUI();
  const { openModal } = useModalAction();
  const { items, total, isEmpty } = useCart();
  const[schedule,setSchedule] = useState(true);


  useEffect(() => {
    scrollTo(0, 0);
    getShopCategory()
    if (!isAuthorize) {
      return openModal("LOGIN_VIEW");
    }
    if (isAuthorize) {
      refetch();
    }
  }, [isAuthorize,schedule]);

  const  getShopCategory = () => {

    var shopCategory = items[0]?.shop?.shop_categories?.replace(/[{":,0123456789}]/g,'').slice(5,-3)
    shopCategory === 'Groceries' ||  shopCategory === 'Cosmetics' ||  shopCategory === 'Takeaways'  ? setSchedule(false) : setSchedule(true);
    //  alert(shopCategory);
    return shopCategory;
  }

   

  

  // check if item shop category is groceries
  const isGroceries = () => {
    // var isGroceries = false;
    items.forEach(element=>{
      let shop_category = element?.shop?.shop_categories?.replace(/[{":,0123456789}]/g,'').slice(5,-3)
      console.log(shop_category);
      
      if(shop_category == "Cosmetics") {
        // isGroceries = true;
        setSchedule(false)
        console.log('schedule',schedule)
      }
    }
    )
    
  }

  // console.log('items',isGroceries());


  return (

    <div className="py-8 px-4 mt-6 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
      {/* <div className="sticky z-50 top-12 w-full bg-white  px-2 py-3"><BackButton/></div> */}
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
              heading="Shipping Address"
              addresses={data?.me?.address?.filter(
                (address: any) => address.type === "shipping"
              )}
              count={2}
              type="shipping"
            />
          </div> */}
          {schedule ?
          <div className="shadow-700 bg-light p-5 md:p-8">
               <Schedule count={2} />  
          </div>
          : null}

        </div>
        
        <div className="w-full lg:w-96 mb-10 sm:mb-12">
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
