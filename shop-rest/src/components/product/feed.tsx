
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Button from "@components/ui/button";
import ErrorMessage from "@components/ui/error-message";
import renderProductCard from "@components/product/render-product-card";
import ProductNotFound from "@components/common/product-not-found";
import { useProductsQuery } from "@data/product/use-products.query";
import { Fragment, useRef } from "react";
import { useTranslation } from "next-i18next";
import useIntersectionObserver from "./useIntersectionObserver";
import RelatedProducts from "./product-details/related-products";


const ProductFeedLoader = dynamic(
  () => import("@components/ui/loaders/product-feed-loader")
);

const Feed = ({ shopId }: { shopId: string }) => {

  const { t } = useTranslation("common");
  const { query } = useRouter();

  const loadMoreRef = useRef()


  const {
    isFetching: loading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
    data,
    error,
  } = useProductsQuery({
    shop_id: Number(shopId),
    // type: query.type as string,
    text: query?.text as string,
    category: query?.category as string,
  },
  {
    enabled: Boolean(shopId),

  });

   console.log('feed ',data)

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
      <div className="bg-gray-100 min-h-full pt-6 pb-8 px-4 lg:p-8">
        <ProductNotFound text="text-not-found" className="w-1/3 mx-auto" />
        {/* <img src='/not-found.png'
        className="object-contain mx-auto"/> */}
      </div>
    );
  }
  
  return (

    <div className="bg-gray-100 min-h-full pt-1 pb-8 px-1 lg:p-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-1">
        {loading && !data?.pages?.length ? (
          <ProductFeedLoader limit={3} />
        ) : (
          <>
            {data?.pages.map((products, _idx) => (
              <Fragment key={_idx}>
                {products.data.filter(product => product?.status === 'publish').map(product => (
                  <motion.div key={product.id}>
                    {renderProductCard(product)}
                  </motion.div>
                ))}
                
              </Fragment>
            ))}
          </>
        )}

        
      </div>

      {/* <RelatedProducts products={products}/> */}
      
          <div ref={loadMoreRef} className={`${!hasNextPage ? "hidden" : ""}`}>
                  {
                    (isFetchingNextPage)
                    &&
                    (
                      <>
                        {/* <span>Loading </span> */}
                        <img src="/preloader/cir.gif" 
                            className="w-full mt-10 mx-auto" 
                            style={{width:"30px",height:"30px"}}/>
                      </>
                    ) 
                  }
          </div>
    </div>
  );
};

export default Feed;
