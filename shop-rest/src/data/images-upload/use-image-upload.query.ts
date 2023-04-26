
import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useMutation } from "react-query";


const ImagesUpload = new CoreApi(API_ENDPOINTS.IMAGE_UPLOAD);

export const useImagesUploadMutation = () => {
  return useMutation((input: any) => {
    console.log('images', input);

    const imageData = input.images;

    return ImagesUpload.create({ image_data: imageData, user_id: input.user_id });
  });
};





