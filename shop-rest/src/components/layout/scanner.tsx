import React, { useState ,useEffect } from "react";
import { QrReader } from 'react-qr-reader';

const Scanner = (props) => {
  const [data, setData] = useState('No result');

  return (
    <> 
    {/* <div className='w-full h-screen bg-gray-50 flex px-60 flex-col justify-center'> */}
      <div className='border-2 px-20 w-full h-screen bg-white'> 
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
      <p>{data}</p>
    </div>
    </>
  );
};

export default Scanner;