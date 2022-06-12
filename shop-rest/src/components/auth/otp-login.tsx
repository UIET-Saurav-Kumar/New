

import { useEffect, useState } from "react";
import Logo from "@components/ui/logo";
import Alert from "@components/ui/alert";
import { useForgetPasswordMutation } from "@data/auth/use-forget-password.mutation";
import { useVerifyForgetPasswordTokenMutation } from "@data/auth/use-verify-forget-password-token.mutation";
import { useResetPasswordMutation } from "@data/auth/use-reset-password.mutation";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useOtpLoginMutation } from "@data/auth/use-otp-login.mutation";
import { useVerifyOtpTokenMutation } from "@data/auth/use-verify-otp-token.mutation";
import Cookies from "js-cookie";
import EnterPhoneNumberView from "./enter-phone-number-view";
import { useUI } from "@contexts/ui.context";

const EnterEmailView = dynamic(() => import("./enter-phone-number-view"));
const EnterTokenView = dynamic(() => import("./forget-password/enter-token-view"));
// const EnterNewPasswordView = dynamic(() => import("./enter-new-password-view"));


const OtpLogin = () => {

  const { t } = useTranslation("common");
  const { openModal, closeModal } = useModalAction();
  const { mutate: forgetPassword, isLoading } = useForgetPasswordMutation();
  const { mutate: verifyOtpToken, isLoading: verifying } =
    useVerifyOtpTokenMutation();
    const { authorize } = useUI();
  // const { mutate: resetPassword, isLoading: resetting } =
  //   useResetPasswordMutation();
  const [errorMsg, setErrorMsg] = useState<string | null | undefined>("");
  const [verifiedPhoneNumber, setVerifiedPhoneNumber] = useState("");
  const [verifiedToken, setVerifiedToken] = useState("");
  const [phone_number,setPhoneNumber]=useState('')
  const { mutate: otpLogin, isLoading: loading } = useOtpLoginMutation();


  function handlePhoneNumberSubmit({ phone_number }: { phone_number: number }) {

    otpLogin(
      {
        phone_number,
      },
      {
        onSuccess: (data) => {
          if (data?.success) {
            setVerifiedPhoneNumber(phone_number);
            setPhoneNumber(data.phone_number);
          } else {
            setErrorMsg(data?.message);
          }
        },
        onError: (error: any) => {
          console.log(error.message);
        },
      }
    );
  }


  function handleTokenSubmit({ token, phone_number }: { token: string, phone_number: number }) {
    verifyOtpToken(
      {
        phone_number: verifiedPhoneNumber,
        token,
      },
      {
        onSuccess: (data) => {
          if (data?.token && data?.permissions?.length) {
            Cookies.set("auth_token", data.token, { expires: 10 });
            Cookies.set("auth_permissions", data.permissions, { expires: 10 });
           
            authorize();
            closeModal();
            return;
          }
          if (!data.token) {
            setErrorMsg(t("Invalid Otp"));
          }
        },
        onError: (error: any) => {
          console.log(error.message);
        },
      }
    );
  }

  // <input type="text" autocomplete="one-time-code" inputmode="numeric" />
{/* <script> */}


// </script>

  
 

  return (
    <div className="py-6 px-5 sm:p-4 bg-light w-screen md:max-w-md h-full md:h-auto flex flex-col justify-center">
      <div className="flex justify-center">
        <Logo />
      </div>
      <p className="text-center text-sm md:text-base leading-relaxed text-body mt-4 sm:mt-5 mb-7 sm:mb-10">
        {t("Otp Login")}
      </p>
      {
        verifiedPhoneNumber && !verifiedToken &&
        (<p className="text-center text-sm md:text-base leading-relaxed text-body mb-7 sm:mb-10">
          Verfication code has been sent to you on {phone_number}
        </p>)
      }

{/* <input type="text" autocomplete="one-time-code" inputmode="numeric" /> */}

      
      {errorMsg && (
        <Alert
          variant="error"
          message={errorMsg}
          className="mb-6"
          closeable={true}
          onClose={() => setErrorMsg("")}
        />
      )}
      {!verifiedPhoneNumber && (
        <EnterPhoneNumberView loading={isLoading} onSubmit={handlePhoneNumberSubmit} />
      )}
      {verifiedPhoneNumber && !verifiedToken && (
        <EnterTokenView loading={verifying} onSubmit={handleTokenSubmit} />
      )}
      {/* {verifiedPhoneNumber && verifiedToken && (
        <EnterNewPasswordView
          loading={resetting}
          onSubmit={handleResetPassword}
        />
      )} */}

      <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-0 sm:mt-11 mb-7 sm:mb-8">
        <hr className="w-full text-gray-500" />
        <span className="absolute start-2/4 -top-2.5 px-2 -ms-4 bg-light">
          {t("text-or")}
        </span>
      </div>
      <div className="text-sm sm:text-base text-body text-center">
        {t("text-no-account")}{" "}
        <button
          onClick={() => openModal("REGISTER")}
          className="ms-1 underline text-accent font-semibold transition-colors duration-200 focus:outline-none hover:text-accent-hover focus:text-accent-hover hover:no-underline focus:no-underline"
        >
          {t("Register here")}
        </button>
      </div>
    </div>
  );
};

export default OtpLogin;


export  function OtpLoginView() {
  const { t } = useTranslation('common');
  const { openModal } = useModalAction();

  return (
    <div className="flex flex-col justify-center w-screen h-screen px-5 py-6 bg-light sm:p-8 md:h-auto md:max-w-md md:rounded-xl">
      <div className="flex justify-center">
        <Logo />
      </div>
      <p className="mt-4 text-sm leading-relaxed text-center mb-7 text-body sm:mt-5 sm:mb-10 md:text-base">
        {t('otp-login-helper')}
      </p>
      <OtpLogin />
      <div className="relative flex flex-col items-center justify-center text-sm mt-9 mb-7 text-heading sm:mt-11 sm:mb-8">
        <hr className="w-full" />
        <span className="absolute -top-2.5 bg-light px-2 ltr:left-2/4 ltr:-ml-4 rtl:right-2/4 rtl:-mr-4">
          {t('text-or')}
        </span>
      </div>
      <div className="text-sm text-center text-body sm:text-base">
        {t('text-back-to')}{' '}
        <button
          onClick={() => openModal('LOGIN_VIEW')}
          className="font-semibold underline transition-colors duration-200 text-accent hover:text-accent-hover hover:no-underline focus:text-accent-hover focus:no-underline focus:outline-none ltr:ml-1 rtl:mr-1"
        >
          {t('text-login')}
        </button>
      </div>
    </div>
  );
}

// function authorize() {
//   throw new Error("Function not implemented.");
// }

// function closeModal() {
//   throw new Error("Function not implemented.");
// }

