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

       
      <div className='relative w-full '>

      <div className='w-full items-center '> 
      
         <a className='  z-40 fixed bottom-5  left-3 lg:left-5 lg:mx-auto shadow-3xl hover:bg-blue-800 bg-blue-600 rounded-lg py-1 lg:py-3 px-3 lg:px-5 text-white font-semibold' 
         href ='https://drive.google.com/file/d/1NDvGnJvcgBzGGxfRz-iNPfK91LVLhphv/view?usp=sharing' 
        target = "_blank">Download</a>
        </div>


      {/* <div>
      <PDFExport ref={pdfExportComponent} paperSize='A4'> */}

    {/* <div className="p-4 font-serif" ref={contentArea}> */}

    <div className='flex  lg:mx-72 flex-col items-center'>

        <img src='/magzine/1.jpg' alt='magzine' className='  object-contain' />
        <img src='/magzine/0002.jpg' alt='magzine' className='  object-contain' />
        <img src='/magzine/0003.jpg' alt='magzine' className='  object-contain' />
        <img src='/magzine/0004.jpg' alt='magzine' className='  object-contain' />
        <img src='/magzine/0005.jpg' alt='magzine' className='  object-contain' />
        <img src='/magzine/0006.jpg' alt='magzine' className='  object-contain' />
        <img src='/magzine/0007.jpg' alt='magzine' className='  object-contain' />
        <img src='/magzine/0008.jpg' alt='magzine' className='  object-contain' />
        <img src='/magzine/0009.jpg' alt='magzine' className='  object-contain' />
        <img src='/magzine/0010.jpg' alt='magzine' className='  object-contain' />
        <img src='/magzine/0011.jpg' alt='magzine' className='  object-contain' />
        <img src='/magzine/0012.jpg' alt='magzine' className='  object-contain' />
        <img src='/magzine/0013.jpg' alt='magzine' className='  object-contain' />
        <img src='/magzine/0014.jpg' alt='magzine' className='  object-contain' />
        <img src='/magzine/0015.jpg' alt='magzine' className='  object-contain' />
        <img src='/magzine/0016.jpg' alt='magzine' className='  object-contain' />
        <img src='/magzine/0017.jpg' alt='magzine' className='  object-contain' />
        <img src='/magzine/0018.jpg' alt='magzine' className='  object-contain' />
        <img src='/magzine/0019.jpg' alt='magzine' className='  object-contain' />
        <img src='/magzine/0020.jpg' alt='magzine' className='  object-contain' />
        <img src='/magzine/0021.jpg' alt='magzine' className='  object-contain' />
        <img src='/magzine/0022.jpg' alt='magzine' className='  object-contain' />
        <img src='/magzine/0023.jpg' alt='magzine' className='  object-contain' />
        <img src='/magzine/0024.jpg' alt='magzine' className='  object-contain' />
        <img src='/magzine/0025.jpg' alt='magzine' className='  object-contain' />
        <img src='/magzine/0026.jpg' alt='magzine' className='  object-contain' />
        <img src='/magzine/0027.jpg' alt='magzine' className='  object-contain' />
        <img src='/magzine/0028.jpg' alt='magzine' className='  object-contain' />
        <img src='/magzine/0029.jpg' alt='magzine' className='  object-contain' />
        <img src='/magzine/0030.jpg' alt='magzine' className='  object-contain' />
        <img src='/magzine/0031.jpg' alt='magzine' className='  object-contain' />

    </div>
    {/* </div>
      </PDFExport> */}
      {/* </div> */}
      </div>
    </>
  )
  }
    
    
