import { CheckMarkCircle } from '@components/icons/checkmark-circle'
import { QRCodeCanvas } from 'qrcode.react'
import React, { useRef } from 'react'
import Image from 'next/image'
import {  PDFExport, savePDF} from '@progress/kendo-react-pdf'

export default function ShopQRDownload() {

  const pdfExportComponent = useRef(null);
  const contentArea = useRef(null);


  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  }


  const handleExportWithMethod = (event) =>{
    savePDF(contentArea.current, {paperSize:'A4'});
  }


  return (

    <div className=''>
      <PDFExport ref={pdfExportComponent}  paperSize='A4'>
         <div className="p-4 font-serif" ref={contentArea}>

            <div className='h-screen w-100 rounded
            '>
              
                <Image src='/qr.jpeg' className='relative z-30' layout='intrinsic' 
                    objectFit='contain' height={740} width={906} />

                <div  className='absolute z-50 top-1/3 right-80 lg:top-72 lg:right-80 '> <QRCodeCanvas
                      id="qr-gen"
                      value={'hello'}
                      size={237}
                      level={"H"}
                      includeMargin={true}
                  
                    />
                </div>

            </div>

        </div>

    </PDFExport>
      <div className='absolute bottom-40 w-full z-50 text-center'> 
          <button className='  bg-blue-700 px-2 rounded text-white  text-lg hover:underline   h-9  w-38' 
            onClick={handleExportWithComponent}>Download Invoice
            </button>
      </div>
      </div>
  )
}

    