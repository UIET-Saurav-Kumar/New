import { CheckMarkCircle } from '@components/icons/checkmark-circle'
import { QRCodeCanvas } from 'qrcode.react'
import React, { useRef } from 'react'
import Image from 'next/image'
import {  PDFExport, savePDF} from '@progress/kendo-react-pdf'
import Logo from '@components/ui/logo'

export default function ShopQRDownload( data:any) {

  const pdfExportComponent = useRef(null);
  const contentArea = useRef(null);


  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  }


  const handleExportWithMethod = (event) =>{
    savePDF(contentArea.current, {paperSize:'A4'});
  }


  console.log('qrdata',data)

  return (

    <div className='   '>

        <PDFExport ref={pdfExportComponent}  paperSize='A4'>

          <div className="p-4 font-serif  " ref={contentArea}>
{/* 
              <div className='  '>
                
                  <Image src='/qr.jpeg' className='relative z-30 border-2' layout='intrinsic' 
                    objectFit='contain' height={740} width={906} />

                  <div  className='absolute top-1/3 left-96 bg-cover lg:bg-contain  h-screen w-screen  bg-no-repeat bg-center
                    z-50   '> 
                    <QRCodeCanvas
                        id="qr-gen"
                        value={'hello'}
                        size={237}
                        level={"H"}
                        includeMargin={true}
                    
                      />
                  </div>

              </div> */}

              <div className='bg-qr bg-no-repeat z-20 text-center py-4 space-y-10 overflow-y-hidden  p-24 rounded'>
                  {/* <Image src='/qr.jpeg' className='relative z-30 border-2' layout='intrinsic' 
                    objectFit='contain' height={740} width={906} /> */}

                   <div className=' align-center my-auto z-50 h-full w-96 lg:w-auto  space-y-16 bg-white rounded-3xl'> 

                   <div className='space-y-4 mt-5'>  <hr className=' bg-black w-96 text-black h-1  mx-auto '/>

                    <div className='flex flex-col '>
                      <p className='font-md text-3xl font-sans'>CHECK OUT OUR LATEST</p>
                      <p className='font-bold text-4xl font-sans'>DISCOUNTS & OFFERS</p>
                    </div>

                    <hr className=' h-1 bg-black w-96 mx-auto'/>
                    </div>

                    <div className='w-60 h-60 border-2 mx-auto'>

                     
                      <QRCodeCanvas
                          id="qr-gen"
                          value={data?.data?.value}
                          size={237}
                          level={"H"}
                          includeMargin={true}
                        />

                    </div>

                    <div className='text-2xl font-sans'>
                      <p className='font-md '>SCAN WITH</p>
                      <p className='font-bold text-2xl'>MOBILE / PAYTM / GOOGLE LENS</p>
                    </div>
                    
                    <div className='flex items-center mx-  justify-center '>
                          <p className='text-2xl text-gray-900 font-light whitespace-nowrap'>Powered By:</p>
                          <div className='flex items-center  '>
                            <div className=' '> <Logo/> </div>
                          <div className='font-sans text-xl  font-bold flex items-center'>
                            <p className=' text-blue-400'> B </p>
                            <p className=' text-blue-400'> U </p>
                            <p className=' text-blue-400'> Y </p>
                            <p className=' text-magenta'>  L </p>
                            <p className=' text-magenta'>  O </p>
                            <p className=' text-magenta'>  W </p>
                            <p className=' text-magenta'>  C </p>
                            <p className=' text-magenta'>  A </p>
                            <p className=' text-magenta'>  L </p>

                            <p className=' text-magenta'>. </p>

                            <p className=' text-magenta'>C </p>
                            <p className=' text-magenta'>O </p>
                            <p className=' text-magenta'>M </p>

                          </div>
                          </div> 
                    </div>
                  </div> 
              </div>

          </div>

        </PDFExport>
        <div className='absolute bottom-24 w-full z-50 text-center'> 
            <button className='  bg-blue-700 px-2 rounded text-white  text-lg hover:underline   h-9  w-38' 
              onClick={handleExportWithComponent}>Download 
              </button>
        </div>
      </div>
  )
}

    