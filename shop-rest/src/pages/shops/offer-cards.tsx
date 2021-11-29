import React from 'react';
import img from 'next/img';
import Link from 'next/link';


export default function OfferCards() {

    return (

        <div className='grid grid-cols-2 gap-2 mt-4 sm:grid-cols-4 w-full 
                    place-content-center '>
            <Link href='/user/upload-invoice/upload-form'><div className=''><img   src='/shop-offer4.jpg' className='cursor-pointer border object-cover '/></div></Link>
            <Link href='/user/upload-invoice/upload-form'><div className=''><img   src='/shop-offer3.jpg' className=' cursor-pointer border object-cover '/></div></Link>
            <Link href='/user/invite'><div className=''><img   src='/shop-offer2.jpg' className='cursor-pointer border object-cover '/></div></Link>
            <Link href='/user/invite'><div className=''><img   src='/shop-offer1.jpg' className='cursor-pointer border-gray-100 hover-border-red-900 object-cover '/></div></Link>
        </div>
    )
}
