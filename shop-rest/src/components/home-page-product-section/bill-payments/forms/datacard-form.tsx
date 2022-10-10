import Input from '@components/ui/input'
import Label from '@components/ui/label'
import { useModalAction } from '@components/ui/modal/modal.context'
import Select from '@components/ui/select/select'
 import React from 'react'
 import { operators } from './mobile-recharge-form'

export default function DataCardForm({click,variant} :any) {

    console.log('form broadband',click)

    const { openModal } = useModalAction();


    function handleClick()  {
        return   openModal('BILL_PAYMENT')
    }

  return (

        <div className={`${click ? 'block' : 'hidden'}`}>

            <div className='grid grid-cols-1 lg:grid-cols-7  space-y-3 lg:space-y-0 lg:space-x-10 px-6 justify-evenly w-full py-3 items-center bg-gray-200'>

                <Input label='Phone number'
                    variant=''
                    type='number'
                    className='rounded col-span-1'
                /> 

                <div className='flex flex-col col-span-2'> 
                    <Label> Operator </Label>
                    <Select label='Operator'
                            variant=''
                            type='number'
                            className='col-span-2'
                        options= {operators?.filter((opr)=> opr.ServiceType=='Datacard')}
                    />
                </div>

                {/* <div className='flex-1'> 
                    <Input label='Account Number/ User Name'
                        variant={variant}
                        type='text'
                        className='rounded'
                    />
                </div> */}

                <div className='flex flex-col  col-span-2'> 
                    <Label> Circle </Label>
                    <Select label='circle'
                            variant=''
                            type='number'
                            className='col-span-2'
                    />
                </div>

                <div className='flex-1 items-center col-span-1/2'> 
                    
                    <Input label = 'Amount'
                            variant = ' '
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

                    <button onClick={ handleClick} className='  lg:hidden  bg-gradient-to-r from-blue-600   to-blue-800  p-3 flex text-center   rounded text-white'>
                                Proceed
                    </button>
            </div>

    </div>
  )
}
 

