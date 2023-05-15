import Slider from "react-slick";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useLocation } from "@contexts/location/location.context";
import { useEffect, useState } from "react";

export default function TopBanners() {

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
    }, [screenWidth]);

    var settings = {

      dots:  screenWidth < 768 ? false : false,
      infinite: true,
      speed: 700,
      slidesToShow: screenWidth > 768 ? 4 : 2,
      autoplay:  screenWidth < 768 ? true : true,
      slidesToScroll: 4,
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


        <div className='relative z-40 mx-1  border-l-none'>
      
            <Slider {...settings}>

            {
            // location() &&
              // <Link href='/appointment'>
              // <div className= "px-1  ">

                     
                        <img src='/top-banners/2.jpeg' className="object-contain rounded-2xl  shadow-2xl  h-72 w-72 lg:h-full lg:w-full  px-1  ro " />
                // </div>
            // </Link>
           }


          {
          // location() && 

          // <Link href='/shops?text=barista&text_type=shop&avail='>
            // <div className="  px-1 ">

               
                  <img src='/top-banners/1.jpeg' className='object-contain rounded-2xl  shadow-2xl  h-72 w-72 lg:h-full lg:w-full   px-1     ' />

          // </div>
          // </Link>
          }

           {
            // location() &&
              // <Link href='/appointment'>
              // <div className= "px-1  ">

                     
                        <img src='/top-banners/2.jpeg' className="object-contain rounded-2xl  shadow-2xl  h-72 w-72 lg:h-full lg:w-full   px-1    " />
                // </div>
            // </Link>
           }

            {
            // location() &&
              // <Link href='/appointment'>
              // <div className= "px-1  ">

                     
                        <img src='/top-banners/3.jpeg' className="object-contain rounded-2xl  shadow-2xl  h-72 w-72 lg:h-full lg:w-full   px-1    " />
                // </div>
            // </Link>
           }

            {
            // location() &&
              // <Link href='/appointment'>
              // <div className= "px-1  ">

                     
                        <img src='/top-banners/4.jpeg' className="object-contain rounded-2xl  shadow-2xl  h-72 w-72 lg:h-full lg:w-full   px-1    " />
                // </div>
            // </Link>
           }

            {
            // location() &&
              // <Link href='/appointment'>
              // <div className= "px-1  ">

                     
                        <img src='/top-banners/5.jpeg' className="object-contain rounded-2xl  shadow-2xl  h-72 w-72 lg:h-full lg:w-full   px-1    " />
                // </div>
            // </Link>
           }

            {
            // location() &&
              // <Link href='/appointment'>
              // <div className= "px-1  ">

                     
                        <img src='/top-banners/6.jpeg' className="object-contain rounded-2xl  shadow-2xl  h-72 w-72 lg:h-full lg:w-full   px-1    " />
                // </div>
            // </Link>
           }

            {
            // location() &&
              // <Link href='/appointment'>
              // <div className= "px-1  ">

                     
                        <img src='/top-banners/7.jpeg' className="object-contain rounded-2xl  shadow-2xl  h-72 w-72 lg:h-full lg:w-full   px-1    " />
                // </div>
            // </Link>
           }

            {
            // location() &&
              // <Link href='/appointment'>
              // <div className= "px-1  ">

                     
                        <img src='/top-banners/8.jpeg' className="object-contain rounded-2xl  shadow-2xl  h-72 w-72 lg:h-full lg:w-full   px-1    " />
                // </div>
            // </Link>
           }

            </Slider>

        </div>
    )
}

