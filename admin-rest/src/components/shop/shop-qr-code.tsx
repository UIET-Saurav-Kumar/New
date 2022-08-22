import React from 'react';
import QRCode from "react-qr-code";

export default function QrCode({qrCode}:any) {

  return (

    <div className='h-10 w-10'>

         <QRCode value={qrCode} />

    </div>
  )
}
