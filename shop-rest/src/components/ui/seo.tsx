import { useSettings } from "@contexts/settings.context";
import { DefaultSeo } from "next-seo";

const Seo = ({shopData, productData} :any) => {
  const settings = useSettings();

  

  //get page url
  const url = typeof window !== "undefined" ? window.location.href : "";
  // if url contains /shops/ return true
  const isShop = url.includes("/shops/");
  // if url contains /products/ return true
  const isProduct = url.includes("/products/");

  console.log('seo shop data',productData,shopData)
  console.log('seo shop data',shopData)
  return (

    
     isShop &&
     //shop seop
     <DefaultSeo
      //fix IOS input zoom issue
      additionalMetaTags={[
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1 maximum-scale=1",
        },
      ]}
      title={settings?.siteTitle + '' + shopData?.name ?? "Buylowcal"}
      titleTemplate={`%s | ${shopData?.slug ?? "E-Commerce"}`}
      description={shopData?.description}
      canonical={url}
      openGraph={{
        title: shopData?.name ,
        description:shopData?.description ,
        type: "website",
        locale: "en_US",
        site_name:settings?.siteTitle + '' + shopData?.name ,
        images: [
          {
            url: settings?.seo?.ogImage?.original,
            width: 800,
            height: 600,
            alt: settings?.seo?.ogTitle,
          },
        ],
      }}
      twitter={{
        handle: settings?.seo?.twitterHandle,
        site: settings?.siteTitle,
        cardType: settings?.seo?.twitterCardType,
      }}
    /> || isProduct &&


    // products seo
    <DefaultSeo
      //fix IOS input zoom issue
      additionalMetaTags={[
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1 maximum-scale=1",
        },
      ]}
      title={settings?.siteTitle + '|' + productData?.name ?? "Buylowcal"}
      titleTemplate={`%s | ${productData?.slug ?? "E-Commerce"}`}
      description={productData?.description }
      canonical={url}
      openGraph={{
        title:  productData?.name,
        description: productData?.description ,
        type: "website",
        locale: "en_US",
        site_name: settings?.siteTitle + '|' + productData?.name ,
        images: [
          {
            url: settings?.seo?.ogImage?.original,
            width: 800,
            height: 600,
            alt:  productData?.name,
          },
        ],
      }}
      twitter={{
        handle: settings?.seo?.twitterHandle,
        site: settings?.siteTitle,
        cardType: settings?.seo?.twitterCardType,
      }}
    /> 
  //   || 

  //   <DefaultSeo
  //   //fix IOS input zoom issue
  //   additionalMetaTags={[
  //     {
  //       name: "viewport",
  //       content: "width=device-width, initial-scale=1 maximum-scale=1",
  //     },
  //   ]}
  //   title={settings?.siteTitle ?? "Buylowcal"}
  //   titleTemplate={`%s | ${settings?.seo?.metaTitle ?? "E-Commerce"}`}
  //   description={settings?.seo?.metaDescription || settings?.siteSubtitle}
  //   canonical={settings?.seo?.canonicalUrl}
  //   openGraph={{
  //     title: settings?.seo?.ogTitle,
  //     description: settings?.seo?.ogDescription,
  //     type: "website",
  //     locale: "en_US",
  //     site_name: settings?.siteTitle,
  //     images: [
  //       {
  //         url: settings?.seo?.ogImage?.original,
  //         width: 800,
  //         height: 600,
  //         alt: settings?.seo?.ogTitle,
  //       },
  //     ],
  //   }}
  //   twitter={{
  //     handle: settings?.seo?.twitterHandle,
  //     site: settings?.siteTitle,
  //     cardType: settings?.seo?.twitterCardType,
  //   }}
  // />



  )
  
};

export default Seo;
