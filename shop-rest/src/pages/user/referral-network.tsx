
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
    const data_1 = {
        name: 'Colour',
        children: [
            {
                name: 'Black',
                children: []
            }, 
            {
                name: 'Blue',
                children: [{
                    name: 'Aquamarine',
                    children: []
                }, {
                    name: 'Cyan',
                    children: []
                }, {
                    name: 'Navy',
                    children: []
                }, {
                    name: 'Turquoise',
                    children: []
                }]
            }, 
            {
                name: 'Green',
                children: []
            }, 
            {
                name: 'Purple',
                children: [{
                    name: 'Indigo',
                    children: []
                }, {
                    name: 'Violet',
                    children: []
                }]
            }, 
            {
                name: 'Red',
                children: [{
                    name: 'Crimson',
                    children: []
                }, {
                    name: 'Maroon',
                    children: []
                }, {
                    name: 'Scarlet',
                    children: []
                }]
            }, 
            {
                name: 'White',
                children: []
            }, 
            {
                name: 'Yellow',
                children: []
            }
        ]
    };
    

    
    const { data } = useReferralNetworkQuery({
        limit: 10 as number,
        search:"",
    });

    useEffect(()=>{
        console.log(data,"data");
    },[])
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

    function useWindowSize() {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
          function updateSize() {
            var new_width=(window.innerWidth>=1000)?800:window.innerWidth-10;
            var new_height=window.innerHeight;
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

                <div className='  flex mx-10 space-x-20'>

                    <ProfileSidebar className="sticky overflow-hidden flex-shrink-0 mt-14 ml-14 hidden xl:block xl:w-80 " />  

                    <div className="flex flex-col  justify-evenly bg-white  p-4 w-full mx-auto border  mt-14" style={{backgroundColor:"#242424"}}>
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



