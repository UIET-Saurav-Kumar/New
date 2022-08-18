
import Slider from "react-slick";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useLocation } from "@contexts/location/location.context";
import { useEffect, useState } from "react";

export default function ImageSlider({data}:any) {

  const router = useRouter();
  const { query } = useRouter();
  const {getLocation} =useLocation();

 
    //get screen width
    // const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    // useEffect(() => {
    //     window.addEventListener("resize", () => {
    //         setScreenWidth(window.innerWidth);
    //     }
    //     );
    // }, []);


    var settings = {

      dots: true,
      infinite: true,
      speed: 200,
      //  slidesToShow: screenWidth > 768 ? 2 : 1,
      autoplay: true,
      slidesToScroll: 1,
      arrows: false,
    };

   
    

    return (

      <> 


      <div className=' '>
      
        <Slider {...settings}>
        
          {data.map((item, index) => {
            return (
              <img src={item.thumbnail} alt={item.title} key={index} className='w-full h-full object-fit' />
              //   <Image     loading='eager' quality='40' src={item?.thumbnail} alt={'img'} key={index} className='' layout="fill" />
            );
          }
          )}
        </Slider>

      </div>

      </>
    )
}

{/* <div className='' >

<Slider   className='mt-10' {...settings} >
     
        <img className="object-fill"
        //  className='rounded-md w-48 h-32 md:h-48 md:w-full lg:w-96  lg:h-48 space-x-9'  src={'/images/nearbuy-banner3.jpg'} 
             style={{objectFit:"fill"}}   />

          <Image     loading='eager' quality='40' layout='fill' objectFit='fill'
        //  className='rounded-md w-48 h-32 md:h-48 md:w-full lg:w-96 lg:h-48 space-x-9 '   src={'/images/nearbuy-banner1.jpg'} 
                 style={{objectFit:"fill"}}  />

          <Image     loading='eager' quality='40' layout='fill' objectFit='fill'
        //  className='rounded-md w-48 h-32 md:h-48 md:w-full lg:w-96 lg:h-48  space-x-9 '   src={'/images/nearbuy-banner1.jpg'} 
              style={{objectFit:"fill"}}  />
        
          <Image     loading='eager' quality='40' layout='fill' objectFit='fill'
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
