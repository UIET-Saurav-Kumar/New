
import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useMutation } from "react-query";

const InsuredData = new CoreApi(API_ENDPOINTS.TERM_LIFE_INSURANCE);


export const useTermInsuredFormDataMutation = () => {

  
  return useMutation((input: any) => {
      
      let formData = new FormData();
        formData.append('name',input.name)
        formData.append('date_of_birth',input.date_of_birth)
        formData.append('is_tobacco_user',input.is_tobacco_user)
        formData.append('education',input.education)
        formData.append('occupation',input.occupation)
        formData.append('pin_code',input.pin_code)
  
      return InsuredData.create(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
    });
}
