

import React from 'react';
import Layout from "@components/layout/layout";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState, useRef } from "react";
import { useAllProductsQuery } from "@data/product/products.query";
import { motion } from "framer-motion";
import SalonCard from '@components/product/product-card/salon-card';
import Argon from '@components/product/product-card/argon';
import Krypton from '@components/product/product-card/krypton';
import Helium from '@components/product/product-card/helium';
import dynamic from "next/dynamic";
import CategoryDropdownSidebar from '@components/category/category-dropdown-sidebar';
import Neon from '@components/product/product-card/neon';
import SalonProductsCategories from './salon-page/salon-products-categories';
import { ArrowDownIcon } from '@heroicons/react/outline';
import { ExpandLessIcon } from '@components/icons/expand-less-icon';
import { ExpandMoreIcon } from '@components/icons/expand-more-icon';
import useOnClickOutside from '@utils/use-click-outside';
import NotFound from '@components/common/not-found';
import { HidingHeader } from 'hiding-header-react';



type DivElementRef = React.MutableRefObject<HTMLDivElement>;

export const getStaticProps = async ({ locale }: any) => {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  };

  export  const womenImg = [
    {
        id : "1",
        src : '/salon/1.jpg',
        icon: '/salon/women-menicure.png',
        slug: 'menicure-pedicure',
        name: 'Menicure pedicure'
    },
    {
        id : "2",
        src : '/salon/2.jpg',
        icon: '/salon/hairdresser.png',
        slug: 'hair-treatment',
        name:'Hair Treatment',
    },
    {
        id : "3",
        src : '/salon/3.jpg',
        icon: '/salon/facial-women.jpeg',
        slug: 'facial',
        name: 'Facial'
    },
    {
        id : "4",
        src : '/salon/4.jpg',
        icon: '/salon/waxing.png',
        slug: 'waxing',
        name: 'Waxing'
    },
    {
        id : "5",
        src : '/salon/5.jpg',
        icon: '/salon/women-haircut.png',
        slug: 'women-hair-service',
        name: 'Haircut'
    },
    {
        id : "6",
        src : '/salon/6.jpg',
        icon: '/salon/makeup.png',
        slug: 'makeup',
        name:'Makeup'
    },
    {
        id : "7",
        src : '/salon/7.jpg',
        icon: '/salon/massage.png',
        slug: 'spa',
        name:'Spa & Massage'
    },
   
]

 export const menImg = [
    {
        id : "8",
        src : '/salon/8.jpg',
        icon: '/salon/women-menicure.png',
        slug: 'menicure-pedicure',
        name: 'Menicure pedicure' 
    },
    {
          id : "9",
          src : '/salon/9.jpg',
          icon: '/salon/long-hair.png',
          slug: 'mens-grooming',
          name :'Hair Treatment'
    },
    {
        id : "10",
        src : '/salon/10.jpg',
        icon: '/salon/skincare.png',
        slug: 'men-facial',
        name: 'Facial'
    },
    {
        id : "11",
        src : '/salon/11.jpg',
        icon: '/salon/shampoo.png',
        slug: 'hair-spa',
        name: 'Hair Spa'
    },
    {
        id : "12",
        src : '/salon/12.jpg',
        icon: '/salon/haircut.png',
        slug: 'mens-grooming',
        name:'Haircut'
        
    },
    {
        id : "13",
        src : '/salon/13.jpg',
        icon: '/salon/shave.png',
        slug: 'shave',
        name:'Shaving'
    },
    {
        id : "14",
        src : '/salon/14.jpg',
        icon: '/salon/massage.png',
        slug: 'massage',
        name:'Massage'
    },
]

  const ProductFeedLoader = dynamic(
    () => import("@components/ui/loaders/product-feed-loader")
  );


