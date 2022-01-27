
import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useMutation } from "react-query";

const ContactUpload = new CoreApi(API_ENDPOINTS.USER_CONTACT_UPLOAD);


export const useContactUploadMutation = () => {
  return useMutation(ContactUpload.create, {
    onSuccess: (data) => {
      console.log(data);
    },
  });
}
