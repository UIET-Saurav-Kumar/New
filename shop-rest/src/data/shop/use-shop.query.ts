
import { Shop } from "@ts-types/custom.types";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from "@utils/api/http";
import url from "@utils/api/server_url";
import { useQuery } from "react-query";


export const fetchShop = async (slug: string) => {
  // // console.log(' before fetchShop')
  const { data } = await http.get(`${url}/${API_ENDPOINTS.SHOPS}/${slug}`);
  // // console.log(' after fetchShop')
  return data;
};

// export const test = () => {
//   const a = 'test';
//   // console.log('%c test function','color:blue', a)
//   // console.log(' %c test function','color:blue', a)
//   return  a;
// }


export const fetchShopSeo = async (slug: string) => {
  // const { data } = await http.get(`${url}/${API_ENDPOINTS.SETTINGS}?shop_slug=${slug}`);

  const { data  } = await http.get(`${url}/${API_ENDPOINTS.SHOPS}/${slug}`);
  
  if (typeof window !== "undefined") {
    const eltitle = document.querySelector('title');
    eltitle.innerText = getTitle(data);

    const eldesc = document.querySelector("meta[name='description']");
    eldesc?.setAttribute('content',getDescription(data));

    const ogTitle = document.querySelector("meta[property='og:title']");
    ogTitle?.setAttribute('content', getTitle(data));

    const ogDesc = document.querySelector("meta[property='og:description']");
    ogDesc?.setAttribute('content',getDescription(data));
  }
    return data;
};

function getDescription(data:any){
  return (data.name?data.name:'')+' '+(data.address.city?data.address.city+" "+data.address.street_address:'')+' Best '
  +(data.shop_categories>0?(data.shop_categories.length>0?data.shop_categories[0].name:''):'')+' deals, offers, discounts and cash backs only through buylowcal.com'
}
function getTitle(data:any){
  return (data.name?data.name:'')+' '+(data.address.city?data.address.city+" "+data.address.street_address:'')+', Best Discounts and Offers Only Through BuyLowcal.com';
}
export const useShopQuery = (slug: string) => {
  // // console.log('shopQuery');
  return useQuery<Shop, Error>([API_ENDPOINTS.SHOPS, slug], () =>
    fetchShop(slug)
  );
};
