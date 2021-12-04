import { Shop } from "@ts-types/custom.types";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from "@utils/api/http";
import url from "@utils/api/server_url";
import { useQuery } from "react-query";

export const fetchShopSeo = async (slug: string) => {
  const { data } = await http.get(`${url}/${API_ENDPOINTS.SETTINGS}?shop_slug=${slug}`);
  return data;
};
export const useShopQuery = (slug: string) => {
  return useQuery<Shop, Error>([API_ENDPOINTS.SHOPS, slug], () =>
    fetchShopSeo(slug)
  );
};
