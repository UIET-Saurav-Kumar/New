
import Slider from "react-slick";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useLocation } from "@contexts/location/location.context";
import { useEffect, useState } from "react";

export default function ElanteBanner() {

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
      speed: 200,
       slidesToShow: screenWidth > 768 ? 2 : 1,
      autoplay: true,
      slidesToScroll: 1,
      arrows: false,
    };

   
    

    return (


      <div className=' '>
      
      {/* <Slider {...settings}> */}
       
     { location() && <Link href='/shops?text=Elante'><div className="card flex relative w-full  ">

           { screenWidth > 768 ? <img 

                  className="object-contain px-1 rounded-lg cursor-pointer h-full w-full"

           
                  src={'/elante/elante-web.jpg'} 
                  /> :
                  <img 
                  className="object-contain px-1 rounded-lg cursor-pointer h-full w-full"

           
                  src={'/elante/elante-mobile.jpg'} 
                  />

           }

          </div>
          </Link>
}


          {/* <Link href='/user/upload-invoice/upload-form'><div className="card flex relative w-full  ">

            <img className="object-contain cursor-pointer rounded-lg px-1 h-full w-full"
            //  className='rounded-md w-full opacity-90  h-40 lg:w-full lg:h-72 xl+:h-80 md:h-64  2xl:h-72 2xl:w-full space-x-9 object-fill object '  
                  src={'/invoice-upload.jpeg'} 
                  />

          </div>
          </Link> */}

      {/* </Slider> */}
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
