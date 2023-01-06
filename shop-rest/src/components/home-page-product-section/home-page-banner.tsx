
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
       slidesToShow: screenWidth > 768 ? 1 : 1,
      autoplay: true,
      slidesToScroll: 1,
      arrows: false,
    };

   
    

    return (


      <div className='w-full px-2 '>
      
      <Slider {...settings}>

        
       
      { location() && <Link href='salon-near-me'>
        <div className="card flex relative w-full px-1 ">

               {/* <Image 
                priority={true}
                quality='40'
                width={886}
                height={356}
                layout="intrinsic"
                objectFit="cover"
                className="rounded-lg"
                 src={'/pick-5.jpeg'} 
               /> */}
               <img src="/pick-5.jpeg" className="object-contain px-1 rounded-lg cursor-pointer h-full w-full" />

          </div>
          </Link> }
          
            { location() && <Link href='/user/upload-invoice/upload-form'>
              <div className="card flex relative w-full px-1 ">

               {/* <Image   
                  priority={true} 
                  quality='40' 
                   
                  src={'/invoice-upload.jpeg'} 
                  width={886}
                  height={356}
                  layout="intrinsic"
                  objectFit="cover"
                  className="rounded-lg"
              /> */}
              <img src="/invoice-upload.jpeg" className="object-contain cursor-pointer rounded-lg px-1 h-full w-full" />

          </div>
          </Link>}

      </Slider>
      { location3() &&  <Link href='/shops?text=Ambience+Mall'>
        <div className="card flex relative w-full ">

               {/* <Image 
               priority={true}
               quality='40' 
              width={1772}
              height={356}
              layout="intrinsic"
              
              objectFit="cover"
              className="rounded-lg  "
            
                  src={'/delhi/ambience-mall-banner.jpg'} 
                  /> */}
                  <img className="w-full h-full object-cover rounded-lg" 
                       src={'/delhi/ambience-mall-banner.jpg'} 
                       alt="banner" />

        </div>
            </Link> }

            { location2() &&  <Link href='/shops?text=Select+Citywalk'>
              <div className="card flex relative w-full  ">

               {/* <Image 
                quality='40' 
                priority={true}
                width={1772}
                height={356}
                layout="intrinsic"
                objectFit="cover"
                className="rounded-lg px-1"
             
                  src={'/delhi/city-walk-mall.jpg'} 
                  /> */}
                  <img src="/delhi/city-walk-mall.jpg" className="  w-full h-full object-cover rounded-lg" alt="banner" />

            </div>
            </Link> }
      </div>
    )
}

 