
import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useMutation } from "react-query";

const InvocieUpload = new CoreApi(API_ENDPOINTS.USER_INVOICE_UPLOAD);


export const useInvocieUploadMutation = () => {


  return useMutation((input: any) => {


    let formData = new FormData();
    formData.append('name',input.name)
    formData.append('address',input.address)
    formData.append('shop_name',input.shop_name)
    formData.append('shop_address',input.shop_address)
    formData.append('shop_city',input.shop_city)
    formData.append('bill_amount',input.bill_amount)
    formData.append('bill',JSON.stringify(input.bill[0]))


    return InvocieUpload.create(formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

  });
};
