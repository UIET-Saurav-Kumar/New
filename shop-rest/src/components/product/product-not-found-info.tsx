import React from 'react'
import Image from 'next/image';
import { useUI } from "@contexts/ui.context";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useRouter } from "next/router";
import Link from 'next/link';

export default function ProductNotFoundInfo({shopData}) {
    const { openModal } = useModalAction();
    const router = useRouter();

    //on page load scroll(0,0)
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { isAuthorize, displayHeaderSearch, displayMobileSearch } = useUI();

  return (

    <div className='w-full h-full '
     >
          
           <Image 
          onClick={isAuthorize ? ()=>router.push('/user/upload-invoice/upload-form') : ()=> openModal('OTP_REGISTER')} 
         quality='40'
         src='/shop-invoice.jpeg'
          layout='fill'
          objectFit='contain'
          priority={true}
           />
           
      </div>
  )
}
