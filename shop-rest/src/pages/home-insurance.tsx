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
import { string } from 'yup';


 type FormValues = {
    'name' : string,
    'phone_number' : string,
    'email' : string,
    'city' : string,
    'property_type': 'owner' | 'tenant',
    'building_type': 'building' | 'household_items' | 'both',
    'building_value' : string;
    'household_value' : string;
    'carpet_area' : string;
    'construction_cost': string;
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



]



export default function HomeInsurance( props:any) {

  console.log('context',props);

  const { width } = useWindowSize();
  const [options,selectOption] = useState([])
  const [step1,setStep1] = useState(true)
  const [step2,setStep2] = useState(false)
  const [step3,setStep3] = useState(false)
  const [step4,setStep4] = useState(false)
  const [step5,setStep5] = useState(false)
  const [step6,setStep6] = useState(false)
  

  const [propertyType,setPropertyType] = useState('')
  const [buildingType,setBuildingType] = useState('')
  const [buildingValue,setBuildingValue] = useState('')
  const [householdValue,setHouseholdValue] = useState('')
  const [carpetArea,setCarpetArea] = useState('')

    //useEffect scroll to top 
    React.useEffect(() => {
        window.scrollTo(0, 0)
        }, [])

        function constructionCost(){
            if(buildingValue && carpetArea){
                let result = parseInt(buildingValue) / parseInt(carpetArea)
                return result
            }

        }


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
        city: '',
        phone_number: '',
        property_type: 'owner',
        building_type: 'building',
        building_value: '',
        household_value: '',
        carpet_area: '',
        construction_cost: '',
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

    console.log('values',propertyType,buildingType,buildingValue,householdValue)

   const handleStep1 = (e:any) => {

 
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

    // function for inr comma seperator
    function inrFormat(x:any) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    console.log('inr',inrFormat(10000));

    // console.log('step1',step1)

    console.log('step1',step1,'step2',step2,'step3',step3,'step4',step4,'step5',step5,'step6',step6)

    return (

    <div className='w-full lg:w-1/2 mx-auto h-screen mt-4 lg:mt-20 '>
      
      <Card className="w-full">

        <div className=''> 
              
            <h1 className='font-semibold text-gray-700'> 
            Home Insurance 
            </h1>

        </div>

        
        <div className='flex justify-between mt-4'>
            <div className='flex flex-col items-center'>
                <div className={` ${ step1 || step2 || step3 || step4 ? 'bg-green-700 text-white' : 'bg-gray-200 text-black ' } w-5 h-5 lg:w-10 lg:h-10 rounded-full  flex items-center justify-center`}>
                    <span className={` ${step1 || step2 || step3 || step4? 'text-white': ''} text-gray-700 font-semibold text-sm lg:text-lg `}>1</span>
                </div>
                {/* <span className='text-gray-500 text-sm mt-2'>Personal Details</span> */}
            </div>
            <hr className={` ${step2 || step3 || step4 ? 'border-green-800': ''} flex w-20 border items-center justify-center my-2 lg:my-6`}></hr>
            <div className='flex flex-col items-center'>
            <div className={` ${   step2 || step3 || step4 ? 'bg-green-700 text-white' : 'bg-gray-200 text-black ' } w-5 h-5 lg:w-10 lg:h-10 rounded-full  flex items-center justify-center`}>
                    <span className={` ${step2 || step3 || step4 ? 'text-white': ''} text-gray-700 font-semibold text-sm lg:text-lg `}>2</span>
                </div>
                {/* <span className='text-gray-500 text-sm mt-2'>Family Details</span> */}
            </div>
            <hr className={` ${step3 || step4 ? 'border-green-800': ''} flex w-20 border items-center justify-center my-2 lg:my-6`}></hr>
            <div className='flex flex-col items-center'>
            <div className={` ${ step3 || step4   ? 'bg-green-700 text-white' : 'bg-gray-200 text-black ' } w-5 h-5 lg:w-10 lg:h-10 rounded-full  flex items-center justify-center`}>
                    <span className={` ${step3 || step4 ? 'text-white': ''} text-gray-700 font-semibold text-sm lg:text-lg `}>3</span>
                </div>
                {/* <span className='text-gray-500 text-sm mt-2'>Health Details</span> */}
            </div>
            <hr className={` ${step4 ? 'border-green-800': ''} flex w-20 border items-center justify-center my-2 lg:my-6`}></hr>
            <div className='flex flex-col items-center'>
                 <div className={` ${ step4 ? 'bg-green-700 text-white' : 'bg-gray-200 text-black ' } w-5 h-5 lg:w-10 lg:h-10 rounded-full  flex items-center justify-center`}>
                    <span className={` ${step4 ? 'text-white': ''} text-gray-700 font-semibold text-sm lg:text-lg `}>4</span>
                </div>
                {/* <span className='text-gray-500 text-sm mt-2'>Policy Details</span> */}
            </div>
            
        </div>


        <form className='' 
              onSubmit={handleSubmit(onSubmit)} noValidate>

       {step1 && ( 
       <div className='flex  flex-col space-y-8  '>

            <div onClick={handleBack4} className='mb-2'>
                    {/* <ArrowLeftIcon className='cursor-pointer w-6 text-gray-700'/> */}
            </div>

                    <div className='flex flex-col space-y-2'>

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
                                // className='w-full'
                            />

                    </div>


                    <div className='flex flex-col space-y-2'>
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
                            // className='w-full'
                        />
                    </div>


                    <div className='flex flex-col space-y-2'>
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
                            // className='w-full'
                        />
                    </div>


                    <div className='flex flex-col space-y-2'>
                        <Label className='text-gray-700 whitespace-nowrap font-semibold'>
                                City 
                        </Label>
                        <Input
                            {...register('email', {
                                //optional
                            })}
                            type='text'
                            placeholder='Enter your city'
                            error={errors.city?.message}
                            // className='w-full'
                        />
                    </div>
           

            <button onClick={handleSubmit(handleStep1)} 
                    className='bg-blue-500 text-white p-2 rounded-md'>
                Continue
            </button>

        </div>
        )}

        {/* {getValues('name') && ( */}

      { 
        step2 && (
            <>
 
        <div className='flex flex-col space-y-4 lg:w-full'>

        <div onClick={handleBack2} className=' mb-2'>
            {/* <span className='text-xl w-4 cursor-auto'>  */}
            <ArrowLeftIcon className='cursor-pointer w-6 text-gray-700  '/>
             {/* </span>  */}
        </div>

         

            <Label className='text-gray-700 space-y-6 font-semibold '>
                 Are you the owner or tenant? 
            </Label>
             
            <Radio 
                label='Owner'
                {...register('property_type')}
                onChange={() => setPropertyType( 'owner')}
                id='owner'
                name='property_type'
                height={42}
                width={42}
            />
            <Radio
                label='Tenant'
                {...register('property_type')}
                onChange={() => setPropertyType( 'tenant')}
                id='tenant'
                name='property_type'
                height={42}
                width={42}
            />
           

            <button onClick={handleStep2} 
                    className='bg-blue-500 text-white p-2 rounded-md'>
                Continue
            </button>

        </div>
        </>
     )}
 
        
      { step3 && ( 

        

        propertyType === 'owner' ? ( 
         <div className='flex flex-col space-y-6 '> 
          <div onClick={handleBack3} className=' mb-2'>
                <ArrowLeftIcon className='cursor-pointer w-6 text-gray-700'/>
            </div>
            <div className='flex flex-col space-y-4 lg:w-full'>
                <Label className='text-gray-700 font-semibold '>
                    What do you want to Insure?
                </Label>

                <Radio
                    label='Only building 
                       (Covers damage to the property structure like walls, roof, stairs, etc.)'
                    {...register('building_type')}
                    onChange={() => setBuildingType( 'building')}
                    id='building'
                    name='building_type'
                    height={42}
                    width={42}
                />
                <Radio
                    label='Only household items 
                       (Covers furniture, appliances, and electronics, except valuables)'
                    {...register('building_type')}
                    onChange={() => setBuildingType( 'household')}
                    id='household'
                    name='building_type'
                    height={42}
                    width={42}
                />
                <Radio
                    label='Both building and household items 
                      (Covers the building structure and household items, except valuables.)'
                    {...register('building_type')}
                    onChange={() => setBuildingType( 'both')}
                    id='both'
                    name='building_type'
                    height={42}
                    width={42}
                />
            </div>


                <div className='flex flex-col'>

                    { buildingType === 'building' && ( 
                            <Label className='text-gray-700 font-semibold '>
                                Enter Value of Building & Carpet Area
                            </Label>
                            )}
                            { buildingType === 'household' && ( 
                            <Label className='text-gray-700 font-semibold '>
                            Enter Value of household items  
                        </Label>
                        )}
                        { buildingType === 'both' && ( 
                        <Label className='text-gray-700 font-semibold '>
                        Enter value of Building, Value of household items & Carpet area
                    </Label>
                    )}

              <div className='grid grid-cols-2 gap-4'>
                
                { buildingType === 'building' || 'both' && ( 
                    <div className='flex flex-col'>
                    <Label className='text-gray-700 font-semibold '>
                        Building Value
                    </Label>
                        <Input
                            {...register('building_value', {
                                required: 'Building value is required',
                            })}
                            type='text'
                             
                            onChange={(e)=> setBuildingValue(inrFormat(e.target.value))}
                            placeholder='Building value'
                            error={errors.building_value?.message}
                            // className='w-full'
                        />
                    </div>
                        )}
                        { buildingType === 'household' || 'both' && ( 
                             <div className='flex flex-col'>
                             <Label className='text-gray-700 font-semibold '>
                                 Household value in Rs
                             </Label>
                        <Input
                            {...register('household_value', {
                                required: 'Household value is required',
                            })}
                            
                            type='text'
                            onChange={(e)=>setHouseholdValue(inrFormat(e.target.value))}
                            placeholder='Household value in Rs.'
                            error={errors.household_value?.message}
                            // className='w-full'
                        />
                        </div>
                        )}
                        { buildingType === 'building' || 'both' && ( 
                             <div className='flex flex-col'>
                             <Label className='text-gray-700 font-semibold '>
                                 Carpet Area in Sq. Ft.
                             </Label>
                        <Input
                            {...register('carpet_area', {
                                required: 'Carpet area is required',
                            })}
                            onChange={(e)=>setCarpetArea(inrFormat(e.target.value))}
                            type='text'
                            placeholder='Carpet area in sq.ft.'
                            error={errors.carpet_area?.message}
                            // className='w-full'
                        />
                        </div>
                        )}

                    <div className='flex flex-col'>
                    <Label className='text-gray-700 font-semibold '>
                        Construction Cost in Rs
                    </Label>

                        <Input
                            {...register('construction_cost')}
                            type='text'
                            value={constructionCost()}
                            disabled
                            placeholder='Construction cost in Rs.'
                            error={errors.construction_cost?.message}
                            // className='w-full'
                        />
                    </div>

                    </div>
                        

                    
                </div>
                <button onClick={handleStep3}
                        className='bg-blue-500 text-white p-2 rounded-md'>
                    Continue
                </button>
            
            </div>
             ) 
             : 
             <div className='space-y-5'>

            <div onClick={handleBack3} className=' mb-2'>
                <ArrowLeftIcon className='cursor-pointer w-6 text-gray-700'/>
            </div>

                <div className='space-y-5'> 
                <Radio
                    label='Only household items'
                    {...register('building_type')}
                    // onChange={() => setBuildingType('household')}
                    id='household'
                    value='building'
                    name='building_type'
                    height={42}
                    width={42}
                />

                <Input 
                    {...register('household_value', {
                        required: 'Household value is required',
                    })}
                    type='text'
                    placeholder='Household value in Rs.'
                    error={errors.household_value?.message}
                    // className='w-full'
                />
                </div>
                <button onClick={handleSubmit(onSubmit)}
                        className='bg-blue-500 text-white p-2 rounded-md'>
                    Continue
                </button>
             </div>
        
     )}

{ step4 && ( 
        <div className='flex flex-col space-y-6'>
            <div onClick={handleBack4} className=' mb-2'>
                <ArrowLeftIcon className='cursor-pointer w-6 text-gray-700'/>
            </div>
            <div className='flex flex-col space-y-4 lg:w-full'>
                Thank you 
            </div>
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
 HomeInsurance.Layout = DefaultLayout;

