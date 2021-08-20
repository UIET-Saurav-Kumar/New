
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
import { formatAddress } from "@utils/format-address";
import { isEmpty } from "lodash";

import cn from "classnames";
import ShopCategoryCard from "@components/category/shop-category-card";
import Navbar from "@components/layout/navbar/navbar";



const CartCounterButton = dynamic(
  () => import("@components/cart/cart-counter-button"),
  { ssr: false }
);

const ShopPage = ({ data,  cardClassName }: any) => {
  
  const { t } = useTranslation("common") ;
  const { width } = useWindowSize() ;

  return (
    <>
    <Navbar />

    <div className="bg-gray-100 flex flex-col md:flex-row md:justify-between  
                      md:items-start md:p-8" >

              <div className=' sticky flex flex-col  space-y-0 mb-0 h-3/5 '>

                    <div className=' sticky p-3 flex w-full flex-col overflow-hidden '>

                      <div className="relative space-x-2 rounded w-full lg:hidden overflow-hidden  ">

                          {/* <Image
                            alt={t("heading")}
                            src={data?.cover_image?.original! ?? "/product-placeholder.svg"}
                            height={400}
                            width={1200}
                            // layout="fill"
                            objectFit="fill"
                          /> */}

                          <img alt={t("heading")} 
                               className='object-contain h-400 w-full'
                              src={data?.cover_image?.original! ?? "/product-placeholder.svg"}
                           />

                       </div>
                         
                        {/* form */}
                        <form className='flex flex-1' noValidate>

                            <div className="mt-0 w-full flex-col flex space-y-6">

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
                        {/* form end */}

                    </div>

                <div className='sticky '> 
                    <ShopCategoryCard data={data} className="" />
                </div> 
                
              </div>

        {/* <ShopProfileCard data={data} className="sticky ml-10 top-24 lg:top-28" />   */}
      
      
      <div className="flex flex-col w-full p-4 md:p-0 md:ps-8">

        <div className="relative space-x-2 rounded w-full  overflow-hidden hidden lg:flex">

          <ShopProfileCard data={data} className="sticky top-24 lg:top-28" />  
          
            <Image
              alt={t("heading")}
              src={data?.cover_image?.original! ?? "/product-placeholder.svg"}
              height={100}
              width={1200}
              // layout="fill"
              // objectFit="contain"
            />
             
        </div>
        
        {/* shop details */}
        <div className=' hidden lg:inline-flex  bg-white justify-between xl:space-x-8 px-2 xl:px-16 border  : ;
                         text-10px lg:text-sm pt-4 '>

                    <div className=' flex flex-col '>

                        <span className="text-sm text-heading font-semibold mb-2">
                              Description
                        </span>

                        { data?.description && (
                          
                                <p className="text-sm font-md text-gray-600 w-24 lg:w-32 lg+:32 xl:w-60 xl+:64 mb-2  leading-relaxed">
                                  {data?.description}
                                </p>
                        )}

                    </div>  

               {/* <div className="p-4 flex justify-evenly  space-x-5"> */}

                 
                  <div className="mb-7 last:mb-0 flex flex-col">

                      <span className="text-sm text-heading font-semibold mb-2">
                        {t("text-address")}
                      </span>

                      <span className="text-sm text-gray-600 w-28 xl:w-44">
                 
                          {!isEmpty(formatAddress(data?.address))
                        ? formatAddress(data?.address)
                        : t("common:text-no-address")}

                      </span>

                  </div>

                  <div className="mb-7 last:mb-0 flex flex-col">

                      <span className="text-sm text-heading font-semibold mb-2">
                        {t("text-phone")}
                      </span>

                      <span className="text-sm text-body">
                        {data?.settings?.contact
                          ? data?.settings?.contact
                          : t("text-no-contact")}
                      </span>

                      <div className='flex 2xl:hidden '> 
                          <a
                              href={data?.settings?.website}
                              target="_blank"
                              className="text-md text-accent border bg-gray-100 rounded-md px-2 p-2 mt-4 
                              font-bold hover:text-accent-hover focus:outline-none focus:text-accent-hover"
                            >
                              {t("text-visit-site")}
                            </a>
                      </div>

                  </div>

                  {data?.settings?.website && (

                    <div className="flex items-center flex-col">

                        {/* <span className="text-sm text-heading font-semibold mb-2">
                          {t("text-website")}
                        </span> */}

                        <div className = " " >

                          {/* <div className="text-sm border w-36 border-red-800  ">
                            {data?.settings?.website}
                          </div> */}

                          <div className=' '> 

                              <a
                                href={data?.settings?.website}
                                target="_blank"
                                className=" hidden 2xl:block text-md text-accent border bg-gray-100 rounded-md px-2 p-2  font-bold hover:text-accent-hover focus:outline-none focus:text-accent-hover"
                              >
                                {t("text-visit-site")}
                              </a>

                          </div>

                        </div>
                    </div>
                  )}
             
        </div>
        {/* shop details end */}
     
              

       { data && <ShopProductFeed shopId={data.id} /> } 

      </div>

      {width > 1023 && <CartCounterButton />}

    </div>
    </>
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

// ShopPage.Layout = Layout;
export default ShopPage;