export default function SalonProducts() {

    const { query } = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);
    const [orderBy, setOrder] = useState("created_at");
    const [type, setType] = useState("");


    const {
        data,
        isLoading: loading,
        error,
      } = useAllProductsQuery({
        limit: 90000,
        category: query?.category as string,
        text: query?.text as string,
      });


  // if (!loading && !data?.pages?.[0]?.data?.length) {
  //   return (
  //     <div className="bg-gray-100 min-h-full pt-6 pb-8 px-4 lg:p-8">
  //       {/* <ProductNotFound text="text-not-found" className="w-1/3 mx-auto" /> */}
  //       <img src='/not-found.png'
  //       className="object-contain mx-auto"/>

  //     </div>
  //   );
  // }

    //   function handleSearch({ searchText }: { searchText: string }) {
    //     setSearchTerm(searchText);
    //     setPage(1);
    //   }

    

    const router = useRouter();

    function  handleClick(img: any) {
      
      const { pathname, query } = router;
      // const { pathname, query } = router;
  
      const navigate = () => {
      
      // setOpen(false);
      //    displaySidebar && closeSidebar();
      
      //    { width < 976 ?
      //     ( shop_slug?.some(el => pageURL.includes(el)) ?   window.scrollTo(0, 150) : 
      //      window.scrollTo(0, 620) ) : 
      //      ( shop_slug?.some(el => pageURL.includes(el)) ?   window.scrollTo(0, 570) :
      //      window.scrollTo(0, 550) )
      //   };
      
        router.push(
          {
            pathname : '/salon-products',
            query: { ...query, category: img?.slug , text:  null },
          },
          undefined,
          {
            scroll: false,
          }
        );
        
      }
      navigate();
    }

    // const sortBy= [ 
    //   {
    //      id: '1',
    //      name:'Sort by: High to Low',

    //   },
    //   {
    //       id:'2',
    //       name:'Sort by: Low to High',

    //   }
    // ]

    const [btn, setBtn] = useState(true);

    const [btn2, setBtn2] = useState(false);

    const[sortList, setSortList] = useState(false);

    const[sortGenderList, setSortGenderList] = useState(false);

    const [sortBtn, setSortBtn] = useState('Sort by: Latest');

    const[sortGenderBtn, setSortGenderBtn] = useState('Category');

    function handleSort(){
       
    }

    function showMen() {
        setBtn(true);
        setBtn2(false);
    }

    function showWomen() {
        setBtn(false);
        setBtn2(true);
    }

    const sortRef = useRef() as DivElementRef;

    const sortGenderRef = useRef() as DivElementRef;

    useOnClickOutside(sortRef, () => setSortList(false));
    useOnClickOutside(sortGenderRef, () => setSortGenderList(false));

    // const category = query?.category as string;


    console.log('btn', btn);

  return (

          <div className ='flex flex-col relative'>
          
                {/* <div className='mt-10 bg-red-100'>
                      <h1>salon-products</h1>
                      <h1>salon-products</h1>
                      <h1>salon-products</h1>
                    </div> */}
                    
                  {/* <CategoryDropdownSidebar data={data}/> */}
                  {/* <HidingHeader>   */}
                     <div className=''> <SalonProductsCategories  btn2={btn2} btn={btn} /> </div>
                      {/* </HidingHeader>  */}

                  

                  {/* <h1>{sortList ? () => alert('true') : false}</h1> */}

             <div className='flex items-center bg-white justify-between w-full'>  

               <div className='relative mt-3 w-24 lg:w-28 bg-white flex justify-end ml-2 lg:ml-4 rounded'>

                    <button className=' flex justify-between border pl-4 border-gray-200 text-10px lg:text-sm font-semibold  w-full items-center left-4 bg-white text-gray-600 p-2' onClick={()=> setSortGenderList(!sortGenderList)}>
                               {sortGenderBtn} { !sortGenderList ? 
                                           <ExpandLessIcon className='w-4 h-4 mr-1'/> : 
                                           <ExpandMoreIcon className='w-4 h-4 mr-1'/>
                                          }
                    </button>

                    <div ref={sortGenderRef}
                        //  style={{ transition: 'all 4s ease-in-out', width: sortList ? '100px' : '0' }} 
                        className={` ${sortGenderList ? 'block ' : 'hidden'} bg-white absolute border text-10px lg:text-sm top-11 right-0 space-y-3 p-2 z-40 w-full`}>
                        <li className={`${sortGenderBtn === 'Men' ? 'bg-gray-100' : null} cursor-pointer list-none text-gray-600 `} onClick={() => { showMen(); setSortGenderList(!sortGenderList); setSortGenderBtn('Men')}}>
                          Men
                        </li>
                        <li className={`${sortBtn === 'Women' ? 'bg-gray-100' : null} cursor-pointer list-none text-gray-800 `} onClick={() => {  showWomen(); setSortGenderList(!sortGenderList); setSortGenderBtn('Women')}}>
                          Women
                        </li>
                          {/* <li className='cursor-pointer list-none text-gray-700  ' onClick={ () =>{ setSortList(!sortList); setSortBtn('Sort by: Low to High')}}>
                          Sort by: Low to High
                          </li> */}
                    </div>
                </div>

                {/* <div className='flex w-full text-center mx-auto text-gray-800'>
                                <p>{query.category}</p>
                  </div> */}


                  <div className='relative mt-3 flex justify-end w-38 mr-2 lg:mr-4 rounded'>
                    <button className=' flex items-center border  border-gray-200 text-10px lg:text-sm font-semibold  right-4 w-full bg-white text-gray-600 p-2' onClick={()=> setSortList(!sortList)}>
                               {sortBtn} { !sortList ? 
                                           <ExpandLessIcon className='w-4 h-4 ml-2'/> : 
                                           <ExpandMoreIcon className='w-4 h-4 ml-2'/>
                                          }
                    </button>

                    <div ref= {sortRef}
                    //  style={{ transition: 'all 4s ease-in-out', width: sortList ? '100px' : '0' }} 
                     className={` ${sortList ? 'block  ' : 'hidden '} bg-white text-10px lg:text-sm absolute top-11  left-0   z-40 w-full`}>
                          <li className={`${sortBtn === 'Sort by: Latest' ? 'bg-gray-100' : null} cursor-pointer w-full h-full p-3 border hover:text-gray-900 list-none text-gray-600 `} onClick={() => {  setSortList(!sortList); setSortBtn('Sort by: Latest')}}>
                            Sort by: Latest
                          </li>
                          <li className={` ${sortBtn === 'Sort by: High to Low' ? 'bg-gray-100' : null} cursor-pointer w-full h-full p-3 border hover:text-gray-900 list-none text-gray-800 `} onClick={() => {   setSortList(!sortList); setSortBtn('Sort by: High to Low')}}>
                            Sort by: High to Low
                          </li>
                          <li className={`  ${sortBtn === 'Sort by: Low to High' ? 'bg-gray-100' : null} cursor-pointer w-full h-full p-3 border hover:text-gray-900 list-none text-gray-800  `} onClick={ () =>{ setSortList(!sortList); setSortBtn('Sort by: Low to High')}}>
                            Sort by: Low to High
                          </li>
                    </div>
                  </div>

                  </div>
                  

                            

                  {/* <div className='sticky top-0 lg:top-22 z-20 bg-white flex justify-around placeitems-center items-center w-screen lg:w-full overflow-x-scroll gap-3 '>        
                  {womenImg.map(img => (
                    <div  key={img?.id} onClick={ () => handleClick(img)} className='flex w-screen cursor-pointer placeitems-center gap-3 items-center overflow-x-scroll '>
                          <img src={img?.src} className ='w-60 h-20 lg:w-36 lg:h-full object-cover justify-around rounded' />
                    </div>
                  ))}

            </div>  */}

            {/* <div 
                  className='fixed start-0 bottom-10 z-50 flex w-full'>
                  <span onClick={showMen} className={` ${btn ? 'bg-gray-100' : 'bg-gray-200'} cursor-pointer w-1/2 p-2 text-gray-800 font-semibold items-center text-center`} >Men</span>
                  <span onClick={showWomen} className={` ${btn2 ? 'bg-gray-100' : 'bg-gray-200'} cursor-pointer w-1/2 p-2 text-gray-800 font-semibold items-center text-center`}>Women</span>
            </div> */}

     

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 h-full lg:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-7 bg-white mt-0 lg:mt-0 p-4  gap-2'>
                  {loading && !data?.pages?.length ? (
                  <ProductFeedLoader limit={30} />
                ) : (
                    <>
                        { 
                            //filter products with status publish and whose shop category is Salon & Spa

                           // filter products with price from low to high
                            // data?.pages?.sort((a, b) => a.price - b.price)
                            
                            data?.products?.data.length ? (sortBtn === 'Sort by: High to Low' ? data?.products?.data?.filter(product => product.status === 'publish' && product?.shop?.shop_categories?.replace(/[^a-zA-Z ]/g, "").replace('name', '').replace('id','') =='Salon  Spa' ).sort((a, b) => +b.sale_price - +a.sale_price) 
                          : sortBtn === 'Sort by: Low to High' ?  data?.products?.data?.filter(product => product.status === 'publish' && product?.shop?.shop_categories?.replace(/[^a-zA-Z ]/g, "").replace('name', '').replace('id','') =='Salon  Spa' ).sort((a, b) => a.sale_price - b.sale_price)
                          : sortBtn === 'Sort by: Latest' && data?.products?.data?.filter(product => product.status === 'publish' && product?.shop?.shop_categories?.replace(/[^a-zA-Z ]/g, "").replace('name', '').replace('id','') =='Salon  Spa' ) ).map(product => ( 
                          
                              <motion.div key={product.id}>
                                <Helium product={product}/>
                              </motion.div>
                          )) : <div className="bg-gray-100 min-h-full w-full pt-6 pb-8 px-4 lg:p-8">
                          {/* <ProductNotFound text="text-not-found" className="w-1/3 mx-auto" /> */}
                          <img src='/not-found.png'
                          className="object-contain w-full mx-auto"/>
                  
                        </div>
                        }
                    </>
                )}
            </div> 

          </div>

     )

    }

    

   
    

    

   

   


SalonProducts.Layout = Layout;
