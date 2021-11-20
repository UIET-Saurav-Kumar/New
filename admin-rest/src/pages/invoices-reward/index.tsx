import Card from '@components/common/card'
import Input from '@components/ui/input'
import React from 'react'
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { BillCashback } from "@ts-types/generated";
import pick from "lodash/pick";
import { adminOnly } from "@utils/auth-utils";
import Layout from "@components/layouts/admin";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Button from '@components/ui/button';
import { yupResolver } from "@hookform/resolvers/yup";
import { invoiceRewardValidationSchema } from "../../pages/invoices-reward/validation-schema";
  import Description from "@components/ui/description";
  import { useCreateInvoiceRewardMutation } from "@data/invoice-reward/use-invoice-reward.mutation";
  import { useEffect } from "react";


interface FormValues {
  cashback: number;
  max_cashback: number;
  }

  const defaultValues = {
    cashback: 0,
    max_cashback: 0,
};

  type IProps = {
    initialValues?: BillCashback | null;
  };

export default function InvoicesReward({initialValues}:IProps) {

    const { t } = useTranslation("common");
    // const { mutate: registerInvoiceReward, isLoading: loading } = useCreateInvoiceRewardMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    shouldUnregister: true,
    defaultValues: initialValues?initialValues:defaultValues,
    resolver: yupResolver(invoiceRewardValidationSchema),
  });

  useEffect(()=>{
    if(initialValues){
      document.getElementById('cashback').value=initialValues?.cashback
      document.getElementById('max_cashback').value=initialValues?.max_cashback
    }
  },[initialValues])
  
  async function onSubmit({ cashback, max_cashback}: FormValues) {
    registerInvoiceReward(
      {
        variables: {
            cashback,
            max_cashback,
        },
      },
      {
        onError: (error: any) => {
          Object.keys(error?.response?.data).forEach((field: any) => {
            setError(field, {
              type: "manual",
              message: error?.response?.data[field][0],
            });
          });
        },
      }
    );
  }


    return (
        <>

        <div className='w-full  mb-10  px-auto '>
            {/* <h1 className='font-md text-xl'>Set Cashback</h1> */}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t("Invoices Cashback ")}
          details={("Set Cashback Amount")}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={("Cashback (%)")}
            {...register("cashback")}
            type="text"
            variant="outline"
            className="mb-4"
            placeholder='%'
            error={t(errors.cashback?.message!)}
          />

          <Input
            label={("Max Cashback upto (₹)")}
            {...register("max_cashback")}
            type="text"
            variant="outline"
            className="mb-4"
            placeholder='₹'
            error={t(errors.max_cashback?.message!)}
          />
        </Card>
      </div>

      <div className="mb-4 text-end">
        <Button >
          {("Create")}
        </Button>
      </div>
    </form>
        
        </>
    )
}
InvoicesReward.authenticate = {
  permissions: adminOnly,
};
InvoicesReward.Layout = Layout;
export const getStaticProps = async ({ locale }: any) => ({
    props: {
      ...(await serverSideTranslations(locale, ["form", "common", "table"])),
    },
  });