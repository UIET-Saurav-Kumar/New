import Label from '@components/ui/label'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from "@components/ui/input";
import MobileNavigation from '@components/layout/mobile-navigation';
import CartCounterButton from '@components/cart/cart-counter-button';
import { useWindowSize } from 'react-use';
import Card from '@components/ui/card';
import DefaultLayout from '@components/layout/default-layout';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { CloseIcon } from '@components/icons/close-icon';


type FormValues = {
    destination: string
    // trip_date: string
    from: string
    to: string
    number_of_travellers: string
    medical_history: string
    contact_number: string
    name: string
}

export default function TravelInsurance() {
    const { width } = useWindowSize();

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        control,
      } = useForm<FormValues>({
         defaultValues: {
            destination: '',
            from: '',
            to: '',
            number_of_travellers: '',
            medical_history: '',
            contact_number: '',
            name: '',
    
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
            Travel Insurance</h1>

        <form className='grid grid-cols-1 gap-8'
         onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col col-span-2'>
            <Label className='text-gray-700 font-semibold '>
                Destination
            </Label>
            <Input
                {...register('destination', {
                required: 'Destination is required',
                })}
                type='text'
                placeholder='Enter your destination'
                className='mt-1'
            />
            {errors.destination && (
                <p className='text-red-500 text-xs italic'>{errors.destination.message}</p>
            )}

            </div>
            <div className='flex flex-col'>
            <Label className='text-gray-700 font-semibold '>
                Trip date
            </Label>
            <div className='flex  col-span-2'> 
            <div className="flex items-center "> 
              <span className="text-gray-700 font-light mx-4">From</span> 
            <div className="relative border rounded-md p-3 flex items-center">
                 <DatePicker clearButtonTitle="clear"
             selected={startDate} onChange={(date:Date ) => setStartDate(date)} 
             dateFormat= "dd/MM/yyyy"
             className=""
            //  clearIcon={null}
              />
              <span className={` ${startDate !== null ? 'block' : 'hidden'} cursor-pointer absolute right-2 text-gray-600  rounded-full `} onClick={()=>setStartDate(null)}><CloseIcon className="w-4 h-4"/></span>
              

            </div>
            </div>
            <div className="flex items-center mt-2">
            <span className="text-gray-700 font-light mx-4">to</span> 
            <div className="relative border  border rounded-md p-3  items-center w-60">
                <DatePicker clearButtonTitle="clear"
              // clearIcon={null}
              selected={endDate} onChange={(date:Date) => setEndDate(date)} 
              dateFormat= "dd/MM/yyyy"
              />
              <span className={` ${endDate !== null ? 'block' : 'hidden'} cursor-pointer absolute right-2 text-gray-600 top-4 rounded-full `} onClick={()=>setEndDate(null)}><CloseIcon className="w-4 h-4"/></span>
            </div>
             
          </div>
          </div>
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

TravelInsurance.Layout = DefaultLayout;

