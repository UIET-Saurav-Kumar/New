
import Link from 'next/link'

import { FacebookIcon } from "@components/icons/social/facebook"
import { InstagramIcon } from "@components/icons/social/instagram"
import { LinkedInIcon } from '@components/icons/social/linkedin'
import { useModalAction } from "@components/ui/modal/modal.context";
import { YouTubeIcon } from '@components/icons/social';


const Footer = () => {

	const { openModal } = useModalAction();

  function handleJoin() {
    return openModal("LOGIN_VIEW");
  }

	return (
		<div className='footer-wrapper 
		                text-10px py-2 flex flex-col
	                   bg-black shadow-lg mb-8 rounded-md text-white lg:px-20 justify-evenly mt-16 '>
			  

			  <div className='footer-top-section 
                              grid grid-cols-1 place-items-start xs++:grid-cols-2 xs++:place-items-start  
							  md:justify-evenly  md:grid-cols-2 lg:grid-cols-4 gap-6
							  space-x-6 text-left mb-8 p-4  shadow-md -gray-700'>


			  	<div className='footer-section-links flex flex-col ml-6 lg:ml-0 space-y-6  text-left '>

			  		<h5 className='footer-links-title  font-semibold  text-xl tracking-widest'> About  </h5>

					  <div className='flex flex-col tracking-widest   space-y-4'>

						<Link href='./about-us'><h5 className='phone-number cursor-pointer text-lg hover:underline text-primary font-normal '> About Buylowcal</h5></Link>
						<Link href='./careers'><h5 className='phone-number cursor-pointer text-lg hover:underline text-primary font-normal '> Careers</h5></Link>
						<Link href='./terms'><h5 className='phone-number cursor-pointer text-lg hover:underline text-primary font-normal '> Terms of Service</h5></Link>



						<Link href='./return-policy'><h5 className=' cursor-pointer text-lg hover:underline phone-number text-primary font-normal '> Refunds/Cancellations/Shipping</h5></Link> 
						<Link href='./privacy'><h5 className=' cursor-pointer text-lg hover:underline phone-number text-primary font-normal '>Privacy Policy</h5></Link> 
						<Link href='./contact'><h5 className=' cursor-pointer text-lg hover:underline phone-number text-primary font-normal '>Contact Us</h5></Link> 
					
					  </div>
			  		
			  	</div>

			  

				  <div className=' flex-col space-y-0 text-left '>

						<h5 className = 'footer-links-title font-semibold tracking-widest  text-xl' > More </h5>

						<div className='flex flex-col space-y-0  tracking-widest'> 
						  <a className='light-text cursor-pointer text-lg hover:underline font-light mt-' href='https://buylowcal.com/home#all-categories'><h5 className='light-text mt-4 font-light'>Categories</h5></a>
						  <a className='light-text cursor-pointer text-lg hover:underline font-light mt-' href='https://buylowcal.com/home#featured-shops'><h5 className='light-text mt-4 font-light'> Local Shops</h5></a>
						  <a className='light-text cursor-pointer text-lg hover:underline font-light mt-' href='https://buylowcal.com/home#ecommerce-store'><h5 className='light-text mt-4 font-light'> E-Stores</h5></a>	
						  <a className='light-text cursor-pointer text-lg hover:underline font-light mt-' href='https://buylowcal.com/home#offer-of-the-day'><h5  className='light-text mt-4 font-light'> Offer of the Day</h5></a>
						  <a className='light-text cursor-pointer text-lg hover:underline font-light mt-' href='https://buylowcal.com/home#featured-products'><h5  className='light-text mt-4 font-light'> Featured Products</h5></a>
						</div> 

			  	  </div>

				  <div className='footer-section-links  space-y-4 text-left '>
						<h5 className='footer-links-title font-semibold text-xl tracking-widest '>Registrations</h5>

						<div className=' space-y-4 tracking-widest '>
							
						<a className='light-text cursor-pointer text-lg hover:underline font-light mt-4' href='./register#vendor'>
							  <h5 className='light-text cursor-pointer text-lg hover:underline  font-light'>Register as Vendor </h5>
					</a>
							
							<Link href='https://buylowcal.com/buylowcal'><h5 className='light-text cursor-pointer text-lg hover:underline font-light'>
								Register as Customer 
							</h5></Link>
						</div>		  		
			  	  </div>



				  <div className='flex flex-col  space-y-4 '>
					  <h5 className='font-semibold text-xl tracking-widest'> Follow Us</h5>
						<div className='flex items-center space-x-10 cursor-pointer text-3xl lg:text-lg '>
							
							<a target="_blank" href='https://www.facebook.com/buylowcal/'> <FacebookIcon className='h-8 w-8  bg-blue-800 cursor-pointer text-lg hover:underline'/></a> 
							
							<a target="_blank" href='https://www.instagram.com/buylowcal/?hl=en'> <InstagramIcon className='h-8 w-8 text-red-500 cursor-pointer text-lg hover:underline'  /></a>

							
						<a target="_blank" href='https://in.linkedin.com/company/buylowcal'> <LinkedInIcon className='h-8 w-8 cursor-pointer hover:underline '  />	 </a>	
							<a target="_blank" href='https://www.youtube.com/channel/UCs0jYR_99h5GKs0cvRZSg-A'> <YouTubeIcon className='h-8 w-8 cursor-pointer hover:underline '  />	 </a>		
						</div>
				   </div>

				  


			  </div>
			  
			  <div className='footer-bottom-section flex justify-between items-start p-2 px-4 -mt-0 '>
			  	 
				    <h5 className='font-semibold text-lg text-gray-400'> 
					  © 4221 BuyLowcal.com All Rights Reserved
				    </h5>
			  	  <div className='social-media-icons-wrapper flex justify-between w-40'>
			  	  	{/* <FacebookIcon className='facebook'/>
			  	  	<TwittterIcon className='twitter'/>
			  	  	<InstagramIcon className='instagram'/>
			  	  	<YouTubeIcon className='youtube'/> */}

			  	  </div>
			  </div>

		</div>
	)
}

export default Footer