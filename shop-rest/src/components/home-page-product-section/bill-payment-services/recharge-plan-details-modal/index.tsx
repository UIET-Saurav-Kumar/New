import { useCustomerQuery } from '@data/customer/use-customer.query'
import { useCreateRechargePaymentMutation } from '@data/mobile-recharge/use-create-recharge-payment.mutation'
import React from 'react'
import Loader from "@components/ui/loader/loader";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from 'react-hook-form'
import { string } from 'yup/lib/locale'
import { useModalAction } from "@components/ui/modal/modal.context";
import { useUI } from "@contexts/ui.context";

interface FormValues {
    payment_gateway: 'cod' | 'cashfree' | 'upi' | 'wallet'
    customer_contact: string,
    amount: string,
    operator: string,
    circle: string,
}
    

export default function RechargePlanDetails(data: { data: { amount: any; number: any; phone: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; operatorName: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined; circleName: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined; plan: { plan_name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; validity: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; description: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; price: {} | null | undefined } }; me: { phone_number: any } },operatorName: any,circleName: any,close:any)  {

    // alert(operatorName)
    const { isAuthorize } = useUI();
    console.log('payment values',data?.data?.plan?.price);
    const {data:me}=useCustomerQuery();
    console.log('payment values',me);
    const { mutate: createRechargePayment, isLoading: loading } = useCreateRechargePaymentMutation();
    const { closeModal, openModal } = useModalAction();


    const {
        register,
        handleSubmit,
        setValue,
        watch,
    
        formState: { errors },
      } = useForm<FormValues>({
        // resolver: yupResolver(paymentSchema),
        defaultValues: {
          payment_gateway: "cashfree",
          customer_contact: me?.me?.phone_number,
          amount:'',
          operator:'',
          circle:'',
        },
      });

      function onSubmit(values: FormValues){
        
        if (!isAuthorize) {
            return openModal("LOGIN_VIEW");
        }

        console.log('payment values',values)

        let input = {
            "amount": data?.data?.plan?.price,
            "operator": data?.data?.operatorName,
            "circle": data?.data?.circleName,
            //"number": data?.data?.number,
            "payment_gateway": values.payment_gateway,
            "customer_contact": values.customer_contact,
            
        }

        createRechargePayment(input, {
            
            onSuccess: (data) => {
                if(data?.paymentLink)
                {
                    window.location.replace(data?.paymentLink)
                }
                closeModal()
            },

            onError: (error) => {
                toast.error("unable to process the request please try again");

                closeModal()

                console.log(error)
            }
        })
      }

  return (

    <div className='flex space-y-6 flex-col  rounded-md  w-80 p-5  h-full bg-white'>

        <div className=' space-y-8 flex flex-col w-full'>
            <span className='text-gray-800 font-semibold text-lg'>
               Confirm Recharge
            </span>

            <div className='space-y-4 text-xs font-light flex flex-col text-gray-600'>
                <span className='flex items-center justify-between'>
                    <p className=''>
                        Mobile Number
                    </p>
                     
                    <p {...register('customer_contact')} >
                       {data?.data?.phone}
                    </p>
 
                </span>
                
                <span className='flex items-center justify-between'>
                    <p className=''>
                        Operator/Circle
                    </p>
                    <p {...register('operator')} {...register('circle')}>
                       {data?.data?.operatorName} | {data?.data?.circleName}
                    </p>
                </span>
                <span className='flex items-center justify-between'>
                    <p className=''>
                        Plan
                    </p>
                    <p >
                         {data?.data?.plan?.plan_name}
                    </p>
                </span>
                <span className='flex items-center justify-between'>
                    <p className=''>
                        Validity
                    </p>
                    <p>
                       {data?.data?.plan?.validity}
                    </p>
                </span>
                <span className='flex flex-col font-light'>
                    <p className=''>
                        Plan description
                    </p>
                    <p>
                       {data?.data?.plan?.description}
                    </p>
                </span>
                <span className='flex items-center justify-between font-light  '>
                    <p className=''>
                        Amount
                    </p>
                    <p {...register('amount')}>
                    ₹{data?.data?.plan?.price}
                    </p>
                </span>
            </div>

        </div>

        <div className='w-full p-4 font-sans text-gray-800 rounded flex items-center justify-between bg-gray-200'>
                <span className=' '>
                    Total Amount
                </span>
                <span className=''>
                 ₹{data?.data?.plan?.price}
                </span>
        </div>

        {/* <div className=''>
             Pay Now
        </div> */}

        <button onClick={handleSubmit(onSubmit)} 
        style={{height:'45px'}}
        className='bg-blue-500 px-6 rounded p-2 mx-auto text-white'>
            {loading?
            ("Processing please wait..."):
            'Pay Now'}
        </button>
        <ToastContainer autoClose={2000} />
    </div>
  )
}
