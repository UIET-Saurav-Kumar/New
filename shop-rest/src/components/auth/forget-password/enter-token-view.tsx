import Button from "@components/ui/button";
import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "next-i18next";
import * as yup from "yup";
import { useEffect, useState } from "react";

interface Props {
  onSubmit: (values: { token: string }) => void;
  loading: boolean;
}

const schema = yup.object().shape({
  token: yup.string().required("Please enter otp"),
});

const EnterTokenView = ({ onSubmit, loading }: Props) => {
  const { t } = useTranslation("common");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ token: string }>({ resolver: yupResolver(schema) });

  const [otp, setOtp] = useState("");

  alert(otp);

  useEffect(() => {

    if ("OTPCredential" in window) {
      const ac = new AbortController();

      navigator.credentials
        .get({
          otp: { transport: ["sms"] },
          signal: ac.signal,
        })
        .then((otp) => {
          setOtp(otp?.code );
          // console.log(otp?.code);
          handleSubmit(onSubmit)
          ac.abort();
        })
        .catch((err) => {
          ac.abort();
          // console.log(err);
        });
    }
  }, []);

  return (

    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        id='token'
        label={t("Enter your token")}
        {...register("token"|| otp)}
       
        variant="outline"
        className="mb-5"
        error={t(errors.token?.message!)}
      />
      <Button className="w-full h-11" loading={loading} disabled={loading}>
        {t("text-submit-token")}
      </Button>
    </form>

  );
};

export default EnterTokenView;
