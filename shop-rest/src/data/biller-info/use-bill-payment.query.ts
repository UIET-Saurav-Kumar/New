
import { Product } from "@ts-types/custom.types";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from "@utils/api/http";
import { useQuery } from "react-query";
import url from "@utils/api/server_url";


export const fetchBillerInfo = async () => {
  
  const { data } = await http.get(`${url}/${API_ENDPOINTS.BILLER_INFO}`);
  console.log('object',url);
  return data;

};
      

export const useBillerInfoQuery = () => {

  return useQuery<Error>( [API_ENDPOINTS.BILLER_INFO], () =>
    fetchBillerInfo()
  );
  
};


