import 
    { FeatureProductOptionsType, FeatureProduct, QueryParamsType}
    from "@ts-types/custom.types";
import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useQuery } from "react-query";


const FeatureProductService = new CoreApi(API_ENDPOINTS.HOME_FEATURE_PRODUCTS);
export const fetchFeatureProduct = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    data
  } = await FeatureProductService.search(params as FeatureProductOptionsType);

  return { featureProducts: { data } };
};

export const useFeatureProductQuery = (options: FeatureProductOptionsType) => {
  return useQuery<{ featureProducts: { data: FeatureProduct[] } }, Error>(
    [API_ENDPOINTS.HOME_FEATURE_PRODUCTS, options],
    fetchFeatureProduct
  );
};