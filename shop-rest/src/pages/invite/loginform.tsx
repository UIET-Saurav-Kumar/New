
import React, { useState } from "react";
import Cookies from "js-cookie";
import { signIn } from "next-auth/client";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@data/auth/use-login.mutation";
import Logo from "@components/ui/logo";
import Alert from "@components/ui/alert";
import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useUI } from "@contexts/ui.context";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FacebookIcon } from "@components/icons/facebook";
import { GoogleIcon } from "@components/icons/google";
import { useModalAction } from "@components/ui/modal/modal.context";
import RegisterForm from "./[id]";
import { useRouter } from "next/router";



type FormValues = {
  email: string;
  password: string;
};

const loginFormSchema = yup.object().shape({
  email: yup
    .string()
    .email("error-email-format")
    .required(" Email required"),
  password: yup.string().required(" Password required"),
});

const defaultValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const { t } = useTranslation("common");
  const { mutate: login, isLoading: loading } = useLoginMutation();
  const [errorMsg, setErrorMsg] = useState("");
  const { authorize } = useUI();
  const router = useRouter();

  const { openModal, closeModal } = useModalAction();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(loginFormSchema),
    defaultValues,
  });

  function onSubmit({ email, password }: FormValues) {
    login(
      {
        email,
        password,
      },
      {
        onSuccess: (data) => {
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
        onError: (error: any) => {
          // console.log(error.message);
        },
      }
    );
  }
  const [click, setClick] = useState(false);


  return (

    <div className=""> { !click ? <div className="py-6 px-5 sm:p-8 bg-light w-screen md:max-w-md h-screen md:h-auto flex flex-col justify-center">
        <div className="flex justify-center">
          <Logo />
        </div>
        <p className=" text-center font-semibold text-magenta text-xl mt-5 sm:mt-5 mb-8 sm:mb-10">
          Login Form
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label={t("Email")}
          {...register("email")}
          type="email"
          variant="outline"
          className="mb-5"
          error={t(errors.email?.message!)}
        />
        <PasswordInput
          label={t("Password")}
          {...register("password")}
          error={t(errors.password?.message!)}
          variant="outline"
          className="mb-5"
          forgotPageRouteOnClick={() => openModal("FORGOT_VIEW")}
        />
        <div className="mt-8">
          <Button
            className="w-full bg-btn hover:bg-gradient-to-tl  from-magenta to-gold h-11 sm:h-12"
            loading={loading}
            disabled={loading}
          >
            {t(" Login")}
          </Button>
          
        </div>
        
      </form>
      {/* End of forgot login form */}

      {/* <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-8 sm:mt-11 mb-6 sm:mb-8">
          <hr className="w-full" />
          <span className="absolute start-2/4 -top-2.5 px-2 -ms-4 bg-light">
            {t("or")}
          </span>
      </div> */}

      <div className="grid grid-cols-1 gap-4 mt-2">
        {/* Uncomment below code to use facebook login */}
        {/* <Button
          className="w-full !bg-social-facebook hover:!bg-social-facebook-hover"
          // loading={loading}
          disabled={loading}
          onClick={() => {
            signIn("facebook");
          }}
        >
          <FacebookIcon className="w-4 h-4 mr-3" />
          {t(" Login-facebook")}
        </Button> */}
        {/* <Button
          className="bg-plus hover:bg-gradient-to-tl  from-gold to-magenta"
          // loading={loading}
          disabled={loading}
          onClick={() => {
            signIn("google");
          }}
        >
          <GoogleIcon className="w-4 h-4 mr-3 " />
          {t(" Login-google")}
        </Button> */}
      </div>

      <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-8 sm:mt-11 mb-6 sm:mb-8">
        <hr className="w-full" />
      </div>

      <div className="text-sm sm:text-base text-body text-center">
        {t(" Don't have any account?")}{" "}
        <button
          onClick={() => setClick(!click)}
          className="ms-1 underline text-accent font-semibold transition-colors duration-200 focus:outline-none hover:text-accent-hover focus:text-accent-hover hover:no-underline focus:no-underline"
        >
          {t("Register")}
        </button>
      </div>
    </div> : <RegisterForm /> }
    </div>
  );
};

export default LoginForm;
