
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
import { useFeatureProductQuery } from '@data/home/use-feature-product-query';
import Image from 'next/image';
import moment from 'moment'
import { Default } from 'react-toastify/dist/utils';
import DefaultLayout from '@components/layout/default-layout';
import { formatSalonProduct } from '@utils/format-salon-products';
import { useOrdersQuery } from '@data/order/use-orders.query';
import Loader from '@components/ui/loader/loader';
import PlacesApi from '@components/shop/google-maps-places-api';

  const ProductFeedLoader = dynamic(
    () => import("@components/ui/loaders/product-feed-loader")
  );



 export  const womenImg = [
        // {
        //     id : "11",
        //     src : '/salon/1.jpg',
        //     slug: 'menicure-pedicure'
        // },
        {
            id : "1",
            src : '/salon/1.jpg',
            slug: 'menicure-pedicure'
        },
        {
            id : "2",
            src : '/salon/2.jpg',
            slug: 'hair-treatment'
        },
        {
            id : "3",
            src : '/salon/3.jpg',
            slug: 'facial',
        },
        {
            id : "4",
            src : '/salon/4.jpg',
            slug: 'waxing',
        },
        {
            id : "5",
            src : '/salon/5.jpg',
            slug: 'women-hair-service'
        },
        {
            id : "6",
            src : '/salon/6.jpg',
            slug: 'makeup'
        },
        {
            id : "7",
            src : '/salon/7.jpg',
            slug: 'spa'
        },
       
  ]

 export  const menImg = [
        {
            id : "8",
            src : '/salon/8.jpg',
            slug: 'menicure-pedicure'
        },
        {
              id : "9",
              src : '/salon/9.jpg',
              slug: 'mens-grooming'
        },
        {
            id : "10",
            src : '/salon/10.jpg',
            slug: 'facial'
        },
        {
            id : "11",
            src : '/salon/11.jpg',
            slug: 'hair-spa'
        },
        {
            id : "12",
            src : '/salon/12.jpg',
            slug: 'mens-grooming'
        },
        {
            id : "13",
            src : '/salon/13.jpg',
            slug: 'shave'
        },
        {
            id : "14",
            src : '/salon/14.jpg',
            slug: 'massage'
        },
    ]
    

    export const getStaticProps = async ({ locale }: any) => {
        return {
          props: {
            ...(await serverSideTranslations(locale, ["common"])),
          },
        };
      };

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


  export default function SalonBookingPage() {

    const {width} = useWindowDimensions();

    const {getLocation} = useLocation();

    const [value, onChange] = useState(new Date());
    const [offerName, setOfferName] = useState(null);
    const [selectedSalon, setSelectedSalon] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [shopImages, setShopImages] = useState(false);
    const [photos, setPhotos] = useState([])
    const router = useRouter();

    const [error_msg ,  setError_Msg] = useState('');

    const { closeModal, openModal } = useModalAction();

    const { isAuthorize } = useUI();

    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    const {
      // isFetching: loading,
      // isFetchingNextPage,
      // fetchNextPage,
      // hasNextPage,
      isError: is_error,
      data: products,
      error: err,
    } = useProductsQuery({
      shop_id: Number(selectedSalon?.id),
      // type: query.type as string,
      sale_price: Number(offerName?.sale_price),
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
      data ,
      isLoading: loading,
      error,
  } = useFeatureProductQuery({
    // shop_id: Number(selectedSalon?.id),
      limit: 10 as number,
      search:"",
      location : ((getLocation?.formattedAddress)?JSON.stringify(getLocation):null ) as any
  });

  console.log('feature',data)

  //   const {  
  //     data,
  //     isLoading: loading,
  //     error,
  // } = useOfferQuery({
    
  //     limit: 20 as number,
  //     search:"",
  //     location : ((getLocation?.formattedAddress) ? JSON.stringify(getLocation):null ) as any
  // }); 

    // useEffect(()=>{
    //   setOfferName(products?.pages[0]?.data?.filter(product => product.sale_price === offerName?.sale_price)[0])
    // },[ ])

    console.log('products',products?.pages[0]?.data?.filter(product => product?.sale_price === offerName?.sale_price)[0])
    // console.log('products',products,offerName)


        const origin = { lat: 37.7749, lng: -32.4194 };

        const destination = { lat: 40.7128, lng: -34.0060 };

        const currentDate =   value;

        const options = { month: 'short' };

        const tim =  currentDate.toLocaleString('en-US', options);

        let dd = String(currentDate.getDate()).padStart(2, '0');

        let yyyy = currentDate.getFullYear();

        console.log('value',tim)

        const pattern = /(?<day>\w+)\s(?<month>\w+)\s(?<date>\d+)\s(?<year>\d+)\s(?<time>\d+:\d+:\d+)\s(?<tz>.*)/;

        const match = tim?.match(pattern);

        // const dd   =  match?.groups.day;
        const month =  tim;
        const date  =  match?.groups.date;
        const year  =  match?.groups.year;

        const newDate = `${dd} ${month}`;

        console.log('value',newDate)

        const { data: orderStatusData } = useOrderStatusesQuery();

        const {
          data: orderData,
          isFetching: order_loading,
          // error,
          // fetchNextPage,
          // hasNextPage,
          // isFetchingNextPage: loadingMore,
        } = useOrdersQuery({});

        console.log('my order',orderData?.pages[0]?.data?.length);
      
        const { mutate: createOrder, isLoading: salonBooking } = useCreateOrderMutation();

        const {data:customer} = useCustomerQuery();

        const[newOfferName, setNewOfferName] = useState(null);

        const[booking, setBooking] = useState(false);


        console.log('log salon',selectedSalon)

        console.log('customer',customer);

        // useEffect(()=>{
        //   setNewOfferName(products?.pages[0]?.data?.filter(product => product.sale_price === offerName?.sale_price)[0])
        // },[selectedSalon])


        function handleSelectedShop(data:any) {
         offerName && setSelectedSalon(data);
          // setNewOfferName(tr)
          
          console.log('new offername data',data)
        }                           
        
        // console.log('new offername',newOfferName) 
        console.log('new selectedSalon',selectedSalon)    
        console.log('new offername',offerName)
        console.log('new products',products?.pages[0]?.data?.filter(product => product.sale_price === offerName?.sale_price)[0])   

        let avail_items =  [products?.pages[0]?.data?.filter(product =>  product.sale_price === offerName?.sale_price)[0] ]
        // product_id: products?.pages[0]?.length && products?.pages[0]?.length && products?.pages[0]?.data?.filter(product => product?.sale_price === offerName?.sale_price  )[0].id,
        // }]

        console.log('new avail items', offerName);

        const subtotal = calculateTotal(avail_items).total;

        console.log('log avail_items', avail_items);

        console.log('log offer', offerName);

        let price = products?.pages[0]?.data?.filter(product => product.sale_price === offerName?.sale_price)[0]?.price;
        let sale_price = products?.pages[0]?.data?.filter(product => product.sale_price === offerName?.sale_price)[0]?.sale_price;
      

        function calcDiscount(price, sale_price){
          return (price - sale_price) / price *100
        }

        const { billing_address, setCheckoutData, checkoutData } = useCheckout();

        const { mutate: verifyCheckout, isLoading: c_loading } =
        useVerifyCheckoutMutation();

        // useEffect(()=>{
        //      setShopImages(true)
        // },[selectedSalon])

        useEffect(()=>{
          // const prevUrl = document.referrer;
          // alert('start')

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

          console.log('newoffer',offerName);
           
          if (selectedSalon == null && selectedTimeSlot == null) {
            setError_Msg('Please select salon and date/time slot also');
            return;
         }         
       

          if (selectedSalon == null) {
            setError_Msg('Please select salon also');
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
            //    [{...offerName,
            //   shop : {selectedSalon}
            //    }],
            customer_contact: customer?.me?.phone_number,
            status:  orderStatusData?.order_statuses?.data[0]?.id ?? 1,
            amount: offerName && offerName?.sale_price,
            // product_id: products?.pages[0]?.length && products?.pages[0]?.data?.filter(product => product?.sale_sale_price === offerName?.sale_price  )[0].id,
            // coupon_id: coupon?.id,
            // quantity: 1,
            discount:  Math.floor(calcDiscount(price, sale_price)),
            paid_total: offerName && offerName?.sale_price,
            total : offerName && offerName?.sale_price,
            sales_tax:  0,
            delivery_fee: 0,
            delivery_time: newDate + ' ' + selectedTimeSlot,
            payment_gateway: 'cod',
          };

          localStorage.setItem('input', JSON.stringify(input));

          let inputString = JSON.parse(localStorage.getItem('input'));

          console.log('input', input);

          console.log('input', inputString ? true : false);

          

 
          if(!isAuthorize){
            return openModal('REGISTER',{
                pathname: '/salon-near-me',
            });
          }


          verifyCheckout(
            {
              amount: subtotal,
              // unit_price: subtotal,
              // total: offerName && offerName?.sale_price,
              products: avail_items?.map((item) => formatSalonProduct(item)),
            },
          )


          console.log('values',input,offerName)
            
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
                // console.log(error?.response?.data?.message);
              },
            });
          
          }

          let inputString = JSON.parse(localStorage.getItem('input'));

          console.log('input outside', document.referrer)
           

          function getSearch():string
          {
            const { query } = useRouter();
            
            if(newOfferName?.name){
              console.log(newOfferName?.name)
              return newOfferName?.name as string
            }
            return "";
          }
          const myDiv = useRef(null);

          console.log([{'offer': offerName, 'selectedSalon' : selectedSalon }])


          const {
            addItemToCart,
            removeItemFromCart,
            isInStock,
            isProductAvailable,
            getItemFromCart,
            isInCart,
          } = useCart();
 
         
        function showSalons(data:any) {

          myDiv.current.scrollIntoView({
            behavior: 'smooth',
          })
        
         console.log('salon',data)
         setOfferName(data)
         setSelectedSalon(null);
          // offerName && addItemToCart(offerName, 1) 
          // const item = generateCartItem(data);
          // addItemToCart(item, 1)
        }

        
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
      location:((getLocation?.formattedAddress) ? JSON.stringify(getLocation) : null ) as any,
      is_active:1,
      // page:1,
      search:getSearch() 
    });

    console.log('shops',offerName,shops)

    const handleClick = (e) => {
      const value = e.target.innerHTML;
      console.log(value);
      // You can use the value here, for example, to set the value of an input element
      document.getElementById('input-element').value = value;
    }

    console.log('time',selectedTimeSlot)

    const filteredData = data?.featureProducts?.data?.filter(product =>
      product?.status === "publish" &&
      product?.type_id == 7 &&
      product?.is_featured === 1 &&
      product?.shop?.shop_categories?.replace(/[^a-zA-Z ]/g, "").
      replace("name", "").replace("id", "") === "Salon  Spa"
    );

     const uniqueProducts = [];

    filteredData?.forEach(product => {
      if (!uniqueProducts?.find(p => p.name === product.name && p?.sale_price === product?.sale_price)) {
        uniqueProducts.push(product);
      }
    });

    const minDate = new Date();
    // minDate.setDate(minDate.getDate() + 30);

    function handleApiPhotos(data) {
      setPhotos(data)
    }

    function handleImage(data){
      console.log('modal data',data)
      openModal('SHOP_IMAGE_POPOVER',{
        data:data
      })
    }

    function handleShopImages(data:any) {
      setShopImages(data)
    }

    console.log('shopImages',shopImages)


  return ( 

    //salon page design 
    // <>
    // {fetching && !data?.pages?.length ? (
    // <img src='/'
    // className="object-contain mx-auto" />
    // ) : (

    <>

    <Head>
      <link rel="canonical" href={`https://buylowcal.com/salon`}/>
    </Head>

    <div className='h-full border bg-white w-full'>

      <p className='flex flex-col font-semibold text-blue-500 text-center mt-4 w-full'>
      <div className="text-center text-lg font-medium tracking-wide text-red-600">Limited Slots!!</div>
     <div className="text-center text-lg font-medium tracking-wide text-green-600">Book Now, Pay Later</div>
      </p>

          <h3 className='text-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-medium text-2xl lg:text-3xl text-gray-900 font-serif ml-4 lg:ml-8 mt-10 lg:mt-10 tracking-normal'>
            Select Deals to Explore Salons
          </h3>

          <Loader text='booking...' className={` ${booking ? 'block' : 'hidden'} mx-auto z-50`}/>

            <div className = {`${data?.featureProducts?.data?.length  ? 'block w-full' : 'hidden'} relative w-full overflow-x-scroll text-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                            grid grid-cols-2  h-full md:grid md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-5 bg-gray-50 mt-3 p-2 lg:p-6 gap-1 lg:gap-4`}>
              
               {/* {fetching && !data?.pages?.length ? (
                        <ProductFeedLoader limit={5} />
                      ) : ( */}
                
                        { uniqueProducts?.map((offer,product) => (
                          
                          <div onClick={ ()=> showSalons(offer)} className={` ${offer?.name === offerName?.name ? 'border-3 border-green-500 ' : 'border-3'}
                                              relative w-full h-full flex flex-col  lg:w-full mx-auto bg-white rounded-lg shadow-lg `}>
                            <div className='relative flex items-center justify-center w-auto h-64  '>
                                <Image layout="fill"
                                      priority={true}
                                      objectFit="contain" 
                                      quality='40' 
                                      src={offer?.image?.thumbnail} 
                                      //  className=' object-contain h-full w-full ' 
                                      alt={offer?.name}
                                />
                            </div>
                             <CheckMarkFill  width={20} className={` ${(offer?.name === offerName?.name && offer?.sale_price === offerName?.sale_price ) ? 'block transition-all duration-900 ease-in-out' : 'hidden'} absolute right-0 top-0 me-2 bg-white rounded-full  text-green-600`} />
                          <div className=' space-y-2'>
                            <div className="px-2 lg:px-6   ">
                              <div className="font-semibold text-sm lg:text-lg h-10 ">
                                {offer?.name}
                              </div>
                            </div>
                            <div className="flex flex-col px-2 lg:px-6 space-y-2 py-1 ">
                             <div className='flex items-center'> 
                               <span className="inline-block bg-gray-200 text-accent p-3 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                ₹
                                {+' '+offer?.sale_price}.00
                                </span>
                                <del className="inline-block  p-3  px-2 py-1 text-sm font-semibold text-gray-600 mr-2">
                                ₹
                                {+' '+offer?.price}.00
                                </del>
                              </div>
                              <button
                                className={` ${offer?.name === offerName?.name && offer?.sale_price === offerName?.sale_price ? 'bg-green-600 text-white' : 'text-gray-500 bg-gray-100' }   hover:bg-green-600 hover:text-white text-white font-bold py-2 px-4 rounded-full`}
                                 
                              >
                                {offer?.name === offerName?.name &&  offer?.sale_price === offerName?.sale_price ? 'Selected' : 'Select'}
                              </button>
                            </div>
                          </div>
                      </div>
                        ))
                    }
                    
            </div>


        <div ref={myDiv}  className='flex flex-col lg:px-4 mt-6 lg:mt-10 py-4'>

            <h4 className='text-xl flex items-center justify-between lg:text-3xl font-serif text-gray-900 font-medium ml-2 lg:ml-4 py-4 tracking-normal'>
                Select Salon 
                {/* <Link href='/shops?category=Salon+-+Spa'>
                    <span className='text-blue-800 cursor-pointer hover-underline text-sm '>
                        view all
                    </span>
                </Link> */}
            </h4>
            

            <PromotionSlider handleShopImages={handleShopImages}  selectedShop = {handleSelectedShop} 
                              offer = {offerName} />

                             <div className={`${shopImages ? 'flex' : 'hidden'}  gap-3 w-full px-2 overflow-x-scroll`}>
                              { shopImages  && <PlacesApi 
                              show={true}
                              onClick={handleImage}
                                handleImage={handleImage}
                                shopName={selectedSalon?.name} 
                              // handlePhotos={handleApiPhotos}
                                /> }
                             </div>
            
        </div>

      <div className='grid grid-cols-1 lg:grid-cols-2  items-center justify-evenly'> 
             
          <div className="  bg-light p-5 mt-10 md:p-8 w-auto lg:w-1/2">
                {/* <Schedule count={2} heading='Book Appointment' />
                   */}
                <h4 className=' whitespace-nowrap text-xl flex items-center justify-between lg:text-3xl font-serif text-gray-900 font-medium     py-4 tracking-normal'>
                  Select Appointment Date & Time
                </h4>
                <div>
                  <Calendar onChange={onChange} value={value} minDate={minDate} />
                </div>
          </div>

          <div className='p-3 text-sm lg:text-lg grid grid-cols-2 gap-4 place-content-center'>
            <button className={`${selectedTimeSlot === '10:00am - 12:00PM' ? 'bg-blue-600 text-white': 'hover:bg-gray-100 border  p-3 bg-gray-50 text-black'} rounded cursor-pointer `} 
                    onClick={() => setSelectedTimeSlot('10:00am - 12:00PM')}> 10:00 am - 12:00 pm </button>
            <button className={`${selectedTimeSlot === '12:00pm - 02:00pm' ? 'bg-blue-600 text-white': 'hover:bg-gray-100 border  p-3 bg-gray-50 text-black'} rounded cursor-pointer `} 
                    onClick={() => setSelectedTimeSlot('12:00pm - 02:00pm')}> 12:00 pm - 02:00 pm </button>
            <button className={`${selectedTimeSlot === '02:00pm - 04:00pm ' ? 'bg-blue-600 text-white': 'hover:bg-gray-100 border  p-3 bg-gray-50 text-black'} rounded cursor-pointer `}
                    onClick={() => setSelectedTimeSlot('02:00pm - 04:00pm ')}> 02:00 pm - 04:00 pm </button>
            <button className={`${selectedTimeSlot === '04:00pm - 06:00pm' ? 'bg-blue-600 text-white': 'hover:bg-gray-100 border  p-3 bg-gray-50 text-black'} rounded cursor-pointer `}
                    onClick={() => setSelectedTimeSlot('04:00pm - 06:00pm')}> 04:00 pm - 06:00 pm </button>
          </div>

      </div>

      <div className='flex flex-col mx-auto w-full text-center'>
      <p className='text-red-600 animate-bounce transition-opacity duration-300 ease-in-out h-5'>{error_msg ? error_msg : ''}</p>
        <button className='mx-auto text-white font-semibold rounded mt-10 w-60 border bg-accent mb-20 p-4' 
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

SalonBookingPage.Layout = DefaultLayout;
