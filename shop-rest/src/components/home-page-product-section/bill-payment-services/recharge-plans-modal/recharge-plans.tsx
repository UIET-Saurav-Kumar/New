import Input from '@components/ui/input'
import Select from '@components/ui/select/select';
import React, { useState } from 'react';
import { operators } from '@components/home-page-product-section/bill-payment-services/forms/mobile-recharge-form';
import { circleCode } from '@components/home-page-product-section/bill-payment-services/forms/mobile-recharge-form';
import { ArrowCircleRightIcon } from '@heroicons/react/outline';
import Table from 'rc-table';
import { useIsRTL } from "@utils/locals";
import DataTable from 'react-data-table-component';
import { findIndex, indexOf } from 'lodash';
import { useModalAction } from '@components/ui/modal/modal.context';

export default function RechargePlans(plans: { data: { plans: any; }; },operator: any,circle: any):any {

    const { alignLeft } = useIsRTL();
    const { openModal } = useModalAction();


     let currentCircle = plans?.data?.circle

     console.log('modal',plans)

    const filteredPlans = 
    
    plans?.data?.plans?.plans?.filter((plan: any) =>
    {plan.circle == currentCircle})

    console.log('modal filtered  ',filteredPlans)

    console.log('modal circle',currentCircle)

    console.log('modal plans',plans?.data?.plans)

    function handlePlanDetails( plan:any)  {
        return openModal("RECHARGE_PLAN_DETAILS"
        ,{
          plan: plan,
          operatorName: plans?.data?.operator,
          circleName: plans?.data?.circle,
          phone: plans?.data?.phone,
        }
        );
      }


    const response = plans?.data?.plans

    console.log``

    const { data } = response! ?? {};

    // const columns = [
    //     {
    //     name: 'Talktime',
    //     selector: (row) => row?.plans?.map((list:any)=>  )
    //     },

    // ]
    

    const columns = [

        {
            title: 'Talktime',
            dataIndex: "talktime",
            key: "plans",
            align: alignLeft,
            render: (data ) => {
                 
                // const data = response?.plans
                console.log('plans',data);
                // const allPlans = data?.map((list:any)=>list?.talktime)
                // console.log('plans',response?.plans[index].plans.map((tk:any)=>tk?.talktime))
               return <span className="whitespace-nowrap">
                        {/* {'allPlans'} */}
                      </span>
            },
        },

        {
            title:'Validity',
            dataIndex: "validity",
            key: "plans",
            align: alignLeft,
            render: (plans: any) => {
                console.log('plans',plans)
                return <div className="whitespace-nowrap text-black font-light">
                        {plans}
                       </div>
            },
        },

        {
            title: 'Description',
            dataIndex: "description",
            key: "plans",
            align: alignLeft,
            render: (plans: any) => (
                <div className="whitespace-nowrap font-light">
                      {plans?.description}
                </div>
            ),
        },

        {
            title: 'Price',
            dataIndex: "price",
            key: "plans",
            align: alignLeft,
            render: (plans: any) => (
                <div className="whitespace-nowrap font-light">
                     {plans?.price}
                </div>
            ),
        }

    ]

    const [index, setIndex] = useState(0);
    const [key, setKey] = useState(0);

    const handlePlan = (event,key) => {
        console.log('key',key)
        console.log('key',event.target)
        setIndex(key)
        setKey(key)
    }
    
    // console.log('plans',response?.plans[index].plans.map((tk:any)=>tk?.talktime))

  return (

        <div  className='flex bg-white flex-col items-center  justify-between w-full'>
                
                <div   className=''>
                    Browse Plans
                </div>

            <div className='grid grid-cols-1  lg:flex lg:items-center lg:space-x-2 lg:justify-evenly lg:space-y-0 space-y-2 p-4 bg-gray-100 w-full '>
                
                
                  <Select name='Operator'
                    variant='solid'
                    type='number'
                    className='flex-1'
                    options={operators} 
                    value={operator}
                    placeholder='Select operator'
                  />

                  <Select 
                    variant='solid'
                    type='number'
                    className='flex-1'
                    options={circleCode}
                    value={circle}
                    placeholder='Select circle'
                   />
                    

                  <Input   
                    variant=''
                    type='number'
                    className='flex-1'
                    // className='border'
                    // onChange={(e)=>handleOnChange(e)}
                    maxLength={10}
                    placeholder='amount'
                  />

                </div>

                <div className='h-screen overflow-y-scroll grid grid-cols-1 lg:grid-cols-1  items-start w-full'>

                <div className='scrollbar-hide hidden lg:flex lg:sticky lg:top-0 lg:z-50 bg-white  overflow-x-scroll  w-full  text-gray-700 text-xs   sm:text-sm  items-center     font-light    '>

                    {
                        response?.plans?.map((list:any,key)=>
                        <div onClick={event=> handlePlan(event,key)} key={key} 
                            className={` ${index == key ? ' border-b-4 border-blue-400   ' : 'hover:bg-gray-50 border-b-4 border-white '} cursor-pointer p-2 flex  items-center text-center text-black `}>
                            <li className='list-none' >
                             <span  className={` ${index == key ? 'text-gray-800 font-semibold' : 'text-gray-600 font-semibold'}   cursor-pointer   flex flex-col  whitespace-nowrap`}>
                                {list?.group_name}
                                <span className='   '></span>
                             </span>
                            </li>
                        </div>
                        )
                    }

                </div>

                <div className='sticky top-0 bg-white scrollbar-hide lg:hidden   overflow-x-scroll    text-gray-700 text-xs   sm:text-sm flex   lg:space-y-8 font-light    '>

                    {
                        response?.plans?.map((list:any,key)=>
                            <div onClick={event=> handlePlan(event,key)} key={key} 
                                className={` ${index == key ? ' border-b-4 border-blue-400   ' : 'hover:bg-gray-50 border-b-4 border-white '} cursor-pointer p-2 flex    items-center text-center text-black `}>
                                <li className='list-none' >
                                    <span  className={` ${index == key ? 'text-gray-800 font-semibold' : 'text-gray-600 font-semibold'}   cursor-pointer   flex flex-col  whitespace-nowrap`}>
                                        {list?.group_name}
                                        <span className='   '></span>
                                    </span>
                                </li>
                            </div>
                        )
                    }

                </div>

                    <div className='flex-1 flex-col mt-10 lg:mt-20'>

                        {/* <div className=''>

                        </div> */}

                        <div className=' '>
                            {/* <Table
                            //@ts-ignore
                            columns={columns}
                            emptyText={("empty-table-data")}
                            data={data}
                            rowKey="id"
                            // scroll={{ x: 1000 }}
                            /> */}

                            <table className='w-full flex overflow-x-scroll items-center justify-between mt-4'>
                               <tr className='flex flex-col items-center cursor-pointer  border-b space-y-3 justify-around w-full '>
                                    <th className=''>Talktime</th>
                                        {
                                            response?.plans[index].plans.map((tk:any)=>{
                                            return <td className='text-xs leading-loose sm:text-sm h-24 font-light text-gray-700'>{tk?.talktime}</td>
                                        }
                                            )
                                        }
                               </tr>

                               <tr className='flex flex-col items-center cursor-pointer  space-y-3 justify-around w-full  '>
                                 <th className=''>Validity</th>
                                    {
                                        response?.plans[index].plans.map((tk:any)=>{
                                        return <td className='text-xs leading-loose sm:text-sm h-24 font-light text-gray-700'>{tk?.validity}</td>}
                                        )
                                    }
                               </tr> 

                               <tr className='flex flex-col space-y-3 cursor-pointer justify-around w-full  '>
                                  <th className=''>Description</th>
                                    {
                                        response?.plans[index].plans.map((tk:any)=>{
                                        return <td className='text-xs leading-loose  sm:text-sm h-24 text-left font-light text-gray-700'>{tk?.description.substring(0,50)}</td>}
                                        )
                                    }
                               </tr>

                               <tr className='flex flex-col items-center cursor-pointer  space-y-3 justify-around w-full  '>
                                 <th  className=''>Price</th>
                                    {
                                        response?.plans[index].plans.map((tk:any)=>{
                                        return <td onClick={()=>handlePlanDetails(tk)} className='text-xs leading-loose sm:text-sm h-24 rounded font-light text-gray-700'><span className='p-2 px-4 rounded border border-indigo-300'> ₹{tk?.price}</span></td>}
                                        )
                                    }
                               </tr>

                            </table>
                           
                        </div>

                    </div>

                </div>

            </div>
        )
    }
