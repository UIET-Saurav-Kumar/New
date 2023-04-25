
import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useMutation } from "react-query";


const ImagesUpload = new CoreApi(API_ENDPOINTS.IMAGE_UPLOAD);

export const useImagesUploadMutation = () => {
  return useMutation((input: any) => {
    console.log('images', input);

    let formData = new FormData();
    input.images.forEach((image: any, index: number) => {
      formData.append(`image_data[${index}]`, image);
    });

    return ImagesUpload.create(formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  });
};

