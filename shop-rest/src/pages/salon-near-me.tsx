
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

    const router = useRouter();

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

        const tim = 'Tue Dec 20 2022 10:55:16 GMT+0530 (India Standard Time)'

        const pattern = /(?<day>\w+)\s(?<month>\w+)\s(?<date>\d+)\s(?<year>\d+)\s(?<time>\d+:\d+:\d+)\s(?<tz>.*)/;

        const match = tim?.match(pattern);

        const day   =  match?.groups.day;
        const month =  match?.groups.month;
        const date  =  match?.groups.date;
        const year  =  match?.groups.year;

        const newDate = `${day} ${month} ${date} ${year}`;

        const { data: orderStatusData } = useOrderStatusesQuery();
   
      
        const { mutate: createOrder, isLoading: salonBooking } = useCreateOrderMutation();


        const {data:customer} = useCustomerQuery();
        const[newOfferName, setNewOfferName] = useState(null);


        console.log('log salon',selectedSalon)

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

        console.log('log avail_items', avail_items)
        console.log('log offer', offerName)

        let price = products?.pages[0]?.data?.filter(product => product.sale_price === offerName?.sale_price)[0].price;
        let sale_price = products?.pages[0]?.data?.filter(product => product.sale_price === offerName?.sale_price)[0].sale_price;


      function calcDiscount(price, sale_price){
        return (price - sale_price) / price *100
      }

        const { mutate: verifyCheckout, isLoading: c_loading } =
        useVerifyCheckoutMutation();

        function onSubmit(values: FormValues) {
          console.log('newoffer',offerName);
           

          if (!isAuthorize) {
            return openModal("LOGIN_VIEW");
          }
           

          let input = {
            //@ts-ignore
            location:getLocation?.formattedAddress,
            products: 
            avail_items?.map((item) => formatOrderedProduct(item)),
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
            delivery_time: selectedTimeSlot,
            payment_gateway: 'cod',
          };


          verifyCheckout(
            {
            
              amount: subtotal,
              // unit_price: subtotal,
              // total: offerName && offerName?.sale_price,
              products: avail_items?.map((item) => formatOrderedProduct(item)),
            
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
           

          function getSearch():string
          {
            const { query } = useRouter();
            
            if(newOfferName?.name){
              console.log(newOfferName?.name)
              return newOfferName?.name as string
            }
            return "";
          }
          const myDiv = useRef(null)

         

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
      product?.shop?.shop_categories?.replace(/[^a-zA-Z ]/g, "").replace("name", "").replace("id", "") === "Salon  Spa"
    );

     const uniqueProducts = [];

    filteredData?.forEach(product => {
      if (!uniqueProducts?.find(p => p.name === product.name)) {
        uniqueProducts.push(product);
      }
    });

  return (

   //salon page design 

  //  <>
  //  {fetching && !data?.pages?.length ? (
  //    <img src='/'
  //    className="object-contain mx-auto" />
  // ) : (

  

      <>

    <Head>
      <link rel="canonical" href={`https://buylowcal.com/salon`}/>
    </Head>

    <div className=' h-full border bg-white w-full'>

          <h3 className='text-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-medium text-2xl lg:text-3xl text-gray-900 font-serif ml-4 lg:ml-8 mt-10 lg:mt-10 tracking-normal'>
            Featured Products
          </h3>

            <div className = {`${data?.featureProducts?.data?.length  ? 'block w-full' : 'hidden'} w-full overflow-x-scroll text-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                            grid grid-rows-2   md:grid md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-5 bg-gray-50 mt-3 p-2 lg:p-6 gap-4`}>
              
               {/* {fetching && !data?.pages?.length ? (
                        <ProductFeedLoader limit={5} />
                      ) : ( */}
                
                    {
                      uniqueProducts?.map((offer,product) => (
                          
                      <div className={` ${offer?.name === offerName?.name ? 'border-3 border-green-500 ' : 'border-3'}
                                         relative w-96 h-full flex flex-col  lg:w-full mx-auto bg-white rounded-lg shadow-lg `}>
                        <div className='relative flex items-center justify-center w-auto h-64  '>
                          <Image layout="fill"
                                 objectFit="contain" 
                                 quality='40' 
                                src={offer?.image?.thumbnail} 
                            //  className=' object-contain h-full w-full ' 
                             alt={offer?.name}
                          />
                        </div>
                             <CheckMarkFill  width={20} className={` ${offer?.name === offerName?.name ? 'block transition-all duration-900 ease-in-out' : 'hidden'} absolute right-0 top-0 me-2 bg-white rounded-full  text-green-600`} />
                          <div className=' '>
                            <div className="px-6 py-4">
                              <div className="font-bold text-lg lg:text-xl mb-2">
                                {offer?.name}
                              </div>
                            </div>
                            <div className="px-6 py-2 ">
                              <span className="inline-block bg-gray-200 p-3 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                              ₹
                              {+' '+offer?.sale_price}.00
                              </span>
                              <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                onClick={ ()=> showSalons(offer)}
                              >
                                {offer?.name === offerName?.name ? 'Selected' : 'Select'}
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
                <Link href='/shops?category=Salon+-+Spa'>
                    <span className='text-blue-800 cursor-pointer hover-underline text-sm '>
                        view all
                    </span>
                </Link>
            </h4>

            <PromotionSlider  selectedShop = {handleSelectedShop} 
                             offer = {offerName} />
            
        </div>

      <div className='grid grid-cols-1 lg:grid-cols-2  items-center justify-evenly'> 
             
          <div className="  bg-light p-5 mt-10 md:p-8 w-auto lg:w-1/2">
                {/* <Schedule count={2} heading='Book Appointment' />
                   */}
                <h4 className=' whitespace-nowrap text-xl flex items-center justify-between lg:text-3xl font-serif text-gray-900 font-medium     py-4 tracking-normal'>
                  Select Appointment Data & Time
                </h4>
                <div>
                  <Calendar onChange={onChange} value={value} />
                </div>
          </div>

          <div className='p-3 text-sm lg:text-lg grid grid-cols-2 gap-4 place-content-center'>
            <button className={`${selectedTimeSlot === '10:00am - 12:00PM' ? 'bg-blue-600 text-white': 'hover:bg-gray-100 border  p-3 bg-gray-50 text-black'} rounded cursor-pointer `} 
                    onClick={() => setSelectedTimeSlot('10:00am - 12:00PM')}> 10:00 am - 12:00 PM </button>
            <button className={`${selectedTimeSlot === '12:00pm - 02:00pm' ? 'bg-blue-600 text-white': 'hover:bg-gray-100 border  p-3 bg-gray-50 text-black'} rounded cursor-pointer `} 
                    onClick={() => setSelectedTimeSlot('12:00pm - 02:00pm')}> 12:00pm - 02:00pm </button>
            <button className={`${selectedTimeSlot === '02:00pm - 04:00pm ' ? 'bg-blue-600 text-white': 'hover:bg-gray-100 border  p-3 bg-gray-50 text-black'} rounded cursor-pointer `}
                    onClick={() => setSelectedTimeSlot('02:00pm - 04:00pm ')}> 02:00pm - 04:00pm </button>
            <button className={`${selectedTimeSlot === '04:00pm - 06:00pm' ? 'bg-blue-600 text-white': 'hover:bg-gray-100 border  p-3 bg-gray-50 text-black'} rounded cursor-pointer `}
                    onClick={() => setSelectedTimeSlot('04:00pm - 06:00pm')}> 04:00pm - 06:00pm </button>
          </div>

      </div>

      <div className='mx-auto w-full text-center'>
        <button className='mx-auto text-white font-semibold rounded mt-10 w-60 border bg-accent mb-20 p-4' 
                onClick={()=>onSubmit()}>
                {salonBooking ?
                ("booking..."):
                'Book now'}
        </button>
      </div>


    </div>

    { width > 768 ? (
      <CartCounterButton/>)
      : null
      }
    </>
  )
}

SalonBookingPage.Layout = ShopLayout;
