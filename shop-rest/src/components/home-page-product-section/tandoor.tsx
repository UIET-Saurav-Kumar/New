import React from 'react'
import Link from 'next/link';
import { useRouter } from "next/router";
import { useLocation } from "@contexts/location/location.context";


export default function Tandoor() {

    const router = useRouter();
	  const { query } = useRouter();
    const { type } = query;
    const {getLocation} =useLocation()


    function getLink(tandoor :any) {

		var pathname="/"+router.locale+"/tandoor-page?category="+tandoor.replace("&","-");
		// const { type, ...rest } = query;
		// var text=(query.text)?query.text:"";

		return pathname;
		// +"?text="+text;
	}

    const address =   getLocation?.formattedAddress || "chandigarh";

    function location(){
        return address?.includes('Mohali') || address?.includes('Chandigarh') || address.includes('Panchkula') ;
    }


    return (

    <div className={` ${location() ? 'block' : 'hidden'}`}><Link href={getLink('Tandoors of Chandigarh')}>   
   <div className='flex w-full mt-0 -sm-mt-60 border'>   
   <img src='/tandoor-banner.jpg' className=' md:h-70 object-contain pt-0 lg:w-full -sm-pt-60 lg:object-contain lg:mt-8 xl:object-cover'/>
            
              </div> 
        </Link></div>
    )
}
