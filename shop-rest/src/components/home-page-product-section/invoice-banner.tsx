import React from 'react'
import Link from 'next/link';
import { useCategoriesQuery } from "@data/home/use-categories-query";
import { useRouter } from "next/router";
import { tail } from 'lodash';


export default function InvoiceBanner() {

    const router = useRouter();
	const { query } = useRouter();
    const { type } = query;

    function getLink() {
		var pathname="/user/upload-invoice";
		// const { type, ...rest } = query;
		// var text=(query.text)?query.text:"";

		return pathname;
		// +"?text="+text;
	}


    return (

     <Link href={getLink()}>   
   <div className='flex w-full mt-8 md:mt-10 h-auto '>   
   <img src='/invoice.jpg' className=' md:h-auto object-contain cursor-pointer pt-0 lg:w-full -sm-pt-60 lg:object-contain lg:mt-8 xl:object-cover'/>
            
              </div> 
        </Link>
    )
}
