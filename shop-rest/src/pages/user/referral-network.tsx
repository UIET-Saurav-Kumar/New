
import Navbar from "@components/layout/navbar/navbar";
import DefaultLayout from "@components/layout/default-layout";
import Footer from "@components/footer/Footer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import ProfileSidebar from "@components/profile/profile-sidebar";
import { useEffect } from "react";


export default function ReferralNetwork() {

    const InvitedUsers = [

        { 
           id:'9056',
           name: 'Vinender Singh',
           mobileNumber: '90182-47362',
           status: 'accepted',
           purchases: '₹ 1500 in last 1 month',
           level: '1',
       },
    
       {
        id:'9496',
           name: 'Koshim',
           mobileNumber: '90182-47362',
           status: 'accepted',
           purchases: '₹ 2000 in last 1 month',
           level: '2',
       },
    
       {
        id:'1102',
           name: 'Sahil',
           mobileNumber: '80183-65263',
           status: 'accepted',
           purchases: '₹ 2000 in last 1 month',
           level: '3',
       },
    
       {
        id:'2026',
           name: 'Dev Ed',
           mobileNumber: '70182-65262',
           status: 'pending',
           purchases: '₹ 1030 in last 1 month',
           level: '4',
           date : '20/June/2021',
    
       },
    
       {
        id:'1016',
           name: 'Web Dev',
           mobileNumber: '70340-69872',
           status: 'pending',
           purchases: '₹ 200 in last 1 month',
           level: '2',
           date : '20/June/2021',
       },

       {
        id:'70856',
           name: 'Aman',
           mobileNumber: '90182-47362',
           status: 'accepted',
           purchases: '₹ 1160 in last 1 month',
           level: '3',
           date : '20/June/2021',
       },
    
       {
        id:'1095',
           name: 'Sharma',
           mobileNumber: '80183-65263',
           status: 'accepted',
           purchases: '₹ 350 in last 1 month',
           level: '4',
           date : '20/June/2021',
       },
    
       {
        id:'9306',
           name: 'Dev Ed',
           mobileNumber: '70182-65262',
           status: 'pending',
           purchases: '₹ 600 in last 1 month',
           level: '2',
           date : '20/June/2021',
    
       },
    
       {
        id:'9394',
           name: 'Web Dev',
           mobileNumber: '70340-69872',
           status: 'pending',
           purchases: 'null',
           level: '3',
           date : '20/June/2021',
    
       },

       {
        id:'4006',
           name: 'Guest',
           mobileNumber: '70340-69872',
           status: 'pending',
           purchases: 'null',
           level: '4',
           date : '20/June/2021',
    
       },
    ]


    const handleClick = () => {

    }

   
    const showLevel1 = () => {
        setLevel1(true);
        setLevel3(false);
        setLevel2(false);
        setLevel4(false);
		setdata1(InvitedUsers.filter( (user) => user.level = '1'))
			
	}

    const showLevel2 = () => {
        setLevel2(true);
        setLevel3(false);
        setLevel1(false);
        setLevel4(false);
		setdata2(InvitedUsers.filter( (user) => user.level = '2')
			)
	}

    const showLevel3 = () => {
        setLevel3(true);
        setLevel1(false);
        setLevel2(false);
        setLevel4(false);
		setdata3(InvitedUsers.filter( (user) => user.level = '3')
			)
	}

    const showLevel4 = () => {
        setLevel4(true);
        setLevel3(false);
        setLevel1(false);
        setLevel2(false);
    
		setdata4(InvitedUsers.filter( (user) => user.level = '4')
			)
	}

    const[data1, setdata1] = useState([]);
    const[data2, setdata2] = useState([]);
    const[data3, setdata3 ]= useState([]);
    const[data4, setdata4] = useState([]);

    const[level1, setLevel1] = useState(false);
    const[level2, setLevel2] = useState(false);
    const[level3, setLevel3 ]= useState(false);
    const[level4, setLevel4] = useState(false);


    useEffect(() => {
      setLevel1(true);
    }, [])


    return (  

        <div className='bg-gray-100'>


            <Navbar label="Referral Network "/>

                <div className='  flex mx-10 space-x-20'>

                    <ProfileSidebar className="sticky overflow-hidden flex-shrink-0 mt-14 ml-14 hidden xl:block xl:w-80 " />  


                    <div className=" flex flex-col  justify-evenly bg-white  p-4 w-full mx-auto border  mt-14 " >

                            <div className='flex justify-evenly bg'>   

                                <button onClick={showLevel1} className={` ${ level1 ? 'bg-pink-700' : 'bg-white text-black'} text-10px border sm:text-sm h-9 items-center font-semibold text-white py-2 px-4 rounded-3xl`}> Level 1</button>
                                <button onClick={showLevel2} className={` ${ level2 ? 'bg-pink-700' : 'bg-white text-black'} text-10px border sm:text-sm h-9 items-center font-semibold text-white py-2 px-4 rounded-3xl`}> Level 2</button>
                                <button onClick={showLevel3} className={` ${ level3 ? 'bg-pink-700' : 'bg-white text-black'} text-10px border sm:text-sm h-9 items-center font-semibold text-white py-2 px-4 rounded-3xl`}> Level 3</button>
                                <button onClick={showLevel4} className={` ${ level4 ? 'bg-pink-700' : 'bg-white text-black'} text-10px border sm:text-sm h-9 items-center font-semibold text-white py-2 px-4 rounded-3xl`}> Level 4</button>

                            </div> 

                            <div className='grid grid-cols-1 gap-3  place-items-center sm:grid-cols-1 md:grid-cols-1 pr-30 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mt-8'> 
                            
                                {InvitedUsers.map(data => (

                                    <div key={data.id} className=' flex space-y-4 w-auto h-auto p-6  shadow- bg-blue-100 rounded-lg flex-col'>

                                        <h4 className='text-xs font-md'> <span  className = 'text-xs  font-semibold mr-2'> Level:          </span>    {data.level}        </h4>
                                        <h4 className='text-xs font-md'> <span  className = 'text-xs  font-semibold mr-2'> Name:           </span>    {data.name}         </h4>
                                        <h4 className='text-xs font-md'> <span  className = 'text-xs  font-semibold mr-2'> Mobile Number:  </span>    {data.mobileNumber} </h4>
                                        <h4 className='text-xs font-md'> <span  className = 'text-xs  font-semibold mr-2'> Purchases:      </span>    {data.purchases}    </h4>

                                    </div>

                                )) }

                            </div> 

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



