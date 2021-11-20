import * as yup from "yup";
export const invoiceRewardValidationSchema = yup.object().shape({
  cashback: yup.string().required("This field is required"),
  max_cashback: yup.string().required("This field is required"),
});
