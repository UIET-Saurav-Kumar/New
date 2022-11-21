import React from 'react'
import  Link from 'next/link'
import { ROUTES } from "@utils/routes";
import { useWindowSize } from 'react-use';
import MobileNavigation from '@components/layout/mobile-navigation';
import CartCounterButton from '@components/cart/cart-counter-button';
import DefaultLayout from '@components/layout/default-layout';
import { useForm } from 'react-hook-form';
import Card from '@components/common/card';
import Label from "@components/ui/label";
import Input from "@components/ui/input";
 
// form values

type FormValues = {
  name_of_owner  : string;
  vehicle_number : string;
  date_of_expiry : string;
  insured_amount : string;
};


// export async function getServerSideProps(context:any) {
//   console.log('context',context.query) 
//   return {
//       props: { 
//          label: context.query  
//       }
//   }
// }



export default function BikeInsurance( props:any) {

  console.log('context',props);

  const { width } = useWindowSize();

  React.useEffect(() => {
    window.scrollTo(0, 0)
    }, [])


  const {
      register,
      handleSubmit,
      formState: { errors },
      getValues,
      control,
    } = useForm<FormValues>({
      defaultValues: {
        name_of_owner: '',
        vehicle_number: '',
        date_of_expiry: '',
        insured_amount: '',
      },
    });

    function onSubmit(data: FormValues) {
      console.log(data)
    }

    var pattern = /[A-Za-z][A-Za-z]\/[0-9][0-9]\/[A-Za-z ][a-z]\/[0-9][0-9][0-9][0-9]$/;

    return (

    <div className='w-full lg:w-1/2 mx-auto h-screen mt-4 lg:mt-20'>
      
      <Card className="w-full">
          <div className=''> 
              {/* <Image
              priority={true}   
              src={props?.src}
              layout='intrinsic'
              objectFit='contain'
              width={props?.width}
              height={props?.height}
            /> */}    
              <h1 className='font-semibold text-gray-700 '> 
                Bike Insurance
              </h1>
          </div>

        <form className='space-y-8'
         onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* <div className='flex flex-col space-y-4'> */}
          <div className='flex flex-col space-y-2'>
            <Label  
            className='text-sm font-semibold text-gray-600'>
              Name of Owner
            </Label>
            <Input
              id='name_of_owner'
              type='text'
              // className='  rounded-md   focus:outline-none focus:border-gray-500'
              {...register('name_of_owner', {
                required: 'Name of Owner is required',
              })}
            />
            {errors?.name_of_owner && (
              <span className='text-sm text-red-600'>
                {errors?.name_of_owner.message}
              </span>
            )}
          </div>

          <div className='flex flex-col space-y-2'>
            <Label  
            className='text-sm font-semibold text-gray-600'>
              Vehicle Number
            </Label>
            <Input
              id='vehicle_number'
              type='text'
              // className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-gray-500'
              {...register('vehicle_number', {
                required: 'Vehicle Number is required',
                // check if input value matches the pattern
                pattern: {
                  value: pattern,
                  message: 'Invalid Vehicle Number',
                },

              })}
            />
            {errors?.vehicle_number && (
              <span className='text-sm text-red-600'>{errors?.vehicle_number.message}</span>
            )}
          </div>

          <div className='flex flex-col space-y-2'>
            <Label  className='text-sm font-semibold text-gray-600'>
              Date of Expiry
            </Label>
            <Input
              id='date_of_expiry'
              type='text'
              // className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-gray-500'
              {...register('date_of_expiry', {
                required: 'Date of Expiry is required',
              })}
            />
            {errors?.date_of_expiry && (
              <span className='text-sm text-red-600'>{errors?.date_of_expiry.message}</span>
            )}
          </div>

          <div className='flex flex-col space-y-2'>
            <Label className='text-sm font-semibold text-gray-600'>
              Insured Amount
            </Label>
            <Input
              id='insured_amount'
              type='text'
             // className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-gray-500'
              {...register('insured_amount', {
                required: 'Insured Amount is required',
              })}
            />
            {errors?.insured_amount && (
              <span className='text-sm text-red-600'>
                {errors?.insured_amount.message}
              </span>
            )}
          </div>

          <div className='flex flex-col space-y-2'>
            <button
              type='submit'
              className='bg-blue-600 text-white rounded-md px-4 py-2 font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-100'
            >
              Submit
            </button>
          </div>

        </form>
        </Card>


      {
        width < 1023 && 
          <MobileNavigation />
      }
      {
        width > 1023 &&
        <CartCounterButton/>
      }

    </div>

 
  )
}

BikeInsurance.Layout = DefaultLayout;

