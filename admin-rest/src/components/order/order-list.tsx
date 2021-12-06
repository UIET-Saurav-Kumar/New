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
} from "@ts-types/generated";
import InvoicePdf from "./invoice-pdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useIsRTL } from "@utils/locals";

type IProps = {
  orders: OrderPaginator | null | undefined;
  onPagination: (current: number) => void;
};

const OrderList = ({ orders, onPagination }: IProps) => {
  const { data, paginatorInfo } = orders! ?? {};
  const { t } = useTranslation();
  const rowExpandable = (record: any) => record.children?.length;
  const router = useRouter();
  const { alignLeft } = useIsRTL();

  const columns = [
    {
      title: t("table:Customer Name"),
      dataIndex: "customer",
      key: "customer",
      align: alignLeft,
      render: (customer: any) => (
        <div>{customer.name}</div>
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
        return <span className="whitespace-nowrap">{price}</span>;
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
            {dayjs(date).utc().fromNow()}
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
          {payment_gateway=="cod"?"Cash On Delivery":payment_gateway}
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
      title: t("table:table-item-actions"),
      dataIndex: "id",
      key: "actions",
      align: "center",
      width: 100,
      render: (id: string) => (
        <ActionButtons id={id} detailsUrl={`${router.asPath}/${id}`} />
      ),
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
