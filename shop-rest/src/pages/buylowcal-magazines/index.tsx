import Navbar from '@components/layout/navbar/navbar'
import React from 'react'
import {Children, useRef} from 'react';
import {  PDFExport, savePDF} from '@progress/kendo-react-pdf'
import { useTranslation } from 'next-i18next';
import { PDFDownloadLink } from "@react-pdf/renderer";
// import Pdf from './magzine.pdf';
import PDFViewer from 'pdf-viewer-reactjs'
// import Pdf from 'react-to-pdf'
import { Document, Page } from 'react-pdf';
// import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import Image from 'next/image';
import pdf from './magzine.pdf'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { parseContextCookie } from "@utils/parse-cookie";
// import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
// import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import { useUI } from "@contexts/ui.context";

import mags from './magzine.pdf';
import JoinButton from "@components/layout/navbar/join-button";

import router from 'next/router';
import  Logo  from '@components/ui/logo';
import AuthorizedMenu from '@components/layout/navbar/authorized-menu';
import MobileJoinButton from '@components/layout/navbar/mobile-join-button';
import MobileNavigation from '@components/layout/mobile-navigation';
import { useEffect } from 'react';


const ref = React.createRef();

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "policy"])),
    },
  };
};


export default function Magzine() {

    //download button to download the magzine

    const pdfExportComponent = useRef(null);
  const contentArea = useRef(null);

  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  }

  const { isAuthorize, displayHeaderSearch, displayMobileSearch } = useUI();


  const handleExportWithMethod = (event) =>{
    savePDF(contentArea.current, {paperSize:'A4'});
  }

  //scroll event listenr when scrollY > 100 change background to black
  const handleScroll = () => {
    if (window.scrollY > 100) {
      document.body.style.backgroundColor = 'black';
    } else {
      document.body.style.backgroundColor = 'white';
    }
  }
  //scroll event listener in useEffect
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  

 


  const [febMag, setFebMag] = React.useState(true);

  const [marchMag, setMarchMag] = React.useState(false);

  const [aprilMag, setAprilMag] = React.useState(false);

  const [networkMag, setNetworkMag] = React.useState(false);

  const [mayMag, setMayMag] = React.useState(false);

  function handleFebMag() {
    window.open('https://drive.google.com/file/d/1Vwj8z6SvlT7gOokmNpvhUBvXTNPkBZSI/view?usp=sharing')
   
  }

  function handleMarchMag() {
    window.open('https://drive.google.com/file/d/1rI_KGwYk0kdUkBPOXea-mHvBEd9SXhKy/view?usp=sharing')
    
  }

  function handleAprilMag() {
    window.open('https://drive.google.com/file/d/1NDvGnJvcgBzGGxfRz-iNPfK91LVLhphv/view?usp=sharing', '_blank');
   
  }

  function handleNetworkMag() {
    window.open("https://drive.google.com/file/d/1M_14BeWQXLXVuRX0lDpCEexoqvO9uBne/view?usp=sharing")
  
  }

  //may
  function handleMayMag() {
    window.open('https://drive.google.com/file/d/1trajPdO_pzoYFaZJT1bz4ZxnpRlrCIj0/view?usp=sharing')
  }
  if ("contacts" in navigator && 
  "select" in navigator.contacts && 
  "getProperties" in navigator.contacts) {
try {
 const availableProperties = await navigator.contacts.getProperties();
   
   if (availableProperties.includes("address")) {
     const contactProperties = ['name', 'tel', 'address'];
 
     const contacts = await navigator
      .contacts
      .select(
       contactProperties,
       {multiple: true}
      );
 
     console.log("Your first contact: " + contacts[0].name + " " + contacts[0].tel + " " + contacts[0].address);
   } else {
     console.log("Contact Picker API on your device doesn't support address property");
   }
} catch () {
 console.log("Unexpected error happened in Contact Picker API");
}
} else {
console.log("Your browser doesn't support Contact Picker API");
}
    
     


  return (

      <div className=' h-full   overflow-y-scroll  w-full'>

        <img className='' src='' />

      {/* <Navbar /> */}

   
       
      <div style={{}} id='magzine' className='  bg-collage w-full h-screen bg-fixed bg-center overflow-y-hidden '>


          <div className='relative bg-black  opacity-80 z-30 w-full h-screen '>
          </div>

          <div  className='absolute z-30 top-20 grid grid-cols-1  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 px-4 gap-6 max-h-full overflow-y-scroll pb-20 lg:py-24 md:gap-4 md:top-24'>

              <div onClick={handleNetworkMag} className='  flex flex-col  overflow-y-hidden  space-y-4 text-center'>
                <img src='/magzine/network-cover.jpg'  className={` ${ networkMag ? 'opacity-100  ' : 'opacity-100'} border w-9/12 lg:w-full mx-auto lg:hover:scale-90 transform-gpu transition-transform duration-300  `}/>  
                <p className='text-white text-lg cursor-pointer hover:bg-white hover:text-black active:bg-white active:text-black lg:text-3xl tracking-wider border  w-auto px-2 lg:w-72 py-1 mx-auto text-center font-serif'>
                  January Edition</p>
              </div>

              <div onClick={handleFebMag} className=' flex flex-col space-y-4 overflow-y-hidden  text-center '>
                <img src='/magzine/feb-cover.jpg'  className={` ${ febMag ? 'opacity-100  ' : 'opacity-100'} border w-9/12 lg:w-full mx-auto lg:hover:scale-90 transform-gpu transition-transform duration-300  `}/>  
                <p className='text-white text-lg  cursor-pointer hover:bg-white hover:text-black active:bg-white active:text-black lg:text-3xl tracking-wider border  w-auto px-4 lg:w-72 py-1 mx-auto text-center font-serif'>
                  February Edition</p>
              </div>

              <div onClick={handleMarchMag} className='  flex flex-col overflow-y-hidden space-y-4 text-center '>
                <img src='/magzine/march-cover.jpg'  className={` ${ marchMag ? 'opacity-100  ' : 'opacity-100'} border w-9/12 lg:w-full mx-auto lg:hover:scale-90 transform-gpu transition-transform duration-300  `}/>
                <p className='text-white text-lg cursor-pointer hover:bg-white hover:text-black active:bg-white active:text-black lg:text-3xl tracking-wider border  w-auto px-4 lg:w-72 py-1 mx-auto text-center font-serif'>
                  March Edition</p>
              </div>

              <div onClick={handleAprilMag} className=' flex flex-col overflow-y-hidden  space-y-4 text-center  '>
                <img src='/magzine/april-cover.jpg'  className={` ${ aprilMag ? 'opacity-100  ' : 'opacity-100'} border w-9/12 lg:w-full mx-auto lg:hover:scale-90 transform-gpu transition-transform duration-300  `}/>
                <p className='text-white text-lg cursor-pointer hover:bg-white hover:text-black active:bg-white active:text-black lg:text-3xl tracking-wider border  w-auto px-2 lg:w-72 py-1 mx-auto text-center font-serif'>
                  April Edition</p>
              </div>

              <div onClick={handleMayMag} className=' flex flex-col overflow-y-hidden  space-y-4 text-center  '>
                <img src='/magzine/may-cover.jpg'  className={` ${ mayMag ? 'opacity-100  ' : 'opacity-100'} border w-9/12 lg:w-full mx-auto lg:hover:scale-90 transform-gpu transition-transform duration-300  `}/>
                <p className='text-white text-lg cursor-pointer hover:bg-white hover:text-black active:bg-white active:text-black lg:text-3xl tracking-wider border  w-auto px-2 lg:w-72 py-1 mx-auto text-center font-serif'>
                  May Edition</p>
              </div>

        </div>


          <div id='header' onScroll={handleScroll} className='  flex absolute shadow-4xl z-50 top-0 lg:p-4 mt-3 w-full items-center  justify-between px-3'>
            
              <Logo/>
              <h1 className=' top-0 left-1/3 text-lg md:text-5xl text-white text-center  font-bold font-serif'>
                Buylowcal Monthly Magzines
              </h1>
              <div className='hidden md:inline-flex lg:ml-8 lg+:ml-0  xl:inline-flex'>
                  { isAuthorize ?  <AuthorizedMenu/> : <JoinButton/> }
              </div>
              <div className='inline-flex md:hidden  lg:ml-8 lg+:ml-0  '>
              { isAuthorize ?  <AuthorizedMenu/> : <MobileJoinButton/> }
              </div>

          </div>

        {/* <h1 className='fixed z-30 top-10  pt-9 lg:pt-20  mx-auto w-full text-lg md:text-5xl text-white text-center  font-bold font-serif'>
              Buylowcal Monthly Magazines
        </h1> */}

      </div>
      <MobileNavigation search={false} />
    </div>
  )
  }
    
    
