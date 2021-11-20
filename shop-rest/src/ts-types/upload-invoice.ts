import Base from "./base";

import { ApproveInvoiceUploadInput, CreateInvoiceUploadInput } from "@ts-types/generated";

class BillUpload extends Base<CreateInvoiceUploadInput, CreateInvoiceUploadInput> {
  approve = async (url: string, variables: ApproveInvoiceUploadInput) => {
    return this.http<ApproveInvoiceUploadInput>(url, "post", variables);
  };
}

export default new BillUpload();
