import 
    { FetureShopOptionsType, Shop, QueryParamsType}
    from "@ts-types/custom.types";
import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useQuery } from "react-query";

const ShopAvailabilityService = new CoreApi(API_ENDPOINTS.SHOP_AVAILABILITY);
export const fetchShopAvailability = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    data
  } = await ShopAvailabilityService.search(params as FetureShopOptionsType);

  return { ShopAvailability: { data } };
};
export const useShopAvailabilityQuery = (options: FetureShopOptionsType) => {
  return useQuery<{ ShopAvailability: { data: Shop[] } }, Error>(
    [API_ENDPOINTS.SHOP_AVAILABILITY, options],
    fetchShopAvailability
  );
};
