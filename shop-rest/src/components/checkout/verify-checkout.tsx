
import Button from "@components/ui/button";
import { useCheckout } from "@contexts/checkout.context";
import usePrice from "@utils/use-price";
import CheckoutCartItem from "@components/checkout/checkout-cart-item";
import { useRouter } from "next/router";
import { formatOrderedProduct } from "@utils/format-ordered-product";
import EmptyCartIcon from "@components/icons/empty-cart";
import { loggedIn } from "@utils/is-loggedin";
import { useState } from "react";
import ValidationError from "@components/ui/validation-error";
import { useVerifyCheckoutMutation } from "@data/order/use-checkout-verify.mutation";
import { useTranslation } from "next-i18next";
import { useCart } from "@contexts/quick-cart/cart.context";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useWindowSize } from "@utils/use-window-size";
import dynamic from "next/dynamic";

const CartCounterButton = dynamic(
  () => import("@components/cart/cart-counter-button"),
  { ssr: false }
);


const VerifyCheckout = () => {

  const { t } = useTranslation("common");
  const { width } = useWindowSize();
  const router = useRouter();
  const [errorMessage, setError] = useState("");
  const { billing_address, setCheckoutData } = useCheckout();
  const { items, total, isEmpty } = useCart();
  const { openModal } = useModalAction();

  const { price: subtotal } = usePrice(
    items && {
      amount: total,
    }
  );

  console.log('item',items)

  const { mutate: verifyCheckout, isLoading: loading } =
        useVerifyCheckoutMutation();
  
  async function handleVerifyCheckout() {

    if (loggedIn()) {

      if ( billing_address ) {
        
        verifyCheckout(
          {
            amount: total,
            products: items?.map((item) => formatOrderedProduct(item)),

            billing_address: {
              ...(billing_address?.address && billing_address.address),
            },
            
            // shipping_address: {
            //   ...(shipping_address?.address && shipping_address.address),
            // },
          },

          {

            onSuccess: (data) => {
              setCheckoutData(data);
              router.push("/order");
            },
            onError: (error) => {
              console.log(error, "error");
            },

          }
        );
      } else {
        setError("error-add-both-address");
      }

    } else {
      openModal("LOGIN_VIEW");
    }
  }

  return (

    <div className="w-full relative">
      <div style={{top: '102px'}} className="flex flex-col space-y-2 mt-4  p-2 sticky border border-blue-100  bg-blue-50">

        <div className="flex items-center justify-between space-s-4 mb-4">
          <span className="text-base font-bold text-heading">
            {t("text-your-order")}
          </span>
          <span className="text-md text-gray-800">{items.length + ' ' + 'items'} </span>
        </div>

        <div className=" ">
            <div className="flex  items-center justify-between">
              <p className="text-lg font-semibold text-gray-900 ">{t("text-total")}</p>
              <span className="text-md font-semibold text-magenta">{subtotal}</span>
            </div>
            <div className="flex justify-between">
              {/* <p className="text-sm text-body">{t("text-tax")}</p> */}
              {/* <span className="text-sm text-body">
                {t("text-calculated-checkout")}
              </span> */}
            </div>
        </div>
      </div>

      <div className="flex flex-col py-3 border-b border-border-200">
        {isEmpty ? (
          <div className="h-full flex flex-col items-center justify-center mb-4">
            <EmptyCartIcon width={140} height={176} />
            <h4 className="mt-6 text-base font-semibold">
              {t("text-no-products")}
            </h4>
          </div>
          
        ) : (
            items?.map((item) =>(
              <>
                <CheckoutCartItem item={item} key={item.id} />
              </>
            ) 
          )
        )}

      </div>
      {/* <div className="space-y-2 mt-4">
        <div className="flex justify-between">
          <p className="text-sm text-body">{t("text-sub-total")}</p>
          <span className="text-sm text-body">{subtotal}</span>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-body">{t("text-tax")}</p>
          <span className="text-sm text-body">
            {t("text-calculated-checkout")}
          </span>
        </div>
       
      </div> */}

      <Button
        loading={loading}
        className="w-full mt-5 sticky bottom-14  md:bottom-2"
        onClick={handleVerifyCheckout}
        disabled={isEmpty}
      >
        {  subtotal + '  |' + '  '+  'Proceed to Checkout'}
      </Button>

      {errorMessage && (
        <div className="mt-3">
          <ValidationError message={errorMessage} />
        </div>
      )}
       {width > 1023 && <CartCounterButton />}
    </div>
  );
};

export default VerifyCheckout;
