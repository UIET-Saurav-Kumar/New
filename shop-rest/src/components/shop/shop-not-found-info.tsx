import React from 'react'
import Link from 'next/link';
import { useUI } from "@contexts/ui.context";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useRouter } from "next/router";
import AllCategories from '@components/home-page-product-section/AllCategories';


export default function ShopNotFoundInfo({shopData,searchText}) {
    const { openModal } = useModalAction();
    const router = useRouter();

    console.log(searchText)

    //on page load scroll(0,0)
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { isAuthorize, displayHeaderSearch, displayMobileSearch } = useUI();

  return (

    <div className='h-screen-2 mb-60 flex justify-center items-center'
    // className="bg-gray-100 w-full  text-center items-center p-2 h-screen pt-6 pb-8  "
    >
         
        {/* <ProductNotFound text="text-not-found" className="w-1/3 mx-auto" /> */}
        <div className="  flex flex-col   lg:space-x-8 lg:grid lg:grid-cols-1  font-normal text-gray-800 text-sm  lg:text-xl font- text-normal  text-center ">

          <div className='flex flex-col  font-sans space-y-6 shadow-sm lg:shadow-none p-3'>
            <p className=' text-5xl lg:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-purple-600 to-blue-600 '>Oops!!</p>
            <div className=''>
              <span className='text-bold text-lg lg:text-xl'>{searchText}</span>
              <p className='font-light text-sm text-gray-700 font-sans lg:text-xl '>
              does not exist in your current location </p>
             </div> 
            <p className='font-light text-sm text-gray-500 font-sans lg:text-sm '> Try with other location </p>
             
          </div>

          <p className='font-sans  text-2xl mt-6'>Explore other categories <span className=''>👇</span> </p>
         
        
        

         <div className='lg:px-40 '><AllCategories /></div>  


           {/* <div className='flex flex-col  bg-gray-50 text-left pl-4 lg:pl-16 p-3 pt-2 py-2 lg:py-4 w-auto  rounded drop-shadow-xl'>
           
            <span className="font-bold text-xl lg:text-3xl">For BuyLowcal Community,</span>  <br/>
              <p className="font-light py-2 lg:py-4  text-xl lg:text-3xl space-y-4 text-gray-900">
                Shop and Upload 
               <span className="font-bold tracking-wide   text-xl lg:text-3xl"> Invoice/Bill</span><br/>
                and get 
                <span className="font-bold  text-xl lg:text-3xl "> 5% cash </span> 
               directly in your <br/>
              
            </p>
          <span className='font-bold   text-xl lg:text-3xl '> bank account</span>
           
            <div className='flex items-center w-full justify-between'> 
             <button onClick={isAuthorize ? ()=>router.push('/user/upload-invoice/upload-form') : ()=> openModal('OTP_REGISTER')} 
                 className="w-28 lg:w-60 font-semibold text-lg  lg:text-3xl bg-magenta rounded-lg px-4 p-3 text-white cursor-pointer hover:underline ">
                Upload Bill
              </button>

              <div className='mx-4'><img src='/bill-upload.png' className="mx-auto  "/></div>
              </div>
            </div> */}

        </div>
        {/* <img src='/not-found.png'
        className="object-contain mx-auto"/> */}
      </div>
  )
}
