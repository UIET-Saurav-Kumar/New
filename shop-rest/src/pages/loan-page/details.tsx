
import  Button  from '@components/ui/button';
import Input  from '@components/ui/input';
import Label from '@components/ui/label';
import Radio from '@components/ui/radio/radio';
import React from 'react';
import { useTranslation } from 'react-i18next';
import LoanPageHeader from './loan-page-header';

export default function LoanDetailsPage() {

    const { t } = useTranslation();

    return (
        <>

         <LoanPageHeader/>

        <div className='max-h-screen flex flex-col '>

           <div className='flex space-y-6 items-center h-screen bg-gray-50 flex-col'>

               <div className='flex items-center mt-10'>
                   <h1 className='text-3xl text-bold text-gray-600'>
                       Personal Details
                   </h1>
               </div>

               <form className=" p-16 rounded-lg w-full lg:w-1/2 border  bg-white">
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                    for="grid-first-name">
                    Your Name as Per PAN
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                    id="grid-first-name" type="text" placeholder=""/>
                <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                </div>
            <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    PAN
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                        id="grid-last-name" type="text" placeholder=""/>
            </div>

            <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    Date of Birth (as per PAN)
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                        id="grid-last-name" type="date" placeholder=""/>
            </div>

            <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    Gender
                </label>
              <div className='flex space-x-6'>
                <Radio
                    id="male"
                    type="radio"
                    name=''
                    // {...register("payment_gateway")}
                    value="male"
                    label={t("Male")}
                    className=""
                />

                <Radio
                    id="female"
                    type="radio"
                    name=''
                    // {...register("payment_gateway")}
                    value="female"
                    label={t("Female")}
                    className=""
                />
            </div>
            </div>
        </div>



        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                    for="grid-address">
                Current Residence Address
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                   id="grid-password" type="text" placeholder=""/>
            {/* <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
            </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                for="grid-city">
                    City
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    id="grid-city" type="text" placeholder=""/>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                State
            </label>
            <div className="relative">
                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                <option>Punjab</option>
                <option>Himachal</option>
                <option>Delhi</option>
                <option>haryana</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                Pincode
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210"/>
            </div>
        </div>

        <div className="w-full mt-6 md:w-1/2 px-3">
           
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                    for="grid-house">
                Do you own this house ?
            </label>

            <div className='flex space-x-6'>
                <Radio
                    id="no"
                    type="radio"
                    name=''
                    // {...register("payment_gateway")}
                    value="cod"
                    label={t("Own House")}
                    className=""
                />

                <Radio
                    id="yes"
                    type="radio"
                    name=''
                    // {...register("payment_gateway")}
                    value="cashfree"
                    label={t("Rented")}
                    className=""
                />
            </div>
        </div>

        <Button className='mt-10'>Continue</Button>

     </form>
            </div>
            <div className='bg-gray-900 w-full h-20 text-center bottom-38 mx-auto items-center'>
            <h1 className='text-white text-center flex items-center'>
                 © Local Ventures Pvt.Ltd. All Rights Reserved
            </h1>
        </div>
        </div>

        </>
    )
}
