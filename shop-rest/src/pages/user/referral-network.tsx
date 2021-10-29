
import Navbar from "@components/layout/navbar/navbar";
import DefaultLayout from "@components/layout/default-layout";
import Footer from "@components/footer/Footer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import ProfileSidebar from "@components/profile/profile-sidebar";
import { useEffect ,useLayoutEffect} from "react";
import { InvitedUsers } from '@settings/site.settings';
import Tree from 'react-tree-graph';
import 'react-tree-graph/dist/style.css'
import {useReferralNetworkQuery} from '@data/user/use-referral-network-query'
export default function ReferralNetwork() {
    
    const { data } = useReferralNetworkQuery({
        limit: 10 as number,
        search:"",
    });

    useEffect(()=>{
        console.log(data,"data");
    },[])
  
    function useWindowSize() {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
          function updateSize() {
            var new_width=(window.innerWidth>=1000)?800:window.innerWidth-10;
            var new_height=(window.innerWidth>=1000)?800:window.innerWidth-10;
            // console.log(new_width,"new_width");
            // console.log(new_height,"new_height");

            setSize([new_width, new_height]);
          }
          window.addEventListener('resize', updateSize);
          updateSize();
          return () => window.removeEventListener('resize', updateSize);
        }, []);
        return size;
    }
    const [width, height] = useWindowSize();
    return (  

        <div className='bg-gray-100'>


            <Navbar label="Referral Network "/>

                <div className='  flex mx-4 sm:mx-10  space-x-0 lg:space-x-10'>

                    <ProfileSidebar className="sticky overflow-hidden flex-shrink-0 mt-14 ml-14 hidden xl:block xl:w-80 " />  

                    <div className="flex flex-col  justify-evenly bg-white h-screen p-4 w-screen  border  mt-14" style={{backgroundColor:"#2c2d25"}}>
                    {
                        data&&(
                            <Tree
                                data={data}
                                height={height}
                                width={width}
                                svgProps={{
                                    className: 'custom'
                                }}
                            />
                        )
                    }
                    
                    </div>

                    {/* <div className=" flex flex-col  justify-evenly bg-white  p-4 w-full mx-auto border  mt-14 " >

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
                    </div> */}
                
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



