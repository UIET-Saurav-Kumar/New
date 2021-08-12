import 
    { FetureShopOptionsType, Shop, QueryParamsType}
    from "@ts-types/custom.types";
import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useQuery } from "react-query";

const FeatureStoreService = new CoreApi(API_ENDPOINTS.HOME_FEATURE_STORES);
export const fetchFeatureStore = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    data
  } = await FeatureStoreService.find(params as FetureShopOptionsType);

  return { featureStores: { data } };
};
export const useFeatureStoreQuery = (options: FetureShopOptionsType) => {
  return useQuery<{ featureStores: { data: Shop[] } }, Error>(
    [API_ENDPOINTS.HOME_FEATURE_STORES, options],
    fetchFeatureStore
  );
};
