
import Slider from "react-slick";




export default function ImageSlider() {
    var settings = {

      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      autoplay: true,
      slidesToScroll: 1,
      arrows: true,
     
     

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
      <Slider {...settings}>

       <div className=' w-full h-52 '>

          <div className="card">

          <img  className='rounded-md w-full  h-40 lg:w-full 2xl:h-full 2xl:w-full space-x-9'  
                src={'/banner/new-7.png'} 
                objectFit='contain'   />

          </div>

        </div>

        <div>
          <div className="card">
            <img className='rounded-md  w-full h-40 lg:w-full 2xl:h-full 2xl:w-full  space-x-9 '   
                src={'/banner/new-2.png'} 
                objectFit='contain'  />
            </div> 
        </div>

        <div>

          <div className="card">

          <img className='rounded-md  h-40 lg:w-full 2xl:h-full 2xl:w-full w-full  space-x-9 '   
               src={'/banner/new-3.png'} 
               objectFit='contain'  />

              
          </div>
        </div>

        <div>
          <div className="card">

          <img className='rounded-md  w-full  h-40 lg:w-full 2xl:h-full 2xl:w-full  space-x-9 '   
               src={'/banner/new-4.png'} 
               objectFit='contain'  />

          </div>
        </div>

        <div>
          <div className="card">

          <img className='rounded-md  w-full  h-40 lg:w-full 2xl:h-full 2xl:w-full  space-x-9 '   
               src={'/banner/new-5.png'} 
               objectFit='contain'  />

          </div>
        </div>

        <div>
          <div className="card">

          <img className='rounded-md  w-full  h-40 lg:w-full 2xl:h-full 2xl:w-full  space-x-9 '   
               src={'/banner/new-6.png'} 
               objectFit='contain'  />

          </div>
        </div>

        <div>
          <div className="card">

          <img className='rounded-md  w-full  h-40 lg:w-full 2xl:h-full 2xl:w-full  space-x-9 '   
               src={'/banner/new-8.png'} 
               objectFit='contain'  />

          </div>
        </div>

       
      </Slider>
    )
}

{/* <div className='' >

<Slider   className='mt-10' {...settings} >
     
        <img  className='rounded-md w-48 h-32 md:h-48 md:w-full lg:w-96  lg:h-48 space-x-9'  src={'/images/nearbuy-banner3.jpg'} 
             style={{objectFit:"fill"}}   />

        <img className='rounded-md w-48 h-32 md:h-48 md:w-full lg:w-96 lg:h-48 space-x-9 '   src={'/images/nearbuy-banner1.jpg'} 
                 style={{objectFit:"fill"}}  />

        <img className='rounded-md w-48 h-32 md:h-48 md:w-full lg:w-96 lg:h-48  space-x-9 '   src={'/images/nearbuy-banner1.jpg'} 
              style={{objectFit:"fill"}}  />
        
        <img className='rounded-md w-48  h-32 md:h-48 md:w-full lg:w-96 lg:h-48 space-x-9 '    src={'/images/nearbuy-banner3.jpg'} 
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
