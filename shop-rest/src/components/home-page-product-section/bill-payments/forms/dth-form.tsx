import Input from '@components/ui/input'
import Label from '@components/ui/label'
import { useModalAction } from '@components/ui/modal/modal.context';
import Select from '@components/ui/select/select'
import React from 'react'
import { operators } from './mobile-recharge-form';


export default function DthForm({click,variant} :any) {


    const { openModal } = useModalAction();


    function handleClick()  {
        return   openModal('BILL_PAYMENT')
    }

    console.log(' form dth ',click);

  return (

    <div className={`${click ? 'block' : 'hidden'}`}>

            <div className='grid grid-cols-1 lg:flex space-y-3 lg:space-y-0 lg:space-x-20 px-6 justify-evenly w-full py-3 lg:py-4 items-center bg-gray-200'>

            {/* <Input label='Phone number'
                variant=''
                type='number'
                className='rounded'
            /> */}

            <div className='flex-1 flex-col'> 
                <Label> Operator </Label>
                <Select label='Operator'
                        variant=''
                        border='10px'
                        options= {operators?.filter((opr)=> opr.ServiceType=='DTH')}
                     // styles={customStyles}
                        
                />
            </div>

            <div className='flex-1'> 
                <Input label='Mobile Number/Consumer Id'
                     variant={variant}
                    type='number'
                    className='rounded '
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
                
                <Input  label = 'Amount'
                         variant={variant}
                        type = 'number'
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

                <button onClick={ handleClick} className=' lg:hidden  bg-gradient-to-r from-blue-600   to-blue-800  p-3 flex text-center   rounded text-white'>
                            Proceed
                </button>

            </div>

    </div>
  )
}
