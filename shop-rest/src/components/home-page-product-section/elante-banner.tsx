
import Slider from "react-slick";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useLocation } from "@contexts/location/location.context";
import { useEffect, useState } from "react";

export default function ImageSlider() {

  const router = useRouter();
  const { query } = useRouter();
  const {getLocation} =useLocation();

  

    //get screen width
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    useEffect(() => {
        window.addEventListener("resize", () => {
            setScreenWidth(window.innerWidth);
        }
        );
    }, [screenWidth]);


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

      <> 


      <div className=' '>
      
      <Slider {...settings}>
       
     
      </Slider>

        
      </div>

      </>
    )
}

