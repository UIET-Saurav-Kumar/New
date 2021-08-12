
import Navbar from "@components/layout/navbar/navbar";
import DefaultLayout from "@components/layout/default-layout";
import Footer from "@components/footer/Footer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import ProfileSidebar from "@components/profile/profile-sidebar";
import {InvitedUsers} from "@data/invite/referal-data"


export default function ReferralNetwork() {



    const handleClick = () => {

    }

   
    const showLevel1 = () => {
        setLevel1(true);
		setLevel1(InvitedUsers.filter( (user) => user.level = '1')
			)
	}
    const showLevel2 = () => {
        setLevel2(true);
		setLevel2(InvitedUsers.filter( (user) => user.level = '2')
			)
	}

    const showLevel3 = () => {
        setLevel3(true);
		setLevel3(InvitedUsers.filter( (user) => user.level = '3')
			)
	}

    const showLevel4 = () => {
        setLevel4(true);
		setLevel4(InvitedUsers.filter( (user) => user.level = '4')
			)
	}

    const[level1, setLevel1]=useState([]);
    const[level2, setLevel2]=useState([]);
    const[level3, setLevel3]=useState([]);
    const[level4, setLevel4]=useState([]);

    return (

        <div className='bg-gray-100'>
            
            <Navbar label="Referral Network "/>

            <div className='  flex mx-10 space-x-20'>

            <ProfileSidebar className="flex-shrink-0 mt-14 ml-14 hidden xl:block xl:w-80 " />  

            <div className=" flex-start   justify-around bg-white  p-4 space-x-40  items-center h-screen w-full  border ml-10 mt-14 " >
                <button onClick={showLevel1} className={` ${ level1 ? 'bg-pink-600' : 'bg-white text-black'} w-24 font-semibold text-white py-2 px-2 rounded-3xl`}> Level 1</button>
                <button onClick={showLevel2} className={` ${ level2 ? 'bg-pink-600' : 'bg-white text-black'} w-24 font-semibold text-white py-2 px-2 rounded-3xl`}> Level 2</button>
                <button onClick={showLevel3} className={` ${ level3 ? 'bg-pink-600' : 'bg-white text-black'} w-24 font-semibold text-white py-2 px-2 rounded-3xl`}> Level 3</button>
                <button onClick={showLevel4} className={` ${ level4 ? 'bg-pink-600' : 'bg-white text-black'} w-24 font-semibold text-white py-2 px-2 rounded-3xl`}> Level 4</button>
            </div>
              

                
              

            </div>

            <Footer/>
            
        </div>
    )
}

export const getStaticProps = async ({ locale }: any) => {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  };



