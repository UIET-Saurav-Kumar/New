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
import { toast } from "react-toastify";
import { useRouter } from 'next/router';
import { useTermInsuredFormDataMutation } from '@data/insurance/use-term-insured.query';
import pick from "lodash/pick";


interface Props {
    user: FormValues;
  }
 
// form values
type FormValues = {
   'name': string,
   'date_of_birth': string,
    'is_tobacco_user': 'Yes'| 'No',
    'annual_income': string,
    'education': string,
    'occupation': string,
    'pin_code': string,
    'mobile_number': string,
};


export default function TermLifeInsurance({user}: Props) {

  //console.log('context',props);

  const router = useRouter();

  const { width } = useWindowSize();
  const { mutate: storeInsured } = useTermInsuredFormDataMutation();


  React.useEffect(() => {
    window.scrollTo(0, 0)
    }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    control,
  } = useForm<FormValues>({
    defaultValues: {
        is_tobacco_user: 'No',
        ...(user &&
            pick(user, [
        'name',
        'date_of_birth',
        // 'is_tobacco_user',
        'annual_income',
        'education',
        'occupation',
        'pin_code',
        'mobile_number',
    ])),
    },
    })

    function onSubmit(data: FormValues) {
        console.log(data)
        
        storeInsured(
            {
                name: data.name,
                date_of_birth: data.date_of_birth,
                is_tobacco_user: data.is_tobacco_user,
                annual_income: data.annual_income,
                education: data.education,
                occupation: data.occupation,
                pin_code: data.pin_code,
             },
            {
              onSuccess: (data) => {
                console.log('data',data)
                toast.success(("Thank You for your Query. Our team will get back to you soon."));
                reset();
                
              },
            }
          );
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

    <div className='w-full lg:w-1/2 mx-auto h-  mt-4 lg:mt-20 '>
      
      <Card className="w-full">

        <div className = ''> 

             {/* <Image
            priority={true}   
            src={props?.src}
            layout='intrinsic'
            objectFit='contain'
            width={props?.width}
            height={props?.height}
          /> */}

            <h1 className=' text-heading'> 
                 TermLife Insurance 
            </h1>

        </div>

        <form className='grid grid-cols-2 gap-8' 
              onSubmit={handleSubmit(onSubmit)} noValidate>

        <div className='flex flex-col '>
            <Label className='text-gray-700 font-semibold text-xs lg:text-sm'>Your Name</Label>
            <Input 
                // className='border border-gray-300 rounded-md p-2'
                type='text'
                variant='outline' 
                placeholder='Enter your name'
                {...register('name', {
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

            {errors.name && (
                <span className='text-red-500 text-sm'>
                    {errors.name.message}
                </span>
            )}                      
        </div>

        <div className='flex flex-col '>
            <Label className='text-gray-700 font-semibold text-xs lg:text-sm'>
                Date of Birth
            </Label>
            <Input
            type='date'
            variant='outline'
            placeholder='Enter your date of birth'

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

        <div className='flex flex-col'>
            
            <Label className='text-gray-700 font-semibold text-xs lg:text-sm'>
                Do you smoke or chew tobacco?
            </Label>

            <div className='flex space-x-4 '> 
            
            <Radio
                name='is_tobacco_user'
                id='Yes'
                type='radio'
                value='yes'
                label='Yes'
            />
            <Radio
                name='is_tobacco_user'
                id='No'
                type='radio'
                value='yes'
                label='No'
            />
            { errors.is_tobacco_user && (
                <span className='text-red-500 text-sm'>
                    {errors.is_tobacco_user.message}
                </span>
            )}
            </div>

        </div>

        <div className='flex flex-col'>

            <Label className='text-gray-700 font-semibold text-xs lg:text-sm'>
                Annual Income
            </Label>

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
                <span className='text-red-500 text-sm'>
                    {errors.annual_income.message}
                </span>
            )}
            
        </div>

        <div className='flex flex-col'>
            <Label className='text-gray-700 font-semibold text-xs lg:text-sm'>
                Educational Qualification
            </Label>
            <Input
            // className='border border-gray-300 rounded-md p-2'
            type='text'
            variant='outline'
            placeholder='Enter your educational qualification'
            {...register('education', {
                required: 'Educational qualification is required',
            })}
            />
            {errors.education && (
                <span className='text-red-500 text-sm'>
                    {errors.education.message}
                </span>
            )}
        </div>

        <div className='flex flex-col '>
            <Label className='text-gray-700 font-semibold text-xs lg:text-sm'>
                Occupation Type
            </Label>
            <Input
            // className='border border-gray-300 rounded-md p-2'
            type='text'
            variant='outline'
            placeholder='Enter your occupation type'
            {...register('occupation', {
                required: 'Occupation type is required',
            })}
            />
            {errors.occupation && (
                <span className='text-red-500 text-sm'>
                    {errors.occupation.message}
                </span>
            )}
        </div>

        <div className='flex flex-col '>
            <Label className='text-gray-700 font-semibold text-xs lg:text-sm'>Pin Code</Label>
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
                <span className='text-red-500 text-sm'>
                    {
                      errors.pin_code.message
                    }
                </span>
            )}
        </div>
                
        <div className='flex flex-col '>
            <Label className='text-gray-700 font-semibold text-xs lg:text-sm'>
                Mobile Number
            </Label>
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
                <span className='text-red-500 text-sm'>
                    {errors.mobile_number.message}
                </span>
            )}
        </div>

          <div className='flex flex-col space-y-2'>
            <button
              type='submit'
              className='bg-blue-600 text-white rounded-md px-4 py-2 font-semibold 
                         hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600
                          focus:ring-offset-2 focus:ring-offset-gray-100'
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

