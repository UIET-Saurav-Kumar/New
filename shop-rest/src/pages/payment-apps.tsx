import React from 'react'

export default function PaymentApps() {

    function handleClick() {
        if (navigator.userAgent.match(/android/i) && navigator.userAgent.match(/google pay/i)) {
            // If the Google Pay app is installed, redirect to the app using a deep link URL
            window.location = "com.google.android.apps.nbu.paisa.user";
          } else {
            // If the app is not installed, redirect to the Google Play Store to download it
            window.location = "https://play.google.com/store/apps/details?id=com.google.android.apps.walletnfcrel";
          }

    }

  return (

    <div className=''>

        <button onClick={handleClick}>
            Gpay
        </button>

    </div>
  )
}

