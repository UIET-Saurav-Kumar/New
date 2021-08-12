import Link from 'next/link'

import { FacebookIcon } from "@components/icons/facebook"
import { InstagramIcon } from "@components/icons/instagram"


const Footer = () => {
	return (
		<div className='footer-wrapper hidden
                        sm:flex sm:flex-col text-10px
                        bg-black shadow-lg mb-8 rounded-md text-white  justify-evenly mt-16'>
			  

			  <div className='footer-top-section 
                              flex space-x-6 text-left mb-8 p-4  shadow-md border-gray-700 justify-evenly'>


			  	<div className='footer-section-links w-20 space-y-4 text-left'>

			  		{/* <h5 className='footer-links-title font-semibold '> About Buylowcal </h5> */}

			  		<h5 className='footer-links-title font-semibold'> About  </h5>

					  <Link href='./about-us'><h5 className='phone-number cursor-pointer hover:underline text-primary font-normal -mt-4'> About Buylowcal</h5></Link>
					  <Link href='./careers'><h5 className='phone-number cursor-pointer hover:underline text-primary font-normal -mt-4'> Careers</h5></Link>
					  <Link href='./terms'><h5 className='phone-number cursor-pointer hover:underline text-primary font-normal -mt-4'> Terms of Service</h5></Link>



					  <Link href='./return-policy'><h5 className=' cursor-pointer hover:underline phone-number text-primary font-normal -mt-4'> Our Return Policy</h5></Link> 
					<Link href='./privacy'><h5 className=' cursor-pointer hover:underline phone-number text-primary font-normal -mt-4'>Our Privacy Policy</h5></Link> 
			
			  	
			  		
			  	</div>

			  	{/* <div className='footer-section-links-2 space-y-4 text-left '>

			  		<h5 className='footer-links-title font-semibold' >Help & Info</h5>

			  		<h5 className='light-text font-light'>About us</h5>
			  		<h5 className='light-text font-light'> Contact</h5>
			  		<h5 className='light-text font-light'>Sore Locations</h5>
			  		<h5  className='light-text font-light'> Terms of use</h5>
			  		<h5  className='light-text font-light'> Policy</h5>
			  		<h5  className='light-text font-light'> Flash Sale</h5>
			  		<h5  className='light-text font-light'> FAQs</h5>
			  	</div> */}

			  	<div className='footer-section-links w-20 space-y-4 text-left'>

			  		<h5 className='footer-links-title font-semibold'>Registrations</h5>

			  		<h5 className='light-text cursor-pointer hover:underline font-light'>Register as Vendor </h5>
					<h5 className='light-text cursor-pointer hover:underline font-light'>Register as Rider </h5>
					<h5 className='light-text cursor-pointer hover:underline font-light'>Register as Customer </h5>
			  	
			  		{/* <h5 className='light-text font-light'> Careers</h5> */}
			  		
			  	</div>

			  	<div className='footer-section-links w-20 space-y-4 text-left'>

			  		<h5 className='footer-links-title font-semibold'>Know more</h5>

			  		<h5 className='light-text cursor-pointer hover:underline font-light'>Cashbacks Offers</h5>
			  		<h5 className='light-text cursor-pointer hover:underline font-light'> Flash Sale</h5>
			  		<h5  className='light-text cursor-pointer hover:underline font-light'> Top Offers</h5>
			  		<h5  className='light-text cursor-pointer hover:underline font-light'> New Arrivals</h5>
			  		
			  	</div>


				  <div className='footer-section-links w-20 space-y-4 text-left'>

			  		<h5 className='footer-links-title font-semibold'>More</h5>

					  <a className='light-text cursor-pointer hover:underline font-light mt-4' href='#all-categories'><h5 className='light-text mt-4 font-light'>Categories</h5></a>
					  <a className='light-text cursor-pointer hover:underline font-light mt-4' href='#featured-shops'><h5 className='light-text mt-4 font-light'> Local Shops</h5></a>
			  	      <a className='light-text cursor-pointer hover:underline font-light mt-4' href='#ecommerce-store'><h5 className='light-text mt-4 font-light'> E-Stores</h5></a>	
					  <a className='light-text cursor-pointer hover:underline font-light mt-4' href='#offer-of-the-day'><h5  className='light-text mt-4 font-light'> Offer of the Day</h5></a>
					  <a className='light-text cursor-pointer hover:underline font-light mt-4' href='#featured-products'><h5  className='light-text mt-4 font-light'> Featured Products</h5></a>
			  		
			  	</div>

				  <div className='flex flex-col w-20 space-y-4'>
					  <h5 className='font-semibold'> Follow Us</h5>
				  <div className='flex flex-col space-y-3 cursor-pointer '>
					  
					<a target="_blank" href='https://www.facebook.com/buylowcal/'> <FacebookIcon className='h-6 w-6 bg-blue-800 cursor-pointer hover:underline'/></a> 
					  
					<a target="_blank" href='https://www.instagram.com/buylowcal/?hl=en'> <InstagramIcon className='h-6 w-6 text-red-500 cursor-pointer hover:underline'  /></a>

					<a target="_blank" href='https://in.linkedin.com/company/buylowcal'> <img  src='/linkedin.png' className='h-6 w-6 cursor-pointer hover:underline '  />	 </a>			
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
			  
			  <div className='footer-bottom-section flex justify-between items-start p-2 px-4 -mt-8'>
			  	  <h5 className='font-semibold text-gray-400'> © 2021 BuyLowcal.com All Rights Reserved</h5>
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