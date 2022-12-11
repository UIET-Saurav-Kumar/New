
import {
    QueryParamsType,
    InvoiceUploadQueryOptionsType,
  } from "@ts-types/custom.types";
  import { mapPaginatorData } from "@utils/data-mappers";
  import { useQuery } from "react-query";
  import BillUpload from "@ts-types/upload-invoice";
  import { API_ENDPOINTS } from "@utils/api/endpoints";
  import { InvoiceUploadPaginator } from "@ts-types/generated";
  

  const fetchInvoiceUploadList= async ({
    queryKey,
  }: QueryParamsType): Promise<{ invoice_upload: InvoiceUploadPaginator }> => {
    const [_key, params] = queryKey;
  
    const {
      page,
      limit = 15,
      orderBy = "updated_at",
      sortedBy = "DESC",
    } = params as InvoiceUploadQueryOptionsType;
  
    const url = `${API_ENDPOINTS.USER_INVOICE_UPLOAD}?limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  
    const {
      data: { data, ...rest },
    } = await BillUpload.all(url);

    return {
      invoice_upload: {
        data,
        paginatorInfo: mapPaginatorData({ ...rest }),
      },
    };
  };
  
  const useInvoiceUploadQuery = (
    params: InvoiceUploadQueryOptionsType,
    options: any = {}
  ) => {
    return useQuery<{ invoice_upload: InvoiceUploadPaginator }, Error>(
      [API_ENDPOINTS.INVOICE_UPLOAD, params],
      fetchInvoiceUploadList,
      { ...options, keepPreviousData: true }
    );
  };
  
  export { useInvoiceUploadQuery, fetchInvoiceUploadList};
  