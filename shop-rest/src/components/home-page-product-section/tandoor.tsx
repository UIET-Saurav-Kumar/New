import React from 'react'
import Link from 'next/link';
import { useCategoriesQuery } from "@data/home/use-categories-query";
import { useRouter } from "next/router";
import { tail } from 'lodash';


export default function Tandoor() {

    const router = useRouter();
	const { query } = useRouter();
    const { type } = query;

    function getLink(tandoor :any) {
		var pathname="/"+router.locale+"/tandoor-page?category="+tandoor.replace("&","-");
		// const { type, ...rest } = query;
		// var text=(query.text)?query.text:"";

		return pathname;
		// +"?text="+text;
	}


    return (

     <Link className="categories-link"  href={getLink('Tandoors of Chandigarh')}>   
   <div className='flex w-full mt-0 -sm-mt-60 border'>   
   <img src='/tandoor-banner.jpg' className=' md:h-70 object-contain pt-0 cursor-pointer lg:w-full -sm-pt-60 lg:object-contain lg:mt-8 xl:object-cover'/>
            
              </div> 
        </Link>
    )
}
