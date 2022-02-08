import { ArrowNext, ArrowPrev } from "@components/icons";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "next-i18next";
import "swiper/swiper-bundle.css";
import SidebarMenu, { SidebarMenuItem } from "@components/ui/sidebar-menu";
// dummy data
const data = [

  {
    id: 3,
    title: "banner:promotion-slide-three",
    bannerUrl: "/ad-banner/3.jpeg",
  },

  {
    id: 8,
    title: "banner:promotion-slide-eight",
    bannerUrl: "/ad-banner/8.jpeg",
  },
  {
    id: 9,
    title: "banner:promotion-slide-nine",
    bannerUrl: "/ad-banner/9.jpeg",
  },
  {
    id: 10,
    title: "banner:promotion-slide-ten",
    bannerUrl: "/ad-banner/10.jpeg",
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
    bannerUrl: "/ad-banner/2.jpeg",
  },
  
  {
    id: 4,
    title: "banner:promotion-slide-four",
    bannerUrl: "/ad-banner/4.jpeg",
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
 
];

const offerSliderBreakpoints = {

  240: {
    slidesPerView: 3,
    spaceBetween: 16,
  },
  320: {
    slidesPerView: 8,
    spaceBetween: 5,
  },
  580: {
    slidesPerView: 5,
    spaceBetween: 2,
  },
  1024: {
    slidesPerView: 7,
    spaceBetween: 4,
  },
  1920: {
    slidesPerView: 12,
    spaceBetween: 10,
  },

};
SwiperCore.use([Navigation]);

export default function CategorySlider({items}:any) {

  const { t } = useTranslation();

  return (

    <div className="w-full mx-auto px-5 bg-white">
      <div className="relative z-40 ">

        <Swiper
          id="category"
          // loop={true}
          breakpoints={offerSliderBreakpoints}
          navigation={{
            nextEl: ".next",
            prevEl: ".prev",
          }}
        >
          {items?.map((item) => (
            <SwiperSlide key={item?.name}>
               <a>  <SidebarMenuItem key={`${item?.name}${item?.slug}`} item={item} />  </a> 
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          className="prev cursor-pointer  absolute  top-2/4 -start-2 md:-start-5 z-10 -mt-4 md:-mt-5 w-8 h-8 md:w-9 
                     md:h-9 rounded-full bg-light shadow-xl border border-border-200  flex items-center 
                     justify-center text-heading transition-all duration-200 hover:bg-accent hover:text-light hover:border-accent"
          role="button"
        >
          <span className="sr-only">{t("common:text-previous")}</span>
          <ArrowPrev width={24} height={24} />
        </div>

        <div   
          className="next cursor-pointer absolute top-2/4 -end-2 md:-end-5 z-10 -mt-4 md:-mt-5 w-8 h-8 
                     md:w-9 md:h-9 rounded-full bg-light shadow-xl border border-border-200  flex items-center 
                     justify-center text-heading transition-all duration-200 hover:bg-accent hover:text-light hover:border-accent"
          role="button"
        >
          <span className="sr-only">{t("common:text-next")}</span>
          <ArrowNext width={24} height={24} />
        </div>
      </div>
    </div>
  );
}