import Label from '@components/ui/label'
import React from 'react'
import { useForm } from 'react-hook-form'
import Input from "@components/ui/input";
import MobileNavigation from '@components/layout/mobile-navigation';
import CartCounterButton from '@components/cart/cart-counter-button';
import { useWindowSize } from 'react-use';
import Card from '@components/ui/card';
import DefaultLayout from '@components/layout/default-layout';


type FormValues = {
    name: string
    email: string
    phone_number: string
    date_of_birth: string
}

export default function InvestmentPlans() {
    const { width } = useWindowSize();


    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        control,
      } = useForm<FormValues>({
         defaultValues: {
            name: '',
            email: '',
            phone_number: '',
            date_of_birth: '',

    
        },
    
      }
        )

        function onSubmit(data: FormValues) {
            console.log(data)
        }






  return (

    <div className='w-1/2 mx-auto h-  mt-20 '>

    <Card className="w-full">

    <h1 className='font-semibold text-gray-700 '> 
            Investment Plans</h1>

        <form className='grid grid-cols-2 gap-8'
         onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col'>
            <Label className='text-gray-700 font-semibold '>
                Name
            </Label>
            <Input
                {...register('name', {
                required: 'Name is required',
                })}
                type='text'
                placeholder='Enter your name'
                className='mt-1'
            />
            {errors.name && (
                <p className='text-red-500 text-xs italic'>{errors.name.message}</p>
            )}

            </div>
            <div className='flex flex-col'>
            <Label className='text-gray-700 font-semibold '>
                Email
            </Label>
            <Input
                {...register('email', {
                required: 'Email is required',
                })}
                type='email'
                placeholder='Enter your email'
                className='mt-1'
            />
            {errors.email && (
                <p className='text-red-500 text-xs italic'>{errors.email.message}</p>
            )}
            </div>

            <div className='flex flex-col'>
            <Label className='text-gray-700 font-semibold '>
                Phone Number
            </Label>
            <Input

                {...register('phone_number', {
                required: 'Phone Number is required',
                })}
                type='text'
                placeholder='Enter your phone number'
                className='mt-1'
            />
            {errors.phone_number && (
                <p className='text-red-500 text-xs italic'>{errors.phone_number.message}</p>
            )}
            </div>

            <div className='flex flex-col'>
            <Label className='text-gray-700 font-semibold '>
                Date of Birth
            </Label>
            <Input

                {...register('date_of_birth', {
                required: 'Date of Birth is required',
                })}
                type='text'
                placeholder='Enter your date of birth'
                className='mt-1'
            />
            {errors.date_of_birth && (
                <p className='text-red-500 text-xs italic'>{errors.date_of_birth.message}</p>
            )}
            </div>

            <button
            type='submit'
            className='mt-4 bg-gray-800 text-white font-semibold py-2 px-4 rounded hover:bg-gray-700'
            >
            Submit
            </button>
        </form>

        {
        width < 1023 && 
          <MobileNavigation />
        
      }
      {
        width > 1023 &&
        <CartCounterButton/>
      }

    </Card>

    </div>
  )
}

InvestmentPlans.Layout = DefaultLayout;

