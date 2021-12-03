import * as yup from "yup";

export const shopValidationSchema = yup.object().shape({

  name: yup.string().required("form:error-name-required")
  .matches(/^[a-zA-Z0-9() ]+$/, "Can only contain letters, numbers and braces"),
  balance: yup.object().shape({
    payment_info: yup.object().shape({
      email: yup
        .string()
        .typeError("form: error-email-string")
        .email("form:error-email-format"),
      account: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value)),
    }),
  }),
});
