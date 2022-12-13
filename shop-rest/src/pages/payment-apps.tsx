import React from 'react'

export default function PaymentApps() {

    function handleClick() {
        var androidDeepLink = "com.google.android.apps.nbu.paisa.user://";

        // Create a deep link to the Google Pay app on iOS
        var iosDeepLink = "googlepay://";
        
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

