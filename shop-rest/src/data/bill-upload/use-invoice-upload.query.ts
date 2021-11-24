import BillUpload from "@ts-types/withdraw";
import { useQuery } from "react-query";
import { BillUpload as TBillUpload } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export const fetchInvoiceUpload = async (id: string) => {
  const { data } = await BillUpload.find(`${API_ENDPOINTS.INVOICE_UPLOAD}/${id}`);
  return { invoice_upload: data };
};

type IProps = {
  invoice_upload: TBillUpload;
};
export const useInvoiceUploadQuery = (id: string) => {
  return useQuery<IProps, Error>([API_ENDPOINTS.INVOICE_UPLOAD, id], () =>
    fetchInvoiceUpload(id)
  );
};
