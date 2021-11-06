import React from 'react'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "@components/layouts/admin";
import { useTranslation } from "next-i18next";

export default function Delivery() {
    const { t } = useTranslation();

    return (
        <div>
            
        </div>
    )
}

Delivery.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
    props: {
      ...(await serverSideTranslations(locale, ["table", "common", "form"])),
    },
  });
  
