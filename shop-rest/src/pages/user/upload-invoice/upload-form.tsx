import Layout from "@components/layout/layout";
import ProfileSidebar from "@components/profile/profile-sidebar";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import ErrorMessage from "@components/ui/error-message";
import Card from "@components/ui/card";
import { GetServerSideProps } from "next";
import { parseContextCookie } from "@utils/parse-cookie";
import Spinner from "@components/ui/loaders/spinner/spinner";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Input from "@components/ui/input";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import pick from "lodash/pick";
import { BillUpload, User } from "@ts-types/generated";
import FileInput from "@components/ui/file-input-bill";
import Label from "@components/ui/label";
import  Button  from "@components/ui/button";
import { toast } from "react-toastify";
import {uploadInvoiceValidationSchema} from '@data/bill-upload/use-invoice-validation-schema'
import { yupResolver } from "@hookform/resolvers/yup";
import { useInvocieUploadMutation } from "@data/bill-upload/use-bill-upload.query";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const cookies = parseContextCookie(context?.req?.headers?.cookie);
  if (!cookies?.auth_token) {
    return { redirect: { destination: "/", permanent: false } };
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common", "forms"])),
    },
  };
};


interface Props {
    user: BillUpload;
  }
  
  type UserFormValues = {
    name?: BillUpload["name"];
    address?: BillUpload["address"];
    shop_name?: BillUpload["shop_name"];
    shop_address?: BillUpload["shop_address"];
    shop_city?: BillUpload["shop_city"];
    bill_amount?: BillUpload["bill_amount"];
  };

export default function UploadBill({user} : Props) {

    const { register, handleSubmit,formState: { errors },reset,control } = useForm<UserFormValues>(
        {
            defaultValues: {
              ...(user &&
                pick(user, [
                  "name",
                  "address",
                  "shop_name",
                  "shop_address",
                  'shop_city',
                  'bill_amount',
                ])),
            },
            resolver: yupResolver(uploadInvoiceValidationSchema),
          }
        );
        
  const router = useRouter();

  const { t } = useTranslation("common");

  const { isLoading: loading, data, error } = useCustomerQuery();

  const { mutate: storeBill } =useInvocieUploadMutation();

  if (error) return <ErrorMessage message={error.message} />;


  function onSubmit(values: any) {
    console.log(values);
    storeBill(
      {
        name: values.name,
        address: values.address,
        shop_name: values.shop_name,
        shop_address: values.shop_address,
        shop_city: values.shop_city,
        bill_amount: values.bill_amount,
        bill:values.bill
      },
      {
        onSuccess: () => {
          toast.success(t("Thank You for Shopping through Local Shops, Your Wallet Will be Credited Within 24 Hours. In case of Any Query Please Call Us at +91 8427990450 "));
          reset();
          setTimeout(() => {
            router.push("/user/upload-invoice/")
          }, 1000);
        },
      }
    );
  }

  return (

    <>
    <div>
      <h3  className='mt-6 lg:mt-20 text-2xl lg:text-4xl font-semibold  text-transparent bg-clip-text bg-gradient-to-br from-pink-700 to-yellow-600  text-center'>Upload Invoice</h3>
    </div>

    <div className="flex flex-col xl:flex-row items-start max-w-full w-full mx-auto py-10 px-8 xl:py-14 xl:px-16 2xl:px-20 bg-gray-100">
        <ProfileSidebar className="flex-shrink-0 hidden xl:block xl:w-80 me-10"/>
        {/* End of sidebar navigation */}
        {loading ? (
            <Spinner showText={false} />
        ) : (

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full mr-20 items-center mx-auto align-center flex-col sm:flex-row sm:space-s-4 mb-6">
          <Card className="w-full grid grid-cols-1 items-center gap-4 md:grid md:grid-cols-2 space-y-4">
            <Input
              className="flex-1"
              label={t("text-name")}
              {...register("name")}
              error={errors.name?.message}
              required
              variant="outline"
              value={data?.me?.name}
            />

            <Input
              className="flex-1"
              label={t("text-address")}
              required
              {...register("address")}
              error={errors.address?.message}
              variant="outline"
            />
            
            <Input
              className="flex-1"
              label={t("Shop Name")}
              required
              error={errors.shop_name?.message}
              {...register("shop_name")}
              variant="outline"
            />

            <Input
              className="flex-1"
              label={t("Shop Address")}
              error={errors.shop_address?.message}
              required
              {...register("shop_address")}
              variant="outline"
            />

            <Input
              className="flex-1"
              label={t("Shop City")}
              error={errors.shop_city?.message}
              required
              {...register("shop_city")}
              variant="outline"
            />

            <Input
              className="flex-1"
              label={t("Bill Amount (without GST)")}
              error={errors.bill_amount?.message}
              required
              {...register("bill_amount")}
              variant="outline"
            />

             <div className="mb-8">
                 <Label>Upload bill</Label>
                 <FileInput control={control} name="bill" />
             </div>
             <Button>Submit</Button>
            

          </Card>
          
        </div>
        </form>
      )}
    </div>
    </>
  );
}

UploadBill.Layout = Layout;
