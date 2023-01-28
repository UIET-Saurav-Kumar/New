import React from 'react';
import Input from "@components/ui/input";
import { useUpiPaymentMutation } from '@data/upi/use-upi-payment.mutation';
import { useForm } from 'react-hook-form';
import { useCustomerQuery } from '@data/customer/use-customer.query';

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

export default function UpiForm() {

    const { mutate: createOrder, isLoading: loading } = useUpiPaymentMutation();
    const { data } = useCustomerQuery();


    const {
        register,
        handleSubmit,
        setValue,
        watch,
    
        formState: { errors },
      } = useForm ({
        // resolver: yupResolver(paymentSchema),
        defaultValues: {
          payment_gateway: "cashfree",
          contact: data?.me?.phone_number,
        },
      });

       
  function onSubmit(values: FormValues) {
    
    let input = {
      //@ts-ignore
       customer_contact: values.contact,
       amount: subtotal,
       paid_total: total,
       total,
       payment_gateway: values.payment_gateway,
      
    };

    createOrder(input, {
        onSuccess: (order: any) => {
          console.log('order link',order);
          if (order?.tracking_number) {
            router.push(`${ROUTES.ORDERS}/${order?.tracking_number}`);
          }
          if (order )
          console.log(order?.data?.payload)
          {
            openModal('UPI_APPS', {
              data : Object.values(order?.data?.payload)
            });
          }
        },
        onError: (error: any) => {
          // console.log(error?.response?.data?.message);
        },
      });
    }
  


  return (


    <div className='w-full h-full'>

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



        </form>
        
    </div>

  )
}
