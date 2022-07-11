
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


      <div className='space-x-2 mx-3'>
      
      <Slider {...settings}>

       <Link href='salon-products?text=pick+any&category='><div className="card flex relative w-full  ">

            <img className="object-contain  rounded-lg h-full w-full"
            //  className='rounded-md w-full opacity-90  h-40 lg:w-full lg:h-72 xl+:h-80 md:h-64  2xl:h-72 2xl:w-full space-x-9 object-fill object '  
                  src={'/pick-5.jpeg'} 
                  />

          </div>
          </Link>


          <Link href='/user/upload-invoice/upload-form'><div className="card flex relative w-full  ">

            <img className="object-contain rounded-lg  h-full w-full"
            //  className='rounded-md w-full opacity-90  h-40 lg:w-full lg:h-72 xl+:h-80 md:h-64  2xl:h-72 2xl:w-full space-x-9 object-fill object '  
                  src={'/invoice-upload.jpeg'} 
                  />

          </div>
          </Link>

      </Slider>
      </div>
    )
}

{/* <div className='' >

<Slider   className='mt-10' {...settings} >
     
        <img className="object-fill"
        //  className='rounded-md w-48 h-32 md:h-48 md:w-full lg:w-96  lg:h-48 space-x-9'  src={'/images/nearbuy-banner3.jpg'} 
             style={{objectFit:"fill"}}   />

        <Image layout='fill' objectFit='fill'
        //  className='rounded-md w-48 h-32 md:h-48 md:w-full lg:w-96 lg:h-48 space-x-9 '   src={'/images/nearbuy-banner1.jpg'} 
                 style={{objectFit:"fill"}}  />

        <Image layout='fill' objectFit='fill'
        //  className='rounded-md w-48 h-32 md:h-48 md:w-full lg:w-96 lg:h-48  space-x-9 '   src={'/images/nearbuy-banner1.jpg'} 
              style={{objectFit:"fill"}}  />
        
        <Image layout='fill' objectFit='fill'
        //  className='rounded-md w-48  h-32 md:h-48 md:w-full lg:w-96 lg:h-48 space-x-9 '    src={'/images/nearbuy-banner3.jpg'} 
                style={{objectFit:"fill"}}  />

</Slider>
</div> */}

// var settings = {
//   dots: true,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   autoplay: true,
//   centerMode: true,
//   centerPadding: '200px',
//   adaptiveHeight: true,
//   // variableWidth: true,
// };
