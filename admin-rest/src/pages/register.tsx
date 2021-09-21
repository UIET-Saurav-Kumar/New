
import Logo from "@components/ui/logo";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import RegistrationForm from "@components/auth/registration-form";
import { useRouter } from "next/router";
import { getAuthCredentials, isAuthenticated } from "@utils/auth-utils";
import { ROUTES } from "@utils/routes";
import Link from 'next/link';
import Footer from "@components/footer/Footer";
import CountUpAnimation from "@components/countup-animation/countup-animation";

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ["common", "form"])),
  },
});

export default function RegisterPage() {

  const router = useRouter();
  const { token, permissions } = getAuthCredentials();
  if (isAuthenticated({ token, permissions })) {
    router.replace(ROUTES.DASHBOARD);
  }
  const { t } = useTranslation("common");

  return (
    
    <>
     <div className='border p-2 lg:p-4 w-full'>
                <Logo/>
            </div>
   
    <div className='w-full grid grid-cols-1  lg:grid-cols-2 lg:w-full lg:items-center 
                      bg-gray-50 '>


        {/* banner */}
        <div className='flex flex-col space-x-6 items-center mt-10 lg:mt-20 border-0 
                        lg:border-r lg:border-b-0 lg:border-l-0 '>

            <div className=' flex flex-col  items-center space-y-8 tracking-widest'>
                <h1 className='text-3xl lg:text-5xl font-serif font-bold w-3/4 space-y-6 text-center text-gray-800 '>

                Grow your business with  <span></span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-yellow-600 ">
                   Buylowcal
                </span>

                <p className='text-lg font-light '> Register your shop and help your business grow to new heights with large user base </p>

                </h1>

                {/* <a className=' cursor-pointer text-lg hover:underline font-light mt-4' href='./register#vendor'><button className='w-60 px-4 p-3 rounded-md text-lg font-semibold items-center bg-green-700 text-white '>Register Now</button></a> */}

            </div>

            {/* banner image */}
            <div className='-mt-20 lg:mt-0 w-600'> 
                  <img src='https://startup-agency.vercel.app/_next/static/images/banner-illustration-bdd71ba1bdab49b214f8174a81063078.png'
                  className='w-full h-96 object-contain'/>
            </div>

        </div>
        
    

      <div id='vendor' className=' w-full sm:mt-8 sm:w-2/3 -mt-10 mx-auto md:mt-10 lg:mt-10 shadow-lg p-8'> 
        <RegistrationForm/>
      </div> 

    </div>

    {/* Countup Animation*/}
    <CountUpAnimation/>
    
    {/* feature blocks */}
    <div className=' flex flex-col items-center mx-auto space-y-6 mt-10 bg-green-50 py-6'>
    <h1 className='text-3xl lg:text-4xl font-serif font-bold w-3/4 space-y-6 text-center text-gray-800 '>
      Your Ecommerce store </h1>
      <p className='text-md font-md tracking-wider text-gray-800 w-11/12 lg:w-1/2 text-center'> Build an incredible workplace and grow your Brand 
          with buylowcal all-in-one platform with amazing contents and features for your shop.
      </p>
    </div>

    <div className ='w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3  my-2 lg:my-8 gap-6
                    place-items-center justify-evenly items-center mb-8  lg:shadow-none mx-auto'>

      <div className='flex flex-col max-w-96 text-lg shadow-lg p-8 font-semibold space-y-4 
                    text-gray-800 tracking-wide items-center'>
          
          <h1>Easy to use UI with Shop Dashboard</h1>

          <p className='text-sm font-light  text-center text-gray-900'> 
            Track your sales and revenue and more in your shop dashboard  
          </p>
          
          <img src='/shop-dashboard.png' 
                className='w-full border-1 h-60 object-fill lg:object-contain  lg:hover:transition-transform duration-700 ease-in-out hover:scale-125'/>

      </div>

      <div className='flex w-auto flex-col max-w-96 text-lg font-semibold p-8 shadow-lg space-y-4 
                    text-gray-800 tracking-wide items-center'>

          <h1>Add Products on go</h1>
          <p className='text-sm font-light text-center text-gray-900'> 
           Master prodcuts contains all product that you need for your shop </p>
          <img src='/master-products.png' 
                className='w-full border-1 h-60 object-fill lg:object-contain  lg:hover:transition-transform duration-700 ease-in-out hover:scale-125'/>
        
      </div>

      <div className='flex flex-col  max-w-96 text-lg font-semibold shadow-lg p-8 space-y-4 
                    text-gray-800 tracking-wide items-center'>

          <h1> Your shop  </h1>

          <p className='text-sm font-light text-center text-gray-900'> 
           Your Ecommerce shop ready to serve the end customers
          </p>

          <img 
          src='https://redq.io/landing/_next/static/images/1-73db406dcd877c4776e7a485a4767d5d.png'
          // src='/shop-dashboard.png' 
          className='w-full border-1 h-60 object-fill lg:object-contain  lg:hover:transition-transform duration-700 ease-in-out hover:scale-125'/>
        
      </div>

    </div>

       <div className=''> <Footer /> </div>
    </>
  );
}
