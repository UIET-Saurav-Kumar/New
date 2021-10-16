import Alert from "@components/ui/alert";
import Button from "@components/ui/button";
import Input from "@components/ui/input";

import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLicensesMutation } from "@data/user/use-licenses.mutation";

type FormValues = {

  gst_number: string
  gst_certificate: string
  fssai_number: string
  fssai_certificate: string
  cancelled_cheque: string
  tan_number: string
  pan_number: string

};
const LicenseFromSchema = yup.object().shape({
  gst_number: yup.string().required("GST Number is required"),
  // gst_certificate: yup.string().required("gst_certificate"),
  fssai_number: yup.string().required("FSSAI Number is required"),
  // fssai_certificate: yup.string().required("form:error-name-required"),
  // cancelled_cheque: yup.string().required("form:error-name-required"),
  tan_number: yup.string().required("Tan number is required"),
  pan_number: yup.string().required("Pan number is required"),
});
const LicenseFrom = ({user}:any) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate: registerUser, isLoading: loading } = useLicensesMutation();
  const {
    register,
    handleSubmit:handleSubmit,
    formState: { errors },
    setError:registerSetError,
  } = useForm<FormValues>({
    resolver: yupResolver(LicenseFromSchema),
  });

  const { t } = useTranslation();
  const router = useRouter();

  async function onSubmitLicenses({gst_number,
    gst_certificate,
    fssai_number,
    fssai_certificate,
    cancelled_cheque,
    tan_number,
    pan_number,  }: FormValues) {
    registerUser(
      {
        variables: {
          gst_number,
          gst_certificate,
          fssai_number,
          fssai_certificate,
          cancelled_cheque,
          tan_number,
          pan_number,
          user_id:user?.id
        },
      },
      {
        onSuccess: ({ data }) => {
          router.push('/auth/'+data.user.id);
        },
        onError: (error: any) => {
          Object.keys(error?.response?.data).forEach((field: any) => {
            registerSetError(field, {
              type: "manual",
              message: error?.response?.data[field],
            });
          });
        },
      }
    );
  }
  return (
    <>

      <form className='mt-10' onSubmit={handleSubmit(onSubmitLicenses)} noValidate>
        <Input
          label={("GST Number")}
          {...register("gst_number")}
          variant="outline"
          className="mb-4"
          error={t(errors?.gst_number?.message!)}
        />

        <input
          type="file"
          label={("FSSAI Number")}
          {...register("gst_certificate")}
          variant="outline"
          className="mb-4"
          error={t(errors?.gst_certificate?.message!)}
        />

        <Input
          label={("FSSAI Number")}
          {...register("fssai_number")}
          variant="outline"
          className="mb-4"
          error={t(errors?.fssai_number?.message!)}
        />

        <input
          type="file"
          label={("FSSAI Certificate")}
          {...register("fssai_certificate")}
          variant="outline"
          className="mb-4"
          error={t(errors?.fssai_certificate?.message!)}
        />
        <input
          type="file"
          label={("cancelled cheque")}
          {...register("cancelled_cheque")}
          variant="outline"
          className="mb-4"
          error={t(errors?.cancelled_cheque?.message!)}
        />

        <Input
          label={("TAN Number")}
          {...register("tan_number")}
          variant="outline"
          className="mb-4"
          error={t(errors?.tan_number?.message!)}
        />

        <Input
          label={("GST Number")}
          {...register("pan_number")}
          variant="outline"
          className="mb-4"
          error={t(errors?.pan_number?.message!)}
        />


        <Button className="w-full" loading={loading} disabled={loading}>
          {t("form:text-register")}
        </Button>

        {errorMessage ? (
          <Alert
            message={t(errorMessage)}
            variant="error"
            closeable={true}
            className="mt-5"
            onClose={() => setErrorMessage(null)}
          />
        ) : null}
      </form>
    </>
  );
};

export default LicenseFrom;
