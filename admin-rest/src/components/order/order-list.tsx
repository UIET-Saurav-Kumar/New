
import Pagination from "@components/ui/pagination";
import dayjs from "dayjs";
import { Table } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import usePrice from "@utils/use-price";
import { formatAddress } from "@utils/format-address";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {
  Order,
  OrderPaginator,
  OrderStatus,
  UserAddress,
  Shop
} from "@ts-types/generated";
import InvoicePdf from "./invoice-pdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useIsRTL } from "@utils/locals";
import { Children } from "react";
import product from "@repositories/product";

type IProps = {
  orders: OrderPaginator | null | undefined;
  onPagination: (current: number) => void;
};

const OrderList = ({ orders, onPagination }: IProps) => {
  
  const { data, paginatorInfo } = orders! ?? {};
  const { t } = useTranslation();
  const rowExpandable = (record: any) => record?.children?.length > 1 ? record?.children?.length : '';
  const router = useRouter();
  const { alignLeft } = useIsRTL();
r
  var today = new Date();

  var month = today.getMonth() ;

  const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
  "July", "Aug", "Sep", "Oct", "Nov", "Dec"
];

  var currDate = today.getDate() + ' ' + monthNames[month]

  console.log('date',today.getDate() + ' ' + monthNames[month] );


  console.log('orders list', data);
 

  const columns = [

    // invoice pdf download button

    {
      title: t("Download Invoice"),
      dataIndex: "customer",
      key: "customer",
      align: alignLeft,
      render: (customer: any,order:any) => {

        return (

        <PDFDownloadLink
        
          document={<InvoicePdf  order={order} />}
          fileName={`${customer?.name}-invoice.pdf`}
          style={{
            textDecoration: "none",
            color: "blue",
            padding: "0.5rem",
          }}
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              <span className="">Loading....</span>
            ) : (
              <a className='hover:underline cursor-pointer' href={url} target='_blank'>{t("Invoice")}</a>
            )
          }

        </PDFDownloadLink>
        )

    }},

    {
      title: t("table:table-item-actions"),
      dataIndex: "id",
      key: "actions",
      align: "center",
      width: 100,
      render: (id: string) => (
        <ActionButtons id={id} detailsUrl={`${router.asPath}/${id}`} />
      ),
    },

        
    {
      title: t("table:Customer Name"),
      dataIndex: "customer",
      key: "customer",
      align: alignLeft,
      render: (customer: any) => (
        <div className="whitespace-nowrap font-semibold">{customer?.name}</div>
      ),
    },

    // {
    //   title: t('table: Items'),
    //   dataIndex: 'children',
    //   key: 'children',
    //   align: alignLeft,
    //   render: (children: any) => (
        
    //     <div className="whitespace-wrap w-48 font-semibold">{
    //       children?.map( (child:any) => child.products.map((item:any) => {
    //      var price = child.products.map((prod:any) => prod.sale_price)
    //       return <h1>◦{item.name  }</h1>
    //       }))
    //       }</div>
    //   ),
    // },

    {
      title: t('table: Shops'),
      dataIndex: 'children',
      key: 'children',
      align: alignLeft,
      render: (children: any) => {
        
        var shopName =  children?.map( (child:any) =>
        
         <h1>⊛ {child?.shop?.name}</h1>
        )
        console.log('children', children)
          return  <h1 className="whitespace-wrap w-48 font-light">
                      {shopName}
                  </h1>
      },
    },


    // {
    //   title: t("shop name"),
    //   dataIndex: "shop",
    //   key: "shop",
    //   align: "center",
    //   render: (shop: any) => {
       
    //     return <span>{shop?.name}</span>;
    //   },
    // },
    

    {
      title: t("table:Phone Number"),
      dataIndex: "customer",
      key: "customer",
      align: alignLeft,
      render: (order: any) => (
        <div>{order?.phone_number}</div>
      ),
    },


    {
      title: t("table:Email Id"),
      dataIndex: "customer",
      key: "customer",
      align: alignLeft,
      render: (order: any) => (
        <div className="whitespace-nowrap">{order?.email}</div>
      ),
    },



    // delivery time
    {
      title: t("table:Delivery/Appointment"),
      dataIndex: "delivery_time",
      key: "delivery_time",
      align: "center",
      render: (delivery_time: any) => {
       
        return <span>{ delivery_time.includes('Today') ? delivery_time.replace('Today', '') : delivery_time.includes('Tomorrow') ? delivery_time.replace('Tomorrow', '') : delivery_time } </span>
      },
    },

    //shop name

    {
      title: t("table:table-item-total"),
      dataIndex: "total",
      key: "total",
      align: "center",
      width: 120,
      render: (value: any) => {
        const { price } = usePrice({
          amount: value,
        });
        return <span className="whitespace-nowrap font-semibold">{price}</span>;
      },
    },

    {
      title: t("table:table-item-order-date"),
      dataIndex: "created_at",
      key: "created_at",
      align: "center",
      render: (date: string) => {
        dayjs.extend(relativeTime);
        dayjs.extend(utc);
        dayjs.extend(timezone);
        return (
          <span className="whitespace-nowrap">
            {date.split('T')[0].split("-").reverse().join("-")}
          </span>
        );
      },
    },

    {
      title: t("table:table-item-status"),
      dataIndex: "status",
      key: "status",
      align: alignLeft,
      render: (status: OrderStatus) => (
        <span
          className="whitespace-nowrap font-semibold"
          style={{ color: status?.color! }}
        >
          {status?.name}
        </span>
      ),
    },

    {
      title: t("Payment Gateway"),
      dataIndex: "payment_gateway",
      key: "payment_gateway",
      align: alignLeft,
      render: (payment_gateway:any) => (
        <span
          className="whitespace-nowrap font-semibold"
        >
          {payment_gateway=="cod"?"COD":payment_gateway}
        </span>
      ),
    },

    {
      title: t("table:table-item-shipping-address"),
      dataIndex: "billing_address",
      key: "billing_address",
      align: alignLeft,
      render: (billing_address: UserAddress) => (
        <div>{formatAddress(billing_address)}</div>
      ),
    },
    
    {
      title: t("table:table-item-tracking-number"),
      dataIndex: "tracking_number",
      key: "tracking_number",
      align: "center",
      width: 150,
    },

    {
      title: t("table:table-item-delivery-fee"),
      dataIndex: "delivery_fee",
      key: "delivery_fee",
      align: "center",
      render: (value: any) => {
        const delivery_fee = value ? value : 0;
        const { price } = usePrice({
          amount: delivery_fee,
        });
        return <span>{price}</span>;
      },
    },

  ];

  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={t("table:empty-table-data")}
          data={data}
          rowKey="id"
          scroll={{ x: 1000 }}
          expandable={{
            expandedRowRender: () => "",
            rowExpandable: rowExpandable,
          }}
        />
      </div>

      {!!paginatorInfo?.total && (
        <div className="flex justify-end items-center">
          <Pagination
            total={paginatorInfo?.total}
            current={paginatorInfo?.currentPage}
            pageSize={paginatorInfo?.perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  );
};

export default OrderList;
