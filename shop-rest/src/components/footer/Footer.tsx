import Link from 'next/link'

import { FacebookIcon } from "@components/icons/facebook"
import { InstagramIcon } from "@components/icons/instagram"
import { LinkedInIcon } from '@components/icons/social/linkedin'
import { useModalAction } from "@components/ui/modal/modal.context";
import { YouTubeIcon } from '@components/icons/youtube';



const Footer = () => {

	const { openModal } = useModalAction();

  function handleJoin() {
    return openModal("LOGIN_VIEW");
  }

	return (
		<div className='footer-wrapper 
		text-10px py-2
	   bg-black shadow-lg mb-8 rounded-md text-white lg:px-20 justify-evenly mt-16'>
			  

			  <div className='footer-top-section 
                               grid-cols-1 xs++:grid space-y-10 sm:grid-cols-2 md:grid-cols-4  
							   space-x-6 text-left mb-8 p-4  shadow-md border-gray-700 justify-evenly'>


			  	<div className='footer-section-links w-42 space-y-4 mt-10 text-left'>

			  		{/* <h5 className='footer-links-title font-semibold text-lg '> About Buylowcal </h5> */}

			  		<h5 className='footer-links-title mb-16 font-semibold text-xl tracking-widest'> About  </h5>

					  <div className='flex flex-col tracking-widest   space-y-4'>

					  <Link href='./about-us'><h5 className='phone-number cursor-pointer text-lg hover:underline text-primary font-normal -mt-4'> About Buylowcal</h5></Link>
					  <Link href='./careers'><h5 className='phone-number cursor-pointer text-lg hover:underline text-primary font-normal -mt-4'> Careers</h5></Link>
					  <Link href='./terms'><h5 className='phone-number cursor-pointer text-lg hover:underline text-primary font-normal -mt-4'> Terms of Service</h5></Link>



					  <Link href='./return-policy'><h5 className=' cursor-pointer text-lg hover:underline phone-number text-primary font-normal -mt-4'> Refunds/Cancellations/Shipping</h5></Link> 
					<Link href='./privacy'><h5 className=' cursor-pointer text-lg hover:underline phone-number text-primary font-normal -mt-4'>Privacy Policy</h5></Link> 
					<Link href='./contact'><h5 className=' cursor-pointer text-lg hover:underline phone-number text-primary font-normal -mt-4'>Contact Us</h5></Link> 
					</div>
			  		
			  	</div>

			  	{/* <div className='footer-section-links-2 space-y-10 text-left '>

			  		<h5 className='footer-links-title font-semibold text-lg' >Help & Info</h5>

			  		<h5 className='light-text font-light'>About us</h5>
			  		<h5 className='light-text font-light'> Contact</h5>
			  		<h5 className='light-text font-light'>Sore Locations</h5>
			  		<h5  className='light-text font-light'> Terms of use</h5>
			  		<h5  className='light-text font-light'> Policy</h5>
			  		<h5  className='light-text font-light'> Flash Sale</h5>
			  		<h5  className='light-text font-light'> FAQs</h5>
			  	</div> */}

			  	

			  

				  <div className='footer-section-links w-42 space-y-4 text-left'>

			  		<h5 className = 'footer-links-title font-semibold tracking-widest  text-xl' > More </h5>

					<div className='flex flex-col space-y-0 tracking-widest'> 
					  <a className='light-text cursor-pointer text-lg hover:underline font-light mt-4' href='./home#all-categories'><h5 className='light-text mt-4 font-light'>Categories</h5></a>
					  <a className='light-text cursor-pointer text-lg hover:underline font-light mt-4' href='./home#featured-shops'><h5 className='light-text mt-4 font-light'> Local Shops</h5></a>
			  	      <a className='light-text cursor-pointer text-lg hover:underline font-light mt-4' href='./home#ecommerce-store'><h5 className='light-text mt-4 font-light'> E-Stores</h5></a>	
					  <a className='light-text cursor-pointer text-lg hover:underline font-light mt-4' href='./home#offer-of-the-day'><h5  className='light-text mt-4 font-light'> Offer of the Day</h5></a>
					  <a className='light-text cursor-pointer text-lg hover:underline font-light mt-4' href='./home#featured-products'><h5  className='light-text mt-4 font-light'> Featured Products</h5></a>
			  		</div> 
			  	</div>

				  <div className='footer-section-links w-42 space-y-10 text-left'>
						<h5 className='footer-links-title font-semibold text-xl tracking-widest '>Registrations</h5>

						<div className='flex flex-col space-y-4 tracking-widest '>
							<Link href='https://admin.buylowcal.com/register'>
								<h5 className='light-text cursor-pointer text-lg hover:underline  font-light'>Register as Vendor </h5>
							</Link>
							<h5 onClick={handleJoin} className='light-text cursor-pointer text-lg hover:underline font-light'>
								Register as Customer 
							</h5>
						</div>		  		
			  	  </div>



				  <div className='flex flex-col w-42 space-y-4'>
					  <h5 className='font-semibold text-xl tracking-widest'> Follow Us</h5>
				  <div className='grid grid-cols-3 lg:grid-cols-3 place-items-center items-center  cursor-pointer text-3xl lg:text-lg '>
					  
					<a target="_blank" href='https://www.facebook.com/buylowcal/'> <FacebookIcon className='h-8 w-8  bg-blue-800 cursor-pointer text-lg hover:underline'/></a> 
					  
					<a target="_blank" href='https://www.instagram.com/buylowcal/?hl=en'> <InstagramIcon className='h-8 w-8 text-red-500 cursor-pointer text-lg hover:underline'  /></a>

					<a target="_blank" href='https://in.linkedin.com/company/buylowcal'> <LinkedInIcon className='h-8 w-8 cursor-pointer hover:underline '  />	 </a>	
					  
					<a target="_blank" href='https://www.youtube.com/channel/UCs0jYR_99h5GKs0cvRZSg-A'> <YouTubeIcon className='h-8 w-8 cursor-pointer hover:underline '  />	 </a>		

				 </div>
				  </div>

				  

{/* 			  	<div className='footer-section-links'> */}
{/*  */}
{/* 			  		<h5 className='footer-links-title'> Newsletter Subscription</h5> */}
{/*  */}
{/* 			  		<h5  className='light-text'> Join our email subscription now to get updates on  */}
{/* 			  			<strong > <a href='/'> promotions</a></strong> and  */}
{/* 			  		    <strong> <a href='/'> cashbacks.</a></strong> */}
{/* 			  	    </h5> */}
{/* 			  	    <input  className='subscribe-input' type='text' placeholder='Enter your email'/> */}
{/* 			  	    <span className='subscribe-btn'> */}
{/* 			  	    	  Subscribe */}
{/* 			  	    </span> */}
{/* 			  	</div> */}

			  </div>
			  
			  <div className='footer-bottom-section flex justify-between items-start p-2 px-4 -mt-0'>
			  	 
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
