import { CreateDeliveryInput } from "@ts-types/generated";
import Withdraw from "@ts-types/withdraw";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export interface IDeliveryCreateVariables {
  variables: {
    input: CreateDeliveryInput;
  };
}

export const useCreateDeliveryMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    (input : IDeliveryCreateVariables) =>
      Withdraw.create(API_ENDPOINTS.DELIVERY, input.inputs),
    {
      onSuccess: (response) => {
        localStorage.setItem('delivery',JSON.stringify(response.data));
        router.push(`/user/delivery/payment`);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.DELIVERY);
      },
    }
  );
};
