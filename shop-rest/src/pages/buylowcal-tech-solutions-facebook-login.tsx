import Head from 'next/head'
import React from 'react'
import { CrossIcon } from 'react-select/src/components/indicators';

export default function FacebookLogin() {



    function statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
            // Logged into your app and Facebook.
            console.log('Welcome!  Fetching your information.... ');
            FB.api('/me', function (response) {
                console.log('Successful login for: ' + response.name);
                document.getElementById('status').innerHTML =
                  'Thanks for logging in, ' + response.name + '!';
            });
        } else {
            // The person is not logged into your app or we are unable to tell.
            document.getElementById('status').innerHTML = 'Something went wrong, Unable to log in';
        }
    }

    function checkLoginState() {
        FB.getLoginStatus(function(response) {
          statusChangeCallback(response);
        console.log(response)
        });
      }



  return (
    
   <>

   <div className='w-full text-center pt-7  text-gray-900 font-light' id='status'>
          
   </div>


<Head>
        <script
            dangerouslySetInnerHTML={{
            __html: `
                window.fbAsyncInit = function() {
                    FB.init({
                    appId      : 381786777315073,
                    cookie     : true,
                    xfbml      : true,
                    version    : v14.0,
                    });
                    
                    FB.AppEvents.logPageView();   
                    
                };

                `}} 
        />

        <script

            dangerouslySetInnerHTML = {{
            __html: `
                    (function(d, s, id){
                        var js, fjs = d.getElementsByTagName(s)[0];
                        if (d.getElementById(id)) {return;}
                        js = d.createElement(s); js.id = id;
                        js.src = "https://connect.facebook.net/en_US/sdk.js";
                        fjs.parentNode.insertBefore(js, fjs);
                    }(document, 'script', 'facebook-jssdk'));

                `}}

                
        />
        
        </Head>



    <div className='w-full'>
 

        <div className='w-full h-screen'>
       
            <button  
            onClick={checkLoginState} className='rounded p-2 px-4 bg-blue-700  mt-20 mx-auto text-center flex justify-center my-auto items-center text-white font-semibold '>Facebook Login</button>
        </div>

        {/* <div className="fb-login-button" data-width=" " data-size="large" data-button-type="continue_with" data-layout="default" data-auto-logout-link="true" data-use-continue-as="true">
        
            

        </div> */}

        {/* <fb:login-button scope="public_profile,email"
                     onlogin="checkLoginState();">
    </fb:login-button>  */}


        
    </div>

    </>
  )
}
 

