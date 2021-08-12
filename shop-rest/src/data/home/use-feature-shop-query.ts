import 
    { FetureShopOptionsType, Shop, QueryParamsType}
    from "@ts-types/custom.types";
import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useQuery } from "react-query";

const FeatureShopService = new CoreApi(API_ENDPOINTS.HOME_FEATURE_SHOPS);
export const fetchFeatureShop = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    data
  } = await FeatureShopService.search(params as FetureShopOptionsType);

  return { featureShops: { data } };
};
export const useFeatureShopQuery = (options: FetureShopOptionsType) => {
  return useQuery<{ featureShops: { data: Shop[] } }, Error>(
    [API_ENDPOINTS.HOME_FEATURE_SHOPS, options],
    fetchFeatureShop
  );
};
