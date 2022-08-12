import { Table } from "@components/ui/table";
import usePrice from "@utils/use-price";
import { siteSettings } from "@settings/site.settings";
import { useTranslation } from "next-i18next";
import { useIsRTL } from "@utils/locals";
import { useOrderQuery } from "@data/order/use-order.query";
import { useRouter } from "next/router";
import { getReview } from '@utils/get-review';
import { useModalAction } from '@components/ui/modal/modal.context';


export const OrderItems = ({ products,orderId,orderStatus }: { products: any }) => {
  const { t } = useTranslation("common");
  const { alignLeft, alignRight } = useIsRTL();
  // const { items, isEmpty } = useCart();
  const { query } = useRouter();
  const { openModal } = useModalAction();


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


  console.log('orderStatus',orderStatus);


  // var converter = require('number-to-words');

  function calculateTax(tax:any,price:any){
    tax=tax?tax:0;
    price=price?price:0;
    
    var value=(parseFloat(tax)*parseFloat(price))/100;
    const {price:total}=usePrice({
      amount: value,
    })
    return total;
  }

  const orderTableColumns = [

    {
      title: <span className="ps-20">{t("Items")}</span>,
      dataIndex: "",
      key: "items",
      width: 250,
      align: alignLeft,
      ellipsis: true,
      render: (_: any, record: any) => {

        const { price } = usePrice({
          amount: +record.pivot?.unit_price,
        });
        
        let name = record.name;

        if (record.pivot?.variation_option_id) {
          const variationTitle = record.variation_options?.find(
            (vo: any) => vo.id === record.pivot.variation_option_id
          )["title"];
          name = `${name} - ${variationTitle}`;
        }

        return (
          <>
          <div className="flex items-center">

            <div className="w-16 h-16 flex flex-shrink-0 rounded overflow-hidden">
              <img
                src={
                  record.image?.thumbnail ??
                  siteSettings.product.placeholderImage
                }
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col ms-4 overflow-hidden">
              <div className="flex mb-1">
                <span className="text-sm text-body truncate inline-block overflow-hidden">
                  {name} x&nbsp;
                </span>
                <span className="text-sm text-heading font-semibold truncate inline-block overflow-hidden">
                  {record.unit}
                </span>
              </div>
              <span className="text-sm text-accent font-semibold mb-1 truncate inline-block overflow-hidden">
                {price} , {record.tax?JSON.parse(record.tax).rate+"% tax":""}
              </span>
            </div>

          </div>
        </>
        );
      },
    },


    {
      title: t("text-quantity"),
      dataIndex: "pivot",
      key: "pivot",
      align: "center",
      width: 100,
      render: (pivot: any) => {
        return <p className="text-body">{pivot.order_quantity}</p>;
      },
    },
  
    
    // {
    //   title: t("Shipping Charge"),
    //   dataIndex: "pivot",
    //   key: "pivot",
    //   align: "center",
    //   width: 100,
    //   render: () => {
    //     return <p className="text-body">{shipping_charge}</p>;
    //   },
    // },


    {
      title: t("Tax"),
      dataIndex: "",
      key: "items",
      align: "center",
      width: 100,
      render: (_: any, record: any) => {
        return <p className="text-body">{record.tax?calculateTax(JSON.parse(record.tax).rate,record.pivot.subtotal):""}</p>;
      },
    },

    {
      title: t("Discount"),
      dataIndex: "pivot",
      key: "pivot",
      align: "center",
      width: 100,
      render: () => {
        return <p className="text-body">{discount}</p>;
      },
    },

    {
      title: (data?.order?.children?.length) > 1 ? t("Sub Total") : t("Total") ,
      dataIndex: "pivot",
      key: "price",
      align: alignRight,
      width: 100,
      render: (pivot: any) => {
        const { price } = usePrice({
          amount: +pivot.subtotal,
        });
        return <p className=''>{price}</p>;
      },
    },

    orderStatus === 11 ? { 
      title: '',
      dataIndex: '',
      align: alignRight,
      width: 140,
      render: function RenderReview(_: any, record: any) {
        
        function openReviewModal() {
          openModal('REVIEW_RATING', {
            product_id: record?.id,
            shop_id: record?.shop_id,
            order_id: orderId,
            name: record?.name,
            image: record?.image,
            my_review: getReview(record),
            ...(record?.pivot?.variation_option_id && {
              variation_option_id: record?.pivot?.variation_option_id,
            }),
          });
        }

        return (

          
          <button
            onClick={openReviewModal}
            className="cursor-pointer text-sm font-semibold text-body transition-colors hover:text-accent"
          >
            {getReview(record)
              ? t('Update Review')
              : t('text-write-review')}
          </button>
        );
      },
    } : {},

  ];

  return (

    <div className='border'>
        <Table
          //@ts-ignore
          columns={orderTableColumns}
          data={products}
          rowKey={(record: any) =>
            record.pivot?.variation_option_id
              ? record.pivot.variation_option_id
              : record.created_at
          }
          className="orderDetailsTable w-full"
          scroll={{ x: 350, y: 500 }}
        />
              <p className=" p-2   flex  w-full text-body-dark items-center ">
                <div className='flex ml-4 w-full '><strong className="w-5/12 sm:w-4/12 tracking-widest text-lg font-extrabold">
                  {t("Shipping Charges")}
                </strong>
                :<span className=" items-center justify-end  mr-4 flex w-7/12 sm:w-8/12 ps-4 font-bold text-lg ">{shipping_charge}</span></div>
              </p> 
             {data?.order?.children?.length > 1 ?  <p className=" p-2   flex  w-full text-body-dark items-center ">
                <div className='flex ml-4 w-full '><strong className="w-5/12 sm:w-4/12 tracking-widest text-lg font-extrabold">
                  {t(" Total-amount")}
                </strong>
                :<span className=" items-center justify-end  mr-4 flex w-7/12 sm:w-8/12 ps-4 font-bold text-lg ">{total}</span></div>
              </p> : null }

              {/* <div className='w-full flex border-t items-center h-20'>
                <h1 className='font-semibold w-1/3 h-full text-center items-center justify-center flex border border-r text-lg'>Amount in Words</h1>
                <p></p>
              </div>   */}

    </div>
    
  );
};
