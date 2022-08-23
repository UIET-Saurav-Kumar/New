import ShopCard from "@components/ui/shop-card";
import DefaultLayout from "@components/layout/default-layout";
import * as typeIcon from "@components/icons/type";
import { fetchShops, useShopsQuery } from "@data/shop/use-shops.query";
import cn from "classnames";
import url from "@utils/api/server_url";
import ShopPageLayout from "@components/layout/shop-layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Fragment, useEffect } from "react";
import { GetStaticPathsContext,GetStaticProps } from "next";
import { fetchSettings } from "@data/settings/use-settings.query";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useRouter } from "next/router";
import { getIcon } from "@utils/get-icon";
import { useTypesQuery } from "@data/type/use-types.query";
import { useLocation } from "@contexts/location/location.context";

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
    const res = await fetch(`${url}/fetch-home-categories`)
    const data =await res.json()
    // const paths=data.map((category:any)=>{
    //     return {params:{slug:category.id.split(" ").join("-")}}
    // })
    // // console.log(data);
    
    // then((res) => res.json());
    const paths = data?.flatMap((category: any) =>
      locales?.map((locale:any) => ({ params: { category: category.slug }, locale }))
    );
    
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: "blocking" };

  }
export const getStaticProps: GetStaticProps = async ({ params,locale }) => {

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery("settings", fetchSettings);
    await queryClient.prefetchInfiniteQuery(
      ["all-shop", { is_active: 1 ,category:params?.category,}],
      fetchShops
    );
    return {
      props: {
       // ...(await serverSideTranslations(locale!, ["common"])),
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
    };
  };
const ShopsPage = () => {
  
  
  const { t } = useTranslation("common");
  const router = useRouter();
  const { query } = useRouter();
  const items = useTypesQuery();
  const {category}=router.query
  const {getLocation} =useLocation()

  const { data } = useShopsQuery({
    limit: 10 as number,
    search:"",
    location : ((getLocation?.formattedAddress)?JSON.stringify(getLocation):null ) as any,
    category:category as string
  });



  const selectedMenu = items?.data?.types?.find((type: any) =>
    router.asPath.includes(type.slug)
  );

  useEffect(()=>{
    const { query } = router;
  }),

  function handleClick(path: string) {
    close();
    router.push(path);
  }
  
  return (
    <>
      <div className="flex items-center mx-auto w-full max-w-6xl space-x-6 h-20 md:h-24 px-5 overflow-x-auto">
        {items?.data?.types?.map(({ id, name, slug, icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => handleClick(`/${slug}`)}
            className={cn(
              "flex items-center flex-shrink-0 bg-gray-100 text-sm font-semibold px-6 h-12 rounded-3xl border border-gray-200 text-heading focus:outline-none",
              {
                "!border-gray-900": selectedMenu,
              }
            )}
          >
            {icon && (
              <span className="flex w-5 h-5 items-center justify-center">
                {getIcon({
                  iconList: typeIcon,
                  iconName: icon,
                  className: "max-h-full max-w-full",
                })}
              </span>
            )}
            <span className="ms-2">{name}</span>
          </button>
        ))}
      </div>
      <div className="bg-light min-h-screen ">
        <div className="w-full max-w-6xl mx-auto flex flex-col p-8">
          <div className="pt-12">
            <h3 className="text-2xl text-heading font-bold mb-8">
              {t("text-all-shops")}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data?.pages?.map((page, idx) => {
                return (
                  <Fragment key={idx}>
                    {page.data.map((shop) => (
                      <ShopCard shop={shop} key={shop.id} />
                    ))}
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
    
  );
};

ShopsPage.Layout = DefaultLayout;
// ShopsPage.Layout = ShopPageLayout;



export default ShopsPage;

// http://localhost:3003/en/category/Pharmacy?text={%22lat%22:28.6400579,%22lng%22:77.4228195,%22formattedAddress%22:%22Delhi%20-%20Meerut%20Expy,%20Bhim%20Nagar,%20Nai%20Basti%20Dundahera,%20Ghaziabad,%20Uttar%20Pradesh,%20India%22,%22city%22:%22Ghaziabad%22,%22state%22:%22UP%22,%22country%22:%22India%22}