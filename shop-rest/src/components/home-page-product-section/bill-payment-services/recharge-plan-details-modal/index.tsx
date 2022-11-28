import { useCreateRechargePaymentMutation } from '@data/mobile-recharge/use-create-recharge-payment.mutation'
import React from 'react'
import { useForm } from 'react-hook-form'

interface FormValues {
    payment_gateway: 'cod' | 'cashfree' | 'upi' | 'wallet'
    contact: string
    card: {
        number: string
        expiry: string
        cvc: string
        email: string
    }
}

    

export default function RechargePlanDetails(data,operatorName,circleName)  {

    // alert(operatorName)
    console.log('modal',data?.data)
    const { mutate: createRechargePayment, isLoading: loading } = useCreateRechargePaymentMutation();


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
          contact: data?.me?.phone_number,
          
        },
      });

      function onSubmit(values: FormValues){
        let input = {
            "amount": data?.data?.amount,
            "operator": operatorName,
            "circle": circleName,
            "number": data?.data?.number,
            "payment_gateway": values.payment_gateway,
            "customer_contact": values.contact,
            
        }

        createRechargePayment(input, {
            onSuccess: (data) => {
               if(data?.paymentLink)
               {
                window.location.replace(data?.paymentLink)

                }
        },
        onError: (error) => {
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
                    <p>
                       {data?.data?.phone}
                    </p>
 
                </span>
                <span className='flex items-center justify-between'>
                    <p className=''>
                        Operator/Circle
                    </p>
                    <p>
                       {data?.data?.operatorName} | {data?.data?.circleName}
                    </p>
                </span>
                <span className='flex items-center justify-between'>
                    <p className=''>
                        Plan
                    </p>
                    <p>
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
                    <p>
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

        <button onClick={handleSubmit(onSubmit)} className='bg-blue-500 px-6 rounded p-2 mx-auto text-white'>
                 Pay Now
        </button>

    </div>
  )
}
