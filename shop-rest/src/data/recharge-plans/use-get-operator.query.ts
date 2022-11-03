
import { Product } from "@ts-types/custom.types";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from "@utils/api/http";
import { useMutation, useQuery } from "react-query";
import url from "@utils/api/server_url";


export const fetchOperator = async (data:any) => {
  
  const { data: response } = await http.post(API_ENDPOINTS.OPERATOR, data);
      // setOperator(response)
      return response;
};


      

export const useOperatorQuery = () => {
  return useQuery<Error>( [API_ENDPOINTS.OPERATOR], (data) =>
    fetchOperator(data)
  );
};


