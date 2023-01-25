import React from 'react'

export default function UpiPayment({data}:any) {

console.log('order link',Object.values(data))

const upiApps = [
    '/upi/bhim.png','/upi/upi.jpeg','/upi/gpay.png','/upi/paytm.png','/upi/phone-pe.jpg','/upi/qr.jpg'
]

const upiLogos = [
    ''
]
  return (


   
      <div className='flex items-center justify-between h-96 space-x-10 px-10 w-full bg-white'>
        {Object.values(data)[0].map((link, index) => {
          const app = upiApps[index];
          return (
            <img src={app} className='flex items-center rounded-full object-contain h-20 border w-20' key={app} alt={'upi-app'} onClick={() => window.open(link)}
              
            />
          );
        })}
      </div>
    )
    
}
