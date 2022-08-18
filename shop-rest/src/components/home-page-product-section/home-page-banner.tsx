
import Slider from "react-slick";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useLocation } from "@contexts/location/location.context";
import { useEffect, useState } from "react";
 

export default function RedbullBanner() {

  const router = useRouter();
  const { query } = useRouter();
  const {getLocation} =useLocation();

  const address =   getLocation?.formattedAddress || "chandigarh";

  function location(){
    return address?.includes('Mohali') || address?.includes('Chandigarh') || address.includes('Panchkula') ;
}

function location2(){
  return address?.includes('Delhi')   ;
}

function location3(){
  return address?.includes('Gurgaon')   ;
}



    function getLink(category:String){

      var pathname="/"+router.locale+"/shops?category="+category.replace("&","-");
      

      return pathname;
      
    }

    function getLinkGrocery(){

      var pathname="/shops/chandigarh-grocery-store";
      return pathname;
    }

    function getLinkKosmetics(){
      var pathname="/shops/kosmetics-india";
       return pathname;
    }


    function getLinkSalon(){
      var pathname="/salon-page";
       return pathname;
    }

    //get screen width
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    useEffect(() => {
        window.addEventListener("resize", () => {
            setScreenWidth(window.innerWidth);
        }
        );
    }, []);


    var settings = {

      dots: true,
      infinite: true,
      speed: 200,
       slidesToShow: screenWidth > 768 ? 2 : 1,
      autoplay: true,
      slidesToScroll: 1,
      arrows: false,
    };

   
    

    return (


      <div className='w-full px-2 '>
      
      <Slider {...settings}>

        
       
      { location() && <Link href='salon-products?text=pick+any&category='>
        <div className="card flex relative w-full px-1 ">

            <Image
             width={886}
             height={356}
             layout="intrinsic"
             objectFit="cover"
             priority={true}
             className="rounded-lg "
              // className="object-contain px-1 rounded-lg cursor-pointer h-full w-full"
              src={'/pick-5.jpeg'} 
                  />

          </div>
          </Link> }
          
           


            { location() && <Link href='/user/upload-invoice/upload-form'>
              <div className="card flex relative w-full px-1 ">

            <Image 
            // className="object-contain cursor-pointer rounded-lg px-1 h-full w-full"
            //  className='rounded-md w-full opacity-90  h-40 lg:w-full lg:h-72 xl+:h-80 md:h-64  2xl:h-72 2xl:w-full space-x-9 object-fill object '  
                  src={'/invoice-upload.jpeg'} 
                  width={886}
                  height={356}
                  layout="intrinsic"
                  priority={true}
                  objectFit="cover"
                  className="rounded-lg  "
                  />

          </div>
          </Link>}

      </Slider>
      { location3() &&  <Link href='/shops?text=Ambience+Mall'>
        <div className="card flex relative w-full ">

            <Image 
             width={1772}
             height={356}
             layout="intrinsic"
             priority={true}
             objectFit="cover"
             className="rounded-lg  "
            // className="object-contain cursor-pointer rounded-lg px-1  "
              //  className='rounded-md w-full opacity-90  h-40 lg:w-full lg:h-72 xl+:h-80 md:h-64  2xl:h-72 2xl:w-full space-x-9 object-fill object '  
                  src={'/delhi/ambience-mall-banner.jpg'} 
                  />

            </div>
            </Link> }

            { location2() &&  <Link href='/shops?text=Select+Citywalk'><div className="card flex relative w-full  ">

            <Image 
             width={1772}
             height={356}
             layout="intrinsic"
             priority={true}
             objectFit="cover"
             className="rounded-lg px-1"
            // className="object-cover cursor-pointer rounded-lg px-1 w-full  "
              //  className='rounded-md w-full opacity-90  h-40 lg:w-full lg:h-72 xl+:h-80 md:h-64  2xl:h-72 2xl:w-full space-x-9 object-fill object '  
                  src={'/delhi/city-walk-mall.jpg'} 
                  />

            </div>
            </Link> }
      </div>
    )
}

 