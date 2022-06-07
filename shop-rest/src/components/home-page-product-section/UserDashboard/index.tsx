
import React from 'react'
import UserCurrentBalance from './user-current-balance'
import UserInviteCard from './user-invite-card'
import UserProfile from './user-profile'
import UserTotalEarning from './user-total-earning'
import UserUploadInvoiceCard from './user-upload-invoice-card'
import UserWithdrawCard from './user-withdraw-card'
import UserWithdrawnAmount from './user-withdrawn-amount'
import { useCustomerQuery } from "@data/customer/use-customer.query";
import usePrice from "@utils/use-price";
import {useWalletCommissionQuery} from '@data/user/use-wallet-commission-query'


export default function UserDashboard() {


    const { data:customerData } = useCustomerQuery();
    
    const { data,isLoading:loading } = useWalletCommissionQuery({
        limit: 10 as number,
        search:"",
    });

    console.log('customerData',data)

  return (

        <div className='grid grid-cols-1 lg:flex items-center w-full mt-8 py-1 lg:py-3
                        px-1 lg:px-3 space-x-2 lg:space-x-5 bg-gray-100'>

            <div className='w-auto '>
                <UserProfile/>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-2 grid-flow-row gap-3 h-full mt-2  w-full'>

                {/* <div className='grid grid-cols-2 lg:flex gap-3 h-48 items-center'> */}
                    <UserTotalEarning/>
                    <UserCurrentBalance/>
                    <UserWithdrawnAmount/>
                {/* </div> */}
                {/* <div className='grid grid-cols-2 lg:grid lg:grid-cols-2 xl:flex gap-3 h-48 items-center'> */}
                    <UserWithdrawCard/>
                    <UserInviteCard/>
                    <UserUploadInvoiceCard/>
                {/* </div> */}

            </div>

        </div>
  )
}
