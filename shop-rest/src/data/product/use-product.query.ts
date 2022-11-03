
import { Product } from "@ts-types/custom.types";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from "@utils/api/http";
import { useQuery } from "react-query";
import url from "@utils/api/server_url";


export const fetchProduct = async (slug: string) => {
  
  if(slug == undefined)
  {
    return null;
  }

  const { data } = await http.get(`${url}/${API_ENDPOINTS.PRODUCTS}/${slug}`);
  return data;

};

export const useProductQuery = (slug: string) => {
  return useQuery<Product, Error>([API_ENDPOINTS.PRODUCTS, slug], () =>
    fetchProduct(slug)
  );
};
