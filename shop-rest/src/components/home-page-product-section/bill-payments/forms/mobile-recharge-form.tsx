import Button from '@components/ui/button'
import Input from '@components/ui/input'
import Label from '@components/ui/label'
import Select from '@components/ui/select/select'
 import React from 'react'


export default function MobileRechargeForm({click} :any) {


    console.log(' form recharge ',click)

  return (

    <div className={`${click ? '  grid grid-cols-1 lg:flex lg:items-center place-content-center bg-gray-200 lg:px-6 space-x-4' : 'hidden'}`}>

        <div className = 'grid grid-cols-1 space-y-2 lg:grid-cols-4 place-content-center px-4  flex-col transition duration-500  lg:space-x-10  lg:space-y-0  lg:flex-row justify-between w-full py-3 items-center '>

            <div className='flex-1 flex-col'> 
                <Input label='Phone number'
                    variant=''
                    type='number'
                    className='rounded'
                />
            </div>

            <div className='flex-1 flex-col'> 
                <Label> Operator </Label>
                <Select label='Operator'
                        variant=''
                        type='number'
                />
            </div>

            <div className='flex-1 flex-col'> 
                <Label> Circle </Label>
                <Select label='circle'
                        variant=''
                        type='number'
                />
            </div>

            <div className='flex-1 items-center'> 
                
                <Input label = 'Amount'
                        variant = ' '
                        type = 'number'
                />
            </div>

            {/* <Button className='' size='big'>
                Register
            </Button> */}

        </div>

        <div className = 'mt-3 flex-1'> 
            <Label></Label>
            <button className='bg-blue-700 p-3  px-10 rounded text-white'>
                Go
            </button>
        </div>

        

    </div>
  )
}
