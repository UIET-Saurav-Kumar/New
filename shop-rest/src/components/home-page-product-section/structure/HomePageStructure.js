import { fetchCategories } from '@data/category/use-categories.query';
import Image from 'next/image';
import Link from 'next/link';
import {useQuery} from 'react-query';

import ProductDetails from "@components/product/product-details";
import RelatedProducts from "@components/product/product-details/related-products";
import { fetchProducts } from "@data/product/use-products.query";
import { fetchProduct } from "@data/product/use-product.query";
import { Product } from "@ts-types/custom.types";
import { useRouter } from "next/router";
import { useProductsQuery } from "@data/product/use-products.query";
import { useCategoriesQuery } from "@data/category/use-categories.query";

import { motion } from "framer-motion";
import { Fragment } from "react";
import { siteSettings } from "@settings/site.settings";

import { ArrowNext, ArrowPrev } from "@components/icons";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import { useUI } from "@contexts/ui.context";
import Truncate from "@components/ui/truncate-scroll";


const SliderBreakpoints = {
  320: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
  580: {
    slidesPerView: 3,
    spaceBetween: 16,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 16,
  },
  1920: {
    slidesPerView: 6,
    spaceBetween: 24,
  },
};
SwiperCore.use([Navigation]);


const props = () => {
    data.pages.map( products)
}




export default function HomePageStructure({title, swiperNext, swiperPrev}) {

  function truncateName(string, n) {
    return string?.length > n ? string.substr(0, n-1) + '...' : string;
  }

  const { query } = useRouter();
  const { openModal, setModalView, setModalData } = useUI();

  const { data } = useProductsQuery({
    type: query.type,
    text: query?.text,
    category: query?.category,
  });

  const res = useCategoriesQuery({
    type: query.type,
    text: query?.text,
    category: query?.category,
  });
  // const { name, image, quantity } = product ?? {};

    function handleProductQuickView( product ) {
    setModalData(product.slug)
    setModalView("PRODUCT_DETAILS");
    return openModal();
  }


    return (
        <div className='flex bg-white shadow-md  flex-col mt-8 p-3 '>

        <div className='flex justify-between px-3'>

            <h3 className='font-bold text-lg'> {title} </h3>

            <Link href='/'>
                <a className='text-indigo-800 hover:underline font-light text-sm'>View All</a>
            </Link>

        </div>

        <div className="px-4 py-5 md:px-8 xl:px-12 md:py-10 border-t bg-white border-gray-200">
                <div className="relative">
                    <Swiper
                    // id="flash-deals"
                    loop={false}
                    breakpoints={SliderBreakpoints}
                    navigation={{
                        nextEl: `.${swiperNext}`,   // both values should be unique for every swiper used in project
                        prevEl: `.${swiperPrev}`,
                    }}
                    >
                    {data?.pages?.map((products, _idx) => (
                    <Fragment key={_idx}> 
                        {products?.data?.map((product) => (
                            
                            <motion.div key={product.id}>

                                <SwiperSlide className='grid grid-cols-1 md:grid-cols-1 lg:flex 
                                             lg:items-center lg:justify-center place-items-center lg:px-auto' 
                                            key={product.id} >

                                    <div className='border-1  border-gray-500'>
                                        <Image
                                            className=' '
                                            onClick={() => handleProductQuickView(product)}
                                            role="button"
                                            src={product.image?.original ?? siteSettings?.product?.placeholderImage}
                                            height={200}
                                            width={200}
                                            objectFit="contain"
                                            className="product-image"
                                        />
                                        <span className='text-sm items-center justify-center flex '>
                                          {truncateName(product.name, 25)}
                                            
                                        </span>
                                    </div>
                            
                                </SwiperSlide>

                            </motion.div>
                        ))}
                    </Fragment>
                    ))}
                   
                    </Swiper>

                    <div
                    className={` ${swiperNext} cursor-pointer absolute top-2/4 -left-4 md:-left-5 z-10 
                               -mt-4 md:-mt-5 w-8 h-8 md:w-9 md:h-9 rounded-full bg-white shadow-xl border 
                               border-gray-200 border-opacity-70 flex items-center justify-center text-gray-800 
                               transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary`}
                    role="button"
                    >
                        <span className="sr-only">previous</span>
                        <ArrowPrev width={18} height={18} />
                    </div>

                    <div
                    className={` ${swiperPrev} nextTopProduct cursor-pointer absolute top-2/4 -right-4 md:-right-5 z-10 
                                 -mt-4 md:-mt-5 w-8 h-8 md:w-9 md:h-9 rounded-full bg-white shadow-xl border border-gray-200 
                                 border-opacity-70 flex items-center justify-center text-gray-800 transition-all duration-200 
                                 hover:bg-primary hover:text-white hover:border-primary`}
                    role="button"
                    >
                        <span className="sr-only">next</span>
                        <ArrowNext width={18} height={18} />
                    </div>

                </div>
     </div>


</div>
    )
}
