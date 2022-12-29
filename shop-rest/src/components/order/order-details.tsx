import NotFound from "@components/common/not-found";
import usePrice from "@utils/use-price";
import { siteSettings } from "@settings/site.settings";
import { formatAddress } from "@utils/format-address";
import OrderStatus from "./order-status";
import { useTranslation } from "next-i18next";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import { Eye } from "@components/icons/eye-icon";
import { OrderItems } from "./order-items-table";
import isEmpty from "lodash/isEmpty";
import { DownloadIcon } from "@heroicons/react/outline";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePdf from "./invoice-pdf";

interface Props {
  order: any;
}

const OrderDetails = ({ order }: Props) => {
  const { t } = useTranslation("common");
  const {
    id,
    products,
    status,
    shipping_address,
    billing_address,
    tracking_number,
  } = order ?? {};

  const { price: amount } = usePrice({
    amount: order?.amount,
  });
  const { price: discount } = usePrice({
    amount: order?.discount,
  });
  const { price: total } = usePrice({
    amount: order?.total,
  });
  const { price: delivery_fee } = usePrice({
    amount: order?.delivery_fee,
  });
  const { price: sales_tax } = usePrice({
    amount: order?.sales_tax,
  });

  console.log('order details', order )




  // console.log('single order',order)

  return (
    <div className="flex flex-col w-full lg:w-2/3 border border-border-200">
      
      {!isEmpty(order) ? (
        <>
          <div className="flex flex-col md:flex-row items-center md:justify-between p-5 border-b border-border-200">
            <h2 className="flex font-semibold text-sm md:text-xl text-heading mb-2">
              {t("Order details-details")} <span className="px-2">-</span>{" "}
              {tracking_number}
            </h2>

            <Link
              href={`${ROUTES.ORDERS}/${tracking_number}`}
              className="font-semibold text-sm text-accent flex items-center transition duration-200 no-underline hover:text-accent-hover focus:text-accent-hover"
            >
              <Eye width={20} className="me-2" />
              {t("Sub Orders")}
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row border-b border-border-200">
            <div className="w-full md:w-3/5 flex flex-col px-5 py-4 border-b sm:border-b-0 sm:border-r border-border-200">
              <div className="mb-4">
                <span className="text-sm text-heading font-bold mb-2 block">
                  {t("Shipping Address")}
                </span>

                <span className="text-sm text-body">
                  {formatAddress(billing_address)}
                </span>
              </div>
              
              <div className="mb-4">
                <span className="text-sm text-heading font-bold mb-2 block">
                  {t("Billing Address")}
                </span>

                <span className="text-sm text-body">
                  {formatAddress(billing_address)}
                </span>
              </div>

              <div className="mb-4">
                <span className="text-sm text-heading font-bold mb-2 block">
                  {t("Payment type")}
                </span>

                <span className="text-sm text-body">
                  {order?.payment_gateway=="cod"?"Cash On Delivery":order?.payment_gateway}
                </span>
              </div>
            </div>

            <div className="w-full md:w-2/5 flex flex-col px-5 py-4">
              <div className="flex justify-between mb-3">
                <span className="text-sm text-body">{t("Sub Total")}</span>
                <span className="text-sm text-heading">{amount}</span>
              </div>

              <div className="flex justify-between mb-3">
                <span className="text-sm text-body">{t("Discount")}</span>
                <span className="text-sm text-heading">{discount}</span>
              </div>

              <div className="flex justify-between mb-3">
                <span className="text-sm text-body">
                  {t("Delivery Fee")}
                </span>
                <span className="text-sm text-heading">{delivery_fee}</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-sm text-body">{t("Tax")}</span>
                <span className="text-sm text-heading">{sales_tax}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm font-bold text-heading">
                  {t(" Total")}
                </span>
                <span className="text-sm font-bold text-heading">{total}</span>
              </div>
            </div>
          </div>

          {/* Order Table */}
          <div>
            <div className="w-full flex justify-center items-center px-6">
              <OrderStatus status={status?.serial} />
            </div>
            <OrderItems orderStatus={status?.serial}  products={products} orderId={id} />
            <div className="flex items-center mx-auto mt-4 ">
        <PDFDownloadLink
          className="inline-flex items-center justify-center flex-shrink-0 font-semibold leading-none rounded outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow focus:ring-1 focus:ring-accent-700 text-light border border-transparent px-5 py-0 h-12 ms-auto mb-5 bg-blue-500 hover:bg-blue-600"
          document={
            <InvoicePdf
              subtotal={order?.amount}
              total={order?.total}
              discount={order?.discount}
              delivery_fee={order?.delivery_fee}
              sales_tax={order?.sales_tax}
              settings={siteSettings}
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
        </PDFDownloadLink>
      </div>
          </div>
        </>
      ) : (
        <div className="max-w-lg mx-auto">
          <NotFound text="text-no-order-found" />
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
