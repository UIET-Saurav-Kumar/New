import Button from "@components/ui/button";
import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "next-i18next";
import { useModalAction } from "@components/ui/modal/modal.context";

interface Props {
  onSubmit: (values: { phone_number: string }) => void;
  loading: boolean;
}
const schema = yup.object().shape({
  phone_number: yup
    .string()
    .matches(/^[0-9]{10}$/, "Invalid phone number")
    .required("Please enter your phone number"),

});

const EnterPhoneNumberView = ({ onSubmit, loading }: Props) => {
  const { t } = useTranslation("common");
  const { openModal, closeModal } = useModalAction();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<{ phone_number: number }>({ resolver: yupResolver(schema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        label={t("Mobile Number")}
        {...register("phone_number")}
        type="phone_number"
        variant="outline"
        className="mb-5"
        placeholder="Enter your registered mobile number"
        error={t(errors.phone_number?.message!)}
      />
      <div className="mt-8 space-y-8 ">
      <Button className="w-full h-11" loading={loading} disabled={loading}>
        {t("Submit")}
      </Button>

      <div className="w-full text-center">
        or
      </div>

      <Button
            className="w-full bg-gray-300 text-black hover:bg-gradient-to-tl  from-magenta to-gold h-8  sm:h-10"
            loading={loading}
            disabled={loading}
            onClick={() => openModal("LOGIN_VIEW")}
          >
            {t("Login with Email Id")}
          </Button>
    </div>

    </form>
  );
};

export default EnterPhoneNumberView;
