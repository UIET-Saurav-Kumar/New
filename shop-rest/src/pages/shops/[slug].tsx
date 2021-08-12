
import Image from "next/image";
import ShopProductFeed from "@components/product/feed-shop";
import { fetchShop } from "@data/shop/use-shop.query";
import { useTranslation } from "next-i18next";
import { useWindowSize } from "@utils/use-window-size";
import ShopProfileCard from "@components/profile/profile-card";
import dynamic from "next/dynamic";
import url from "@utils/api/server_url";
import { GetStaticPathsContext, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "@components/layout/layout";
import { QueryClient } from "react-query";
import { fetchProducts } from "@data/product/use-products.query";
import { fetchSettings } from "@data/settings/use-settings.query";
import { dehydrate } from "react-query/hydration";

import Input from "@components/ui/input";
import Button from "@components/ui/button";
import TextArea from "@components/ui/text-area";
import ReadMore from "@components/ui/truncate";

import cn from "classnames";
import ShopCategoryCard from "@components/category/shop-category-card";



const CartCounterButton = dynamic(
  () => import("@components/cart/cart-counter-button"),
  { ssr: false }
);

const ShopPage = ({ data,  cardClassName }: any) => {
  const { t } = useTranslation("common");
  const { width } = useWindowSize();

  return (

    <div className="bg-gray-100 flex flex-col md:flex-row md:justify-between  
                      md:items-start md:p-8" >


      <div className=' sticky flex space-y-0 mb-0 h-3/5 flex-col '>

      <div className=' sticky p-3 flex flex-col overflow-hidden '>
          <form className='' noValidate>
            <div className="mt-0  flex flex-col space-y-6">

              <Input
                label={t("Enter amount")}
                type='number'
                placeholder=' ₹'
                // {...register("name")}
                variant="outline"
                // error={t(errors.name?.message!)}
              />

              <TextArea
                label={t("Product description")}
                // {...register("description")}
                variant="outline"
                className="-my-2"
                rows={2}
                // error={t(errors.description?.message!)}
            />
            <Button >
              {t("Pay Now")}
            </Button>
              
            </div>
          
          </form>

        </div>

        
        <div className='sticky '> <ShopCategoryCard data={data} className="" /></div> 
        
     </div>

        <ShopProfileCard data={data} className="sticky ml-10 top-24 lg:top-28" />  
      
      
      <div className="flex flex-col w-full p-4 md:p-0 md:ps-8">

        <div className="relative flex-col rounded w-full h:1/2 overflow-hidden hidden md:flex">
         
          <Image
            alt={t("heading")}
            src={data?.cover_image?.original! ?? "/product-placeholder.svg"}
            height={500}
            width={1200}
            // layout="fill"
            // objectFit="contain"
          />
           {/* {data?.description && (
                <p className="text-sm w-96 mb-2 text-center leading-relaxed">
                  <ReadMore character={70}>{data?.description}</ReadMore>
                </p>
              )} */}
        </div>

        { data && <ShopProductFeed shopId={data.id} /> }

      </div>

      {width > 1023 && <CartCounterButton />}

    </div>
  );
};

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  
  const { data } = await fetch(
    `${url}/all-shop?is_active=1`
  ).then((res) => res.json());
  
  const paths = data?.flatMap((shop: any) =>
    locales?.map((locale) => ({ params: { slug: shop.slug }, locale }))
  );

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: "blocking" };
}
// This also gets called at build time
export const getStaticProps: GetStaticProps = async ({ params, locale }) => {

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("settings", fetchSettings);

  try {
    const shop = await fetchShop(params!.slug as string);
    await queryClient.prefetchInfiniteQuery(
      ["products", { shop_id: shop?.id }],
      fetchProducts
    );

    return {
      props: {
        data: shop,
        ...(await serverSideTranslations(locale!, ["common"])),
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
      revalidate: 120,
    };

  } catch (error) {
    return {
      notFound: false,
    };
  }
};

ShopPage.Layout = Layout;
export default ShopPage;
