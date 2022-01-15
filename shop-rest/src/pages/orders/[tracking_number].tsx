import { useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import Link from "@components/ui/link";
import Layout from "@components/layout/layout";
import usePrice from "@utils/use-price";
import { formatAddress } from "@utils/format-address";
import { formatString } from "@utils/format-string";
import { parseContextCookie } from "@utils/parse-cookie";
import { useCheckout } from "@contexts/checkout.context";
import Spinner from "@components/ui/loaders/spinner/spinner";
import { useOrderQuery } from "@data/order/use-order.query";
import { ROUTES } from "@utils/routes";
import { useSearch } from "@contexts/search.context";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useCart } from "@contexts/quick-cart/cart.context";
import { useIsRTL } from "@utils/locals";
import Badge from "@components/ui/badge";
import { CheckMark } from "@components/icons/checkmark";
import { Table } from "@components/ui/table";
import { OrderItems } from "@components/order/order-items-table";
import Invoice from "@components/invoice-format/invoice";
import PrintPage from "@components/print-button/print-page";
import {Children, useRef} from 'react';
import {  PDFExport, savePDF} from '@progress/kendo-react-pdf'


export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const cookies = parseContextCookie(context?.req?.headers?.cookie);
  if (!cookies?.auth_token) {
    return { redirect: { destination: "/", permanent: false } };
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale!, ["common"])),
    },
  };
};

