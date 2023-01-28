import React, { useState ,useEffect } from "react";
import { QrReader } from 'react-qr-reader';
import { useModalAction } from "@components/ui/modal/modal.context";

const Scanner = (props:any) => {

  const [data, setData] = useState('');

  const {openModal,closeModal} = useModalAction()

// var data = "upi://pay?pa=vinendersingh91@okicici&pn=vinender%20singh&aid=uGICAgIC4oYCNBQ";

  var start = data.indexOf("pa=") + 3;
  var end = data.indexOf("&", start);
  var upiId = data.substring(start, end);
  
  start = data.indexOf("pn=") + 3;
  end = data.indexOf("&", start);
  var payeeName = decodeURIComponent(data.substring(start, end));
  
  console.log("UPI ID: ", upiId);
  console.log("Payee Name: ", payeeName);

  function openUpiApps() {
    upiId.length && openModal('UPI_APPS',{
        props: Object.values(upiId),
    })
    // closeModal();
  }

  useEffect(()=>{
     openUpiApps()
  },[upiId.length])
  

  return (

    <> 

    {/* <div className='w-full h-screen bg-gray-50 flex px-60 flex-col justify-center'> */}
        <div className='border-2  w-screen h-screen px-20  bg-white'> 
            <QrReader
             constraints={{ facingMode: 'environment' }}
                onResult={(result, error) => {
                if (!!result) {
                    setData(result?.text);
                }

                if (!!error) {
                    console.info(error);
                }
                }}
                style={{ width: '100%' }}
            />
            {/* </div> */}
            <p className="text-center text-gray-900 font-semibold">
                <span className="text-gray-900">Paying</span>{payeeName}
            </p>
            <p className="text-center text-gray-900 font-semibold">
                {upiId}
            </p>
        </div>
        </>
    );
    };

export default Scanner;