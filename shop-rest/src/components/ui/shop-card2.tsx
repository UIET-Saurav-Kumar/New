
import Image from "next/image";
import { MapPin } from "@components/icons/map-pin";
import { useTranslation } from "next-i18next";
import { formatAddress } from "@utils/format-address";
import { ROUTES } from "@utils/routes";
import Link from "./link";
import isEmpty from "lodash/isEmpty";
import Avatar from 'react-avatar';
import { useProductsQuery } from "@data/product/use-products.query";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import renderProductCard from "@components/product/home-product-card";
import { motion } from "framer-motion";
import { useLocation } from "@contexts/location/location.context";
import Neon from "@components/product/product-card/neon";
import PromotionSlider from "@components/slider/promotion-slider";
import Krypton from "@components/product/product-card/krypton";
import Helium from "@components/product/product-card/helium";
import Argon from "@components/product/product-card/argon";
import OfferCard from "@components/product/product-card/offer-card";
import PlacesApi from "@components/shop/google-maps-places-api";

type ShopCardProps = {
  shop: any;
};

const imageCheck = (logo: any , record:any, imgsize:any, imgDim:any, classname: string) => {
  // console.log(logo)
  let check = false;
  let splitLength = logo?.split("/").length;
  let lastSplit = logo?.split("/")[splitLength - 1];
  if (lastSplit != "") {
    check = true;
  }
  return (check ? <img src={logo} alt={record?.name} style={{ objectFit: "contain" }} className={classname} />:<Avatar name={record?.name} size={imgsize} round={imgDim}  />);
};

