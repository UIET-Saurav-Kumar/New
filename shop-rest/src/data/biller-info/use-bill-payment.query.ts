
import { Product } from "@ts-types/custom.types";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from "@utils/api/http";
import { useMutation, useQuery } from "react-query";
import url from "@utils/api/server_url";


export const fetchBillerInfo = async (category,biller_id) => {
  
  const { data } = await http.get(`${url}/${API_ENDPOINTS.BILLER_INFO}`);
  console.log('object',url);
  return data;

};
      

export const useBillerInfoQuery = () => {

  return useQuery<Error>( [API_ENDPOINTS.BILLER_INFO], (category,biller_id) =>
    fetchBillerInfo(category,biller_id)
  );
  
};

const { mutate: mutatePlan } = useMutation(fetchBillerInfo, {
  onSuccess: data => {
    // setPlans(data);
    // addOnPlansList();
    // setLoading(false);
    // setAddOnPlans(data);
    // console.log('operator',data);
  },

  onError: () => {
    alert("error")
    // setLoading(false)
  },

  // onSettled: () => {
  //   queryClient.invalidateQueries(API_ENDPOINTS.RECHARGE_PLANS);
  // }
});


