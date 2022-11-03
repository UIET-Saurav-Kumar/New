import { CreateInvoiceUploadInput } from "@ts-types/generated";
import BillUpload from "@ts-types/upload-invoice";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export interface InvoiceUploadCreateVariables {
  variables: {
    input: CreateInvoiceUploadInput;
  };
}

export const usefetchOperatorMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: InvoiceUploadCreateVariables) =>
    BillUpload.create(API_ENDPOINTS.USER_INVOICE_UPLOAD, input),
    {
      onSuccess: () => {
        router.push(`/user/upload-invoice`);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.USER_INVOICE_UPLOAD);
      },
    }
  );
};
