import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from "@utils/api/http";
import { useQuery } from "react-query";
import url from "@utils/api/server_url";

interface Notification {
    id: string;
    type: string;
    data: {
      message: string;
      liker_id: number;
    };
    read_at?: string;
    created_at: string;
    updated_at: string;
  }
  
  export default Notification;
  
export const fetchNotifications = async () => {
  const { data } = await http.get(`${url}/${API_ENDPOINTS.NOTIFICATIONS}`);
  return data;
};

export const useUserLikesNotifications = () => {
  return useQuery<Notification[], Error>(API_ENDPOINTS.NOTIFICATIONS, () =>
    fetchNotifications()
  );
};
