
import React,{useState, useEffect} from 'react';


import MobileNavigation from "@components/layout/mobile-navigation";




import Footer from '@components/footer/Footer';
import Navbar from '@components/layout/navbar/navbar';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ProfileSidebar from "@components/profile/profile-sidebar";
import {InvitedUsers} from "@data/invite/referal-data"

const ReferralActivity = () => {
    // const [invited, setInvited] =   useState(false);
    // const [accepted, setAccepted] = useState(false);
    // const [pending, setPending] =   useState(false);

	const [ click, setClick] = useState(true);
    const [ all, setAll] = useState(false);

	const showAccepted = () => {
        setAccepted(true);
		setAccepted(InvitedUsers.filter( (user) => user.status != 'pending')
			)
	}

	const showPending = () => {
          setPending(true);
          setPending(InvitedUsers.filter( (user) => user.status != 'accepted'))
	}



	const [accepted, setAccepted ] = useState([])
	const [pending, setPending ] = useState([])

	return (
        <> 
		<div className='invitation-status-page bg-gray-100 flex flex-col'>  

            <Navbar label='Referral Activity '/>

            <div className='flex mx-10 space-x-20 '>

            <ProfileSidebar className="flex-shrink-0 hidden mt-14 xl:block xl:w-80 ml-14" />  


			<div className='invite-tabs flex flex-col bg-white  p-4 w-full mx-4 text-left mt-14 px-8'>
				<div className='invite-tab-title flex w-full justify-between static items-center  bg-white'>

					<button className=' bg-green-600 text-white w-24 h-12 rounded-md font-md border-1-bGray opacity-70' 
                              onClick={showAccepted} id='accepted-btn'>
                        Active
                    </button>

					<button className=' bg-red-600 text-white w-24 rounded-md h-12 font-md border-1-bGray opacity-70' 
                              onClick={showPending} id='pending-btn' >
                            Inactive
                    </button>

				</div>

                    <>

                        <div className="users-list mt-16  shadow-md">
                            {/* <h1>{click ? 'Accepted Invites' : 'Pending Invites'}</h1> */}
                            <table className='border-collapse border w-full  '>
                                <colgroup span="4" />
                                <thead className=' font-normal text-10px md:text-md lg:text-lg p-10'>

                                <tr className='p-10  font-normal text-10px md:text-md lg:text-sm '>
                                    
                                    <th>Id</th>
                                    <th  className='' >Level</th>
                                    <th>Name</th>
                                    <th>Mobile Number</th>
                                    <th>Purchases</th>
                                    <th> Invited on </th>
                                    <th>Status</th>

                                </tr>

                                </thead>
                                <tbody>
                                {( accepted ? InvitedUsers : InvitedUsers).map((user) => (
                                    <tr className='bg-white' key={user.id}>

                                    <td className=' p-1  border-b-2  lg:px-4 lg:py-4 text:10px sm:text-xs lg:text-md font-md text-gray-600'>{user.id}</td>
                                    <td className='p-1 border-b-2  lg:px-4 lg:py-4 text:10px sm:text-xs  lg:text-md font-md text-gray-600' >{user.level}</td>
                                    <td className='p-1 border-b-2  lg:px-4 lg:py-4 text:10px sm:text-xs  lg:text-md font-md text-gray-600' >{user.name}</td>
                                    <td className='p-1 border-b-2  lg:px-4 lg:py-4 sm:text-10px  text:xs lg:text-md font-md text-gray-600' >{user.mobileNumber}</td>
                                    <td className='p-1 border-b-2  lg:px-4 lg:py-4 sm:text-10px  text:xs lg:text-md font-md text-gray-600' >{user.status === 'accepted' ? (user.purchases) : 'null' }</td>
                                        <td className='p-1 border-b-2  lg:px-4 lg:py-4 sm:text-10px  text:xs lg:text-md font-md text-gray-600' >{user.date}</td>
                                        <td className=' p-1 border-b-2  lg:px-4 lg:py-4 sm:text-10px  text:xs lg:text-md font-md text-gray-600' >
                                    {user.status === 'accepted' ?
                                       <h3 className='text-green-700 font-bold text-sm'>Active</h3>
                                        : <h3 className='text-red-700 font-bold text-sm'>Inactive</h3>
                                    }
                                    </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>    
                                        
                </>
 
			</div>
            </div>
			
		 </div>

         <div className=''>

         </div>

        <div className='mt-64'><Footer/></div> 
        <MobileNavigation search={false} />

        </>
	)
}

export default ReferralActivity;

export const getStaticProps = async ({ locale }: any) => {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  };