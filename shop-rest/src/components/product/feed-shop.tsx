
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Button from "@components/ui/button";
import ErrorMessage from "@components/ui/error-message";
import renderProductCard from "@components/product/render-product-card";
import NotFound from "@components/common/not-found";
import { useTranslation } from "next-i18next";
import { useProductsQuery } from "@data/product/use-products.query";
import { Fragment ,useRef} from "react";
import useIntersectionObserver from "./useIntersectionObserver";
import { useRouter } from "next/router";

const ProductFeedLoader = dynamic(
  () => import("@components/ui/loaders/product-feed-loader")
);


const ShopProductFeed = ({ shopId }: { shopId: string }) => {
  const { t } = useTranslation("common");
  var cat = 'all';   
  const router = useRouter();
  if(router.query.category)
  {
    cat = router.query.category;
    console.log(router.query.category)
  }
  const {
    data,
    isFetching: loading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
  } = useProductsQuery(
    {
      shop_id: Number(shopId),
      category: cat
    },
    {
      enabled: Boolean(shopId),
    }
  );
  const loadMoreRef = useRef()

  useIntersectionObserver({
      target: loadMoreRef,
      onIntersect: fetchNextPage,
      enabled: hasNextPage,
  })

  if (isError && error) return <ErrorMessage message={error.message} />;

  function handleLoadMore() {
    
    fetchNextPage();
  }

  if (!loading && !data?.pages?.[0]?.data?.length) {
    return (
      <div className="bg-gray-100 pt-6 pb-8 px-4 lg:p-8">
        <NotFound text="text-not-found" className="w-7/12 mx-auto" />
      </div>
    );
  }
  return (
    <div className="bg-gray-100 pt-6 pb-8 lg:py-8">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-3">
        {loading && !data?.pages?.length ? (
          <ProductFeedLoader limit={1} />
        ) : (
          <>
            {data?.pages.map((products, _idx) => (
              <Fragment key={_idx}>
                {products?.data?.map((product) => (
                  <motion.div key={product.id}>
                    {renderProductCard(product)}
                  </motion.div>
                ))}
              </Fragment>
            ))}
          </>
        )}
      </div>
      {/* {hasNextPage && (
        <div className="flex justify-center mt-8 lg:mt-12">
          <Button
            loading={loadingMore}
            onClick={handleLoadMore}
            className="text-sm md:text-base font-semibold h-11"
          >
            {t("text-load-more")}
          </Button>
        </div>
      )} */}
      <div ref={loadMoreRef} className={`${!hasNextPage ? "hidden" : ""}`}>
              {
                (isFetchingNextPage)
                &&
                (
                  <>
                    <span>Loading </span>
                    <img src="/preloader/cir.gif" style={{width:"30px",height:"30px"}}/>
                  </>
                ) 
              }
      </div>
    </div>
  );
};

export default ShopProductFeed;
