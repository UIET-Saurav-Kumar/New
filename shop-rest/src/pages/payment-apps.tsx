import React from 'react'

export default function PaymentApps() {

    function handleClick() {
        var androidDeepLink = "https://play.google.com/store/apps/details?id=com.google.android.apps.nbu.paisa.user&hl=en_IN";

        // Create a deep link to the Google Pay app on iOS
        var iosDeepLink = "https://apps.apple.com/in/app/google-pay/id1156295409";
        
        // Check if the user is on an Android device
        if (navigator.userAgent.match(/Android/i)) {
          // If the user is on an Android device, redirect them to the Android deep link
          window.location = androidDeepLink;
        } else {
          // If the user is not on an Android device, redirect them to the iOS deep link
          window.location = iosDeepLink;
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

