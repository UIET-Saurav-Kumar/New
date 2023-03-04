
import React from 'react';
import { useOfferQuery } from "@data/home/use-offer-query";
import { useLocation } from "@contexts/location/location.context";
import { motion } from "framer-motion";
import renderProductCard from "@components/product/home-product-card";
import PromotionSlider from '@components/common/promotion-slider';
import { useProductsQuery } from "@data/product/use-products.query";
import { useRouter } from "next/router";
import { Fragment, useRef } from "react";
import dynamic from "next/dynamic";
import { useAllProductsQuery } from "@data/product/products.query";
import { useState } from "react";
import product from '../../components/repositories/product';
import Layout from '@components/layout/layout';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SalonCard from '@components/product/product-card/salon-card';
import Link from 'next/link';
import { ROUTES } from "@utils/routes";
import Neon from '@components/product/product-card/neon';
import Neon2 from '@components/product/product-card/neon2';
import { useEffect } from "react";
import Helium from '@components/product/product-card/helium';
import CartCounterButton from '@components/cart/cart-counter-button';
import { useWindowDimensions } from '@components/common/search';
import { fetchShops, useShopsQuery } from "@data/shop/use-search-shop-query";
import ShopCard2 from '@components/ui/shop-card2';
import ShopLayout from '@components/layout/shop-layout';
import Head from 'next/head';
import axios from 'axios';
import Schedule from '@components/checkout/schedule';
import PaymentForm from '@components/checkout/payment-form';
import VerifyCheckout from '@components/checkout/verify-checkout';
import { generateCartItem } from '@contexts/quick-cart/generate-cart-item';
import { useCart } from '@contexts/quick-cart/cart.context';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useCheckout } from '@contexts/checkout.context';
import { useOrderStatusesQuery } from '@data/delivery/use-order-statuses.query';
import { useCreateOrderMutation } from '@data/order/use-create-order.mutation';
import { useCustomerQuery } from '@data/customer/use-customer.query';
import { useModalAction } from '@components/ui/modal/modal.context';
import { useUI } from '@contexts/ui.context';
import { formatOrderedProduct } from "@utils/format-ordered-product";
import { CheckedIcon } from '@components/icons/checked';
import { CheckMarkCircle } from '@components/icons/checkmark-circle';
import { CheckMark } from '@components/icons/checkmark';
import { CheckMarkFill } from '@components/icons/checkmark-circle-fill';
import { calculateTotal } from '@utils/calculate-total';
import { useVerifyCheckoutMutation } from '@data/delivery/use-checkout-verify.mutation';
import { fetchFeatureProduct, useFeatureProductQuery } from '@data/home/use-feature-product-query';
import Image from 'next/image';
import moment from 'moment'
import { Default } from 'react-toastify/dist/utils';
import DefaultLayout from '@components/layout/default-layout';
import { formatSalonProduct } from '@utils/format-salon-products';
import { useOrdersQuery } from '@data/order/use-orders.query';
import Loader from '@components/ui/loader/loader';
import PlacesApi from '@components/shop/google-maps-places-api/place-photos';
import { addLocation } from '@contexts/location/location.utils';
import Spinner from '@components/ui/loaders/spinner/spinner';
import { ArrowDownIcon, ArrowUpIcon, MinusIcon, PlusIcon } from '@heroicons/react/outline';
import Appointment from './appointment';
import { GetStaticPathsContext, GetStaticProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import { fetchSettings } from '@data/settings/use-settings.query';
import url from "@utils/api/server_url";
import PlacePhotos from '@components/shop/google-maps-places-api/place-photos';




 
// export async function getStaticProps() {
//   const {
//     data,
//     isLoading: loading,
//   } = useFeatureProductQuery({
//     limit: 10,
//     type_id: 7,
//     location: 'Chandigarh'
//   });

//   await data;

//   return {
//     props: {
//       featureProducts: data?.featureProducts?.data || [],
//       loading,
//     },
//   };
// }


  const ProductFeedLoader = dynamic(
    () => import("@components/ui/loaders/product-feed-loader")
  );



    // export const getStaticProps = async ({ locale }: any) => {
    //     return {
    //       props: {
    //         ...(await serverSideTranslations(locale, ["common"])),
    //       },
    //     };
    //   };

      interface FormValues {
        payment_gateway: "cod" | "cashfree" | "upi" | "wallet";
        contact: string;
        card: {
          number: string;
          expiry: string;
          cvc: string;
          email: string;
        };
      }


  export default function Deals({all_data}:any) {
    // console.log('allData',all_data)
    const {width} = useWindowDimensions();

    const {getLocation,addLocation} = useLocation();

    const [value, onChange] = useState(new Date());
    const [offerName, setOfferName] = useState(null);
    const [selectedSalon, setSelectedSalon] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [shopImages, setShopImages] = useState(false);
    const [photos, setPhotos] = useState([]);
    const router = useRouter();
    const pathname = router.pathname;
    
    const [open, setOpen] = useState(true);
 
    const [error_msg ,  setError_Msg] = useState('');

    const { closeModal, openModal } = useModalAction();

    const { isAuthorize } = useUI();

    const myDiv = useRef(null);
    const offers = useRef(null);
    const appointment = useRef(null);
    const images  = useRef(null);

    console.log('getLoc',getLocation);

    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

    useEffect(()=>{
    selectedSalon &&  appointment?.current.scrollIntoView({
        behavior: 'auto',
      })
    },[selectedSalon])

    console.log('time slot', selectedTimeSlot)

    useEffect(() => {
      window.scrollTo(0,0);
    }, []);

    const {
    
      data: products,
    } = useProductsQuery({
      //@ts-ignore
      shop_id: Number(selectedSalon?.id),
      // type: query.type as string,
      //@ts-ignore
      sale_price: Number(offerName?.sale_price),
      //@ts-ignore
      text: offerName?.name as string,
      // category: query?.category as string,
    },
    {
      enabled: Boolean(selectedSalon),
    });

    useEffect(() => {
      if (error_msg) {
        // setError_Msg('');
        setTimeout(() => {
          setError_Msg('');
        }, 3000);
      }
    }, [error_msg]);


    const {
      data,
      isLoading: loading,
  } = useFeatureProductQuery({
       limit: 10 as number,
      search:"",
    //    type_id: 2,
       //@ts-ignore
      location : ((getLocation?.formattedAddress) ? JSON.stringify(getLocation) : null ) as any
  });

  console.log('feature',data)


        const currentDate =   value;

        const options = { month: 'short' };

         //@ts-ignore
        const tim =  currentDate.toLocaleString('en-US', options);

        let dd = String(currentDate.getDate()).padStart(2, '0');

        const month =  tim;
      
        const newDate = `${dd} ${month}`;

        const { data: orderStatusData } = useOrderStatusesQuery();

        const {
          data: orderData,
          isFetching: order_loading,
         
        } = useOrdersQuery({});

      
        const { mutate: createOrder, isLoading: salonBooking } = useCreateOrderMutation();

        const {data:customer} = useCustomerQuery();

        const[newOfferName, setNewOfferName] = useState(null);

        const[booking, setBooking] = useState(false);

        function handleSelectedShop(data:any) {
         offerName && setSelectedSalon(data);
        
        }                           
      //@ts-ignore
        let avail_items =  [products?.pages[0]?.data?.filter(product =>  product.sale_price === offerName?.sale_price)[0] ]
       
         //@ts-ignore
        const subtotal = calculateTotal(avail_items).total;
        //@ts-ignore
        let price = products?.pages[0]?.data?.filter(product => product.sale_price === offerName?.sale_price)[0]?.price;
        //@ts-ignore
        let sale_price = products?.pages[0]?.data?.filter(product => product.sale_price === offerName?.sale_price)[0]?.sale_price;
        
        //@ts-ignore
        function calcDiscount(price, sale_price){
          return (price - sale_price) / price *100
        }


        const { mutate: verifyCheckout, isLoading: c_loading } =
        useVerifyCheckoutMutation();

        // useEffect(()=>{
        //      setShopImages(true)
        // },[selectedSalon])

        useEffect(()=>{
          //@ts-ignore
          const input = JSON.parse(localStorage.getItem('input'));
          const pathname = window.location.pathname;

          if(isAuthorize && input && pathname === '/salon-near-me'){
            input.customer_contact = customer?.me?.phone_number;
            // alert(customer?.me?.phone_number);
            localStorage.setItem("input", JSON.stringify(input));
            // alert('authorize')
            if( !orderData?.pages[0]?.data?.length){
              // alert('place order')
              setBooking(true);
              
              createOrder(input, {
     
                onSuccess: (order: any) => {
                  // alert('success')
                  if (order?.tracking_number) {
                    // alert('tracking number generated')
                     
                    router.push(`${ROUTES.ORDERS}/${order?.tracking_number}`);
                    setBooking(false)
                    localStorage.removeItem('input');
                  }
                  if (order?.paymentLink)
                  {
                    window.location.replace(order?.paymentLink)
                    localStorage.removeItem('input');
                  }
                },
                onError: (error: any) => {
                  // alert('error')
                  setBooking(false);
                  // localStorage.removeItem('input');
                },
              });
            }

          }

        },[isAuthorize, customer?.me?.phone_number])

        function onSubmit(values: FormValues) {

 
          if (offerName == null ) {
            setError_Msg('Please select offer first ');
            return;
         }   
           
          if (selectedSalon == null ) {
            setError_Msg('Please select salon name');
            return;
         }         
          
          if (selectedTimeSlot == null) {
            setError_Msg('Please select time slot also');
            return;
          }


          let input = {
            //@ts-ignore
            location:getLocation?.formattedAddress,
            products: 
            avail_items?.map((item) => formatSalonProduct(item)),
            customer_contact: customer?.me?.phone_number,
            status:  orderStatusData?.order_statuses?.data[0]?.id ?? 1,
            //@ts-ignore
            amount: offerName && offerName?.sale_price,
            discount:  Math.floor(calcDiscount(price, sale_price)),
            //@ts-ignore
            paid_total: offerName && offerName?.sale_price,
            //@ts-ignore
            total : offerName && offerName?.sale_price,
            sales_tax:  0,
            delivery_fee: 0,
            delivery_time: newDate + ' ' + selectedTimeSlot,
            payment_gateway: 'cod',
          };

          localStorage.setItem('input', JSON.stringify(input));
       

          if(!isAuthorize){
            return openModal('OTP_REGISTER',{
                pathname: '/salon-near-me',
            });
          }


          verifyCheckout(
            //@ts-ignore
            {
              amount: subtotal,
              // unit_price: subtotal,
              // total: offerName && offerName?.sale_price,
              products: avail_items?.map((item) => formatSalonProduct(item)),
            },
          )


          // console.log('values',input,offerName)
            
            createOrder(input, {
              onSuccess: (order: any) => {
                if (order?.tracking_number) {
                  router.push(`${ROUTES.ORDERS}/${order?.tracking_number}`);
                }
                if (order?.paymentLink)
                {
                  window.location.replace(order?.paymentLink)
                }
              },
              onError: (error: any) => {
                console.log(error?.response?.data?.message);
              },
            });
          
          }


          function getSearch():string
          
          {
            //@ts-ignore
            if(newOfferName?.name){
              //@ts-ignore
              return newOfferName?.name as string
            }
            return "";
          }
         

          // console.log([{'offer': offerName, 'selectedSalon' : selectedSalon }])


          function scrollUp(){
            window.scrollTo(0,0);
            //@ts-ignore
            offers?.current.scrollIntoView({
              behavior: 'auto',
            })
            // alert('hi');
            setOpen(!open)
          }

          // useEffect(()=>{
          //   shopImages &&  images?.current.scrollIntoView({
          //     behaviour: 'auto'
          //   })
          // },[shopImages])

         
         
        function showSalons(data:any) {
          setOpen(false);
          setOfferName(data);
          setSelectedSalon(null);
        }

        useEffect(()=> {
          //@ts-ignore
          myDiv.current.scrollIntoView({
            behavior: 'smooth',
          })
        },[offerName])


     //@ts-ignore
     const {
      data:shops,
      isLoading,
      isError,
      isFetched,
      isFetchingNextPage,
      fetchNextPage,
      hasNextPage,
  
     } = useShopsQuery({
      // category:getCategory(),
      limit:3000000,
      //@ts-ignore
      location:((getLocation?.formattedAddress) ? JSON.stringify(getLocation) : null ) as any,
      is_active:1,
      // page:1,
      search:getSearch() 
    });

  

    const filteredData = data?.featureProducts?.data?.filter(product =>
      product?.status === "publish" &&
      product?.type_id == 8 || product?.type_id == 29  &&
      product?.is_featured === 1 
    //   &&
    //   product?.shop?.shop_categories?.replace(/[^a-zA-Z ]/g, "").
    //   replace("name", "").replace("id", "") === "Resturant  Takeaway"
    );
      
     //@ts-ignore
     const uniqueProducts = [];

    filteredData?.forEach(product => {
      //@ts-ignore
      if (!uniqueProducts?.find(p => p.name === product.name && p?.sale_price == product?.sale_price )) {
        uniqueProducts.push(product);
      }
    });

    const minDate = new Date();

    function handleImage(data:any){
      openModal('SHOP_IMAGE_POPOVER',{
        data:data
      })
    }

    function handleShopImages(data:any) {
      setShopImages(data);
    }

    console.log('filtered',filteredData)


  return ( 

    <>

    <Head>
      <link rel="canonical" href={`https://buylowcal.com/salon-near-me`}/>
      <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(
        {
          "@context": "http://schema.org",
          "@type": "WebPage",
          "url": 'https://buylowcal.com/salon-near-me',
          "name": ' Best Salon/Spa Deals and offers in Chandigarh, Mohali & Panchkkula ',
          "description": "Find the best near by salons deals and offers on buylowcal. Free Booking and Free Cancelation Policy",
        }
      )}}
    />
    </Head>

    <div className=' h-full border bg-white w-full'>

      <p className='flex flex-col mt-10 font-semibold text-blue-500 text-center w-full'>
       <div className="text-center text-lg font-medium tracking-wide text-red-600">Limited Slots!!</div>
       <div className="text-center text-lg font-medium tracking-wide whitespace-nowrap text-green-600">Book Now, Pay Later</div>
      </p>

          <span ref={offers} onClick={()=> setOpen(!open)} className=' cursor-pointer mx-auto rounded-md p-1 flex items-center space-x-2 text-center text-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-medium text-xl lg:text-2xl text-gray-900 font-serif ml-2 lg:ml- mt-10 lg:mt-10 tracking-normal'>
            <h3 className='text-gray-900 text-xl lg:text-2xl font-semibold font-serif  text-center lg:text-left'>Select Deals to Explore Restraunts</h3> 
            <span > {open ? <MinusIcon className='h-6 w-6  border-gray-400 text-green-600 border-2 rounded-full' /> : <  PlusIcon className='rounded-full border-2 h-6 w-6  border-gray-400 text-green-600' />}</span>
          </span>

          <Loader text='booking...' className={` ${booking ? 'block' : 'hidden'} mx-auto z-50`}/>

          { loading ? <div className='w-full mx-auto h-10'>
                        <Spinner showText={false}/>
                      </div> 
                     : 
            <div className = {`${data?.featureProducts?.data?.length  ? 'block w-full' : 'hidden'} transition-all duration-5000 ease-in-out relative w-full overflow-x-scroll text-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                  ${open ? 'transition-all duration-5000 ease-in-out flex flex-col  grid grid-cols-2  h-full md:grid md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-5 bg-gray-50 mt-3 p-2 lg:p-6 gap-1 lg:gap-4' : 'hidden' }   `}>
              
               {/* {fetching && !data?.pages?.length ? (
                        <ProductFeedLoader limit={5} />
                      ) : ( */}
                        
                        {!uniqueProducts?.length ? <span className=' '>Loading...</span> : uniqueProducts?.map((offer,product) => (
                          
                          
                        <div className=''>

                           <div  key={offer} onClick={ ()=> showSalons(offer)}
                             className={` ${offer?.name === offerName?.name && offer?.sale_price === offerName?.sale_price ? 'border-3 border-green-500 ' : 'border-2'}
                             ${open ? 'flex flex-col' : 'hidden' } hover:border-gray-400 lg:p-2 relative w-full h-full   lg:w-full mx-auto bg-white rounded-lg shadow-lg `}>
                               <div className='relative flex items-center justify-center w-auto h-64  '>
                                  <Image layout="fill"
                                        priority={true}
                                        objectFit="contain" 
                                        quality='10' 
                                        src={offer?.image?.thumbnail} 
                                        // className=' object-contain h-full w-full ' 
                                        alt={offer?.name}
                                  />
                               </div>
                              
                             <CheckMarkFill  width={20} className={` ${(offer?.name === offerName?.name && offer?.sale_price === offerName?.sale_price ) ? 'block transition-all duration-900 ease-in-out' : 'hidden'} absolute right-0 top-0 me-2 bg-white rounded-full  text-green-600`} />
                          <div className=' space-y-2'>
                            <div className="px-2 lg:px-2 xl:px-6   ">
                              <div className="font-semibold text-sm lg:text-sm xl:text-lg lg:py-3 h-10 lg:h-16 ">
                                {offer?.name}
                              </div>
                            </div>
                            <div className="flex flex-col px-2 lg:px-2 xl:px-6 space-y-2 py-1 ">
                             <div className='flex items-center justify-between'> 
                               <div className='grid grid-cols-1 sm:grid-cols-2 items-center'>
                                <span className="inline-block bg-gray-200   p-3 rounded-full px-3 py-1 text-sm font-semibold text-accent mr-2">
                                ₹
                                {+' '+offer?.sale_price}.00
                                </span>
                                <del className="inline-block  p-3  px-2 py-1 text-sm font-semibold text-gray-600 mr-2">
                                ₹
                                {+' '+offer?.price}.00
                                </del>
                                </div>
                                <span onClick={()=>openModal('OFFER_IMAGE_VIEW',{offer:offer})} 
                                className='text-blue-700 text-sm cursor-pointer active:text-blue-800 '>
                                  Details
                                </span>
                              </div>
                              <button
                              //@ts-ignore
                                className={` ${offer?.name === offerName?.name && offer?.sale_price === offerName?.sale_price ? 'bg-green-600 text-white' : 'text-gray-500 bg-gray-100' }   hover:bg-green-600 hover:text-white text-white font-bold py-2 px-4 rounded-full`}
                              >
                                
                                {offer?.name === offerName?.name &&  offer?.sale_price === offerName?.sale_price ? 'Grabed' : 'Grab'}
                              </button>
                            </div>
                          </div>
                      </div>
                      </div>
                      // </div>
                        ))
                    }
            </div>
            }


        <div ref={myDiv}  className={`${offerName ? 'flex' : 'hidden'} flex-col lg:px-4 mt-6 lg:mt-10 py-4`}>

          <div className='flex flex-col space-y-3 m-2 '>
            <span className='font-semibold text-center lg:text-left text-gray-900 lg:text-2xl font-serif text-xl'>You have selected</span>
            <div className='flex flex-col border lg:border-none p-4 rounded-2xl items-center lg:items-start justify-around'>
              <img onClick={()=>openModal('OFFER_IMAGE_VIEW',{offer:offerName})} 
              //@ts-ignore
                   src={offerName?.image?.thumbnail} className='w-20 sm:w-60 sm:h-60 h-20'/>
             <div className='flex flex-col lg:grid lg:grid-col-2 items-center'> 
             <span className='text-gray-800 font-semibold'>{offerName?.name}</span>
             <span className="inline-block  rounded-full  py-1 text-sm font-semibold text-accent ">
                                ₹
                                {+' '+offerName?.sale_price}.00
                                </span>
             </div>
              <span onClick={scrollUp} className='cursor-pointer text-sm text-blue-700'>Change offer</span>
            </div>
          </div>

            <h4 className='text-xl flex text-center mx-auto lg:mx-0 lg:text-left pl-none lg:pl-6  lg:text-2xl font-serif text-gray-900 font-medium  py-4 tracking-normal'>
                Please Select Restraunt
                {/* <Link href='/shops?category=Salon+-+Spa'>
                    <span className='text-blue-800 cursor-pointer hover-underline text-sm '>
                        view all
                    </span>
                </Link> */}
            </h4>
            

               <PromotionSlider handleShopImages = {handleShopImages}  selectedShop = {handleSelectedShop} 
                                shopCategory={"Restraunts"}  offer = {offerName} />

                             <div ref={images} className={`${shopImages ? 'flex' : 'hidden'}  gap-3 w-full px-2 overflow-x-scroll`}>
                                { shopImages  && 
                                <PlacePhotos
                                  showRating={true}
                                  showImages = {true}
                                  showLogoImg = {false}
                                  onClick={handleImage}
                                  handleImage={handleImage}
                                  //@ts-ignore
                                  shopName={selectedSalon?.name} 
                                  // handlePhotos={handleApiPhotos}
                                /> 
                                }
                             </div>
            
        </div>

        <h4 ref={appointment} className={`${selectedSalon ? 'block' : 'hidden'} text-xl mx-auto text-center lg:text-left lg:text-2xl py-4 font-serif text-gray-900 font-medium pl-0 lg:pl-8 mt-10 lg:mt-0 tracking-normal`}>
                  Select Appointment Date & Time
                </h4>

      <div   className={`${selectedSalon ? 'flex' : 'hidden'} grid grid-cols-1 place-items-center place-content-center lg:grid-cols-2 place-contents-center items-center px-2 lg:px-10 justify-evenly w-full`}> 
          {/* <div className='flex flex-col justify-center text-center mx-auto   w-full '>  */}
               
              {/* <div className="  bg-light  mt-5 md:p-8 w-full mx-auto text-center lg:w-1/2"> */}
                    {/* <Schedule count={2} heading='Book Appointment' />
                      */}
                    
                    <div className='mx-auto text-center w-full px-5 sm:px-0'>
                      <Calendar onChange={onChange} value={value} minDate={minDate} />
                    </div>
              {/* </div> */}
          {/* </div> */}

          <div className='p-3 text-sm lg:text-lg grid grid-cols-2 gap-4 place-content-center'>
            <button className={`${selectedTimeSlot === '10:00am - 12:00PM' ? 'bg-blue-600 text-white': 'hover:bg-gray-100 border  p-3 bg-gray-50 text-black'} rounded cursor-pointer w-auto lg:w-96 `} 
            //@ts-ignore
                    onClick={() => setSelectedTimeSlot('10:00am - 12:00PM')}> 10:00 am - 12:00 pm </button>
            <button className={`${selectedTimeSlot === '12:00pm - 02:00pm' ? 'bg-blue-600 text-white': 'hover:bg-gray-100 border  p-3 bg-gray-50 text-black'} rounded cursor-pointer w-auto lg:w-96 `} 
            //@ts-ignore
                    onClick={() => setSelectedTimeSlot('12:00pm - 02:00pm')}> 12:00 pm - 02:00 pm </button>
            <button className={`${selectedTimeSlot === '02:00pm - 04:00pm ' ? 'bg-blue-600 text-white': 'hover:bg-gray-100 border  p-3 bg-gray-50 text-black'} rounded cursor-pointer w-auto lg:w-96 `}
            //@ts-ignore
                    onClick={() => setSelectedTimeSlot('02:00pm - 04:00pm ')}> 02:00 pm - 04:00 pm </button>
            <button className={`${selectedTimeSlot === '04:00pm - 06:00pm' ? 'bg-blue-600 text-white': 'hover:bg-gray-100 border  p-3 bg-gray-50 text-black'} rounded cursor-pointer w-auto lg:w-96 `}
            //@ts-ignore
                    onClick={() => setSelectedTimeSlot('04:00pm - 06:00pm')}> 04:00 pm - 06:00 pm </button>
          </div>

      </div>

      <div className={`${selectedSalon ? 'flex' : 'hidden'} flex flex-col mx-auto w-full text-center`}>
        <p className='text-red-600 animate-bounce transition-opacity duration-300 ease-in-out mt-4 h-5'>{error_msg ? error_msg : ''}</p>
        <button className='mx-auto text-white font-semibold rounded mt-10 w-60 border bg-accent mb-20 p-4' 
                 //@ts-ignore
                 onClick={()=>onSubmit()}>
                {salonBooking ?
                ("booking..."):
                'Book now'}
                 
        </button>
         
      </div>


    </div>

    {/* { width > 768 ? (
      <CartCounterButton/>)
      : null
      } */}
    </>
  )
}

Deals.Layout = DefaultLayout;
