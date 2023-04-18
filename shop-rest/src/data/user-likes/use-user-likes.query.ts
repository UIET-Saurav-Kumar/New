import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from "@utils/api/http";
import { useQuery } from "react-query";
import url from "@utils/api/server_url";

export const fetchLikes = async (userId: number) => {
  const { data } = await http.get(`${url}/${API_ENDPOINTS.LIKES}/${userId}`);
  return data;
};

export const useLikesQuery = (userId: number) => {
  return useQuery<any, Error>([API_ENDPOINTS.LIKES, userId], () =>
    fetchLikes(userId)
  );
};
