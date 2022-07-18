
import Slider from "react-slick";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useLocation } from "@contexts/location/location.context";
import { useEffect, useState } from "react";

export default function Tandoor() {

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

      var pathname="/shops/chandigarhgrocerystore";
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

               <Link href='/appointment'><div className=" ">

                <img 
                className="object-contain px-1 rounded-lg cursor-pointer "

                    src={'/community-consultant.jpg'} 
                    />
            </div>
          </Link>


          <Link href='/shops?text=barista'><div className="    ">

            <img className="object-contain cursor-pointer rounded-lg px-1  "
            //  className='rounded-md w-full opacity-90  h-40 lg:w-full lg:h-72 xl+:h-80 md:h-64  2xl:h-72 2xl:w-full space-x-9 object-fill object '  
                  src={'/barista.jpg'} 
                  />

          </div>
          </Link>

            </Slider>

        </div>
    )
}

