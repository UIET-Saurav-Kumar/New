
import Slider from "react-slick";

import Image from 'next/image';
import Link from 'next/link';

export default function ImageSlider() {
    var settings = {

      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
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

      <div>
            <div className="card flex relative w-full h-40 lg:h-72 xl+:h-80 2xl:h-72 md:h-64 ">

                <Link href='/shops/heater-and-geyser-wholesaler'><Image layout='fill' objectFit='fill'
                //  className='rounded-md  w-full  h-40 lg:w-full xl+:h-80 md:h-64 lg:h-72  2xl:h-full 2xl:w-full object-cover object  space-x-9 '   
                    src={'/banner/heater-banner.jpg'} 
                    /></Link>

            </div>
        </div>


         <div>
            <div className="card flex relative w-full h-40 lg:h-72 xl+:h-80 2xl:h-72 md:h-64 ">

                <Image layout='fill' objectFit='fill'
                //  className='rounded-md  w-full  h-40 lg:w-full xl+:h-80 md:h-64 lg:h-72  2xl:h-full 2xl:w-full object-cover object  space-x-9 '   
                    src={'/banner/restaurant.jpg'} 
                    />

            </div>
        </div>


      

          <div className="card flex relative w-full h-40 lg:h-72 xl+:h-80 2xl:h-72 md:h-64 ">

            <Image  layout='fill' objectFit='fill'
            //  className='rounded-md w-full opacity-90  h-40 lg:w-full lg:h-72 xl+:h-80 md:h-64  2xl:h-72 2xl:w-full space-x-9 object-fill object '  
                  src={'/banner/grocery-offer.jpg'} 
                  />

          </div>

        
          <div className="card flex relative w-full h-40 lg:h-72 xl+:h-80 2xl:h-72 md:h-64 ">
            <Image  layout='fill' objectFit='fill'
            //  className='rounded-md  w-full h-40 lg:w-full lg:h-72 xl+:h-80 md:h-64  2xl:h-72 2xl:w-full object-fill  space-x-9 '   
                  src={'/banner/salon.jpg'} 
                  />
          </div> 
    

          <div className="card flex relative w-full h-40 lg:h-72 xl+:h-80 2xl:h-72 md:h-64 ">
            <Image layout='fill' objectFit='fill'
            //  className='rounded-md w-full h-40 lg:w-full lg:h-72 2xl:h-72 xl+:h-80 md:h-64 2xl:w-full object-fill  space-x-9 '   
                src={'/banner/pharma.jpg'} 
                />
          </div>
        

        
          <div className="card flex relative w-full h-40 lg:h-72 xl+:h-80 2xl:h-72 md:h-64 ">

            <Image layout='fill' objectFit='fill'
            //  className='rounded-md  w-full  h-40 lg:w-full lg:h-72 xl+:h-80 md:h-64 2xl:h-72 2xl:w-full object-fill space-x-9 '   
                src={'/banner/cosmetics.jpg'} 
                />

          </div>
      

        
          <div className="card flex relative w-full h-40 lg:h-72 xl+:h-80 2xl:h-72 md:h-64 ">

            <Image layout='fill' objectFit='fill'
            //  className='rounded-md  w-full  h-40 lg:w-full lg:h-72 xl+:h-80 md:h-64 2xl:h-72 2xl:w-full object-fill space-x-9 '   
                src={'/banner/gym.jpg'} 
                />

          </div>
        

        
          <div className="card flex relative w-full h-40 lg:h-72 xl+:h-80 2xl:h-72 md:h-64 ">

            <Image layout='fill' objectFit='fill'
            //  className='rounded-md  w-full  h-40 lg:w-full xl+:h-80 md:h-64 lg:h-72 2xl:h-72 2xl:w-full object-fill  space-x-9 '   
                src={'/banner/furniture.jpg'} 
                />

          </div>
      

        <div>
          <div className="card flex relative w-full h-40 lg:h-72 xl+:h-80 2xl:h-72 md:h-64 ">

            <Image layout='fill' objectFit='fill'
            //  className='rounded-md  w-full  h-40 lg:w-full xl+:h-80 md:h-64 lg:h-72  2xl:h-full 2xl:w-full object-fill space-x-9 '   
                src={'/banner/hotel.jpg'} 
            />

          </div>
        </div>


       
       
      </Slider>
      </div>
    )
}

{/* <div className='' >

<Slider   className='mt-10' {...settings} >
     
        <Image  layout='fill' objectFit='fill'
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
