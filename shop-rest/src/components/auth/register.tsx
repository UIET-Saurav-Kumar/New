import React, { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "@data/auth/use-register.mutation";
import Logo from "@components/ui/logo";
import Alert from "@components/ui/alert";
import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useUI } from "@contexts/ui.context";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useModalAction } from "@components/ui/modal/modal.context";
import { route } from "next/dist/next-server/server/router";

type FormValues = {
  name: string;
  email: string;
  password: string;
  phone_number:number
};

const registerFormSchema = yup.object().shape({
  name: yup.string().required("error-name-required"),
  email: yup
    .string()
    .email("error-email-format")
    .required("error-email-required"),
  password: yup.string().required("error-password-required"),
  phone_number:yup.string().required("You must need to provide your Phone number")
});

const defaultValues = {
  name: "",
  email: "",
  password: "",
  phone_number:""
};

const RegisterForm = () => {
  const { t } = useTranslation("common");
  const { mutate, isLoading: loading } = useRegisterMutation();
  const [errorMsg, setErrorMsg] = useState("");
  const {
    register,
    handleSubmit,
    setError,

    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(registerFormSchema),
  });
  const router = useRouter();
  const { authorize } = useUI();
  const { closeModal, openModal } = useModalAction();
  function handleNavigate(path: string) {
    router.push(`/${path}`);
    closeModal();
  }
  function onSubmit({ name, email, password,phone_number }: FormValues) {
    mutate(
      {
        name,
        email,
        password,
        phone_number,
        invited_by:'',
      },
      {
        onSuccess: (data) => {
          router.push('/auth/'+data.user.id);
          closeModal();
          return ;
          if (data?.token && data?.permissions?.length) {
            Cookies.set("auth_token", data.token);
            Cookies.set("auth_permissions", data.permissions);
            authorize();
            closeModal();
            return;
          }
          if (!data.token) {
            setErrorMsg(t("error-credential-wrong"));
          }
        },
        onError: (error) => {
          const {
            response: { data },
          }: any = error ?? {};
          Object.keys(data).forEach((field: any) => {
            setError(field, {
              type: "manual",
              message: data[field][0],
            });
          });
        },
      }
    );
  }
  return (
    <div className="py-6 px-5 sm:p-8 bg-light w-screen md:max-w-md h-screen md:h-auto flex flex-col justify-center">
      <div className="flex justify-center">
        <Logo />
      </div>
      <p className="text-center text-sm md:text-base leading-relaxed px-2 sm:px-0 text-body mt-4 sm:mt-5 mb-7 sm:mb-10">
        {t("registration-helper")}
        <span
          onClick={() => handleNavigate("terms")}
          className="mx-1 underline cursor-pointer text-accent hover:no-underline"
        >
          {t("text-terms")}
        </span>
        &
        <span
          onClick={() => handleNavigate("privacy")}
          className="ms-1 underline cursor-pointer text-accent hover:no-underline"
        >
          {t("text-policy")}
        </span>
      </p>
      {errorMsg && (
        <Alert
          variant="error"
          message={t(errorMsg)}
          className="mb-6"
          closeable={true}
          onClose={() => setErrorMsg("")}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label={t("text-name")}
          {...register("name")}
          type="text"
          variant="outline"
          className="mb-5"
          error={t(errors.name?.message!)}
        />
        <Input
          label={t("text-email")}
          {...register("email")}
          type="email"
          variant="outline"
          className="mb-5"
          error={t(errors.email?.message!)}
        />
        <Input
          label={"Phone Number"}
          {...register("phone_number")}
          type="text"
          variant="outline"
          className="mb-5"
          error={t(errors.phone_number?.message!)}
        />

        <PasswordInput
          label={t("text-password")}
          {...register("password")}
          error={t(errors.password?.message!)}
          variant="outline"
          className="mb-5"
        />
        <div className="mt-8">
          <Button className="w-full h-12" loading={loading} disabled={loading}>
            {t("text-register")}
          </Button>
        </div>
      </form>
      {/* End of forgot register form */}

      <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-8 sm:mt-11 mb-6 sm:mb-8">
        <hr className="w-full" />
        <span className="absolute start-2/4 -top-2.5 px-2 -ms-4 bg-light">
          {t("text-or")}
        </span>
      </div>
      <div className="text-sm sm:text-base text-body text-center">
        {t("text-already-account")}{" "}
        <button
          onClick={() => openModal("LOGIN_VIEW")}
          className="ms-1 underline text-accent font-semibold transition-colors duration-200 focus:outline-none hover:text-accent-hover focus:text-accent-hover hover:no-underline focus:no-underline"
        >
          {t("text-login")}
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
