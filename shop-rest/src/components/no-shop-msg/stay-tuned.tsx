import { SearchIcon } from '@components/icons/search-icon';
import DropDown from '@components/ui/dropDown';
import React from 'react';
import Logo from "@components/ui/logo";

// import './index.css';
// import logo from './logo.png';

function StayTuned() {

  return (

    <div className="bg-aei bg-cover bg-no-repeat w-full flex flex-col items-center justify-center h-screen lg:h-110">

        <main className="flex flex-col items-center mt-40 lg:justify-center space-y-0  flex-grow w-full">
            {/* <img src={'logo'} alt="Google Logo" className="w-64 h-64 mb-8" /> */}

           <img src='/new-logo.png' className='h-44 w-44 lg:h-60 lg:w-60' />

            <form className="flex flex-col items-center w-full lg:w-1/2 px-2 space-y-8 rounded-sm">

                {/* <input type="text" placeholder="Search Anything...." 
                        className="z-40 relative w-11/12 lg:w-1/3 mx-auto hover:bg-gray-50 transition-all duration-300 border p-3 lg:p-4 hover:shadow-300 active:shadow-300 text-gray-800 shadow-xl rounded-full focus:outline-none" />
                */}
                
                <DropDown searchbar={true} />

                <div className=' z-10  flex items-center mx-auto space-x-6 lg:space-x-16  text-gray-500 ' style={{zIndex:0}}>
                        <span className='text-blue-600'>बायलोकल</span>
                        <span className='text-red-600'>Buylowcal</span>
                        <span className='text-yellow-600'>ਬਾਏਲੋਕਲ </span>
                        <span className='text-green-600'> বাইলোকাল </span>
                </div>
            
            </form>
            
        </main>
             
    </div>
    );
    }

 export default StayTuned;












                                         // STAY TUNED PAGE 

// export default function StayTuned() {

//     return (

//         <div className = 'flex flex-col items-center py-6 md:py-10 lg:py-36 bg-gray-100 w-full h-1/2 space-y-8 tracking-widest ' >

//             {/* <img className='relative w-full' src='https://static-cse.canva.com/blob/124824/coming-soon-pages.9981a305.jpg'/> */}

     
//                 <p className=' w:1/2 text-yellow-500 px-4 lg:w-1/2 text-center font-semibold 
//                            font-lobster text-lg lg:text-4xl items-center flex'>
//                     Aww, We Love You Too and Working Hard to be at this Location Soon.
//                 </p>

//                 <h1 className='text-5xl text-green-50 font-lobster  font-bold lg:text-8xl tracking-widest '>
//                     <span className='text-accent '>S</span>
//                     <span className='text-pink-800'>T</span>
//                     <span className='text-indigo-400'>A</span>
//                     <span className='text-blue-600'>Y</span>
//                 </h1>
//                 <h1 className='text-5xl text-yellow-400 font-lobster font-bold lg:text-8xl tracking-widest' >
//                     <span className='text-yellow-600'>T</span>
//                     <span className='text-yellow-300'>U</span>
//                     <span className='text-green-600'>N</span>
//                     <span className='text-blue-600'>E</span>
//                     <span className='text-purple-900'>D</span>
//                 </h1>
                

//                 <h2 className='flex flex-col text-lg px-6 lg:text-3xl lg:flex text-gray-700 text-md items-center space-y-2 '> Presently We are Covering the Cities of  
//                     <span className='font-semibold'> Chandigarh | Panchkula | Mohali | Ludhiana | Delhi | Gurgaon | Noida | Ahemadabad | Hyderabad | Bangalore | Mumbai | Pune | Kolkata | Chennai | </span> 
//                 </h2>

      
            
//         </div>
//     )
// }

