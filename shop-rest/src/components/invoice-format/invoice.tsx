import React from 'react'
import { useOrderQuery } from "@data/order/use-order.query";
import { useRouter } from "next/router";
import { useTranslation } from 'react-i18next';
import dayjs from "dayjs";
import { useIsRTL } from "@utils/locals";
import Badge from "@components/ui/badge";
import { formatAddress } from "@utils/format-address";




export default function Invoice() {
    const { t } = useTranslation('common');
    const { alignLeft, alignRight } = useIsRTL();


    const { query } = useRouter();

    const { data, isLoading: loading } = useOrderQuery({
        tracking_number: query.tracking_number as string,
      });

      const orderTableColumns = [

        {
          title: t("text-tracking-number"),
          dataIndex: "tracking_number",
          key: "tracking_number",
          align: alignLeft,
        },
    
        {
          title: t("text-date"),
          dataIndex: "date",
          key: "date",
          align: alignLeft,
          render: (created_at: string) => dayjs(created_at).format("MMMM D, YYYY"),
        },
    
        {
          title: t("text-status"),
          dataIndex: "status",
          key: "status",
          align: "center",
          render: (status: any) => (
            <Badge text={status?.name} style={{ backgroundColor: status?.color }} />
          ),
        },
        
        {
          title: t("text-item"),
          dataIndex: "products",
          key: "products",
          align: "center",
          render: (products: any) => formatString(products?.length, t("text-item")),
        },
    
        {
          title: t("text-total-price"),
          dataIndex: "paid_total",
          key: "paid_total",
          align: alignRight,
          // width: 100,
          render: (paid_total: any) => {
            const { price } = usePrice(data && { amount: Number(paid_total) });
            return <p>{price}</p>;
          },
        },
    
        {
          title: "",
          dataIndex: "tracking_number",
          key: "tracking_number",
          align: alignRight,
          // width: 100,
          render: (tracking_number: string) => (
            <Link
              href={`${ROUTES.ORDERS}/${tracking_number}`}
              className="inline-flex items-center justify-center flex-shrink-0 font-semibold leading-none rounded outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow bg-gray-700 text-light border border-transparent hover:bg-gray-900 px-4 py-0 h-10 text-xs"
            >
              {t("text-view")}
            </Link>
          ),
        },
      ];

    
    return (
        
    <div className='flex flex-col p-0 lg:p-6 sm:p-8  max-w-screen-lg w-full mx-auto bg-light rounded space-y-8'>

      <div className='flex text-center font-md flex-col'>
          <h1 className='text-xs lg:text-lg'>Tax Invoice</h1>
      </div>

      <div className=' mt-0 lg:mt-4 flex items-center justify-between'>

        <h1 className='flex items-center font-extrabold text-sm lg:text-xl'>Buyl<span><img src='/transparent-logo.png' className='h-3 w-3 lg:mx-1 lg:h-5 lg:w-5 '/></span>wcal.com</h1>
        

      </div>

      <div className='flex  flex-col w-full space-y-6 p-4 rounded border bg-gray-50'>
                     

                     {/* 1st row */}
                    <div className='flex w-full  space-x-8 justify-between'>

                        <div className='flex w-1/2 space-y-2 flex-col'>
                            <h1 className='text-xs sm:text-sm lg:text-lg font-semibold'>Sold By:</h1>
                            <p className='text-xs sm:text-sm lg:text-md font-body'></p>
                            <p className='text-xs sm:text-sm font-body tracking-wide'> 
                               
                            </p>
                        </div>

                     
                        <div className='flex w-1/2 space-y-2 flex-col'>
                            <h1 className='text-xs sm:text-sm lg:text-lg font-semibold'>Shipping Address:</h1>
                            <p className='text-xs sm:text-sm lg:text-sm lg:text-md font-body'>{data?.order?.customer?.name!}</p>
                            
                            <p className='text-xs sm:text-sm font-body tracking-wide'> 
                            <span className="w-7/12 sm:w-8/12 ps-4 text-xs">
                            {formatAddress(data?.order?.billing_address!)}
                            </span>
                            </p>
                            <span className='flex items-center'>
                                <h1 className='text-xs sm:text-sm lg:text-lg font-semibold'>Pin Code:</h1>
                                </span>
                            <div className='flex items-center  w-full space-x-2'> 
                            <h1 className='text-xs sm:text-sm lg:text-lg  font-semibold'>Phone Number:</h1>
                            <p className='text-xs sm:text-sm lg:text-md font-body'>{data?.order?.customer_contact!}</p>
                        </div>
                        </div>

                       

                    </div>

                   

                     {/* 2nd row */}
                    <div className='flex w-full space-x-8 justify-between'>

                        <div className='flex w-1/2 space-y-2 flex-col'>
                              <span className='flex items-center'><h1 className='text-xs sm:text-sm lg:text-lg font-semibold'>PAN No:</h1><p className='font-body ml-2'></p></span>
                              <span className='flex items-center'><h1 className='text-xs sm:text-sm lg:text-lg font-semibold'>GST Registraition No:</h1><p className='font-body ml-2'></p></span>
                        </div>


                        <div className='flex w-1/2 space-y-2 flex-col'>
                              <span className='flex items-center'><h1 className='text-xs sm:text-sm lg:text-lg font-semibold'>Order No:</h1><p className='text-xs sm:text-sm lg:text-lg font-body ml-2'>{data?.order?.tracking_number}</p></span>
                              <span className='flex items-center'><h1 className='text-xs sm:text-sm lg:text-lg font-semibold'>Order Date:</h1><p className='text-xs sm:text-sm lg:text-lg font-body ml-2'>{dayjs(data?.order?.created_at).format("MMMM D, YYYY")}</p></span>
                        </div>

                    </div>

      </div>
      </div> 
            
    
    )
}
