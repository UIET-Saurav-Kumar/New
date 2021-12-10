
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
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { maskPhoneNumber } from "@utils/mask-phone-number";

import LoginForm from "./loginform";

type FormValues = {
  name: string;
  email: string;
  password: string;
  id:number;
  phone_number:number
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
  };
};

  
const registerFormSchema = yup.object().shape({
  name: yup.string().required("error-name-required"),
  email: yup
    .string()
    .email("error-email-format")
    .required("error-email-required"),
  password: yup.string().required("error-password-required"),
  phone_number:yup.string().min(8, "error-min-contact").required("error-contact-required")
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
  const { query } = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
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
  function getPhoneNumber(value:any){
    return value;
  }
  function onSubmit({ name, email, password ,phone_number}: FormValues) {
    mutate(
      {
        name,
        email,
        password,
        invited_by:query.id,
        phone_number
      },
      {
        onSuccess: (data) => {
          if(data.user){
            router.push('/auth/'+data.user.id);
          }
          return ;
          if (data?.token && data?.permissions?.length) {
            Cookies.set("auth_token", data.token);
            Cookies.set("auth_permissions", data.permissions);
            authorize();
            router.push('/');
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

  const [click, setClick] = useState(false);

  return (

    <div className="flex items-center justify-center bg-white sm:bg-gray-100 " >
        
        { !click ? <div className="py-6 px-5 sm:p-8 bg-light md:max-w-md h-screen md:h-auto flex flex-col justify-center m-auto max-w-md w-full bg-white sm:shadow p-5 sm:p-8 rounded mt-5 mb-5">
            
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
                  <h4 className="font-semibold text-magenta text-xl mt-5">Register form</h4>
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
                <PasswordInput
                label={t("text-password")}
                {...register("password")}
                error={t(errors.password?.message!)}
                variant="outline"
                className="mb-5"
                />
                <Input
                  label={"Phone Number"}
                  {...register("phone_number")}
                  type="text"
                  variant="outline"
                  className="mb-5"
                  onChange={(e) => setValue("phone_number", getPhoneNumber(e.target.value))}
                  error={t(errors.phone_number?.message!)}
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
                <button onClick={() => setClick(!click)}
                  className="ms-1 underline text-accent font-semibold transition-colors duration-200 focus:outline-none hover:text-accent-hover focus:text-accent-hover hover:no-underline focus:no-underline"
                  >
                  {t("text-login")}
                </button>
            </div>
        </div> : <LoginForm />}
    </div>
  );
};

export default RegisterForm;