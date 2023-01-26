import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';

    function Scanner() {
    const [result, setResult] = useState("No result");
    const [delay, setDelay] = useState(100);
    const [error, setError] = useState('')

    const handleScan = (data) => {
    setResult(data?.text);
    }

    const handleError = (err) => {
        setError(err)
    console.error(err);
    }

    const previewStyle = {
    height: 800,
    width: 880,
    };

    return (

    <div className='flex flex-col justify-center w-full h-screen bg-gray-50 px-10'>
       <div className=' mx-auto my-auto '> 
        <QrReader
            delay={delay}
            style={previewStyle}
            onError={handleError}
            onScan={handleScan}
            // facingMode={'environment'}
        />
        </div>
        <p>{result}</p>
        <p>{error}</p>
    </div>
    
    );
    }

    export default Scanner;