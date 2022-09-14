import Card from "@components/common/card";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import WithdrawList from "@components/withdraw/withdraw-list";
import LinkButton from "@components/ui/link-button";
import ShopLayout from "@components/layouts/shop";
import router, { useRouter } from "next/router";
import { adminAndOwnerOnly } from "@utils/auth-utils";
import { useShopQuery } from "@data/shop/use-shop.query";
import { useWithdrawsQuery } from "@data/withdraw/use-withdraws.query";
import { useState } from "react";
import { SortOrder } from "@ts-types/generated";
import SortForm from "@components/common/sort-form";
import Button from "@components/ui/button";
import PasswordInput from "@components/ui/password-input";
import Input from "@components/ui/input";
import Radio from "@components/ui/radio/radio";
import Form from "@components/signup-offers/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useRegisterMutation } from "@data/auth/use-register.mutation";

 
 

export default function WhatsappCampaign() {

  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("created_at");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  const router = useRouter();

  const {
    query: { shop },
  } = useRouter();

  const { data: shopData } = useShopQuery(shop as string);
  const shopId = shopData?.shop?.id!;


  function getPhoneNumber(value:any){
    return value;
  }


  const registerFormSchema = yup.object().shape({
    name: yup.string().required(" Name required"),
    email: yup
      .string()
      .email("error-email-format")
      .required(" Email required"),
    password: yup.string().required(" Password required"),
    phone_number:yup.string().max(10, "Phone number should be of 10 digits only").min(10, 'Phone number should be of 10 digits only').required("error-contact-required").matches(/^[0-9]{10}$/, "Invalid phone number"),
    // current_location:yup.string().required("error-location-required"),
  });

  
  const {
    register,
    handleSubmit,
    setError,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    // defaultValues,
    resolver: yupResolver(registerFormSchema),
  });
 

  return (

    <div className="bg">
        <h1 className="font-semibold text-3xl text-gray-700 tracking-normal font-sans text-center">
            Re-target your shop visitors with exciting offers using whatsapp platform
        </h1>
      {/* <Card className="flex flex-col md:flex-row items-center justify-between mb-8">

        <form className="grid grid-cols-2   gap-2 -mt-6 gap-x-1 place-content-center" 
            onSubmit={handleSubmit(onSubmit)} noValidate>

        {/* name */}
        <form className="grid grid-cols-2 w-1/2 mt-10 h-1/2 mx-auto  gap-3  gap-x-1 place-content-center" 
             noValidate>

        <Input 
          // label={t("Name")}
          label={t("Name")}
          {...register("name")}
          type="text"
          shadow={true}
          variant="rounded"
          className="mb-2 lg:mb-5 col-span-2 "
          error={t(errors.name?.message!)}
        />

        {/* email */}
        <Input
    
          // label={t("Email")}
          label={t("Email")}
          {...register("email")}
          type="email"
          shadow={true}
          variant="rounded"
          className="mb-2 lg:mb-5 col-span-2"
          error={t(errors.email?.message!)}
        />

        {/* password */}
        

        {/* Date of birth */}
       

        {/* phone number */}
        <Input
          label={"Phone Number"}
          {...register("phone_number")}
          type="text"
          inputMode="numeric"
          variant="rounded"
          className="mb-2 lg:mb-5 "
          onChange={(e) => setValue("phone_number", getPhoneNumber(e.target.value))}
          error={t(errors.phone_number?.message!)}
        />

         

        <div className="flex flex-col  items-start ">
            <span className="text-sm lg:text-md text-gray-700 mb-2 font-semibold">Occupation</span>
              <select
                    className="px-3 rounded-full text-gray-700 py-3.5 w-full text-sm items-center mr-4 bg-gray-100   focus:border-gray-400   flex "
                    // onChange={(e) => setOccupation(e.target.value)}
                    // value={occupation}
                    defaultValue="Search by"
                    // setValue={setValue}
                    {...register("occupation")}
                    placeholder="Search by"
                  >
                    <option value="" disabled selected>Select your option</option>
                    <option value="Student">{t("Student")}</option>
                    {/* <option value="email">{t("form:input-label-email")}</option> */}
                    <option value="Employed">{t("Employed")}</option>
                    <option value='Self employed'>Self employed</option>
                    <option value='Home Maker'>Home Maker</option>
              </select> 
        </div>

        <div className="flex flex-col">
              <div className="flex  text-gray-700 h-3  font-semibold text-sm lg:text-md leading-none mb-3">
                Gender
              </div>
              <div className="flex p-4 rounded-full bg-gray-100 focus:border-gray-400 items-center space-x-4 lg:space-x-8 ">
                <Radio
                  id="male"
                  type="radio"
                  {...register("gender")}
                  value="male"
                  label={t("Male")}
                  className=""
                />

                <Radio
                  id="female"
                  type="radio"
                  {...register("gender")}
                  value="female"
                  label={t("Female")}
                  className=""
                />
              </div>
          </div>
        
        {/* current location */}
       {/* <div className="w-full flex  "> */}
         
      {/* </div>  */}

          {/* </div> */}
         

      {/* <div className=""> 
         <GetCurrentLocation onChange = {changeLocation} />  
          
      </div> */}

      <PasswordInput
          // label={t("Password")}
          label={t("Password")}
          {...register("password")}
          error={t(errors.password?.message!)}
          variant="rounded"
          className="mb-2 lg:mb-5 col-span-2"
        />

        <div className="w-full    flex mt-15">
            <Button className=" flex justify-center w-full rounded-full " 
            // variant="rounded"
            size="big"
            // loading={loading} disabled={loading}
            >
              
              {t("Register")}
            </Button>
        </div>
      
      </form>
      

    </div>
  );
}

WhatsappCampaign.authenticate = {
  permissions: adminAndOwnerOnly,
};
WhatsappCampaign.Layout = ShopLayout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["table", "common", "form"])),
  },
});
 

