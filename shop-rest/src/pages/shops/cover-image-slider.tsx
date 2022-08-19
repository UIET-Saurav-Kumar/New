import { ArrowNext, ArrowPrev } from "@components/icons";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "next-i18next";
import "swiper/swiper-bundle.css";
// dummy data
import { fetchShops, useShopsQuery } from "@data/shop/use-search-shop-query";
import { useLocation } from "@contexts/location/location.context";
import { useRouter } from "next/router";
import { Fragment, useRef } from "react";
import { ROUTES } from "@utils/routes";
import Link from 'next/link';




const offerSliderBreakpoints = {
  240: {
    slidesPerView:1 ,
    spaceBetween: 0,
  },
  320: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
  580: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
  1024: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
  1920: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
};

//auto play


SwiperCore.use([Navigation]);

export default function CoverImageSlider({data}) {

  const router = useRouter();
  const { t } = useTranslation();
  const {getLocation} = useLocation()


  const { data: shopData } = useShopsQuery({
    category:'Salon+-+Spa',
    limit:3000000,
    location:((getLocation?.formattedAddress)?JSON.stringify(getLocation):null ) as any,
    is_active:1,
    // page:1,
    search:getSearch()
  });
  
  function getSearch():string{
    
    const { query } = useRouter();
    
    if(query.text){
      return query.text as string
    }
    return "";
  }

  console.log('slider shops',shopData)
  console.log('data length', data)

  return (

    <div className="flex-1 h-full">
      <div className="relative w-full h-full  ">
        <Swiper
          id="cover-image-slider"
          className=" border-blue-900 h-full w-full"
          loop={true}
          slidesPerView={1}
          spaceBetween={0}
          // navigation
          pagination={{ clickable: true }}
          breakpoints={offerSliderBreakpoints}
          navigation={{
            nextEl: ".shop-slider-next",
            prevEl: ".shop-slider-prev",
          }}
          autoPlay={true}
          //auto navigation
          autoplay={{
            delay: 500,
          }}
        >
          {data?.map((item) => (
            <SwiperSlide key={item?.id} className='absolute w-full h-full'>
              <div className="w-full h-full">
                <img className="object-fill w-full h-full" src={item?.thumbnail} alt={item?.title} />
              </div>
            </SwiperSlide>
          ))}
         
        </Swiper>
        <div
            className="shop-slider-prev cursor-pointer bg-white absolute z-40 text-gray-600 top-2/4 -start-2 md:-start-5   -mt-4 md:-mt-5 w-8 h-8 md:w-9 md:h-9 rounded-full bg-light shadow-xl border border-border-200  flex items-center justify-center text-heading transition-all duration-200 hover:bg-accent hover:text-light hover:border-accent"
            role="button"
          >
            <span className="sr-only">{t("common:text-previous")}</span>
            <ArrowPrev width={24} height={24} />
        </div>
        <div
          className="shop-slider-next cursor-pointer    text-gray-600 absolute top-2/4 -end-2 md:-end-3 z-40 -mt-4 md:-mt-5 w-8 h-8 md:w-9 md:h-9 rounded-full bg-light shadow-xl border border-border-200  flex items-center justify-center transition-all duration-200 hover:bg-accent hover:text-light hover:border-accent"
          role="button"
         >
          <span className="sr-only">{t("common:text-next")}</span>
          <ArrowNext width={24} height={24} />
        </div>
      </div>
     </div>
  );
}
