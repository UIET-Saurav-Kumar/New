import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from "@utils/api/http";
import { useQuery } from "react-query";
import url from "@utils/api/server_url";

export const fetchAllLikes = async () => {
  const { data } = await http.get(`${url}/${API_ENDPOINTS.ALL_LIKES}`);
  return data;
};

export const useAllLikesQuery = () => {
    return useQuery<any, Error>(
      [API_ENDPOINTS.ALL_LIKES],
      () => fetchAllLikes(),
      {
        refetchInterval: 2000 // milliseconds
      }
    );
  };
  
