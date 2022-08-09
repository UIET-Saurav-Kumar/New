
import 
{ OfferOptionsType, Offer, QueryParamsType}
from "@ts-types/custom.types";
import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useQuery } from "react-query";

const OfferService = new CoreApi(API_ENDPOINTS.HOME_BRAND_OFFERS);

export const fetchBrandOfferQuery = async ({ queryKey }: QueryParamsType) => {
const [_key, params] = queryKey;

const {
data
} = await OfferService.search(params as OfferOptionsType);

return { brand_offers: { data } };
};

export const useBrandOfferQuery = (options: OfferOptionsType) => {
return useQuery<{ brand_offers: { data: Offer[] } }, Error>(
[API_ENDPOINTS.HOME_BRAND_OFFERS, options],
fetchBrandOfferQuery
);
};
