
import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export type VerifyCouponInputType = {
  code: string;
};

class Coupon extends CoreApi {
  constructor(_base_path: string) {
    super(_base_path);
  }

  verifyCoupon(input: VerifyCouponInputType) {
    return this.http
      .post(this._base_path + "/verify", input)
      .then((res) => res.data);
  }
}

export const CouponService = new Coupon(API_ENDPOINTS.COUPONS);
