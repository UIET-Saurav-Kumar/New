import { CreateWithdrawInput } from "@ts-types/generated";
import Withdraw from "@ts-types/withdraw";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export interface IWithdrawCreateVariables {
  variables: {
    input: CreateWithdrawInput;
  };
}

export const useCreateWithdrawMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: IWithdrawCreateVariables) =>
      Withdraw.create(API_ENDPOINTS.USER_WITHDRAWS, input),
    {
      onSuccess: () => {
        router.push(`/user/withdraws`);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.USER_WITHDRAWS);
      },
    }
  );
};
