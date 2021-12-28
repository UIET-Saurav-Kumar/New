import * as yup from "yup";
export const deliveryCostValidationSchema = yup.object().shape({
  cost_upto_5km: yup.string().required("form:error-name-required"),
  cost_per_km: yup.string().required("form:error-name-required"),
});
