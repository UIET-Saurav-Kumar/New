import { useEffect, useState, Fragment } from "react";
import Layout from "@components/layout/layout";
import ProfileSidebar from "@components/profile/profile-sidebar";
import OrderCard from "@components/order/order-card";
import ErrorMessage from "@components/ui/error-message";
import OrderDetails from "@components/order/order-details";
import Collapse, { Panel } from "rc-collapse";
import "rc-collapse/assets/index.css";
import { GetServerSideProps } from "next";
import { parseContextCookie } from "@utils/parse-cookie";
import Spinner from "@components/ui/loaders/spinner/spinner";
import Scrollbar from "@components/ui/scrollbar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useOrdersQuery } from "@data/order/use-orders.query";
import Button from "@components/ui/button";
import NotFound from "@components/common/not-found";
import { PDFDownloadLink } from "@react-pdf/renderer";
import OrderDataPdf from "@components/order/orders-data-pdf";
import { Order, SettingsOptions, UserAddress } from "@ts-types/generated";
import { DownloadIcon } from "@heroicons/react/outline";


export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const cookies = parseContextCookie(context?.req?.headers?.cookie);
  if (!cookies?.auth_token) {
    return { redirect: { destination: "/", permanent: false } };
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
  };
};

export default function OrdersPage() {

  const { t } = useTranslation("common");
  const [order, setOrder] = useState<any>({});

  const[itemsSumTotal, setItemsSumTotal] = useState(0);
  const[uniqueItems, setUniqueItems] = useState([]);


  const {
    data,
    isFetching: loading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage: loadingMore,
  } = useOrdersQuery({});


  useEffect(() => {
    if (data?.pages?.[0].data.length) {
      setOrder(data.pages[0].data[0]);
    }
  }, [data?.pages?.length]);


  console.log('order',data);

  //return true if orders list contains product with id = 14110
   function containsProduct(orders: any[], productId: number) {
    return orders?.some((order: any) => {
      return order?.products.some((product: any) => {
        return product?.id === productId;
      });
    });
  }


  // get list of orders placed previous month 
  function getLastMonthOrders(orders: any[]) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const previousMonth = currentMonth - 1;
    const previousYear = currentYear;
    if (previousMonth < 0) {
      previousMonth = 11;
      previousYear = previousYear - 1;
    }
    return orders?.filter((order: any) => {
      const orderDate = new Date(order?.created_at);
      return orderDate.getMonth() === previousMonth && orderDate.getFullYear() === previousYear;
    }
    );
  }

  // now get previousmonthorders unique products and add the quantity and price of duplicate products
  function lastMonthItems(orders: any[]) {
    const previousMonthOrders = getLastMonthOrders(orders);
    const previousMonthOrdersUniqueProducts = previousMonthOrders?.reduce((acc: any, order: any) => {
      // items sum total
      const itemsSum = order?.products.reduce((acc: any, product: any) => {
        return acc + product?.quantity;
      }, 0);

      // setItemsSumTotal(itemsSum);

      order?.products?.forEach((product: any) => {
        if (!acc[product?.id]) {
          acc[product?.id] = {
            id: product?.id,
            name: product?.name,
            price: product?.price,
            quantity: 1,
          };
        } else {
          acc[product?.id].quantity += 1;
          acc[product?.id].price += product?.price;
        }
      }
      );
      return acc;
    }
    , {});
    // setUniqueItems(previousMonthOrdersUniqueProducts)
    return previousMonthOrdersUniqueProducts;
  }

  //last month items sum total

  console.log('lastMonthProducts',lastMonthItems(data?.pages?.[0].data));
  // console.log('month orders',  getLastMonthOrders(data?.pages?.[0].data));
  // get all the products with quantity  ordered in month

  console.log('ear phone',containsProduct(data?.pages?.[0].data, 14110 || 14358));
  
  if (error) return <ErrorMessage message={error.message} />;

  return (

    <div className="w-full bg-light">
      <div className="flex flex-col xl:flex-row items-start max-w-1920 w-full mx-auto py-10 px-5 xl:py-14 xl:px-8 2xl:px-14  min-h-screen">
        <ProfileSidebar className="flex-shrink-0 hidden xl:block xl:w-80 me-8" />
        {/* End of sidebar navigation */}

        <div className="w-full hidden overflow-hidden lg:flex">

        {/* <PDFDownloadLink
          className="inline-flex items-center justify-center flex-shrink-0 font-semibold leading-none rounded outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow focus:ring-1 focus:ring-accent-700 text-light border border-transparent px-5 py-0 h-12 ms-auto mb-5 bg-blue-500 hover:bg-blue-600"
          document = {
            <OrderDataPdf
              order={order}
              // itemsSumTotal={itemsSumTotal}
              // uniqueItems={uniqueItems}
            
              // subtotal={lastMonthItems(data?.pages?.[0].data)?.subtotal}
              // total={itemsSumTotal}
              // discount={order?.discount}
              // delivery_fee={order?.delivery_fee}
              // sales_tax={order?.sales_tax}
              // settings={siteSettings}
              order={order}
            />
          }
          fileName="invoice.pdf"
        >
          {({ loading }: any) =>
            loading ? (
              t("common:text-loading")
            ) : (
              <>
                <DownloadIcon className="h-4 w-4 me-3" />
                {t("Download Invoice")}
              </>
            )
          }
        </PDFDownloadLink> */}

          <div
            className="pe-5 lg:pe-8 w-full md:w-1/3"
            style={{ height: "calc(100vh - 60px)" }}
          >
            <div className="flex flex-col h-full pb-5 md:border md:border-border-200">
              <h3 className="text-xl font-semibold py-5 text-heading px-5">
                {t("profile-sidebar-orders")}
              </h3>
              <Scrollbar
                className="w-full"
                style={{ height: "calc(100% - 80px)" }}
              >
                {loading && !data?.pages?.length ? (
                  <p>
                    <Spinner showText={false} />
                  </p>
                ) : (
                  <div className="px-5">
                    {data?.pages?.map((page, idx) => (
                      <Fragment key={idx}>
                        {page?.data?.map((_order: any, index: number) => (
                          <OrderCard
                            key={index}
                            order={_order}
                            onClick={() => setOrder(_order)}
                            isActive={order?.id === _order?.id}
                          />
                        ))}
                      </Fragment>
                    ))}
                  </div>
                )}
                {!loading && !data?.pages?.[0]?.data?.length && (
                  <div className="w-full h-full flex items-center justify-center my-auto">
                    <h4 className="text-sm font-semibold text-body text-center">
                      {t("error-no-orders")}
                    </h4>
                  </div>
                )}
                {hasNextPage && (
                  <div className="flex justify-center mt-8 lg:mt-12">
                    <Button
                      loading={loadingMore}
                      onClick={() => fetchNextPage()}
                      className="text-sm md:text-base font-semibold h-11"
                    >
                      {t("text-load-more")}
                    </Button>
                  </div>
                )}
              </Scrollbar>
            </div>
          </div>
          {/* End of Order List */}
          {!!data?.pages?.[0]?.data?.length ? (
            <OrderDetails order={order} />
          ) : (
            <div className="max-w-lg mx-auto">
              <NotFound text="text-no-order-found" />
            </div>
          )}
        </div>

        {/* Order Card Mobile */}
        <div className="flex flex-col w-full lg:hidden">
          <div className="flex flex-col w-full h-full px-0 pb-5">
            <h3 className="text-xl font-semibold pb-5 text-heading">
              {t("profile-sidebar-orders")}
            </h3>
            <Collapse
              accordion={true}
              defaultActiveKey="active"
              expandIcon={() => null}
            >
              {loading && !data?.pages?.length ? (
                <p>
                  <Spinner showText={false} />
                </p>
              ) : (
                data?.pages?.map((page, idx) => (
                  <Fragment key={idx}>
                    {page?.data?.map((_order: any, index: number) => (
                      <Panel
                        header={
                          <OrderCard
                            key={`mobile_${index}`}
                            order={_order}
                            onClick={() => setOrder(_order)}
                            isActive={order?.id === _order?.id}
                          />
                        }
                        headerClass="accordion-title"
                        key={index}
                        className="mb-4"
                      >
                        <OrderDetails order={order} />
                      </Panel>
                    ))}
                  </Fragment>
                ))
              )}

              {!loading && !data?.pages?.[0]?.data?.length && (
                <div className="w-full h-full flex flex-col items-center justify-center py-10 my-auto">
                  <div className="w-5/6 h-full flex items-center justify-center mb-7">
                    <img
                      src="/no-result.svg"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h4 className="text-sm font-semibold text-body text-center">
                    {t("error-no-orders")}
                  </h4>
                </div>
              )}
              {hasNextPage && (
                <div className="flex justify-center mt-8 lg:mt-12">
                  <Button
                    loading={loadingMore}
                    onClick={() => fetchNextPage()}
                    className="text-sm md:text-base font-semibold h-11"
                  >
                    {t("text-load-more")}
                  </Button>
                </div>
              )}
            </Collapse>
          </div>
        </div>
      </div>
    </div>
  );
}

OrdersPage.Layout = Layout;
