import { ArrowNext, ArrowPrev } from "@components/icons";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "next-i18next";
import "swiper/swiper-bundle.css";
// dummy data
import { fetchShops, useShopsQuery } from "@data/shop/use-search-shop-query";
import { useLocation } from "@contexts/location/location.context";
import { useRouter } from "next/router";
import { Fragment, useEffect, useRef, useState } from "react";
import { ROUTES } from "@utils/routes";
import Link from 'next/link';


const data = [

  {
    id: 3,
    title: "banner:promotion-slide-three",
    bannerUrl: "/ad-banner/sevensky.jpg",
  },
  {
    id: 8,
    title: "banner:promotion-slide-eight",
    bannerUrl: "/ad-banner/fly.jpg",
  },
  {
    id: 18,
    title: "banner:promotion-slide-eight",
    bannerUrl: "/ad-banner/hanif.jpg",
  },
  {
    id: 48,
    title: "banner:promotion-slide-eight",
    bannerUrl: "/ad-banner/ki-ka.jpg",
  },
  {
    id: 9,
    title: "banner:promotion-slide-nine",
    bannerUrl: "/ad-banner/2.jpeg",
  },
  {
    id: 10,
    title: "banner:promotion-slide-ten",
    bannerUrl: "/ad-banner/4.jpeg",
  },
  {
    id: 11,
    title: "banner:promotion-slide-eleven",
    bannerUrl: "/ad-banner/11.jpeg",
  },
  {
    id: 1,
    title: "banner:promotion-slide-one",
    bannerUrl: "/ad-banner/1.jpeg",
  },
  {
    id: 2,
    title: "banner:promotion-slide-two",
    bannerUrl: "/ad-banner/9.jpeg",
  },
  
  {
    id: 5,
    title: "banner:promotion-slide-five",
    bannerUrl: "/ad-banner/5.jpeg",
  },
  {
    id: 6,
    title: "banner:promotion-slide-six",
    bannerUrl: "/ad-banner/6.jpeg",
  },
  {
    id: 7,
    title: "banner:promotion-slide-seven",
    bannerUrl: "/ad-banner/7.jpeg",
  },
  {
    id: 4,
    title: "banner:promotion-slide-four",
    bannerUrl: "/ad-banner/10.jpeg",
  },
 
];

const offerSliderBreakpoints = {
  240: {
    slidesPerView: 3,
    spaceBetween: 16,
  },
  320: {
    slidesPerView: 4,
    spaceBetween: 5,
  },
  580: {
    slidesPerView: 6,
    spaceBetween: 2,
  },
  1024: {
    slidesPerView: 10,
    spaceBetween: 4,
  },
  1920: {
    slidesPerView: 6,
    spaceBetween: 10,
  },
};


SwiperCore.use([Navigation]);

export default function PromotionSlider(data:any) {

  console.log('shops',data)

  const [loading,setLoading] = useState(false);

  useEffect(() => {
         setLoading(true)
  }, [data.offer])
  

  const router = useRouter();
  const { t } = useTranslation();
  const {getLocation} = useLocation();


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
    
    if(data.offer){
      return data.offer as string
    }
    return "";
  }

  // console.log('slider shops',shopData)

  return (

    <div className=" px-2 md:px-5 xl:px-4">
      <div className="relative">
        <Swiper
          id="offer"
          // loop={true}
          breakpoints={offerSliderBreakpoints}
          navigation={{
            nextEl: ".next",
            prevEl: ".prev",
          }}
        >
          {shopData?.pages?.map((page, idx) => {
                      return (
                        <Fragment key={idx}>
                          {page.data.filter((shop) => shop.is_active === 1).map((shop: any) => (
            <SwiperSlide key={idx}>
                
              <Link href={`${ROUTES.SHOPS}/${shop.slug}`}>
                <div className="flex flex-col items-center ">
              <img
              className="w-10 object-contain rounded h-10 lg:h-36 border-3 border-gold lg:w-36 "
              src={shop?.logo?.thumbnail}
              // alt={t(d.title)}
              
              />
              <p className = "text-xs  mt-2 text-center font-semibold">
                {shop?.settings?.location?.sector}
              </p>
              <p className = "text-xs text-center font-light">
                {shop?.settings?.location?.city}
              </p>
              </div>
              </Link>
            </SwiperSlide>
             ))}
             </Fragment>
           );
           })}
         
        </Swiper>
        <div
          className="prev cursor-pointer bg-gold absolute text-white top-2/4 -start-2 md:-start-5 z-10 -mt-4 md:-mt-5 w-8 h-8 md:w-9 md:h-9 rounded-full bg-light shadow-xl border border-border-200  flex items-center justify-center text-heading transition-all duration-200 hover:bg-accent hover:text-light hover:border-accent"
          role="button"
        >
          <span className="sr-only">{t("common:text-previous")}</span>
          <ArrowPrev width={24} height={24} />
        </div>
        <div
          className="next cursor-pointer bg-gold  text-white absolute top-2/4 -end-2 md:-end-5 z-10 -mt-4 md:-mt-5 w-8 h-8 md:w-9 md:h-9 rounded-full bg-light shadow-xl border border-border-200  flex items-center justify-center text-heading transition-all duration-200 hover:bg-accent hover:text-light hover:border-accent"
          role="button"
        >
          <span className="sr-only">{t("common:text-next")}</span>
          <ArrowNext width={24} height={24} />
        </div>
      </div>
    </div>
  );
}
