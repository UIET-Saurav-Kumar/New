import { GetStaticPathsContext, GetStaticProps } from "next";
import ProductDetails from "@components/product/product-details";
import Layout from "@components/layout/layout";
import { fetchProducts } from "@data/product/use-products.query";
import { fetchProduct } from "@data/product/use-product.query";
import { Product } from "@ts-types/custom.types";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import RelatedProducts from "@components/product/product-details/related-products";
import { QueryClient } from "react-query";
import { fetchSettings } from "@data/settings/use-settings.query";
import { dehydrate } from "react-query/hydration";
import ProductQuestions from '@components/questions/product-questions';
import AverageRatings from '@components/reviews/average-ratings';
import ProductReviews from '@components/reviews/product-reviews';
import Seo from "@components/ui/seo";
import Head from 'next/head'
import GlobalSearchLayout from "@components/layout/global-search-layout";
import DefaultLayout from "@components/layout/default-layout";


const CartCounterButton = dynamic(
  () => import("@components/cart/cart-counter-button"),
  { ssr: false }
);

// This function gets called at build time
export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const products = await fetchProducts({
    queryKey: ["products", { limit: 100 }],
  });
  const paths = products?.data?.flatMap((product: Product) =>
    locales?.map((locale) => ({ params: { slug: product.slug }, locale }))
  );
  return {
    paths,
    fallback: "blocking",
  };
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug as string;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("settings", fetchSettings);
  try {
    const product = await fetchProduct(slug);
    return {
      props: {
        product,
       // ...(await serverSideTranslations(locale!, ["common"])),
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

 





export default function ProductSinglePage({ product }: any) {

  // // console.log('product rating',product)
  // console.log('product ',product);

  return (

    <>
    <Head>
      <title>{(product?.name?product?.name:'')+' at lowest price'}</title>
      <meta name="description" content={(product?.name?product?.name:'')+' at lowest price only on BuyLowcal.com'} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(
      {
        "@context": "http://schema.org",
        "@type": "Product",
        "name": product?.name,
        "image": product?.image?.thumbnail,
        "description": product?.description,
        "sku": `${product?.sku}`,
        // "mpn": "ABC123",
        "brand": {
          "@type": "Thing",
          "name": product?.shop?.name,
        },
        "review": {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5",
            "worstRating": "1"
          },
          "author": {
            "@type": "Person",
            "name": "John Doe"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "reviewCount": "89"
        },
        "offers": {
          "@type": "Offer",
          "url": `{http://www.buylowcal.com/products/${product?.slug}}`,
          "priceCurrency": "INR",
          "price":  product?.sale_price,
          // "priceValidUntil": "2020-01-01",
          // "itemCondition": "http://schema.org/UsedCondition",
          // "availability": "http://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name":  product?.shop?.name
           }
         }
       }

    ) }}
  />
       

    </Head>
      <div className="bg-light min-h-screen">
        
        {/* <Seo productData={product} /> */}

        <ProductDetails product={product} />
 
          {/* <div className="lg:w-80 lg:h-80">    */}
          {/* <AverageRatings
                title={product?.name}
                ratingCount={product?.rating_count}
                totalReviews={product?.total_reviews}
                ratings={product?.ratings}
              /> */}
              {/* </div> */}

        {/* <ProductReviews
            productId={product?.id}
            productType={product?.type?.slug}
          />
          <ProductQuestions
            productId={product?.id}
            shopId={product?.shop?.id}
            productType={product?.type?.slug}
          /> */}

         {product?.related_products?.length > 1 && (
          
          <div className="p-5 lg:p-14 xl:p-16">
            <RelatedProducts
              products={product?.related_products}
              currentProductId={product?.id}
              gridClassName="lg:grid-cols-4 2xl:grid-cols-5 !gap-3"
            />
          </div>
        )}
      </div>

      <CartCounterButton />
    </>
  );
}

ProductSinglePage.Layout = DefaultLayout;
