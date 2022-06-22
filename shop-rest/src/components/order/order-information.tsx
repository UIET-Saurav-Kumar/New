import CheckoutCartItem from "@components/checkout/checkout-cart-item";
import Coupon from "@components/checkout/coupon";
import { useCheckout } from "@contexts/checkout.context";
import usePrice from "@utils/use-price";
import EmptyCartIcon from "@components/icons/empty-cart";
import { CloseIcon } from "@components/icons/close-icon";
import { useTranslation } from "next-i18next";

import { useCart } from "@contexts/quick-cart/cart.context";
import {
  calculatePaidTotal,
  calculateTotal,
} from "@contexts/quick-cart/cart.utils";
interface Props {
  className?: string;
}

const OrderInformation = (props: Props) => {

  const { t } = useTranslation("common");


  const { items, isEmpty } = useCart();

  const { checkoutData, discount, removeCoupon, coupon } = useCheckout();

  const available_items = items?.filter(
    (item: any) => 
    //check if item have status attribute
     !checkoutData?.unavailable_products.map((item: any) => item.name).includes(item.name) 
  );

  const available_items_total = available_items?.reduce(
    (acc: number, item: any) => acc + item.itemTotal,
    0
  );

  const { price: tax } = usePrice(
    checkoutData && {
      amount: checkoutData.total_tax ?? 0,
    }
  );

  const { price:delivery_charges } = usePrice({
    amount: items.map((item: any) => item?.shop?.delivery_charge).reduce((acc: number, item: any) => acc + item, 0),
   
  });

  console.log('delivery charges',delivery_charges)

  const { price: shipping } = usePrice(
    checkoutData && {
      amount: checkoutData.shipping_charge ?? 0,
    }
  );

  const base_amount =  available_items?.reduce(
    (acc: number, item: any) => acc + item.itemTotal,
    0);
    const total_amount = calculateTotal(available_items).total;
  const { price: sub_total } = usePrice(
    checkoutData && {
      amount: base_amount ,
    }
  );

  const total_tax = '';

 

  const { price: discountPrice } = usePrice(
    discount && {
      amount: coupon.type === 'percentage' ? (discount * 100) : discount,
    }
  );
  
  const { price: total } = usePrice(
    checkoutData && {
      amount: calculatePaidTotal(
        {
          totalAmount: total_amount,
          tax: 
          // total_amount - base_amount
          checkoutData?.total_tax
          ,
          shipping_charge: checkoutData?.shipping_charge,
        },
        Number(discount)
      ),
    }
  );

  console.log('subtotal', sub_total);
  console.log('total', total);
  console.log('subtotal split ', sub_total.split('.')[0].replace('₹',' ').split(',').join('') );
  console.log('coupon code',coupon?.type);
  console.log('discount price',discountPrice);
  console.log('checkout data',checkoutData);

  return (
    <div className={props.className + ' ' + ' shadow-2xl'}>
      {/* <div className="flex flex-col border-b pb-2 border-border-200">
        {!isEmpty ? (
          items?.map((item: any) => {
            const notAvailable = checkoutData?.unavailable_products?.find(
              (d: any) => d === item.id
            );
            return (
              <CheckoutCartItem
                item={item}
                key={item.id}
                notAvailable={!!notAvailable}
              />
            );
          })
        ) : (
          <EmptyCartIcon />
        )}
      </div> */}

      <div className="-mt-2  bg-white p-5">
        <div className="flex justify-between mb-3">
          <p className="text-sm font-semibold">{t("text-sub-total")}</p>
          <span className="text-sm font-bold">{sub_total}</span>
        </div>
        <div className="flex justify-between mb-3">
          <p className="text-sm text-body">{t("text-tax")}</p>
          <span className="text-sm text-body">{tax}</span>
        </div>
        <div className="flex justify-between mb-3">
          <p className="text-sm text-body">{t("text-shipping")}</p>
          <span className="text-sm text-body">₹{total_amount - base_amount + '.00'}</span>
        </div>
        {discount ? (

          <>

          <div className="flex justify-between  mb-4">

            <p className="text-sm text-body me-4">{t("text-discount")}</p>

            <span className="text-xs font-semibold text-red-500 flex items-center me-auto">
              ({coupon.code })
              <button onClick={removeCoupon}>
                <CloseIcon className="w-3 h-3 ms-2" />
              </button>
            </span>

            <span className="text-sm font-semibold text-green-600">{coupon.type === 'percentage' ?
              (discountPrice.replace('₹','').split('.')[0] + ''+ '%' + ' '+ 'OFF' ) 
              : discountPrice.split('.')[0] + '' + ' '+ 'OFF'
              }
             </span>

          </div>
          <div className=" flex justify-between items-center ">
            <p className="text-blue-500 font-bold mb-2 text-sm  me-4">Yay, you saved </p>
          <span className="text-sm text-gray-800 font-bold">₹{sub_total.split('.')[0].replace('₹',' ').split(',').join('') - total.split('.')[0].replace('₹',' ').split(',').join('') + ''+ '.00' }</span></div>
          </>
        ) : (
          <div className="flex justify-between mt-5 mb-4">
            <Coupon />
          </div>
        )}
        <div className="flex justify-between border-t-4 border-double border-border-200 pt-4">
          <p className="text-base font-semibold text-heading">
            {t("text-total")}
          </p>
          <span className="text-gray-800 font-semibold ">{total}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderInformation;
