
import Card from "@components/common/card";
import Layout from "@components/layouts/admin";
import Search from "@components/common/search";
import OrderList from "@components/order/order-list";
import { useState } from "react";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useOrdersQuery } from "@data/order/use-orders.query";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SortOrder } from "@ts-types/generated";
import SortForm from "@components/common/sort-form";
import Button from "@components/ui/button";
import { useModalAction } from "@components/ui/modal/modal.context";
import { MoreIcon } from "@components/icons/more-icon";


export default function Orders() {

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const [orderBy, setOrder] = useState("created_at");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const { openModal } = useModalAction();

  const {
    data,
    isLoading: loading,
    error,
  } = useOrdersQuery({
    limit: 15,
    page,
    text: searchTerm,
  });

  if (loading) return <Loader text={t("common:text-loading")} />;

  if (error) return <ErrorMessage message={error.message} />;

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
    setPage(1);
  }
  function handlePagination(current: any) {
    setPage(current);
  }

  function handleImportModal() {
    openModal("EXPORT_IMPORT_ORDERS");
  }
  

  return (
    <>
      <Card className="flex flex-col md:flex-row items-center justify-between mb-8">
       
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h1 className="text-lg font-semibold text-heading">
            {t("form:input-label-orders")}
          </h1>
        </div>

        <div className="w-full md:w-3/4 flex flex-col md:flex-row items-center ms-auto">
          <Search onSearch={handleSearch} />
          <Button
              onClick={handleImportModal}
              className="mt-5 w-full md:hidden"
            >
              {t("common:text-export-import")}
          </Button>
          <SortForm
            showLabel={false}
            className="w-full md:w-1/2 md:ms-5 mt-5 md:mt-0 flex-shrink-0"
            onSortChange={({ value }: { value: SortOrder }) => {
              setColumn(value);
            }}
            onOrderChange={({ value }: { value: string }) => {
              setOrder(value);
            }}
            options={[
              { value: "total", label: "Total" },
              { value: "created_at", label: "Created At" },
              { value: "updated_at", label: "Updated At" },
            ]}
          />
           <button
              onClick={handleImportModal}
              className="hidden md:flex w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 items-center justify-center flex-shrink-0 ms-5 transition duration-300"
            >
             <MoreIcon className="w-3.5 text-body" />
          </button>
        </div>
      </Card>

      <OrderList orders={data?.orders} onPagination={handlePagination} />
    </>
  );
}

Orders.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["table", "common", "form"])),
  },
});
