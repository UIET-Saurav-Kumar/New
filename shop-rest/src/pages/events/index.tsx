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

import mags from './magzine.pdf';

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

  const handleExportWithMethod = (event) =>{
    savePDF(contentArea.current, {paperSize:'A4'});
  }

  const [febMag, setFebMag] = React.useState(true);

  const [marchMag, setMarchMag] = React.useState(false);

  const [aprilMag, setAprilMag] = React.useState(false);

  const [networkMag, setNetworkMag] = React.useState(false);

  function handleFebMag() {
    setFebMag(true);
    setMarchMag(false);
    setAprilMag(false);
    setNetworkMag(false);
  }

  function handleMarchMag() {
    setMarchMag(true);
    setFebMag(false);
    setAprilMag(false);
    setNetworkMag(false);
  }

  function handleAprilMag() {
    setAprilMag(true);
    setMarchMag(false);
    setFebMag(false);
    setNetworkMag(false);
  }

  function handleNetworkMag() {
    setNetworkMag(true);
    setFebMag(false);
    setMarchMag(false);
    setAprilMag(false);
  }
    
        // download the magzine
        // const download = () => {
        //     const link = document.createElement('a');
        //     link.href = '/magzines/magzine.pdf';
        //     link.download = './magzine.pdf';
        //     link.click();
        // }


  return (

      <>

      <Navbar />

      {/* <div className="App">
     <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js">
    <div id="pdfviewer">
        <Viewer fileUrl={mags} /> 
    </div>
    </Worker>
    </div> */}

       
      <div className='relative'>

        <div  className='relative grid grid-cols-4 md:grid-cols-1 md:fixed  md:top-18'>

        <div onClick={handleNetworkMag} className='   bg-black '>
              <img src='/magzine/network-cover.jpg'  className={` ${ networkMag ? 'opacity-100 border-4 border-gold' : 'opacity-30'} w-auto md:h-56 lg:h-56 border-2  `}/>  
            </div>

            <div onClick={handleFebMag} className='   bg-black '>
              <img src='/magzine/feb-cover.jpg'  className={` ${ febMag ? 'opacity-100 border-4 border-gold' : 'opacity-30'} w-auto md:h-56 lg:h-56 border-2  `}/>  
            </div>

            <div onClick={handleMarchMag} className='bg-black   '>
              <img src='/magzine/march-cover.jpg'  className={` ${ marchMag ? 'opacity-100 border-4 border-gold' : 'opacity-30'} w-auto md:h-56 lg:h-56 border-2  `}/>
            </div>

            <div onClick={handleAprilMag} className='bg-black   '>
              <img src='/magzine/april-cover.jpg'  className={` ${ aprilMag ? 'opacity-100 border-4 border-gold' : 'opacity-30'} w-auto md:h-56 lg:h-56 border-2  `}/>
            </div>

        </div>

        <div className='w-full items-center '> 

          <a id='network' className={` ${ networkMag ? 'block' : 'hidden' } z-40 fixed bottom-5  right-3 lg:right-5 lg:mx-auto shadow-3xl hover:bg-blue-800 bg-blue-600 rounded-lg py-1 lg:py-3 px-3 lg:px-5 text-white font-semibold`} 
             href ='https://drive.google.com/file/d/1M_14BeWQXLXVuRX0lDpCEexoqvO9uBne/view?usp=sharing' 
             target = "_blank">Download
          </a>
          

          <a id='feb' className={` ${ febMag ? 'block' : 'hidden' } z-40 fixed bottom-5  right-3 lg:right-5 lg:mx-auto shadow-3xl hover:bg-blue-800 bg-blue-600 rounded-lg py-1 lg:py-3 px-3 lg:px-5 text-white font-semibold`} 
             href ='https://drive.google.com/file/d/1Vwj8z6SvlT7gOokmNpvhUBvXTNPkBZSI/view?usp=sharing' 
             target = "_blank">Download
          </a>


          <a id='march' className={` ${ marchMag ? 'block' : 'hidden' }  z-40 fixed bottom-5  right-3 lg:right-5 lg:mx-auto shadow-3xl hover:bg-blue-800 bg-blue-600 rounded-lg py-1 lg:py-3 px-3 lg:px-5 text-white font-semibold`} 
             href ='https://drive.google.com/file/d/1rI_KGwYk0kdUkBPOXea-mHvBEd9SXhKy/view?usp=sharing' 
             target = "_blank">Download
          </a>
        
        
          <a id='april' className={` ${ aprilMag ? 'block' : 'hidden' }  z-40 fixed bottom-5  right-3 lg:right-5 lg:mx-auto shadow-3xl hover:bg-blue-800 bg-blue-600 rounded-lg py-1 lg:py-3 px-3 lg:px-5 text-white font-semibold`} 
             href ='https://drive.google.com/file/d/1NDvGnJvcgBzGGxfRz-iNPfK91LVLhphv/view?usp=sharing' 
             target = "_blank">Download
          </a>

          

          

        </div>


      {/* <div>
      <PDFExport ref={pdfExportComponent} paperSize='A4'> */}

    {/* <div className="p-4 font-serif" ref={contentArea}> */}

   

   <div className=' md:ml-64 '>


      <div className={` ${networkMag ? 'flex' : 'hidden'} grid grid-cols-1 md:grid-cols-2 place-items-center lg:grid-cols-2 gap-2 `}>

        <img src='/magzine/network-offers-img/0001.jpg' alt='magzine' className=' h-full  ' />
        <img src='/magzine/network-offers-img/0002.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/network-offers-img/0003.jpg' alt='magzine' className='  h-full' />
        <img src='/magzine/network-offers-img/0004.jpg' alt='magzine' className='  h-full' />
        <img src='/magzine/network-offers-img/0005.jpg' alt='magzine' className='  h-full' />
        <img src='/magzine/network-offers-img/0006.jpg' alt='magzine' className='  h-full' />
        <img src='/magzine/network-offers-img/0007.jpg' alt='magzine' className='  h-full' />
        <img src='/magzine/network-offers-img/0008.jpg' alt='magzine' className='  h-full' />
        <img src='/magzine/network-offers-img/0009.jpg' alt='magzine' className='  h-full' />
        <img src='/magzine/network-offers-img/0010.jpg' alt='magzine' className='  h-full' />
        <img src='/magzine/network-offers-img/0011.jpg' alt='magzine' className='  h-full' />
        <img src='/magzine/network-offers-img/0012.jpg' alt='magzine' className='  h-full' />
        <img src='/magzine/network-offers-img/0013.jpg' alt='magzine' className='  h-full' />
        <img src='/magzine/network-offers-img/0014.jpg' alt='magzine' className='  h-full' />
        <img src='/magzine/network-offers-img/0015.jpg' alt='magzine' className='  h-full' />

      </div>



      <div className={` ${febMag ? 'flex' : 'hidden'} grid grid-cols-1 md:grid-cols-2 place-items-center lg:grid-cols-2 gap-2 `}>

        <img src='/magzine/feb-img/0001.jpg' alt='magzine' className='   ' />
        <img src='/magzine/feb-img/0002.jpg' alt='magzine' className='  h-full  ' />
        <img src='/magzine/feb-img/0003.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/feb-img/0004.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/feb-img/0005.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/feb-img/0006.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/feb-img/0007.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/feb-img/0008.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/feb-img/0009.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/feb-img/0010.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/feb-img/0011.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/feb-img/0012.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/feb-img/0013.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/feb-img/0014.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/feb-img/0015.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/feb-img/0016.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/feb-img/0017.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/feb-img/0018.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/feb-img/0019.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/feb-img/0020.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/feb-img/0021.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/feb-img/0022.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/feb-img/0023.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/feb-img/0024.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/feb-img/0025.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/feb-img/0026.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/feb-img/0027.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/feb-img/0028.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/feb-img/0029.jpg' alt='magzine' className='  h-full ' />
        
    </div>


    <div className={` ${marchMag ? 'flex' : 'hidden'} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 items-center`}>

        <img src='/magzine/march-img/0001.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/march-img/0002.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/march-img/0003.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/march-img/0004.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/march-img/0005.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/march-img/0006.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/march-img/0007.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/march-img/0008.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/march-img/0009.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/march-img/0010.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/march-img/0011.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/march-img/0012.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/march-img/0013.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/march-img/0014.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/march-img/0015.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/march-img/0016.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/march-img/0017.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/march-img/0018.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/march-img/0019.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/march-img/0020.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/march-img/0021.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/march-img/0022.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/march-img/0023.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/march-img/0024.jpg' alt='magzine' className='  h-full ' />
        

    </div>

     <div className={` ${aprilMag ? 'flex' : 'hidden'}    grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 items-center`}>

        <img src='/magzine/april-img/1.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/april-img/0002.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/april-img/0003.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/april-img/0004.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/april-img/0005.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/april-img/0006.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/april-img/0007.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/april-img/0008.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/april-img/0009.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/april-img/0010.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/april-img/0011.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/april-img/0012.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/april-img/0013.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/april-img/0014.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/april-img/0015.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/april-img/0016.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/april-img/0017.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/april-img/0018.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/april-img/0019.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/april-img/0020.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/april-img/0021.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/april-img/0022.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/april-img/0023.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/april-img/0024.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/april-img/0025.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/april-img/0026.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/april-img/0027.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/april-img/0028.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/april-img/0029.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/april-img/0030.jpg' alt='magzine' className='  h-full ' />
        <img src='/magzine/april-img/0031.jpg' alt='magzine' className='  h-full ' />

    </div>

    </div>
    {/* </div>
      </PDFExport> */}
      {/* </div> */}
      </div>
    </>
  )
  }
    
    
