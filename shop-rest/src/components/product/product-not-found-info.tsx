import React from 'react'
import Link from 'next/link';
import { useUI } from "@contexts/ui.context";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useRouter } from "next/router";


export default function ProductNotFoundInfo({shopData}) {
    const { openModal } = useModalAction();
    const router = useRouter();

    const { isAuthorize, displayHeaderSearch, displayMobileSearch } = useUI();

  return (
    <div className="bg-gray-100   text-center items-center p-2 h-screen pt-6 pb-8  ">
         
        {/* <ProductNotFound text="text-not-found" className="w-1/3 mx-auto" /> */}
        <p className="font-normal text-gray-800 text-sm  lg:text-xl font- text-normal  text-center mx-auto">
          <p className="text-gray-800 font-bold text-md">Thank you for visiting us on BuyLowcal.</p><br/> 
          Sorry, we are not serving online at the moment, please visit us at our location <br/>
           <span className="text-sm font-light text-blue-600">{` ${shopData?.address.street_address + ' '}`}</span> <br/>
           Or Call Us on <p className=" text-blue-600 underline">{` ${shopData?.owner?.phone_number}`}</p> Also, 
           For BuyLowcal Community Shop and  <br/>
           <p className="font-semibold mt-3 text-gray-900">
             Upload Invoice/Bill to get <span className="text-indigo-800">5% cash</span> directly in your bank account
          </p>
           <img src='/bill-upload.png' className="mx-auto object-contain "/> <br/>
           
              <span onClick={isAuthorize ? ()=>router.push('/user/upload-invoice/upload-form') : ()=>openModal('REGISTER')} className="underline cursor-pointer hover:underline ">
           Upload Bill
          </span>
        </p>
        {/* <img src='/not-found.png'
        className="object-contain mx-auto"/> */}
      </div>
  )
}
