import React from 'react';
import img from 'next/img';

export default function OfferCards() {

    return (

        <div className='grid grid-cols-2 gap-2 mt-4 sm:grid-cols-4 w-full 
                    place-content-center '>
            <div className=''><img layout='fill' objectFit='cover' src='/shop-offer4.jpg' className=' object-cover '/></div>
            <div className=''><img layout='fill' objectFit='cover' src='/shop-offer3.jpg' className=' object-cover '/></div>
            <div className=''><img layout='fill' objectFit='cover' src='/shop-offer2.jpg' className=' object-cover '/></div>
            <div className=''><img layout='fill' objectFit='cover' src='/shop-offer1.jpg' className=' object-cover '/></div>
        </div>
    )
}
