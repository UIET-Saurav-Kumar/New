import Layout from "@components/layout/layout";
import ProfileSidebar from "@components/profile/profile-sidebar";
import ProfileForm from "@components/profile/profile-form";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import ErrorMessage from "@components/ui/error-message";
import Address from "@components/address/address";
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
import FileInput from "@components/ui/file-input";
import Label from "@components/ui/label";
import  Button  from "@components/ui/button";
import { toast } from "react-toastify";
import { useBillUploadMutation } from "@data/bill-upload/use-bill-upload.query";

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

    const { register, control } = useForm<UserFormValues>(
        {
            defaultValues: {
              ...(user &&
                pick(user, [
                  "name",
                  "address",
                  "shop-name",
                  "shop-address",
                  'shop-city',
                  'bill-amount',
                ])),
            },
          }
        );

        

  const { t } = useTranslation("common");

  const { isLoading: loading, data, error } = useCustomerQuery();

  const { mutate: createProfile } =
    useBillUploadMutation();

  if (error) return <ErrorMessage message={error.message} />;


  function onSubmit(values: any) {
    createProfile(
      {
       
        name: values.name,
        address: values.address,
        shop_name: values.shop_name,
        shop_address: values.shop_address,
        shop_city: values.shop_city,
        bill_amount: values.bill_amount,
        
      },
      {
        onSuccess: () => {
          toast.success(t("Thank You for Shopping through Local Shops, Your Wallet Will be Credited Within 24 Hours. In case of Any Query Please Call Us at +91 8427990450 "));
        },
      }
    );
  }

  return (

    <div className="flex flex-col xl:flex-row items-start max-w-1920 w-full mx-auto py-10 px-8 xl:py-14 xl:px-16 2xl:px-20 bg-gray-100">
        <ProfileSidebar className="flex-shrink-0 hidden xl:block xl:w-80 me-10" />
        {/* End of sidebar navigation */}
        {loading ? (
            <Spinner showText={false} />
        ) : (

            <form onSubmit={onSubmit}>
        <div className="flex w-full mr-20  flex-col sm:flex-row sm:space-s-4 mb-6">
          {/* <div className="mb-8">
            <ProfileForm user={data?.me} />
          </div> */}
          <Card className="w-full grid grid-cols-1 items-center gap-4 md:grid md:grid-cols-2 space-y-4">

          {/* <div className=' grid grid-cols-1  md:grid md:grid-cols-2  md:justify-between space-x-10'> */}
            
            <Input
              className="flex-1"
              label={t("text-name")}
              {...register("name")}
              //error={error.message}
              required
              variant="outline"
              value={data?.me?.name}
            />

            <Input
              className="flex-1"
              label={t("text-address")}
              required
              {...register("address")}
            //   error='Please enter this field'
              variant="outline"
            />
            {/* </div> */}

            {/* <div className=' flex flex-cols items-center md:grid md:grid-cols-2  justify-between space-x-10'> */}
            
            <Input
              className="flex-1"
              label={t("Shop Name")}
              required
            //   error='Please enter this field'
              {...register("shop_name")}
              variant="outline"
            />

            <Input
              className="flex-1"
              label={t("Shop Address")}
            //   error='Please enter this field'
              required
              {...register("shop_address")}
              variant="outline"
            />

            <Input
              className="flex-1"
              label={t("Shop City")}
            //   error='Please enter this field'
              required
              {...register("shop_city")}
              variant="outline"
            />

            <Input
              className="flex-1"
              label={t("Bill Amount (without GST)")}
            //   error='Please enter this field'
              required
              {...register("bill_amount")}
              variant="outline"
            />

          
            {/* </div> */}

             <div className="mb-8">
                 <Label>Upload bill</Label>
                 <FileInput control={control} name="bill"/>
                 {/* <input type='file' accept='image/*' capture className='h-16 w-96 border'/> */}
             </div>
             <Button>Submit</Button>
            
             {/* </div> */}

          </Card>
          
        </div>
        </form>
      )}
    </div>
  );
}

UploadBill.Layout = Layout;
