import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";


export type VerifyCheckoutInputType = {
  amount: number;
  products: any[];
  billing_address: any;
  // shipping_address: any;
};

class Recharge extends CoreApi {
  constructor(_base_path: string) {
    super(_base_path);
  }

  verifyCheckout(input: VerifyCheckoutInputType) {
    
    return this.http
      .post(API_ENDPOINTS.VERIFY_CHECKOUT, input)
      .then((res) => res.data);
      
  }  
}

export const RechargeService = new Recharge(API_ENDPOINTS.ORDER);
