import React from 'react'
import Link from 'next/link';
import { useUI } from "@contexts/ui.context";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useRouter } from "next/router";


export default function ProductNotFoundInfo({shopData}) {
    const { openModal } = useModalAction();
    const router = useRouter();

    //on page load scroll(0,0)
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { isAuthorize, displayHeaderSearch, displayMobileSearch } = useUI();

  return (

    <div className='ml-'
    // className="bg-gray-100 w-full  text-center items-center p-2 h-screen pt-6 pb-8  "
    >
         
        {/* <ProductNotFound text="text-not-found" className="w-1/3 mx-auto" /> */}
        <div className="lg:mx-10 flex flex-col space-y-6 lg:space-x-8 lg:grid lg:grid-cols-2  font-normal text-gray-800 text-sm  lg:text-xl font- text-normal  text-center ">
         
        
          <div className='flex flex-col  bg-gray-50 text-left pl-4 lg:pl-16 p-3 pt-2 py-4 w-auto  rounded drop-shadow-xl'>
              <p className="text-gray-800 py-4 font-bold  text-xl lg:text-3xl">
                Thank you for visiting us on BuyLowcal.
              </p><br/> 
              <p className='text-left  py-2 w-full tracking-wide font-md text-lg lg:text-2xl'>Sorry,<br/>
                 we are not serving online <br/> 
                 at the moment, <br/>
                 please visit us at our location <br/> </p>
              <span className="text-lg py-2 font-light text-blue-600">{` ${shopData?.address.street_address + ' '}`}</span> <br/>
               <span className='flex py-2 items-center '>Or Call Us on<p className=" ml-4 text-blue-600 underline">{` ${shopData?.owner?.phone_number}`}</p> </span>
          </div>


           <div className='flex flex-col  bg-gray-50 text-left pl-4 lg:pl-16 p-3 pt-2 py-2 lg:py-4 w-auto  rounded drop-shadow-xl'>
           
            <span className="font-bold text-xl lg:text-3xl">For BuyLowcal Community,</span>  <br/>
              <p className="font-light py-2 lg:py-4  text-xl lg:text-3xl space-y-4 text-gray-900">
                Shop and Upload 
               <span className="font-bold tracking-wide   text-xl lg:text-3xl"> Invoice/Bill</span><br/>
                and get 
                <span className="font-bold  text-xl lg:text-3xl "> 5% cash </span> 
               directly in your <br/>
              
            </p>
          <span className='font-bold   text-xl lg:text-3xl '> bank account</span>
           {/* <img src='/bill-upload.png' className="mx-auto object-contain "/> <br/> */}
           
            <div className='flex items-center w-full justify-between'> 
             <button onClick={isAuthorize ? ()=>router.push('/user/upload-invoice/upload-form') : ()=>openModal('REGISTER')} 
                 className="w-28 lg:w-60 font-semibold text-lg  lg:text-3xl bg-magenta rounded-lg px-4 p-3 text-white cursor-pointer hover:underline ">
                Upload Bill
              </button>

              <div className='mx-4'><img src='/bill-upload.png' className="mx-auto  "/></div>
              </div>
            </div>

        </div>
        {/* <img src='/not-found.png'
        className="object-contain mx-auto"/> */}
      </div>
  )
}
