
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

    const router = useRouter();

    const { closeModal, openModal } = useModalAction();
    const { isAuthorize } = useUI();

    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    const origin = { lat: 37.7749, lng: -32.4194 };
    const destination = { lat: 40.7128, lng: -34.0060 };

    // const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.lat},${origin.lng}&destinations=${destination.lat},${destination.lng}&key=${API_KEY}`
    
    //   axios.get(url)
    //     .then((response) => {
    //        const distance = response.data.rows[0].elements[0].distance.text;
    //       const duration = response.data.rows[0].elements[0].duration.text;
    //       console.log(`The distance between the two locations is ${distance} and the estimated travel time is ${duration}.`);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //   });

       const tim = 'Tue Dec 20 2022 10:55:16 GMT+0530 (India Standard Time)'

        const pattern = /(?<day>\w+)\s(?<month>\w+)\s(?<date>\d+)\s(?<year>\d+)\s(?<time>\d+:\d+:\d+)\s(?<tz>.*)/;

         const match = tim?.match(pattern);

         const day = match?.groups.day;
        const month = match?.groups.month;
        const date = match?.groups.date;
        const year = match?.groups.year;

        // Concatenate the extracted information to get the desired output
        const newDate = `${day} ${month} ${date} ${year}`;
        alert(newDate)
   
    // console.log('offer data', data)

    // // console.log( 'category',data?.offers.data.map(product => {
    //     return product?.shop?.shop_categories.replace(/[^a-zA-Z ]/g, "").replace('name', '').replace('id','')}
    // ));

        const { query } = useRouter();
        const [searchTerm, setSearchTerm] = useState("");
        const [category, setCategory] = useState("");
        const [page, setPage] = useState(1);
        const [orderBy, setOrder] = useState("created_at");
        const [type, setType] = useState("");
        const { data: orderStatusData } = useOrderStatusesQuery();
        const { mutate: createOrder } = useCreateOrderMutation();

        const [selectedOffer, setSelectedOffer] = useState(null);

        const {data:customer} = useCustomerQuery();

        console.log('loc',getLocation)

        // const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

        // const {
        //     data: salonProducts,
        //     isLoading: fetching,
        //     errors,
        //   } = useAllProductsQuery({
        //       limit: 90000,
        //       page,
        //       type,
        //       category,
        //       text: query?.text as string,
        //   });

        const {
          billing_address,
          shipping_address,
          delivery_time,
          checkoutData,
          coupon,
          discount,
        } = useCheckout();

        const [offerName, setOfferName] = useState(null);
        const [selectedSalon, setSelectedSalon] = useState(null)
        const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
        
        const { items, delivery_charges} = useCart();

        console.log(billing_address)
        const available_items = items?.filter(
          (item: any) => 
          //check if item have status attribute
           !checkoutData?.unavailable_products.map((item: any) => item.name).includes(item.name) 
        );

        let avail_items =  [{...offerName,
          shop : selectedSalon
        }]


        console.log('values 2 ', avail_items)
 

        function onSubmit(values: FormValues) {

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
          // }],
            customer_contact: customer?.me?.phone_number,
            status:   1,
            amount: 100,
            // coupon_id: coupon?.id,
            discount:  0,
            paid_total: offerName?.price,
            total : 100,
            sales_tax:  2,
            delivery_fee: 0,
            delivery_time: 'jj',
            payment_gateway: 'cod',
            billing_address: {
              ...(billing_address?.address && billing_address.address),
            },
            shipping_address: {
              ...(shipping_address?.address && shipping_address.address),
            },
          };

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


          const {
              data,
              isLoading: loading,
              error,
          } = useOfferQuery({
              limit: 20 as number,
              search:"",
              location : ((getLocation?.formattedAddress)?JSON.stringify(getLocation):null ) as any
          }); 

          
          function handleSearch({ searchText }: { searchText: string }) {
            setSearchTerm(searchText);
            setPage(1);
          }

          const Product = [] ; 
      

          function getCategory():string {
              return 'Salon & Spa' as string; 
          }

          function getSearch():string
          {
            const { query } = useRouter();
            
            if(offerName?.name){
              console.log(offerName?.name)
              return offerName?.name as string
            }
            return "";
          }

          function handleSelectedShop(data) {
            setSelectedSalon(data);
              console.log(selectedSalon);
          }

          console.log([{'offer': offerName, 'selectedSalon' : selectedSalon }])

          
          

          // console.log('shop-data', shopData);

          // // console.log('salon category products',salonProducts?.products.data.filter(product => product?.categories.map( cat => cat.name === 'Services')   )  )
            
          // // console.log('salonProduct',salonProducts?.products.data.filter(product => product?.status === 'publish' && product?.categories?.name === 'Hair Spa'  )  )

        function showSalons(data:any){
         console.log('salon',data)
         setOfferName(data)
        //  const item = generateCartItem(data);
        //  addItemToCart(item, 1)
        }

        const {
            addItemToCart,
            removeItemFromCart,
            isInStock,
            isProductAvailable,
            getItemFromCart,
            isInCart,
          } = useCart();
        
       

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

            <div className = {`${data?.offers.data?.length  ? 'block' : 'hidden'} text-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
               grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-5 bg-gray-50 mt-3 p-2 lg:p-6 gap-2`}>
               {/* {fetching && !data?.pages?.length ? (
                        <ProductFeedLoader limit={5} />
                      ) : ( */}
                
                    {
                      data?.offers.data.filter(product => product.status === 'publish' && product.is_featured === 1 && product?.shop?.shop_categories?.replace(/[^a-zA-Z ]/g, "").replace('name', '').replace('id','') ==='Salon  Spa' ).map((offer,product) => (
                          
                      <div className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                        <img src={offer.image.thumbnail} 
                             className='w-full '/>
                        <div className="px-6 py-4">
                          <div className="font-bold text-xl mb-2">
                            {offer.name}
                          </div>
                        </div>
                        <div className="px-6 py-4">
                          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                           {offer.price}
                          </span>
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                            onClick={ ()=> showSalons(offer)}
                          >
                            Select
                          </button>
                        </div>
                      </div>
                        ))
                    }
            </div>
        

        <div className='flex flex-col lg:px-4 mt-0 lg:mt-10 py-4'>

            <h4 className='text-xl flex items-center justify-between lg:text-3xl font-serif text-gray-900 font-medium ml-2 lg:ml-4 py-4 tracking-normal'>
                Select Salon 
                <Link href='/shops?category=Salon+-+Spa'>
                    <span className='text-blue-800 cursor-pointer hover-underline text-sm '>
                        view all
                    </span>
                </Link>
            </h4>

            <PromotionSlider selectedShop={handleSelectedShop} offer={offerName} />
            
        </div>

      <div className='flex items-center justify-evenly'> 

          <div className="  bg-light p-5 mt-10 md:p-8 w-auto lg:w-1/2">
                {/* <Schedule count={2} heading='Book Appointment' />   */}
                <div>
                  <Calendar onChange={onChange} value={value} />
                </div>
          </div>

          <div className='p-3 grid grid-cols-2 gap-4 place-content-center'>
            <button className={`${selectedTimeSlot === '10:00am - 12:00PM' ? 'bg-blue-600 text-white': 'hover:bg-blue-200 hover:text-white p-3 bg-gray-100 text-black'} rounded cursor-pointer `} 
                    onClick={() => setSelectedTimeSlot('10:00am - 12:00PM')}> 10:00 am - 12:00 PM </button>
            <button className={`${selectedTimeSlot === '12:00pm - 02:00pm' ? 'bg-blue-600 text-white': 'hover:bg-blue-200 hover:text-white p-3 bg-gray-100 text-black'} rounded cursor-pointer `} 
                    onClick={() => setSelectedTimeSlot('12:00pm - 02:00pm')}> 12:00pm - 02:00pm </button>
            <button className={`${selectedTimeSlot === '02:00pm - 04:00pm ' ? 'bg-blue-600 text-white': 'hover:bg-blue-200 hover:text-white p-3 bg-gray-100 text-black'} rounded cursor-pointer `}
                    onClick={() => setSelectedTimeSlot('02:00pm - 04:00pm ')}> 02:00pm - 04:00pm </button>
            <button className={`${selectedTimeSlot === '04:00pm - 06:00pm' ? 'bg-blue-600 text-white': 'hover:bg-blue-200 hover:text-white p-3 bg-gray-100 text-black'} rounded cursor-pointer `}
                    onClick={() => setSelectedTimeSlot('04:00pm - 06:00pm')}> 04:00pm - 06:00pm </button>
          </div>

      </div>

      <button className='mr-20 border  mb-20 p-4' onClick={()=>onSubmit()}>submit</button>


    </div>

    { width > 768 ? (
      <CartCounterButton/>)
      : null
      }
    </>
  )
}

SalonBookingPage.Layout = ShopLayout;
