import React from 'react'
import  Link from 'next/link'
import { ROUTES } from "@utils/routes";
import { useWindowSize } from 'react-use';
import MobileNavigation from '@components/layout/mobile-navigation';
import CartCounterButton from '@components/cart/cart-counter-button';
import DefaultLayout from '@components/layout/default-layout';
import { useForm } from 'react-hook-form';
import Card from '@components/common/card';
import async from 'react-select/async';
import Image from 'next/image';
import Label from "@components/ui/label";
import Input from "@components/ui/input";
import Radio from '@components/ui/radio/radio';


 
// form values
type FormValues = {
   'your_name': string,
   'date_of_birth': string,
    'do_you_smoke_or_chew_tobacco': string,
    'annual_income': string,
    'educational_qualification': string,
    'occupation_type': string,
    'pin_code': string,
};


export default function TermLifeInsurance( props:any) {

  console.log('context',props)

  const { width } = useWindowSize();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm<FormValues>({
    defaultValues: {
        'your_name': '',
        'date_of_birth': '',
        'do_you_smoke_or_chew_tobacco': '',
        'annual_income': '',
        'educational_qualification': '',
        'occupation_type': '',
        'pin_code': '',

    },

  }
    )

    function onSubmit(data: FormValues) {
      console.log(data)
    }

    // auto correct the date format
    function dateCorrector(e:any) {
        var input = e.target.value;
        var inputLength = input.length;
        if (inputLength == 2 || inputLength == 5) {
            input = input + '/';
            e.target.value = input;
        }
       // check of input date is valid
        if (inputLength == 10) {
            var date = input.split('/');
            var day = date[0];
            var month = date[1];
            var year = date[2];
            var isDateValid = true;
            if (day > 31 || day < 1) {
                isDateValid = false;
            }
            if (month > 12 || month < 1) {
                isDateValid = false;
            }
            if (year > 2021 || year < 1900) {
                isDateValid = false;
            }
            if (!isDateValid) {
                e.target.value = '';
            }
        }

    }


    

    return (

    <div className='w-1/2 mx-auto h-  mt-20 '>
      
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
           Termlife Insurance 
        </h1>

        </div>

        <form className='grid grid-cols-2 gap-8' onSubmit={handleSubmit(onSubmit)} noValidate>

        <div className='flex flex-col space-y-4'>
            <Label className='text-gray-700 font-semibold'>Your Name</Label>
            <Input 
            // className='border border-gray-300 rounded-md p-2'
            type='text'
            variant='outline'
            placeholder='Enter your name'
            {...register('your_name', {
                required: 'Name is required',
                minLength: {
                    value: 3,
                    message: 'Name should be at least 3 characters',
                },
                maxLength: {
                    value: 20,
                    message: 'Name should not exceed 20 characters',
                },
            })}
            />
            {errors.your_name && (
                <span className='text-red-500 text-sm'>
                    {errors.your_name.message}
                </span>
            )}
        </div>

        <div className='flex flex-col space-y-4'>
            <Label className='text-gray-700 font-semibold'>Date of Birth</Label>
            <Input
            type='text'
            variant='outline'
            placeholder='Enter your date of birth'
            onChange = {(e)=>dateCorrector(e)}
            {...register('date_of_birth', {
                required: 'Date of birth is required',
                minLength: {
                    value: 10,
                    message: 'Date of birth should be at least 10 characters',
                },
                maxLength: {
                    value: 10,
                    message: 'Date of birth should not exceed 10 characters',
                },
            })}
            />
            {errors.date_of_birth && (
                <span className='text-red-500 text-sm'>
                    {errors.date_of_birth.message}
                </span>
            )}
        </div>

        <div className='flex flex-col space-y-4'>
            <Label className='text-gray-700 font-semibold'>Do you smoke or chew tobacco?</Label>
            <Radio
            name='do_you_smoke_or_chew_tobacco'
            id='yes'
            type='radio'
            value='yes'
            label={'Yes'}
            />
            <Radio
            name='do_you_smoke_or_chew_tobacco'
            id='no'
            type='radio'
            value='no'
            label={'No'}
            />
            {errors.do_you_smoke_or_chew_tobacco && (
                <span className='text-red-500 text-sm'>{errors.do_you_smoke_or_chew_tobacco.message}</span>
            )}
        </div>

        <div className='flex flex-col space-y-4'>
            <Label className='text-gray-700 font-semibold'>Annual Income</Label>
            <Input
            // className='border border-gray-300 rounded-md p-2'
            type='text'
            variant='outline'
            placeholder='Enter your annual income'
            {...register('annual_income', {
                required: 'Annual income is required',
            })}
            />
            {errors.annual_income && (
                <span className='text-red-500 text-sm'>{errors.annual_income.message}</span>
            )}
        </div>

        <div className='flex flex-col space-y-4'>
            <Label className='text-gray-700 font-semibold'>Educational Qualification</Label>
            <Input
            // className='border border-gray-300 rounded-md p-2'
            type='text'
            variant='outline'
            placeholder='Enter your educational qualification'
            {...register('educational_qualification', {
                required: 'Educational qualification is required',
            })}
            />
            {errors.educational_qualification && (
                <span className='text-red-500 text-sm'>{errors.educational_qualification.message}</span>
            )}
        </div>

        <div className='flex flex-col space-y-4'>
            <Label className='text-gray-700 font-semibold'>Occupation Type</Label>
            <Input
            // className='border border-gray-300 rounded-md p-2'
            type='text'
            variant='outline'
            placeholder='Enter your occupation type'
            {...register('occupation_type', {
                required: 'Occupation type is required',
            })}
            />
            {errors.occupation_type && (
                <span className='text-red-500 text-sm'>{errors.occupation_type.message}</span>
            )}
        </div>

        <div className='flex flex-col space-y-4'>
            <Label className='text-gray-700 font-semibold'>Pin Code</Label>
            <Input
            // className='border border-gray-300 rounded-md p-2'
            type='text'
            variant='outline'
            placeholder='Enter your pin code'
            {...register('pin_code', {
                required: 'Pin code is required',
            })}     
            />
            {errors.pin_code && (
                <span className='text-red-500 text-sm'>{errors.pin_code.message}</span>
            )}
        </div>
                
        <div className='flex flex-col space-y-4'>
            <Label className='text-gray-700 font-semibold'>Mobile Number</Label>
            <Input
            // className='border border-gray-300 rounded-md p-2'
            type='text'
            variant='outline'
            placeholder='Enter your mobile number'
            {...register('mobile_number', {
                required: 'Mobile number is required',
            })}
            />
            {errors.mobile_number && (
                <span className='text-red-500 text-sm'>{errors.mobile_number.message}</span>
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

TermLifeInsurance.Layout = DefaultLayout;

