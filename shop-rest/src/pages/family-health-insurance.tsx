import React, { useState } from 'react'
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
import Multiselect from 'multiselect-react-dropdown';
import Checkbox from "@components/ui/checkbox/checkbox";
import { ArrowLeftIcon, BackspaceIcon } from '@heroicons/react/outline';
import BackButton from '@components/ui/back-button';
import Select from '@components/ui/select/select';


 
// form values
type FormValues = {
    'insured': string,
    'age'  : string,
    'pin_code' : string,
    'gender' :  'male' | 'female';
    'name' : string,
    'mobile_no' : string,
}

export const ageList =[
   // age from 18 to 100
   '18yrs',
    '19yrs',
    '20yrs',
    '21yrs',
    '22yrs',
    '23yrs',
    '24yrs',
    '25yrs',
    '26yrs',
    '27yrs',
    '28yrs',
    '29yrs',
    '30yrs',
    '31yrs',
    '32yrs',
    '33yrs',
    '34yrs',
    '35yrs',
    '36yrs',
    '37yrs',
    '38yrs',
    '39yrs',
    '40yrs',
    '41yrs',
    '42yrs',
    '43yrs',
    '44yrs',
    '45yrs',
    '46yrs',
    '47yrs',
    '48yrs',
    '49yrs',
    '50yrs',
    '51yrs',
    '52yrs',
    '53yrs',
    '54yrs',
    '55yrs',
    '56yrs',
    '57yrs',
    '58yrs',
    '59yrs',
    '60yrs',
    '61yrs',




]



