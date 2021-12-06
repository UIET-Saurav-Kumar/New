import { Shop } from "@ts-types/custom.types";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from "@utils/api/http";
import url from "@utils/api/server_url";
import { useQuery } from "react-query";

export const fetchShop = async (slug: string) => {
  const { data } = await http.get(`${url}/${API_ENDPOINTS.SHOPS}/${slug}`);
  return data;
};

export const fetchShopSeo = async (slug: string) => {
  const { data } = await http.get(`${url}/${API_ENDPOINTS.SETTINGS}?shop_slug=${slug}`);
  console.log(data);
  setTimeout(() => {
    const eltitle = document.querySelector('title');
    eltitle.innerText = `BuyLowcal | ${data?.options?.seo?.metaTitle}`;

    const eldesc = document.querySelector("meta[name='description']");
    eldesc.setAttribute('content',data?.options?.seo?.metaDescription);

    const ogTitle = document.querySelector("meta[property='og:title']");
    ogTitle.setAttribute('content', `BuyLowcal | ${data?.options?.seo?.ogTitle}`);

    const ogDesc = document.querySelector("meta[property='og:description']");
    ogDesc.setAttribute('content',data?.options?.seo?.ogDescription);
    
  }, 1000);
    return data;
};

export const useShopQuery = (slug: string) => {
  return useQuery<Shop, Error>([API_ENDPOINTS.SHOPS, slug], () =>
    fetchShop(slug)
  );
};
