import Button from "@components/ui/button";
import Input from "@components/ui/input";
import Label from "@components/ui/label";
import Radio from "@components/ui/radio/radio";
import { useCheckout } from "@contexts/checkout.context";
import { formatOrderedProduct } from "@utils/format-ordered-product";
import { maskPhoneNumber } from "@utils/mask-phone-number";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import ValidationError from "@components/ui/validation-error";
import { ROUTES } from "@utils/routes";
import { useCreateOrderMutation } from "@data/order/use-create-order.mutation";
import { useOrderStatusesQuery } from "@data/order/use-order-statuses.query";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useCart } from "@contexts/quick-cart/cart.context";
import { useLocation } from "@contexts/location/location.context";
import {
  calculatePaidTotal,
  calculateTotal,
} from "@contexts/quick-cart/cart.utils";
import { useCustomerQuery } from "@data/customer/use-customer.query";

import { Data } from "@react-google-maps/api";

import BackButton from "@components/ui/back-button";

interface FormValues {
  payment_gateway: "cod" | "cashfree" | "upi" | "wallet";
  contact: string;
  card: {
    number: string;
    expiry: string;
    cvc: string;
    email: string;
  };
}

const paymentSchema = Yup.object().shape({
  contact: Yup.string()
    .min(8, "error-min-contact")
    .required("error-contact-required"),
  payment_gateway: Yup.string().default("cashfree").oneOf(["cod", "cashfree", "upi", "wallet"]),
  // card: Yup.mixed().when("payment_gateway", {
  //   is: (value: string) => value === "cashfree",
  //   then: Yup.object().shape({
  //     number: Yup.string().required("error-card-required"),
  //     expiry: Yup.string().required("error-expiry-date"),
  //     cvc: Yup.string().required("error-cvc"),
  //     email: Yup.string().email().required(" Email required"),
  //   }),
  // }),
});

const PaymentForm = () => {

  const { t } = useTranslation("common");
  const router = useRouter();
  const { mutate: createOrder, isLoading: loading } = useCreateOrderMutation();
  const { data: orderStatusData } = useOrderStatusesQuery();
  const { data } = useCustomerQuery();
  const {getLocation} =useLocation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,

    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(paymentSchema),
    defaultValues: {
      payment_gateway: "cashfree",
      contact: data?.me?.phone_number,
    },
  });
  
  // console.log('phone number',data?.me?.phone_number)
  const {
    billing_address,
    shipping_address,
    delivery_time,
    checkoutData,
    coupon,
    discount,
  } = useCheckout();

  const notAvailableItems = checkoutData.unavailable_products
   
  const allItems = () => {
    let avItems = [];
    for(let i=0;i<notAvailableItems.length;i++){
      avItems = notAvailableItems[i].name
  }
  return avItems
}
  
  // console.log('notAvailableItems',notAvailableItems)
  // console.log('notAvailableItemsName',allItems())


  const { items, delivery_charges} = useCart();

 
  const available_items = items?.filter(
    (item: any) => 
    //check if item have status attribute
     !checkoutData?.unavailable_products.map((item: any) => item.name).includes(item.name) 
  );

  const draftProducts = items?.filter(
    (item: any) => 
    checkoutData?.unavailable_products.includes(item.id) 
  );

    // console.log('cart items',items)
    // console.log('available products', available_items)
    // console.log('draft products', draftProducts)


  const subtotal = calculateTotal(available_items).total;

  const total = calculatePaidTotal(
    {
      totalAmount: subtotal,
      tax: checkoutData?.total_tax!,
      shipping_charge: checkoutData?.shipping_charge!,
    },
    discount
  );

  
  function onSubmit(values: FormValues) {
    
    let input = {
      //@ts-ignore
      location:getLocation?.formattedAddress,
      products: available_items?.map((item) => formatOrderedProduct(item)),
      customer_contact: values.contact,
      status: orderStatusData?.order_statuses?.data[0]?.id ?? 1,
      amount: subtotal,
      coupon_id: coupon?.id,
      discount: discount ?? 0,
      paid_total: total,
      total,
      sales_tax: checkoutData?.total_tax,
      delivery_fee: delivery_charges,
     
      delivery_time: delivery_time?.title ,
      payment_gateway: values.payment_gateway,
      billing_address: {
        ...(billing_address?.address && billing_address.address),
      },
      shipping_address: {
        ...(shipping_address?.address && shipping_address.address),
      },
    };

    console.log('values',input,available_items?.map((item) => formatOrderedProduct(item)))
    
    // if (values.payment_gateway !== "cod") {
    //   // @ts-ignore
    //   input.card = {
    //     number: values?.card?.number,
    //     expiryMonth: values?.card?.expiry?.split("/")[0],
    //     expiryYear: values?.card?.expiry?.split("/")[1],
    //     cvv: values?.card?.cvc,
    //     email: values?.card?.email,
    //   };
    // }

    createOrder(input, {
      onSuccess: (order: any) => {
        if (order?.tracking_number) {
          router.push(`${ROUTES.ORDERS}/${order?.tracking_number}`);
        }
        if (order?.paymentLink)
        {
          window.location.replace(order?.paymentLink)
        }
      },
      onError: (error: any) => {
        // console.log(error?.response?.data?.message);
      },
    });
  }

  const isCashOnDelivery = watch("payment_gateway");

  return (
    <>
    <div className="sticky z-50 top-12 w-full bg-white  px-2 py-3"><BackButton/></div>
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col"
    >
      <Input
        {...register("contact", { required: "error-contact-required" })}
        label={t("Enter contact number")}
        variant="outline"
        className="flex-1"
        value={data?.me?.phone_number}
        onChange={(e) => setValue("contact", maskPhoneNumber(e.target.value))}
        error={t(errors?.contact?.message!)}
      />

      <div className="my-6">
        {/* <Label>{t("text-payment-gateway")}</Label> */}
        <Label>Payment gateway</Label>

        <div className="flex items-center space-s-4">

          <Radio
            id="cod"
            type="radio"
            {...register("payment_gateway")}
            value="cod"
            // label={t("text-cash-on-delivery")}
            label = 'COD'
            className=""
          />

          <Radio
            id="cashfree"
            type="radio"
            {...register("payment_gateway")}
            value="cashfree"
            label={t("Upi / Debit Card / Credit Card")} 
            className=""
          />

          {/* <Radio
            id="upi"
            type="radio"
            {...register("payment_gateway")}
            value="upi"
            label={t("text-upi")}
            className=""
          /> */}

          {/* <Radio
            id="wallet"
            type="radio"
            {...register("payment_gateway")}
            value="wallet"
            label={t("text-wallet")}
            className=""
          /> */}
          
        </div>
      </div>

{/*      
      {!subtotal ||  notAvailableItems.length > 0 && <ValidationError message={allItems()+' ' + 'is not available'}/>}
      {total < 0 && (
        <div className="mt-3">
          <ValidationError message={allItems()} />
        </div>
      )} */}
      <Button
        loading={loading}
        // disabled={!subtotal || total < 0 || notAvailableItems.length > 0}
        className="w-full mt-5 lg:w-auto lg:ms-auto"
      >
        {t("Place Order")}
      </Button>
    </form>
    </>
  );
};

export default PaymentForm;
