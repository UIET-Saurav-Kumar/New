
import Slider from "react-slick";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useLocation } from "@contexts/location/location.context";
import { useEffect, useState } from "react";

export default function Banners() {

  const router = useRouter();
  const { query } = useRouter();
  const {getLocation} =useLocation();

  const address =   getLocation?.formattedAddress || "chandigarh";

  function location(){
    return address?.includes('Mohali') || address?.includes('Chandigarh') || address.includes('Panchkula') ;
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
      speed: 500,
      slidesToShow: screenWidth > 768 ? 2 : 1,
      autoplay: true,
      slidesToScroll: 1,
      arrows: false,
     
     

      // responsive: [
      //   {
      //     breakpoint: 320,
      //     settings: { slidesToShow: 1, slidesToScroll: 1, infinite: false }
      //   },
      //   {
      //     breakpoint: 768,
      //     settings: { slidesToShow: 1, slidesToScroll: 1, infinite: false }
      //   },
      //   {
      //     breakpoint: 1024,
      //     settings: { slidesToShow: 1, slidesToScroll: 1, infinite: false }
      //   }
      // ]
    };

   
    

    return (


        <div className='mx-1'>
      
            <Slider {...settings}>

            {location() &&  <Link href='/appointment'>
              <div className="px-1 ">

                       {/* < Image    
                     quality='40' 
                     width={886}
                     height={356}
                     layout="intrinsic"
                     priority={true}
                      
                     objectFit="cover"
                     className="rounded-lg  "
 
                        src={'/community-consultant.jpg'} 
                        /> */}
                        <img src='/community-consultant.jpg' className="object-contain px-1 rounded-lg cursor-pointer" />
                </div>
            </Link>
           }


          {location() && <Link href='/shops?text=barista&text_type=shop&avail='>
            <div className=" px-1">

               {/* < Image        quality='40' 
             width={886}
             height={356}
             layout="intrinsic"
             priority={true}
             
             objectFit="cover"
             className="rounded-lg  "
           
                  src={'/barista.jpg'} 
                  /> */}
                  <img src='/barista.jpg' className='object-contain px-1 rounded-lg cursor-pointer ' />

          </div>
          </Link>}

            </Slider>

        </div>
    )
}

