
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
 

const inputFields = [

  {label:'Name of Owner:',type:'text',name:'name_of_owner'},
  {label: 'Date of Birth',type:'date',name:'date_of_birth'},
  {label: 'Do you smoke or chew tobacco?',type:'radio',name:'smoke_or_chew_tobacco'},
  {label: 'Annual Income',type:'text',name:'annual_income'},
  {label: 'Educational Qualification',type:'text',name:'educational_qualification'},
  {label: 'College graduate & above',type:'text',name:'college_graduate'},
  {label: 'Occupation Type',type:'text',name:'occupation_type'},
  {label: 'Pin Code',type:'text',name:'pin_code'},

]


export default function TermLifeInsurance({view, width,height,label,click,...props}:any) {

  console.log('click',click);

  return ( 

    <Link href='/term-life-insurance'>

  <div onClick = {view}  
        className ={`text-center active:border-gray-400 w-full cursor-pointer border rounded-lg text-center' } ${props?.cn}`}>
        
          <Image priority = {true}
            src='/insurance/umbrella.png' 
            layout='intrinsic'
            objectFit='contain'
            width={width}
            height={height}
          />

         <br></br>
         
        <span className={`${click ? 'underline font-semibold text-lg tracking-wide font-sans bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-purple-600 to-blue-600 ' : null} text-sm text-gray-900`}>
          {label}
        </span>

    </div>
    </Link>

  )
}
