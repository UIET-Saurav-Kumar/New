import Category from "@repositories/category";
import { useQuery } from "react-query";
import { Category as TCategory } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export const fetchCategory = async (id: string) => {
  const { data } = await Category.find(`${API_ENDPOINTS.OFFER}/${id}`);
  return data;
};

export const useCategoryQuery = (id: string) => {
  return useQuery<TCategory, Error>([API_ENDPOINTS.OFFER, id], () =>
    fetchCategory(id)
  );
};