export default function FamilyHealthInsurance( props:any) {

  console.log('context',props)

  const { width } = useWindowSize();
  const [options,selectOption] = useState([])
  const [step1,setStep1] = useState(true)
    const [step2,setStep2] = useState(false)
    const [step3,setStep3] = useState(false)
    const [step4,setStep4] = useState(false)
    const [step5,setStep5] = useState(false)
    const [step6,setStep6] = useState(false)

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
        insured: '[{"name":"Self","id":1}]',
        age: '',
        pin_code: '',
        gender: 'male',
        name: '',
        mobile_no: '',

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

    console.log('values',getValues('name'))

   const handleStep1 = (e:any) => {

      e.preventDefault();

        setStep1(false)
        setStep2(true)
        // setStep3(false)
        // setStep4(false)
        // setStep5(false)
        // setStep6(false)

    }

    function handleStep2() {
        setStep1(false)
        setStep2(false)
        setStep3(true)

    }

    function handleStep3() {
        setStep1(false)
        setStep2(false)
        setStep3(false)
        setStep4(true)

    }

    function handleStep4() {
        setStep1(false)
        setStep2(false)
        setStep3(false)
        setStep5(true)

    }

    function handleBack2(){
        setStep1(true)
        setStep2(false)
        setStep3(false)
        setStep4(false)
    }

    function handleBack3(){
        setStep1(false)
        setStep2(true)
        setStep3(false)
        setStep4(false)
    }

    function handleBack4(){
        setStep1(false)
        setStep2(false)
        setStep3(true)
        setStep4(false)
    }

   

    // console.log('step1',step1)

    console.log('step1',step1,'step2',step2,'step3',step3,'step4',step4,'step5',step5,'step6',step6)

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
           Family Health Insurance 
        </h1>

        </div>

        
        <div className='flex justify-between mt-4'>
            <div className='flex flex-col items-center'>
                <div className={` ${ step1 || step2 || step3 || step4 ? 'bg-green-700 text-white' : 'bg-gray-200 text-black ' } w-10 h-10 rounded-full  flex items-center justify-center`}>
                    <span className={` ${step1 || step2 || step3 || step4? 'text-white': ''} text-gray-700 font-semibold `}>1</span>
                </div>
                {/* <span className='text-gray-500 text-sm mt-2'>Personal Details</span> */}
            </div>
            <hr className={` ${step2 || step3 || step4 ? 'border-green-800': ''} flex w-20 border items-center justify-center my-6`}></hr>
            <div className='flex flex-col items-center'>
            <div className={` ${   step2 || step3 || step4 ? 'bg-green-700 text-white' : 'bg-gray-200 text-black ' } w-10 h-10 rounded-full  flex items-center justify-center`}>
                    <span className={` ${step2 || step3 || step4 ? 'text-white': ''} text-gray-700 font-semibold `}>2</span>
                </div>
                {/* <span className='text-gray-500 text-sm mt-2'>Family Details</span> */}
            </div>
            <hr className={` ${step3 || step4 ? 'border-green-800': ''} flex w-20 border items-center justify-center my-6`}></hr>
            <div className='flex flex-col items-center'>
            <div className={` ${ step3 || step4   ? 'bg-green-700 text-white' : 'bg-gray-200 text-black ' } w-10 h-10 rounded-full  flex items-center justify-center`}>
                    <span className={` ${step3 || step4 ? 'text-white': ''} text-gray-700 font-semibold `}>3</span>
                </div>
                {/* <span className='text-gray-500 text-sm mt-2'>Health Details</span> */}
            </div>
            <hr className={` ${step4 ? 'border-green-800': ''} flex w-20 border items-center justify-center my-6`}></hr>
            <div className='flex flex-col items-center'>
                 <div className={` ${ step4 ? 'bg-green-700 text-white' : 'bg-gray-200 text-black ' } w-10 h-10 rounded-full  flex items-center justify-center`}>
                    <span className={` ${step4 ? 'text-white': ''} text-gray-700 font-semibold `}>4</span>
                </div>
                {/* <span className='text-gray-500 text-sm mt-2'>Policy Details</span> */}
            </div>
            
        </div>


        <form className='grid grid-cols-2 gap-8' 
              onSubmit={handleSubmit(onSubmit)} noValidate>

       {step1 && ( <div className='flex flex-col space-y-4'>

       <div onClick={handleBack4} className='  mb-2'>
                {/* <ArrowLeftIcon className='cursor-pointer w-6 text-gray-700'/> */}
            </div>
           
            <Label className='text-gray-700 font-semibold'>
                 Who would you like to insure?</Label>
            <div className='grid grid-cols-3 gap-6'>
              <Checkbox
                label='Myself'
                {...register('insured')}
                id='self'
                name='self'
                height={42}
                width={42}
                />
              <Checkbox
                label='Spouse'
                {...register('insured')}
                id='spouse'
                name='spouse'
                height={42}
                width={42}
                />
              <Checkbox
                label='Son'
                {...register('insured')}
                id='son'
                name='son'
                height={42}
                width={42}
                />
              <Checkbox
                label='Daughter'
                {...register('insured')}
                id='daughter'
                name='daughter'
                height={42}
                width={42}
                />
              <Checkbox
                label='Father'
                {...register('insured')}
                id='father'
                name='father'
                height={42}
                width={42}
                />
              <Checkbox
                label='Mother'
                {...register('insured')}
                id='mother'
                name='mother'
                height={42}
                width={42}
                />

            </div>
              
            {errors.name && (
                <span className='text-red-500 text-sm'>
                    {errors.name.message}
                </span>
            )}

            <button onClick={handleStep1} 
                    className='bg-blue-500 text-white p-2 rounded-md'>
                Continue
            </button>

        </div>
        )}

        
        

        {/* {getValues('name') && ( */}

     { 
     step2 && (
        <>
 
        <div className='flex flex-col space-y-4'>

        <div onClick={handleBack2} className=' mb-2'>
            {/* <span className='text-xl w-4 cursor-auto'>  */}
            <ArrowLeftIcon className='cursor-pointer w-6 text-gray-700  '/>
             {/* </span>  */}
        </div>

            <Label className='text-gray-700 font-semibold '>
            {
            getValues('name') === 'self' ? 'Your' : 
            getValues('name') === 'spouse' ? 'Your Spouse' :
            getValues('name') === 'son' ? 'Your Son' :
            getValues('name') === 'daughter' ? 'Your Daughter' :
            getValues('name') === 'father' ? 'Your Father' :
            getValues('name') === 'mother' ? 'Your Mother' : 'Your'
            } Age </Label>
             
            <Select
            type='text'
            variant='outline'
            options={ageList}
            placeholder='in years'
            onChange = {(e)=> 
            setValue('age', e.target.value)}
            {...register('age', {
                required: 'Age is required',
                pattern: {
                    value: /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/,
                    message: 'Invalid date format',
                },
            })}
            />
            {errors.age && (
                <span className='text-red-500 text-sm'>
                    {errors.age.message}
                </span>
            )}

            <button onClick={handleStep2} 
                    className='bg-blue-500 text-white p-2 rounded-md'>
                Continue
            </button>

        </div>
        </>
     )}
 
        
      { step3 && ( 

        <>

        <div className='flex flex-col space-y-4'>

            <div onClick={handleBack3} className=' mb-2'>
                <ArrowLeftIcon className='cursor-pointer w-6 text-gray-700'/>
            </div>

            {/* <div className='flex flex-col space-y-4'> */}
                <Label className='text-gray-700 font-semibold '>
                    Enter City or Pin Code</Label>
                <Input
                // className='border border-gray-300 rounded-md p-2'
                type='text'
                variant='outline'
                placeholder='Pin Code | City name'
                
                {...register('pin_code', {
                    required: 'Pin code is required',
                })}     

                />
                {errors.pin_code && (
                    <span className='text-red-500 text-sm'>{errors.pin_code.message}</span>
                )}
            {/* </div> */}

            <button onClick={handleStep3} 
                    className='bg-blue-500 text-white p-2 rounded-md'>
                Continue
            </button>

        </div>

             
        </>
     )}
                
       {step4 && (

        <div className='flex flex-col space-y-4'>

             <div onClick={handleBack4} className=' mb-2'>
                <ArrowLeftIcon className='cursor-pointer w-6 text-gray-700'/>
            </div>
            <div className='grid grid-cols-2 gap-10'> 
                    <div className='flex flex-col col-span-2 space-y-4'>
                        <Label className='text-gray-700 font-semibold '>Gender</Label>
                        <Radio
                        name='do_you_smoke_or_chew_tobacco'
                        id='male'
                        type='radio'
                        value='ale'
                        label={'Male'}
                        />
                        <Radio
                        name='do_you_smoke_or_chew_tobacco'
                        id='female'
                        type='radio'
                        value='female'
                        label={'Female'}
                        />
                        {errors.do_you_smoke_or_chew_tobacco && (
                            <span className='text-red-500 text-sm'>{errors.do_you_smoke_or_chew_tobacco.message}</span>
                        )}
                    </div>

                    <div className='flex flex-col space-y-4'>
                        <Label className='text-gray-700 font-semibold '>
                            Enter full name
                        </Label>
                        <Input
                        // className='border border-gray-300 rounded-md p-2'
                        type='text'
                        variant='outline'
                        placeholder='Enter Full Name'
                        {...register('name', {
                            required: 'Name is required',
                        })}
                        />
                        {errors.name && (
                            <span className='text-red-500 text-sm'>
                                {errors.name.message}
                            </span>
                        )}
                    </div>

                    <div className='flex flex-col space-y-4'>
                        <Label className='text-gray-700 font-semibold '>Mobile Number</Label>
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
            </div>
        <button onClick={handleStep4} 
                className='bg-blue-500 text-white p-2 rounded-md'>
            Continue
        </button>

        </div>
         
        )}
                

        </form>
        {/* <div className='flex flex-col space-y-2 w-60 mx-auto'>
              <button
               type='submit'
               className='bg-blue-600 text-white rounded-md px-4 py-3 
                            font-semibold hover:bg-blue-700 focus:outline-none 
                            focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 
                            focus:ring-offset-gray-100'
              >
              Submit
             </button>
        </div> */}
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
 FamilyHealthInsurance.Layout = DefaultLayout;