export default function OrderPage() {
  const pdfExportComponent = useRef(null);
  const contentArea = useRef(null);


  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  }


  const handleExportWithMethod = (event) =>{
    savePDF(contentArea.current, {paperSize:'A4'});
  }


  const { t } = useTranslation("common");
  const { query } = useRouter();
  const { resetCart } = useCart();
  const { clearCheckoutData } = useCheckout();
  const { updateSearchTerm } = useSearch();
  const { alignLeft, alignRight } = useIsRTL();

  useEffect(() => {
    resetCart();
    clearCheckoutData();
    updateSearchTerm("");
  }, []);

  

  const { data, isLoading: loading } = useOrderQuery({
    tracking_number: query.tracking_number as string,
  });

  const { price: total } = usePrice(data && { amount: data.order.paid_total });
  const { price: sub_total } = usePrice(data && { amount: data.order.amount });
  const { price: shipping_charge } = usePrice(
    data && { amount: data?.order?.delivery_fee ?? 0 }
  );

  const { price: tax } = usePrice(
    data && { amount: data?.order?.sales_tax ?? 0 }
  );

  const { price: discount } = usePrice(
    data && { amount: data?.order?.discount ?? 0 }
  );

  console.log('order/id',data?.order);
  console.log('children',data?.order.children)

  // console.log(data?.order)  

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
      title: t("Delivery Fee"),
      dataIndex: "delivery_fee",
      key: "delivery_fee",
      align: alignRight,
      // width: 100,
      render: (delivery_fee: any) => {
        const { price } = usePrice(data && { amount: Number(delivery_fee) });
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
          className="inline-flex items-center justify-center flex-shrink-0 font-semibold leading-none rounded outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow bg-gray-700 text-light border border-transparent hover:bg-gray-900 px-4 py-0 h-10 text-sm"
        >
          {t("Invoice")}
        </Link>
      ),
    },
  ];

  if (loading) {
    return <Spinner showText={false} />;
  }

  const getShop=()=>{
    if(data?.order?.products){
      if(data?.order?.products[0]){
        return data?.order?.products[0].shop;
      }
    }
  }

  

  return (
    
    <div className="p-4 sm:p-8">
      <div className="p-6 sm:p-8 lg:p-12 max-w-screen-lg w-full mx-auto 
                      bg-light rounded border shadow-sm">
      
      <div className=''>
     <PDFExport ref={pdfExportComponent}  paperSize='A4'>
    <div className="p-4 font-serif" ref={contentArea}>
     {data?.order?.children?.length ? ( 

        <div className='flex flex-col space-y-10'>

          <h2 className='font-semibold text-sm md:text-md lg:text-lg'> Order Summary </h2>

            <div className=''> 
              <h2 className="flex flex-col sm:flex-row items-center justify-between
                             text-base font-bold text-heading mb-9 sm:mb-12">

          <span className="mb-5 sm:mb-0 me-auto">
            <span className="me-4">{t("text-status")} :</span>
            <Badge
              text={data?.order?.status?.name!}
              className="font-normal text-sm whitespace-nowrap"
            />
          </span>

          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center text-accent text-base font-normal
                       underline hover:no-underline hover:text-accent-hover"
          >
            {t("text-back-to-home")}
          </Link>
          
               </h2> 
           </div> 
        </div>) : null }

        {(data?.order?.children?.length) > 1 ? (  

      <>

      <div className='flex flex-col shadow-md border-t border-gray-100 h-auto w-full p-2 lg:p-4 space-y-6'>

            <div className='flex justify-between lg:mx-10 '> 

                  <div className="grid grid-cols-1 sm:grid-cols-2 space-x-4 w-auto  lg:w-1/3">
                          <h3 className="mb-2 text-sm lg:text-lg text-heading  font-semibold">
                            {t("text-order-number")}:
                          </h3>
                          <p className="text-sm lg:text-lg text-body-dark">
                            {data?.order?.tracking_number}
                          </p>
                  </div>
                    
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex space-x-2  w-auto lg:w-1/3">
                          <h3 className="mb-2 text-sm lg:text-lg text-heading  font-semibold">
                            {t("text-date")}:
                          </h3>
                          <p className="text-sm lg:text-lg text-body-dark">
                            {dayjs(data?.order?.created_at).format("MMMM D, YYYY")}
                          </p>
                  </div>

            </div>

            <div className='flex justify-between lg:mx-10'>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex space-x-4 gap-0 w-full lg:w-1/3">
                  <h3 className="mb-2 text-sm lg:text-lg  text-heading font-semibold">
                    {t("text-total")}:
                  </h3>
                  <p className="text-sm lg:text-lg text-body-dark">{total}</p>
                </div>

                {/* payment method */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex space-x-4   w-full lg:w-1/3">
                  <h3 className="mb-2 text-sm lg:text-lg text-heading font-semibold">
                    {t("text-payment-method")}:
                  </h3>
                  <p className="text-sm lg:text-lg text-body-dark">
                    {data?.order?.payment_gateway?.toUpperCase() ?? "N/A"}
                  </p>
                </div>


            </div>

      </div>



       

        <div className="flex flex-col lg:flex-row mt-6 w-full">
         
          <div className="w-full  lg:ps-3">
            <h2 className="text-xl font-bold text-heading mb-6">
              {t("text-order-details")}
            </h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 w-full '>
              <p className="flex text-body-dark mt-5">
                <strong className="w-5/12 sm:w-4/12 text-sm  text-heading font-semibold">
                  {t("text-total-item")}
                </strong>
                :
                <span className="w-7/12 sm:w-8/12 ps-4 text-sm">
                  {formatString(data?.order?.products?.length, t("text-item"))}
                </span>
              </p>

              <p className="flex text-body-dark mt-5">
                <strong className="w-5/12 sm:w-4/12 text-sm  text-heading font-semibold">
                  {t("text-deliver-time")}
                </strong>
                :
                <span className="w-7/12 sm:w-8/12 ps-4 text-sm">
                  {data?.order?.delivery_time}
                </span>
              </p>
            or
              <p className="flex text-body-dark mt-5">
                <strong className="w-5/12 sm:w-4/12 text-sm  text-heading font-semibold">
                  {t("text-shipping-address")}
                </strong>
                :
                <span className="w-7/12 sm:w-8/12 ps-4 text-sm">
                {data?.order?.billing_address?.street_address + ', ' + data?.order?.billing_address?.city }


                </span>
              </p>
            </div>

            {
              data?.order?.products.map(product=>{

                return (
                  <div id='product'>
                    <hr className="mt-3 mb-3 text-gray-700"/>
                    <u><i>{product?.name}</i></u>
                    <div className='grid grid-cols-1 sm:grid-cols-2 w-full '>
                      <p className="flex text-body-dark mt-5">
                        <strong className="w-5/12 sm:w-4/12 text-sm  text-heading font-semibold">
                          Sold by
                        </strong>
                        :
                        <span className="w-7/12 sm:w-8/12 ps-4 text-sm">
                          {product?.shop?.name}
                        </span>
                      </p>

                      <p className="flex text-body-dark mt-5">
                        <strong className="w-5/12 sm:w-4/12 text-sm  text-heading font-semibold">
                          Seller Address
                        </strong>
                        :
                        <span className="w-7/12 sm:w-8/12 ps-4 text-sm">
                          {product?.shop?.address?formatAddress(product?.shop?.address):""}
                        </span>
                      </p>

                      <p className="flex text-body-dark mt-5">
                        <strong className="w-5/12 sm:w-4/12 text-sm  text-heading font-semibold">
                          GST Number
                        </strong>
                        :
                        <span className="w-7/12 sm:w-8/12 ps-4 text-sm">
                          {product?.shop?.gst_number}
                        </span>
                      </p>

                      <p className="flex text-body-dark mt-5">
                        <strong className="w-5/12 sm:w-4/12 text-sm  text-heading font-semibold">
                          FSSAI Number
                        </strong>
                        :
                        <span className="w-7/12 sm:w-8/12 ps-4 text-sm">
                          {product?.shop?.fssai_number}
                        </span>
                      </p>
                    </div>
                  </div>
                )
              })
            }
            
          </div> 

          {/* end of order details */}
        </div> </> ) : <Invoice/> }

        <div className="mt-12">
          <OrderItems products={data?.order?.products} />
        </div>
        </div>
      </PDFExport>
      <div className='w-full text-center'> 
          <button className='   text-blue-700 text-lg hover:underline mt-8 h-9  w-38' 
            onClick={handleExportWithComponent}>Download Invoice
            </button>
      </div>
      </div>

        {data?.order?.children?.length ? (
          <div>
            <h2 className="text-xl font-bold text-heading mt-12 mb-6">
              {t("text-sub-orders")}
            </h2>
            <div>
              {/* <div className="flex items-start border border-gray-700 rounded p-4 mb-12">
                <span className="w-4 h-4 px-2 rounded-sm bg-dark flex items-center justify-center me-3 mt-0.5">
                  <CheckMark className="w-2 h-2 text-light flex-shrink-0" />
                </span>
                <p className="text-heading text-sm">
                  <span className="font-bold">{t("text-note")}:</span>{" "}
                  {t("message-sub-order")}
                </p>
              </div> */}

              {Array.isArray(data?.order?.children) &&
                data?.order?.children.length && (
                  <div className="h-auto">
                    <Table
                      //@ts-ignore
                      columns={orderTableColumns}
                      emptyText={t("table:No Records Found")}
                      //@ts-ignore
                      data={data?.order?.children}
                      rowKey="id"
                      scroll={{ x: 800 }}
                    />
                  </div>
                )}
                
            </div>
          </div>
        ) : null}
      </div>
    </div>
    
      
  );
}


// import React, { useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';

// import { ComponentToPrint } from './ComponentToPrint';

//   const TestPrint = () => {
//   const componentRef = useRef();
//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//   });

//   return (
//     <div>
//       <ComponentToPrint ref={componentRef} />
//       <button onClick={handlePrint}>Print this out!</button>
//     </div>
//   );
// };



OrderPage.Layout = Layout;
