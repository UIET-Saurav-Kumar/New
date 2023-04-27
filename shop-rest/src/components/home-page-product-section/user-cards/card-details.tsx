import { getImagesByUserId } from '@data/images-upload/get-uploaded-images.query';
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CardDetails( {data} ) {
    
  const { data: images, isLoading, isError, refetch } = getImagesByUserId(data?.user?.id);

    console.log('props',data?.user?.date_of_birth);
    //get age from date
    //date format - Mon Mar 07 2005 00:00:00 GMT+0530 (India Standard Time)
     
    const getAge = (dateString:string) => {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
      
        return age;
    }

    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 3000,
      pauseOnHover: true,
    };
  

    //data?.user?.name first letter to upper case
    const capitalize= (string:string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    console.log('images',images[0])



  return (

    <div className="bg-white  h-screen w-screen lg:w-96 lg:h-full  overflow-y-scroll shadow-lg mt-0">
      {/* <div  > */}

        { images?.length ? 
            <Slider {...sliderSettings}>
              {images[0]?.image_data.map((img: any) => (
                <div className="flex flex-row overflow-hidden lg:mb-8"
                  style={{
                    border: "2px solid red",
                    backgroundColor: "yellow",
                    width: "100%",
                    height: "50%",
                  }}
                >
                  <img
                    src={img?.thumbnail}
                    alt={data?.user?.name}
                    className="w-full h-72 object-cover mx-auto rounded-lg"
                  />
                </div>
              ))}
            </Slider> 
            : <img
            src={`https://source.unsplash.com/featured/?${data?.user.gender}/${data?.user.name}`}
            alt={data?.user?.name}
            className="w-60 h-60 object-cover mx-auto rounded-lg"
          />
        }
      {/* </div> */}
      <div className='p-4'> 
          <div className="mt-4">
            {/* <h3 className="text-lg font-semibold">Name</h3> */}
            <p className='text-gray-900 text-2xl font-bold'>
                {capitalize(data?.user?.name) + ', '+ getAge(data?.user?.date_of_birth) }</p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg text-gray-900 font-semibold">Lives In</h3>
            <p className='text-gray-600'>{data?.user?.current_location == null ? 'N/A' : data?.user?.current_location.includes('undefined')   ? 'N/A' : data?.user?.current_location || "N/A"}</p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg text-gray-900 font-semibold">Interests</h3>
            <p className='text-gray-600'>{data?.user?.interests || "N/A"}</p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg text-gray-900 font-semibold">Occupation</h3>
            <p className='text-gray-600'>{data?.user?.occupation || "N/A"}</p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg text-gray-900 font-semibold">About</h3>
            <p className='text-gray-600'>{data?.user?.bio || "N/A"}</p>
          </div>
      </div>
    </div>
  );
}
