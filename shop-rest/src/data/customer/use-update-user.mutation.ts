
import { UpdateUser } from "@ts-types/generated";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import User from "./user";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useTranslation } from "next-i18next";
import { CustomerService, CustomerType } from "./customer.service";



export interface IUserUpdateVariables {
  variables: { id: number; input: UpdateUser };
}
 

export const useUpdateUserMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation(
    ({ variables: { id, input } }: IUserUpdateVariables) =>
    CustomerService.updateUser(id,input),
    {
      onSuccess: () => {
        toast.success(t("common:successfully-updated"));
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.ME);
        queryClient.invalidateQueries(API_ENDPOINTS.USERS);
      },
    }
  );
  
};
