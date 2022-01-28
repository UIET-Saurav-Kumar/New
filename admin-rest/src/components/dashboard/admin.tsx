import { CartIconBig } from "@components/icons/cart-icon-bag";
import { CoinIcon } from "@components/icons/coin-icon";
import ColumnChart from "@components/widgets/column-chart";
import StickerCard from "@components/widgets/sticker-card";
import ErrorMessage from "@components/ui/error-message";
import usePrice from "@utils/use-price";
import Loader from "@components/ui/loader/loader";
import RecentOrders from "@components/order/recent-orders";
import PopularProductList from "@components/product/popular-product-list";
import { useOrdersQuery } from "@data/order/use-orders.query";
import { usePopularProductsQuery } from "@data/analytics/use-popular-products.query";
import { useAnalyticsQuery } from "@data/analytics/use-analytics.query";
import { useTranslation } from "next-i18next";
import { useWithdrawsQuery } from "@data/withdraw/use-withdraws.query";
import WithdrawTable from "@components/withdraw/withdraw-table";
import { ShopIcon } from "@components/icons/sidebar";
import { DollarIcon } from "@components/icons/shops/dollar";
import { RupeeIcon } from "@components/icons/shops/rupee-icon";
import WithdrawsPage from "src/pages/invoices-reward-data";
import { useUsersQuery } from "@data/user/use-users.query";


export default function Dashboard() {

  const { t } = useTranslation();

  const { data, isLoading: loading } = useAnalyticsQuery();

  // const { price: total_revenue } = usePrice(
  //   data && {
  //     amount: data?.totalRevenue!,
  //   }
  // );

  const { price: todays_revenue } = usePrice(
    data && {
      amount: data?.todaysRevenue!,
    }
  );

  const {
    data: usersData,
    isLoading: userLoading,
    error: userError,
  } = useUsersQuery({
    limit: 20,
    page : 1,
    
    
  });

  // console.log('users', usersData?.users?.data.map( user => user.filter(user.role === 'customer')           ));

  const {
    data: orderData,
    isLoading: orderLoading,
    error: orderError,
  } = useOrdersQuery({
    limit: 10,
    page: 1,
  });

  // console.log(usersData.data.map( (user:any) => user.data.map( (usr:any) => usr.filter( usr => usr.role === 'customer'))));

  // console.log(usersData?.users?.data?.map(( user:any ) => user.map( (usr) => usr.map(usr.role))) );

  console.log('order query  data', data)

  const {
    data: popularProductData,
    isLoading: popularProductLoading,
    error: popularProductError,
  } = usePopularProductsQuery({ limit: 10 });

  const { data: withdrawsData, isLoading: withdrawLoading } = useWithdrawsQuery(
    { limit: 10 }
  );

  if (loading || orderLoading || popularProductLoading || withdrawLoading) {
    return <Loader text={t("common:text-loading")} />;
  }

  if (orderError || popularProductError) {
    return (
      <ErrorMessage
        message={orderError?.message || popularProductError?.message}
      />
    );
  }

  let salesByYear: number[] = Array.from({ length: 12 }, (_) => 0);
  if (!!data?.totalYearSaleByMonth?.length) {
    salesByYear = data.totalYearSaleByMonth.map((item: any) =>
      item.total.toFixed(2)
    );
  }


  console.log('dashboard',data)
  return (
    <>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 mb-6">
        <div className="w-full ">
          <StickerCard
            titleTransKey="sticker-card-title-rev"
            // sticker-card-subtitle-rev
            subtitleTransKey=""
            icon={<img src='/rupee.png' className='h-10 w-10'/>}
            iconBgStyle={{ backgroundColor: "#A7F3D0" }}
            
            price={new Intl.NumberFormat('en-IN', { style: "currency", currency: "INR" }).format(data?.totalRevenue / 2)}
          />
        </div>
        <div className="w-full ">
          <StickerCard
            titleTransKey="sticker-card-title-today-rev"
            icon={<img src='/rupee.png' className='h-10 w-10'/>}
            price={new Intl.NumberFormat('en-IN', { style: "currency", currency: "INR" }).format(data?.todaysRevenue / 2)}
          />
        </div>
        <div className="w-full ">
          <StickerCard
            titleTransKey="sticker-card-title-total-shops"
            icon={<ShopIcon className="w-6" color="#1D4ED8" />}
            iconBgStyle={{ backgroundColor: "#93C5FD" }}
            price={data?.totalShops}
          />
        </div>
        <div className="w-full ">
          <StickerCard
            titleTransKey="sticker-card-title-order"
            // sticker-card-subtitle-order
            subtitleTransKey=""
            icon={<CartIconBig />}
            price={data?.totalOrders   }
          />
        </div>
        <div className="w-full ">
          <StickerCard
            titleTransKey="Today's Orders"
            // sticker-card-subtitle-order
            subtitleTransKey=""
            icon={<CartIconBig />}
            price={data?.todaysOrders   }
          />
        </div>
        <div className="w-full ">
          <StickerCard
            titleTransKey="Total Orders (in last 30 days)"
            // sticker-card-subtitle-order
            subtitleTransKey=""
            icon={<CartIconBig />}
            price={data?.totalOrdersInLast30Days  }
          />
        </div>
        <div className="w-full ">
          <StickerCard
            titleTransKey="Total customers"
            icon={<img src='/team.png' className='h-10 w-10' />}
            price={data?.totalCustomers - data?.totalShops}
          />
        </div>
        <div className="w-full">
          <StickerCard
            titleTransKey="New Customers  (in last 30 days)"
            icon={<img src='/team.png' className='h-10 w-10' />}
            iconBgStyle={{ backgroundColor: "#93C5FD" }}
            price={data?.newCustomers}
          />
        </div>
        <div className="w-full">
          <StickerCard
            titleTransKey="Invoice Approved Amount"
            icon={<img src='/team.png' className='h-10 w-10' />}
            iconBgStyle={{ backgroundColor: "rgb(240, 161, 54)" }}
            price={"₹"+Math.round(data?.bill_transfered_amount)}
          />
        </div>
        
      </div>

      {/* <div className="w-full flex flex-wrap mb-6">
        <ColumnChart
          widgetTitle="Sale History"
          colors={["#03D3B5"]}
          series={salesByYear}
          categories={[
            t("common:january"),
            t("common:february"),
            t("common:march"),
            t("common:april"),
            t("common:may"),
            t("common:june"),
            t("common:july"),
            t("common:august"),
            t("common:september"),
            t("common:october"),
            t("common:november"),
            t("common:december"),
          ]}
        />
      </div> */}

      <div className="w-full flex flex-wrap mb-6">

        <div className="w-full  sm:px-3 sm:pl-0 mb-6 xl:mb-0">
            <RecentOrders
              orders={orderData?.orders?.data}
              title={t("table:recent-order-table-title")}
            />
        </div>

        <div className="w-full  sm:px-3 sm:pl-0 mb-6 xl:mb-0">
          <WithdrawsPage/>
        </div>

        <div className="w-full mt-4 sm:px-3 sm:pr-0 mb-6 xl:mb-0">
          <WithdrawTable
            //@ts-ignore
            withdraws={withdrawsData?.withdraws}
            title={t("table:withdraw-table-title")}
          />
        </div>

     

      <div className="w-full sm:pe-0 mb-6 xl:mb-0">
        <PopularProductList
          products={popularProductData}
          title={t("table:popular-products-table-title")}
        />
      </div>
      </div>
    </>
  );
}
