import React from 'react';
import img from 'next/img';
import { useUI } from "@contexts/ui.context";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useRouter } from "next/router";


export default function OfferCards() {
    const router = useRouter();
    const { isAuthorize } = useUI();
    const { openModal } = useModalAction();


    function getLink() {
		
        if (isAuthorize) {
            window.open('/user/upload-invoice/upload-form', '_blank')
          }
          if (!isAuthorize) {
            return openModal("LOGIN_VIEW");
          }
		// +"?text="+text;
	}

    


    return (

        <div className='grid grid-cols-2 gap-2 mt-4 sm:grid-cols-4 w-full 
                    place-content-center '>
            <div className=''><img  onClick={getLink}  src='/shop-offer4.jpg' className='cursor-pointer border object-cover '/></div>
            <a  href='/user/upload-invoice/upload-form' target='_blank'><div className=''><img   src='/shop-offer3.jpg' className=' cursor-pointer border object-cover '/></div></a>
            <a  href='/user/invite' target='_blank'><div className=''><img   src='/shop-offer2.jpg' className='cursor-pointer border object-cover '/></div></a>
            <a  href='/user/invite' target='_blank'><div className=''><img   src='/shop-offer1.jpg' className='cursor-pointer border-gray-100 hover-border-red-900 object-cover '/></div></a>
        </div>
    )
}
