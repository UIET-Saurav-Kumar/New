
import React,{useState, useEffect} from 'react';
import MobileNavigation from "@components/layout/mobile-navigation";
import ProductFeedLoaderTwo from "@components/ui/loaders/product-feed-loader-two";
import Footer from '@components/footer/Footer';
import Navbar from '@components/layout/navbar/navbar';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ProfileSidebar from "@components/profile/profile-sidebar";
import {useWalletCommissionQuery} from '@data/user/use-wallet-commission-query'
import usePrice from "@utils/use-price";
import { PriceWalletIcon } from "@components/icons/price-wallet";
import { DollarIcon } from "@components/icons/dollar";


const ReferralActivity = () => {
    const { data,isLoading:loading } = useWalletCommissionQuery({
        limit: 10 as number,
        search:"",
    });
    const { price: totalEarnings } = usePrice(
        data && {
            amount: data?.balance?.total_earnings!,
        }
    );
    const { price: currentBalance } = usePrice(
        data && {
            amount: data?.balance?.current_balance!,
        }
    );
    const { price: withdrawnAmount } = usePrice(
        data && {
            amount: data?.balance?.withdrawn_amount!,
        }
    );
    
    function formateDate(date:string):string{
        var temp=date.substring(0,10).split('-');
        
        return temp[2]+"/"+temp[1]+"/"+temp[0];
    }

    function orders_count(){
        if(data){
            return data.customer_level?.length+data.level1?.length+data.level2?.length+data.level3?.length;
        }
    }

    useEffect(()=>{
        console.log(data)
    },[data])


	const [accepted, setAccepted ] = useState([]);

    if (loading) {
        return (
          <div className="hidden xl:block">
            <div className="w-full h-52 flex justify-center mt-8 px-2">
              <ProductFeedLoaderTwo />
            </div>
          </div>
        );
      }

	return (
        <> 
		<div className='invitation-status-page bg-white lg:bg-gray-100 flex flex-col'>  

            <Navbar label='Referral Activity '/>

            <div className='flex mx-8 -space-x-4 lg:mx-auto lg:space-x-0 '>
                
                <ProfileSidebar className="lg:sticky lg:top-22 flex-shrink-0 hidden mt-0 sm:mt-0 lg:mt-14 xl:block xl:w-80 ml-8" />  

                <div className="flex flex-col  justify-evenly p-4 xl:w-1000 xl+:1100 2xl:w-1300 mx-8  mt-6">
                    <div className='invite-tabs flex flex-col bg-white p-4 w-full mx-4 text-left mt-5 px-8'>
                        <div className="users-list mt-10">
                            <h1 className="text-lg mb-5 font-semibold text-heading">Revenue</h1>

                            {/* Mini Dashboard */}
                            <div className="order-4 mx-auto xl:order-3 col-span-12 xl:col-span-9">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-light p-4 mx-auto rounded h-full">
                                

                                <div className="space-y-3  w-full">
                                    <div className="border border-gray-100">

                                        <div className="flex items-center py-3 px-4 border-b border-gray-100">

                                            <div className="p-3 rounded-full w-11 h-11 flex items-center justify-center bg-[#C7AF99] text-light">
                                                    <PriceWalletIcon width={16} />
                                            </div>

                                            <div className="ml-3">
                                                <p className="text-md lg:text-lg font-semibold text-sub-heading mb-0.5">
                                                    {totalEarnings}
                                                </p>
                                                <p className="text-sm text-muted mt-0">
                                                    {("Total Earning")}
                                                </p>
                                            </div>

                                        </div>

                                    </div>
                                </div>


                                <div className="space-y-3">
                                    <div className="border border-gray-100">
                                        <div className="flex items-center  py-3 px-4">
                                            <div className="p-3 rounded-full w-11 h-11 flex items-center justify-center bg-[#FFA7AE] text-light">
                                                <DollarIcon width={12} />
                                            </div>

                                            <div className="ml-3">
                                                <p className="text-md lg:text-lg font-semibold text-sub-heading mb-0.5">
                                                    {currentBalance}
                                                </p>
                                                <p className="text-sm text-muted mt-0">
                                                    {("Current Balance")}
                                                </p>
                                            </div>
                                        </div>  
                                    </div>
                                </div>



                                <div className="space-y-3">
                                    <div className="border border-gray-100">
                                        <div className="flex items-center py-3 px-4">
                                            <div className="p-3 rounded-full w-11 h-11 flex items-center justify-center bg-[#6EBBFD] text-light">
                                               <PriceWalletIcon width={16} />
                                            </div>

                                            <div className="ml-3">
                                                <p className="text-md lg:text-lg font-semibold text-sub-heading mb-0.5">
                                                    {withdrawnAmount}
                                                </p>
                                                <p className="text-sm text-muted mt-0">
                                                    {("Withdrawal Amount")}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>

                    </div>
                    </div>


                    <div className='invite-tabs flex flex-col bg-white p-4 w-full mx-4 text-left mt-5 px-8 overflow-x-scroll'>
                        <div className="users-list mt-10">
                            <h1 className="text-lg mb-5 font-semibold text-heading">Customer Wallet</h1>
                            <table className='border-collapse border w-full'>
                                <thead className=' font-normal text-10px md:text-md lg:text-lg p-10'>
                                    <tr className='p-10  font-normal text-10px md:text-md lg:text-sm '>
                                        <th className=" p-1  border-b-2  lg:px-4 lg:py-4">Date</th>
                                        <th className=" p-1  border-b-2  lg:px-4 lg:py-4">Shop name</th>
                                        <th className=" p-1  border-b-2  lg:px-4 lg:py-4">Order Id</th>
                                        <th className=" p-1  border-b-2  lg:px-4 lg:py-4">Order Value</th>
                                        <th className=" p-1  border-b-2  lg:px-4 lg:py-4">Earning</th>
                                    </tr>
                                </thead>
                                <tbody>

                                {
                                    (data?.customer_level?.length==0)&&(
                                        <>
                                        <tr>
                                            <td colSpan="5" className='text-center p-1 border-b-2  lg:px-4 lg:py-4 text:10px sm:text-xs  lg:text-md font-md text-gray-600'>
                                                No record found
                                            </td>
                                        </tr>
                                        </>
                                    )
                                }

                                {(data?.customer_level).map((commission):any => (
                                    
                                    <tr className='bg-white' key={commission.id}>
                                        <td className=' p-1  border-b-2  lg:px-4 lg:py-4 text:10px sm:text-xs lg:text-md font-md text-gray-600'>{formateDate(commission.created_at)}</td>
                                        <td className='p-1 border-b-2  lg:px-4 lg:py-4 text:10px sm:text-xs  lg:text-md font-md text-gray-600' >{commission.shop_name}</td>
                                        <td className='p-1 border-b-2  lg:px-4 lg:py-4 text:10px sm:text-xs  lg:text-md font-md text-gray-600' >{commission.order_track_number}</td>
                                        <td className='p-1 border-b-2  lg:px-4 lg:py-4 sm:text-10px  text:xs lg:text-md font-md text-gray-600' >₹{commission.commission_value}</td>
                                        <td className='p-1 border-b-2  lg:px-4 lg:py-4 sm:text-10px  text:xs lg:text-md font-md text-gray-600' >₹{commission.earning}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>                      
                    </div>


                    <div className='invite-tabs flex flex-col bg-white p-4 w-full mx-4 text-left mt-5 px-8'>
                        <div className="users-list mt-10">

                            <h1 className="text-lg mb-5 font-semibold text-heading">Level 1 earnings</h1>
                            <table className='border-collapse border w-full'>
                                <thead className=' font-normal text-10px md:text-md lg:text-lg p-10'>
                                    <tr className='p-10  font-normal text-10px md:text-md lg:text-sm '>
                                        <th className=" p-1  border-b-2  lg:px-4 lg:py-4">Date</th>
                                        <th className=" p-1  border-b-2  lg:px-4 lg:py-4">Order Id</th>
                                        <th className=" p-1  border-b-2  lg:px-4 lg:py-4">Order Value</th>
                                        <th className=" p-1  border-b-2  lg:px-4 lg:py-4">Earning</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        (data?.level1?.length==0)&&(
                                            <>
                                                <tr>
                                                    <td colSpan="5" className='text-center p-1 border-b-2  lg:px-4 lg:py-4 text:10px 
                                                                               sm:text-xs  lg:text-md font-md text-gray-600'>
                                                        No record found
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    }
                                    {(data?.level1).map((commission) => (
                                        <tr className='bg-white' key={commission.id}>
                                            <td className=' p-1  border-b-2 lg:px-4 lg:py-4 text:10px sm:text-xs lg:text-md font-md text-gray-600'>{formateDate(commission.created_at)}</td>
                                            <td className='p-1 border-b-2  lg:px-4 lg:py-4 text:10px sm:text-xs  lg:text-md font-md text-gray-600' >{commission.order_track_number}</td>
                                            <td className='p-1 border-b-2  lg:px-4 lg:py-4 text:10px sm:text-xs  lg:text-md font-md text-gray-600' >₹{commission.commission_value}</td>
                                            <td className='p-1 border-b-2  lg:px-4 lg:py-4 sm:text-10px  text:xs lg:text-md font-md text-gray-600' >₹{commission.earning}</td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>                      
                    </div>

                    <div className='invite-tabs flex flex-col bg-white p-4 w-full mx-4 text-left mt-5 px-8'>
                        <div className="users-list mt-10">
                            <h1 className="text-lg mb-5 font-semibold text-heading">Level 2 earnings</h1>
                                <table className='border-collapse border w-full'>
                                    <thead className=' font-normal text-10px md:text-md lg:text-lg p-10'>
                                        <tr className='p-10  font-normal text-10px md:text-md lg:text-sm '>
                                            <th className=" p-1  border-b-2  lg:px-4 lg:py-4">Date</th>
                                            <th className=" p-1  border-b-2  lg:px-4 lg:py-4">Order Name</th>
                                            <th className=" p-1  border-b-2  lg:px-4 lg:py-4">Order Value</th>
                                            <th className=" p-1  border-b-2  lg:px-4 lg:py-4">Earning</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                            (data?.level2?.length==0)&&(
                                                <>
                                                <tr>
                                                    <td colSpan="5" className='text-center p-1 border-b-2  lg:px-4 lg:py-4 text:10px sm:text-xs  lg:text-md font-md text-gray-600'>
                                                        No record found
                                                    </td>
                                                </tr>
                                                </>
                                            )
                                        }
                                        {( data?.level2).map((commission) => (
                                            <tr className='bg-white' key={commission.id}>
                                                <td className=' p-1  border-b-2  lg:px-4 lg:py-4 text:10px sm:text-xs lg:text-md font-md text-gray-600'>{formateDate(commission.created_at)}</td>
                                                <td className='p-1 border-b-2  lg:px-4 lg:py-4 text:10px sm:text-xs  lg:text-md font-md text-gray-600' >{commission.order_track_number}</td>
                                                <td className='p-1 border-b-2  lg:px-4 lg:py-4 text:10px sm:text-xs  lg:text-md font-md text-gray-600' >₹{commission.commission_value}</td>
                                                <td className='p-1 border-b-2  lg:px-4 lg:py-4 sm:text-10px  text:xs lg:text-md font-md text-gray-600' >₹{commission.earning}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                        </div>                      
                    </div>

                    <div className='invite-tabs flex flex-col bg-white p-4 w-full mx-4 text-left mt-5 px-8'>
                        <div className="users-list mt-10">

                            <h1 className="text-lg mb-5 font-semibold text-heading">Level 3 earnings</h1>
                            <table className='border-collapse border w-full'>
                                <thead className=' font-normal text-10px md:text-md lg:text-lg p-10'>
                                    <tr className='p-10  font-normal text-10px md:text-md lg:text-sm '>
                                        <th className=" p-1  border-b-2  lg:px-4 lg:py-4">Date</th>
                                        <th className=" p-1  border-b-2  lg:px-4 lg:py-4">Order Name</th>
                                        <th className=" p-1  border-b-2  lg:px-4 lg:py-4">Order Value</th>
                                        <th className=" p-1  border-b-2  lg:px-4 lg:py-4">Earning</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (data?.level3?.length==0)&&(
                                            <>
                                            <tr>
                                                <td colSpan="5" className='text-center p-1 border-b-2  lg:px-4 lg:py-4 text:10px sm:text-xs  lg:text-md font-md text-gray-600'>
                                                    No record found
                                                </td>
                                            </tr>
                                            </>
                                        )
                                    }
                                    {( data?.level3).map((commission) => (
                                        <tr className='bg-white' key={commission.id}>
                                            <td className=' p-1  border-b-2  lg:px-4 lg:py-4 text:10px sm:text-xs lg:text-md font-md text-gray-600'>{formateDate(commission.created_at)}</td>
                                            <td className='p-1 border-b-2  lg:px-4 lg:py-4 text:10px sm:text-xs  lg:text-md font-md text-gray-600' >{commission.order_track_number}</td>
                                            <td className='p-1 border-b-2  lg:px-4 lg:py-4 text:10px sm:text-xs  lg:text-md font-md text-gray-600' >₹{commission.commission_value}</td>
                                            <td className='p-1 border-b-2  lg:px-4 lg:py-4 sm:text-10px  text:xs lg:text-md font-md text-gray-600' >₹{commission.earning}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>                      
                    </div>
                </div>
		    </div>
        </div>


        <div><Footer/></div> 
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

  ReferralActivity.layout = Layout;