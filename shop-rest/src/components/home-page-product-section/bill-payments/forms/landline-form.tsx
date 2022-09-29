import Input from '@components/ui/input'
import Label from '@components/ui/label'
import Select from '@components/ui/select/select'
 import React from 'react'

export default function LandlineForm({click} :any) {

console.log('dth form',click)

  return (

    <div className={`${click ? 'block' : 'hidden'}`}>

            <div className='flex  space-x-60 px-6 justify-evenly w-full py-3 items-center bg-gray-200'>

            {/* <Input label='Phone number'
                variant=''
                type='number'
                className='rounded'
            /> */}

            <div className='flex-1 flex-col'> 
                <Label> Operator </Label>
                <Select label='Operator'
                        variant=''
                        type='number'
                />
            </div>

            <div className='flex-1 '> 
                <Input label='Landline Number (with STD Code)'
                    variant=''
                    type='text'
                    className='rounded'
                />
             </div>

            {/* <div className='flex flex-col'> 
                <Label> Circle </Label>
                <Select label='circle'
                        variant=''
                        type='number'
                />
            </div> */}

            {/* <div className='flex-1 items-center'> 
                
                <Input label = 'Amount'
                        variant = ' '
                        type = 'number'
                />
            </div> */}

            {/* <Button className='' size='big'>
                Register
            </Button> */}

            <button className='bg-blue-700 p-3  rounded text-white'>
                Go
            </button>

            </div>

    </div>
  )
}
