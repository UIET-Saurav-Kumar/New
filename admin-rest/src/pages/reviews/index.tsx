import ReviewList from "@components/reviews/review-list";
import Card from "@components/common/card";
import Layout from "@components/layouts/admin";
import { useState } from "react";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { SortOrder } from "@ts-types/generated";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useReviewsQuery } from "@data/review/use-reviews.query";


export default function Reviews() {
  
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const [orderBy, setOrder] = useState("created_at");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  
  const {
    data,
    isLoading: loading,
    error,
  } = useReviewsQuery({
    limit: 15,
    page,
    orderBy,
    sortedBy,
  });


  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  function handlePagination(current: any) {
    setPage(current);
  }

  return (
    <>
      <Card className="flex flex-col mb-8">
        <div className="w-full flex flex-col md:flex-row items-center">
          <h1 className="text-xl font-semibold text-heading">
            {t("Reviews")}
          </h1>
        </div>
      </Card>
      <ReviewList
        reviews={data?.reviews}
        onPagination={handlePagination}
        onOrder={setOrder}
        onSort={setColumn}
      />
    </>
  );
}

Reviews.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common", "table"])),
  },
});
