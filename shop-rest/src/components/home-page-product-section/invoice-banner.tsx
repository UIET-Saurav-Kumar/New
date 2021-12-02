import React from 'react'
import Link from 'next/link';
import { useCategoriesQuery } from "@data/home/use-categories-query";
import { useRouter } from "next/router";
import { useUI } from "@contexts/ui.context";
import { useModalAction } from "@components/ui/modal/modal.context";


export default function InvoiceBanner() {

    const router = useRouter();
	const { query } = useRouter();
    const { isAuthorize } = useUI();
    const { openModal } = useModalAction();


    const { type } = query;

    function getLink() {
		
        if (isAuthorize) {
            router.push("/user/upload-invoice")
          
          }
          if (!isAuthorize) {
            
            return openModal("LOGIN_VIEW");
          }
		// +"?text="+text;
	}


    return (

   
   <div onClick={getLink} className='flex w-full mt-8 md:mt-10 h-auto '>   
   <img src='/invoice.jpg' className=' md:h-auto object-contain cursor-pointer pt-0 lg:w-full -sm-pt-60 lg:object-contain lg:mt-8 xl:object-cover'/>
            
              </div> 
       
    )
}
