import Card from "@components/common/card";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import WithdrawList from "@components/withdraw/withdraw-list";
import LinkButton from "@components/ui/link-button";
import ShopLayout from "@components/layouts/shop";
import { useRouter } from "next/router";
import { adminAndOwnerOnly } from "@utils/auth-utils";
import { useShopQuery } from "@data/shop/use-shop.query";
import { useWithdrawsQuery } from "@data/withdraw/use-withdraws.query";
import { useState } from "react";
import { SortOrder } from "@ts-types/generated";
import SortForm from "@components/common/sort-form";

export default function WithdrawsPage() {

  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("created_at");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  
  const {
    query: { shop },
  } = useRouter();

  const { data: shopData } = useShopQuery(shop as string);
  const shopId = shopData?.shop?.id!;

  const {
    data,
    isLoading: loading,
    error,
  } = useWithdrawsQuery(
    {
      shop_id: Number(shopId)!,
      limit: 10,
      page,
      orderBy,
      sortedBy,
    },
    {
      enabled: Boolean(shopId),
    }
  );

  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;


  function handlePagination(current: any) {
    setPage(current);
  }


  return (
    <>
      <Card className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h1 className="text-lg font-semibold text-heading">
            {t("common:sidebar-nav-item-withdraws")}
          </h1>
        </div>

        <div className="flex items-center w-full md:w-3/4 xl:w-2/4 ms-auto">
          <SortForm
            showLabel={false}
            className="w-full"
            onSortChange={({ value }: { value: SortOrder }) => {
              setColumn(value);
            }}
            onOrderChange={({ value }: { value: string }) => {
              setOrder(value);
            }}
            options={[
              { value: "amount", label: "Amount" },
              { value: "created_at", label: "Created At" },
              { value: "updated_at", label: "Updated At" },
            ]}
          />

          <LinkButton
            href={`/${shop}/withdraws/create`}
            className="h-12 ms-4 md:ms-6"
          >
            <span className="hidden md:block">
              + {t("form:button-label-add-withdraw")}
            </span>
            <span className="md:hidden">+ {t("form:button-label-add")}</span>
          </LinkButton>
        </div>
      </Card>

      <WithdrawList
        withdraws={data?.withdraws}
        onPagination={handlePagination}
      />
    </>
  );
}
WithdrawsPage.authenticate = {
  permissions: adminAndOwnerOnly,
};
WithdrawsPage.Layout = ShopLayout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["table", "common", "form"])),
  },
});
