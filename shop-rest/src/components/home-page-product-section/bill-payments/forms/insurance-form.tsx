import Input from '@components/ui/input'
import Label from '@components/ui/label'
import Select from '@components/ui/select/select'
import { yupResolver } from '@hookform/resolvers/yup'
 import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useModalAction } from '@components/ui/modal/modal.context'


type FormValues = {
    date_of_birth:Date;
}

const defaultValues = {
    date_of_birth: ''
}


export default function InsuranceForm({click} :any) {


    console.log(' form insurance ',click)

    const { openModal } = useModalAction();


    function handleClick()  {
        return   openModal('BILL_PAYMENT')
    }

const [birthDate, setBirthDate] = useState(null);

 
const {
    register,
    handleSubmit,
    setError,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    // resolver: yupResolver(registerFormSchema),
  });

  return (

    <div className={`${click ? 'block' : 'hidden'}`}>

<div className='grid grid-cols-1 lg:flex space-y-3 lg:space-y-0 lg:space-x-20 px-6 justify-evenly w-full py-3 items-center bg-gray-200'>

            {/* <Input label='Phone number'
                variant=''
                type='number'
                className='rounded'
            /> */}

            <div className='flex-1 flex-col'> 
                <Label> Operator </Label>
                <Select label='Operator'
                        variant=''
                        inputMode="numeric"
                        type='number'
                />
            </div>

            <div className='flex-1 '> 
                <Input label='POLICY NO'
                    variant=''
                    type='text'
                    className='rounded'
                />
             </div>

             <div className="col-span-1 sm:col-span-1">
        
        <div className="flex  text-gray-700 h-3  font-semibold text-sm lg:text-md leading-none mb-3">
            {/* <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-600 to-blue-600">
              🎉 Date of Birth  </span>  🥳 */}
              <span className="">
              Date of Birth  </span>  
              </div>
          <Controller
                  control={control}
                  name="date_of_birth"
                  render={({ field: { onChange, onBlur, value } }) => (
                    //@ts-ignore
                    <DatePicker
                    selected={birthDate}
                    onChange={(date) => {
                      setBirthDate((date));
                      setValue("date_of_birth", date);
                    }}
                    dateFormat="dd-MM-yyyy"
                    className="text-sm lg:text-md h-12 w-full px-4  bg-gray-   border-border-base rounded-sm focus:border-gray-400 no-underline "
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    peekNextMonth
                    showWeekNumbers
                    minDate={new Date(1900, 1, 1)}
                    maxDate={new Date()}
                    placeholderText={("eg..23/12/1996")}
                    // className="w-full"
              />          
                  )}
            />
    </div>

            {/* <div className='flex flex-col'> 
                <Label> Circle </Label>
                <Select label='circle'
                        variant=''
                        type='number'
                />
            </div> */}

            <div className='flex-1 items-center'> 
                
                <Input label = 'Mobile Number'
                        variant = ' '
                        type = 'number'

                        inputMode="numeric"
                />
            </div>

            {/* <Button className='' size='big'>
                Register
            </Button> */}

            <div className='hidden lg:block lg:pt-3'>
                    <Label className=''></Label>
                    <button onClick={ handleClick} className='    bg-gradient-to-r from-blue-600   to-blue-800  p-3 flex text-center   rounded text-white'>
                                Proceed
                    </button>
                </div> 

                <button onClick={ handleClick} className='  lg:hidden  bg-gradient-to-r from-blue-600   to-blue-800  p-3 flex text-center   rounded text-white'>
                            Proceed
                </button>

            </div>

    </div>
  )
}
