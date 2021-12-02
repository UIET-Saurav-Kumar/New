import { useMutation } from "react-query";
import { DeliveryService } from "./delivery.service";

type OrderCreateInputType = {
  [key: string]: unknown;
};

export const useCreateOrderMutation = () => {
  return useMutation((input: OrderCreateInputType) =>
    DeliveryService.create(input)
  );
};