const ShopCard2: React.FC<ShopCardProps> = ({ type,shop,text,key,category, shopId }) => {

  const { t } = useTranslation();
  const { query } = useRouter();
  const {getLocation} =useLocation();

  const myLocation = getLocation;

  //get window size
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }
   ,[width]);
  

  const isNew = false;
  

  const {
    isFetching: loading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
    data,
    error,
  } = useProductsQuery({
    shop_id: Number(shopId),
    // type: query.type as string,
    text: text as string,
    category:  category as string,
  },
  {
    enabled: Boolean(shopId),
  });

  const [reviews, setReviews] = useState('');

  const [placePhotos, setPlacePhotos] = useState([]);

  const [totalRating, setTotalRating] = useState('');

  const [open , setOpen] = useState('');

  const [rating, setRating] = useState('');



  console.log('products', text);


  const shopLat = shop?.settings?.location?.lat
  const shopLng = shop?.settings?.location?.lng

  const userLat = myLocation?.lat
  const userLng = myLocation?.lng

  function getStars(_rating) {
    let stars = '';
  
    for (let i = 0; i < _rating; i++) {
      stars += '⭐';
    }
    
    return stars;
  }

  function handleApiPhotos(data) {
    setPlacePhotos(data)
  }
  
  function handleRating(data) {
    setRating(data);
  }
  
  function handleOpen(data) {
    setOpen(data);
  }
  
  function handleReviews(data) {
    setReviews(data);
  }
  
  function handleTotalRating(data) {
    setTotalRating(data);
  }

  function ratingStars(rating) {
    let stars = "";
    if (rating >= 4.5) {
        stars ='⭐️⭐️⭐️⭐️⭐️';
    } else {
        for (let i = 0; i < Math.floor(rating); i++) {
            stars +='⭐️';
        }
        if (rating % 1 !== 0) {
            stars +='⭐';
        }
    }
    return stars;
}
  

  console.log('open',open,rating,shop)


  return (

    <div className="  relative flex flex-col   w-full items-start"> 

      <Link href={`${ROUTES.SHOPS}/${shop.slug}`}>
        {/* <div className='flex flex-col w-68 h-80 xs+:w-62 xs+:h-80 xs++:w-44 xs++:h-96 sm:w-36 sm:h-96  md:w-60 md:h-72  md+:w-56 md+:h-96 md++:w-64 md++:h-96 lg:w-54 lg:h-96 
              lg+:w-52 lg+:h-96 xs+:h-500  xl:w-58 xl+:w-52 xl+:h-800 xl++:w-60 xl++:h-96  2xl:w-96 2xl:h-96 border rounded-xl
              bg-white shadow-md p-6 py-6 mx-1 my-2  cursor-pointer' > */}


     { type == 'Product' ?
        <div className='flex flex-col space-y-1 w-full p-4'>

              <div className="flex justify-between w-full items-center "> 
                <span className="flex flex-col items-center"> {imageCheck(shop?.logo?.thumbnail, shop, '190', false,'  w-16 rounded-full object-contain')}
                   <h4 className='font-semibold mx-3 text-gray-900 text-sm sm:text-lg w-full '> 
                     {shop?.name} 
                   </h4>
                   <p className="flex items-center">
                    {/* <span className="text-gray-700 font-light">
                      {rating}
                    </span> */}
                    {/* {getStars(rating)} */}
                   </p>
                   {/* <p className={` ${open == true ? 'text-green-700 font-semibold' : 'text-red-500 text-semibold'}`}>
                    {open == true ? 'open' : 'closed'}
                   </p> */}
                </span>
                {/* <h4 className='text-green-600 text-xs font-semibold'> Open </h4> */}
                <Link href={`/shops/${shop?.slug}?slug=${shop?.slug}`}>  
                  <span className={` cursor-pointer absolute right-10 whitespace-nowrap text-green-600 hover:text-green-800 text-sm font-semibold`}>
                    See All
                  </span>         
                </Link>
              </div>
 
              <div className=' flex items-start'> 
              <MapPin className="w-3.5 h-3.5 me-1 text-green-600  flex-shrink-0" />
                   <span className="flex flex-col">
                     <h5 className='text-xs  text-gray-700 flex'>
                      
                      {shop?.address?.sector}  
                      
                    </h5>
                    <p className="">
                      {shop?.address?.city}
                    </p>
                    </span>
              </div> 
        </div>


        : type == 'shop' || type == 'Category' ?  <div className='flex shadow-300 rounded flex-col space-y-1  border w-44 h-full lg:w-72 lg:h-full text-center min-w-60 p-4 max-w-44'>

              <div className="flex justify-between w-full items-center "> 
                <span className="flex flex-col items-center"> {imageCheck(shop?.logo?.thumbnail, shop, '190', false,' w-60 lg:w-full  object-contain')}
                   <h4 className='font-semibold  lg:mx-3 mt-2 h-10 lg:h-16 text-gray-900 text-xs sm:text-sm lg:text-lg w-full '> 
                     {shop?.name} 
                   </h4>
                   <div className={`flex  gap-3 w-full px-2 overflow-x-scroll`}>
                                    <PlacesApi 
                                               showImages={false}
                                               data={shop} 
                                               shopName={shop?.name} 
                                              //  handlePhotos={handleApiPhotos}
                                               handleRating={handleRating}
                                               handleTotalRating={handleTotalRating}
                                               handleOpen={handleOpen}
                                               handleReviews={handleReviews} />
                                               {/* <span>{reviews}</span> */}
                                    {/* {placePhotos?.map((binaryImage, index) => {
                                        return <img onClick={handleImage} key={index} 
                                        src={binaryImage?.url+process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
                                         className="h-60 rounded w-60 object-cover"/>
                                      })} */}
                              </div>
                              <p className={` `}>{rating && (rating + ' '+ratingStars(rating))}</p>
                              <p className="text-green-600 text-sm">{ open === true && 'Open'}</p>
                      <p className="text-red-600 text-sm">{ open === false && 'closed'}</p>
                   <p className="flex items-center">
                    {/* <span className="text-gray-700 font-light">
                      {rating}
                    </span> */}
                    {/* {getStars(rating)} */}
                   </p>
                   {/* <p className={` ${open == true ? 'text-green-700 font-semibold' : 'text-red-500 text-semibold'}`}>
                    {open == true ? 'open' : 'closed'}
                   </p> */}
                </span>
                {/* <h4 className='text-green-600 text-xs font-semibold'> Open </h4> */}
               
                
              </div>
 
              <div className=' flex items-start'> 
              <MapPin className="w-3.5 h-3.5 me-1 text-green-600  flex-shrink-0" />
                   <span className="flex flex-col">
                     <h5 className='text-xs h-full lg:h-12 text-gray-700 flex'>
                      
                      {shop?.address?.sector?.length ? shop?.address?.sector : '' }  
                      
                    </h5>
                    <p className="text-sm lg:text-sm text-gray-800 font-sans">
                      {shop?.address?.city  }
                    </p>
                    </span>
              </div> 
        </div>
        : 
        <div className='flex flex-col space-y-1 w-full p-4 border max-w-44'>

              <div className="flex justify-between w-full items-center "> 
                <span className="flex flex-col items-center"> {imageCheck(shop?.logo?.thumbnail, shop, '190', false,' w-16 lg:w-28  object-contain')}
                   <h4 className='font-semibold mx-3 text-gray-900 text-sm sm:text-lg w-full '> 
                     {shop?.name} 
                   </h4>
                   <div className={`flex  gap-3 w-full px-2 overflow-x-scroll`}>
                                    <PlacesApi 
                                               showImages={false}
                                               data={shop} 
                                               shopName={shop?.name} 
                                              //  handlePhotos={handleApiPhotos}
                                               handleRating={handleRating}
                                               handleTotalRating={handleTotalRating}
                                               handleOpen={handleOpen}
                                               handleReviews={handleReviews} />
                                               {/* <span>{reviews}</span> */}
                                    {/* {placePhotos?.map((binaryImage, index) => {
                                        return <img onClick={handleImage} key={index} 
                                        src={binaryImage?.url+process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
                                         className="h-60 rounded w-60 object-cover"/>
                                      })} */}
                              </div>
                              <p className={` `}>{rating && (rating + ' '+ratingStars(rating))}</p>
                              <p className="text-green-600 text-sm">{ open === true && 'Open'}</p>
                      <p className="text-red-600 text-sm">{ open === false && 'closed'}</p>
                   <p className="flex items-center">
                    {/* <span className="text-gray-700 font-light">
                      {rating}
                    </span> */}
                    {/* {getStars(rating)} */}
                   </p>
                   {/* <p className={` ${open == true ? 'text-green-700 font-semibold' : 'text-red-500 text-semibold'}`}>
                    {open == true ? 'open' : 'closed'}
                   </p> */}
                </span>
                {/* <h4 className='text-green-600 text-xs font-semibold'> Open </h4> */}
               
                
              </div>
 
              <div className=' flex items-start'> 
              <MapPin className="w-3.5 h-3.5 me-1 text-green-600  flex-shrink-0" />
                   <span className="flex flex-col">
                     <h5 className='text-xs  text-gray-700 flex'>
                      
                      {shop?.address?.sector}  
                      
                    </h5>
                    <p className="">
                      {shop?.address?.city}
                    </p>
                    </span>
              </div> 
        </div>
    }

      </Link>

     
      { type == 'Product' && (
        width > 768 ?
        <div className="flex items-center w-full scrollbar-hide  overflow-x-scroll"> {data?.pages.map((products, _idx) => (
                    <Fragment key={_idx}>
                          <PromotionSlider text={text} category={category} data={products} shopId={shop.id} />
                    </Fragment>
                  ))}
        </div> : 
         <div className="flex items-center w-full space-x-2   scrollbar-hide  overflow-x-scroll"> {data?.pages.map((products, _idx) => (
            <Fragment key={_idx}>
                {products?.data?.filter(product => product?.name == text && product?.status === 'publish').map(product => (
                  product?.is_brand_offer !== 1 ? 
                    <motion.div key={product?.id}>
                    <div className="w-44 md:w-60 "> 
                       {/* <PromotionSlider text={text} category={category} data={products} shopId={shop.id} /> */}
                       {/* <Neon shop={shop} product={product} /> */}
                       <Argon shop={shop} product={product} />
                    </div>
                  </motion.div> :
                   <OfferCard product={product} productSlug={product.slug} />
                ))}
                
            </Fragment>
            ))}
         </div>
      )
      }
       { type == 'Product' && <div className="h-1 bg-gray-200 mt-7 w-full"></div> }
      
      </div>
  );
};

export default ShopCard2;
