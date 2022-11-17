import Card from '@components/ui/card';
import React from 'react';
import Label from "@components/ui/label";
import Input from "@components/ui/input";
import { useForm } from 'react-hook-form';
import MobileNavigation from '@components/layout/mobile-navigation';
import CartCounterButton from '@components/cart/cart-counter-button';
import { useWindowSize } from 'react-use';
import GuranteedReturns from '@components/home-page-product-section/PolicyServices/components/guranteed-returns';
import DefaultLayout from '@components/layout/default-layout';


//formvalues 
type FormValues = {
    name: string;
    phone_number: string;
    email: string;
}


export default function GuaranteedPlans() {

    // react hook from 
    const { register, handleSubmit, formState: { errors }, getValues, control } = useForm<FormValues>({
        defaultValues: {
            name: '',
            phone_number: '',
            email: '',
        },
    });

    const { width } = useWindowSize();


    function onSubmit(data: FormValues) {
        console.log(data)
    }


  return (

    <div className='w-full lg:w-1/2 mx-auto h-screen mt-4 lg:mt-20 '>

        <Card className='w-full'>

            <div className='w-full'>

                <h1 className='text-2xl font-semibold text-center'>
                    Get a Quote
                </h1>
                
                <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-6'>
                    <div className='w-full'>
                        <Label className='text-gray-700 whitespace-nowrap font-semibold'>
                              Name

                        </Label> 
                     
                        <Input
                            {...register('name', {
                                required: 'Name is required',
                            })}
                            type='text'
                            placeholder='Enter your name'
                            error={errors.name?.message}
                            className='w-full'
                        />
                    </div>

                    <div className='w-full'>
                        <Label className='text-gray-700 whitespace-nowrap font-semibold'>
                                Phone Number
                                </Label>
                        <Input
                            {...register('phone_number', {
                                required: 'Phone Number is required',
                            })}
                            type='text'
                            placeholder='Enter your phone number'
                            error={errors.phone_number?.message}
                            className='w-full'
                        />
                    </div>

                    <div className='w-full'>
                        <Label className='text-gray-700 whitespace-nowrap font-semibold'>
                                Email 
                                </Label>
                        <Input
                            {...register('email', {
                                required: 'Email is required',
                            })}
                            type='text'
                            placeholder='Enter your email'
                            error={errors.email?.message}
                            className='w-full'
                        />
                    </div>

                    

                </form>

                 <button
                   onClick={handleSubmit(onSubmit)}
                    type='submit'
                    className='w-full mt-4 bg-blue-800 text-white p-3 rounded-md'
                >
                    Submit
                </button>


            </div>

        </Card>

        {
        width < 1023 && 
          <MobileNavigation />
      }
      {
        width > 1023 &&
        <CartCounterButton />
      }

    </div>
  )
}

GuaranteedPlans.Layout = DefaultLayout;

