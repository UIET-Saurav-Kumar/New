import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useMutation } from "react-query";

const InvocieUpload = new CoreApi(API_ENDPOINTS.INVOICE_UPLOAD);

export const useInvocieUploadMutation = () => {
  return useMutation((input: any) => {
    let formData = new FormData();
    input.forEach((attachment: any) => {
      formData.append("attachment[]", attachment);
    });
    return InvocieUpload.create(formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  });
};
