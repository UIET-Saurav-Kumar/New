import React from 'react'
import Link from 'next/link';
import { useCategoriesQuery } from "@data/home/use-categories-query";
import { useRouter } from "next/router";
import { useUI } from "@contexts/ui.context";
import { useModalAction } from "@components/ui/modal/modal.context";
import Image from 'next/image';


export default function TreePlantationBanner() {

    const router = useRouter();
	const { query } = useRouter();
    const { isAuthorize } = useUI();
    const { openModal } = useModalAction();

    const { type } = query;

    // function getLink() {
		
    //         router.push("/appointment")
	// }

    return (

        <div  className='flex w-full mt-8 md:mt-10 h-auto '>   
               < Image        quality='40'
                src='/tree.jpg' 
                width={1772}
                height={356}
                layout="intrinsic"
                objectFit="cover"
                
                className="rounded-lg "
    //   className='md:h-auto object-contain cursor-pointer pt-0 lg:w-full -sm-pt-60 
    //              lg:object-contain lg:mt-8 xl:object-cover'
                    />
                    
        </div> 
       
    )
}
