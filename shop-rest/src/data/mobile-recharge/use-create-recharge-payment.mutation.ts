import { useMutation } from "react-query";
import { RechargeService } from "./recharge.service";


type RechargePaymentCreateInputType = {
  [key: string]: unknown;
};

export const useCreateRechargePaymentMutation = () => {
  return useMutation((input: RechargePaymentCreateInputType) =>
    RechargeService.create(input)
  );
};
