import { useMutation } from "react-query";
import { OrderService } from "./order.service";

type OrderCreateInputType = {
  [key: string]: unknown;
};

export const useUpiPaymentMutation = () => {
  return useMutation((input: OrderCreateInputType) =>
    OrderService.create(input)
  );
};
