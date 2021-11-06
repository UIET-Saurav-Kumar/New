import React from 'react'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "@components/layouts/admin";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { SortDeliveries } from "@ts-types/generated";
import Card from "@components/common/card";
import SortForm from "@components/common/sort-form";
import Button from "@components/ui/button";
import TextArea from "@components/ui/text-area";
import Input from "@components/ui/input";
import Description from "@components/ui/description";

type DeliveryCost = {
  price: number;
 distance: number;
};


export default function DeliveryCost() {
    const { t } = useTranslation();
    const [deliveryBy, setDelivery] = useState("created_at");
    const [sortedBy, setColumn] = useState<SortDeliveries>(SortDeliveries.Desc);
    const onSubmit = (values: DeliveryCost) => {
      const input = {
        price: +values.price,
        distance: values.distance,
        
      };
  
      setCost(
        {
          variables: {
            input,
          },
        },
        {
          onError: (error: any) => {
            setErrorMessage(error?.response?.data?.message);
            animateScroll.scrollToTop();
          },
        }
      );
    };
    return (
        <>

<form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap my-5 sm:my-8">
          <Description
            title={("Description")}
            details={`${
              initialValues
                ? ("Edit")
                : ("Add")
            } ${("set delivery rate")}`}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8 "
          />

          <Card className="w-full sm:w-full md:w-2/3">
            <Input
              label={("Price")}
              {...register("price")}
              required
              error={t(errors.amount?.message!)}
              variant="outline"
              className="mb-5"
            />
            <Input
              label={("Distance")}
              {...register("distance")}
              error={t(errors.distance?.message!)}
              required
              variant="outline"
              className="mb-5"
            />
           
          </Card>
        </div>
        <div className="mb-4 text-end">
          {initialValues && (
            <Button
              variant="outline"
              onClick={router.back}
              className="me-4"
              type="button"
            >
              {("Back")}
            </Button>
          )}

          <Button loading={creating}>
            {initialValues
              ? ("Set price")
              : ("Set price")}
          </Button>
        </div>
      </form>
            
        </>
    )
}

DeliveryCost.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
    props: {
      ...(await serverSideTranslations(locale, ["table", "common", "form"])),
    },
  });
  