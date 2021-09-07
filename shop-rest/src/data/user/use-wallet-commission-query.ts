import 
    { FetureProductOptionsType, FeatureProduct, QueryParamsType}
    from "@ts-types/custom.types";
import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useQuery } from "react-query";

const WalletCommissionService = new CoreApi(API_ENDPOINTS.GET_WALLET_COMMISSION);
export const fetchWalletCommissionProduct = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    data
  } = await WalletCommissionService.fetchUrl(API_ENDPOINTS.GET_WALLET_COMMISSION);

  return data;
};
export const useWalletCommissionQuery = (options: FetureProductOptionsType) => {
  return useQuery<{ WalletCommission: { data: FeatureProduct[] } }, Error>(
    [API_ENDPOINTS.GET_WALLET_COMMISSION, options],
    fetchWalletCommissionProduct
  );
};
