
import 
    { OfferOptionsType, Offer, QueryParamsType}
    from "@ts-types/custom.types";
import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useQuery } from "react-query";

const OfferService = new CoreApi(API_ENDPOINTS.HOME_OFFERS);

export const fetchOfferQuery = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    data
  } = await OfferService.search(params as OfferOptionsType);
  return { offers: { data } };
};

export const useOfferQuery = (options: OfferOptionsType) => {
  return useQuery<{ offers: { data: Offer[] } }, Error>(
    [API_ENDPOINTS.HOME_OFFERS, options],
    fetchOfferQuery
  );
};
