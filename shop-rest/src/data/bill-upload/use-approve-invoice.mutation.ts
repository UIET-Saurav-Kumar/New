import { ApproveInvoiceUploadInput } from "@ts-types/generated";
import BillUpload from "@ts-types/upload-invoice";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";

export interface InvoiceUploadCreateVariables {
  variables: {
    input: ApproveInvoiceUploadInput;
  };
}

export const useApproveInvoiceMutation = () => {

  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation(
    ({ variables: { input } }: InvoiceUploadCreateVariables) =>
      BillUpload.approve(API_ENDPOINTS.APPROVE_INVOICE_UPLOADS, input),
    {
      onSuccess: () => {
        toast.success(t("common:successfully-updated"));
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.INVOICE_UPLOADS);
      },
    }
  );
};
