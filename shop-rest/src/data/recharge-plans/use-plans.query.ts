
import { Product } from "@ts-types/custom.types";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from "@utils/api/http";
import { useQuery } from "react-query";
import url from "@utils/api/server_url";
 


export const fetchRechargePlans = async (data:any) => {
  
  const { data: plans } = await http.post(API_ENDPOINTS.RECHARGE_PLANS, data);
  // setPlans(plans)
  return plans;
};
      

export const useRechargePlansQuery = () => {
  return useQuery<Error>( [API_ENDPOINTS.RECHARGE_PLANS], (data) =>
    fetchRechargePlans(data)
  );
};


