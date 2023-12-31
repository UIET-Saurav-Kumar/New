import { useState } from "react";
import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { useCheckout } from "@contexts/checkout.context";
import { useVerifyCouponMutation } from "@data/coupon/verify-coupon.mutation";
import { useTranslation } from "next-i18next";

const Coupon = () => {
  const { t } = useTranslation("common");
  const [hasCoupon, setHasCoupon] = useState(false);
  const {
    register,
    handleSubmit,
    setError,

    formState: { errors },
  } = useForm();
  const { mutate: verifyCoupon, isLoading: loading } =
    useVerifyCouponMutation();
  const { applyCoupon, coupon } = useCheckout();
  if (!hasCoupon && !coupon) {
    return (
      <p
        role="button"
        className="text-xs font-bold text-body transition duration-200 hover:text-accent"
        onClick={() => setHasCoupon(true)}
      >
        {t("Do you have coupon?")}
      </p>
    );
  }
  async function onSubmit({ code }: { code: string }) {
    verifyCoupon(
      {
        code,
      },
      {
        onSuccess: (data) => {
          if (data.is_valid) {
            applyCoupon(data.coupon);
            setHasCoupon(false);
          } else {
            setError("code", {
              type: "manual",
              message: "error-invalid-coupon",
            });
          }
        },
      }
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="w-full flex flex-col sm:flex-row"
    >
      <Input
        {...register("code", { required: "text-coupon-required" })}
        placeholder={t("text-enter-coupon")}
        variant="outline"
        className="mb-4 sm:mb-0 sm:me-4 flex-1"
        dimension="small"
        error={t(errors?.code?.message!)}
      />
      <Button
        loading={loading}
        disabled={loading}
        size="small"
        className="w-full sm:w-40 lg:w-auto"
      >
        {t("text-apply")}
      </Button>
    </form>
  );
};

export default Coupon;
