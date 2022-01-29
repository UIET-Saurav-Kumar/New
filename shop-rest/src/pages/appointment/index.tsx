
import Input from "@components/ui/input";
import Layout from "@components/layout/layout";
import { useForm } from "react-hook-form";
import TextArea from "@components/ui/text-area";
import Button from "@components/ui/button";
import { useContactMutation } from "@data/customer/use-contact.mutation";
import { siteSettings } from "@settings/site.settings";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { parseContextCookie } from "@utils/parse-cookie";
import pick from "lodash/pick";
import { useRouter } from "next/router";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import ErrorMessage from "@components/ui/error-message";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { ContactUpload, User } from "@ts-types/generated";
import { toast } from "react-toastify";
import { useContactUploadMutation } from "@data/contact/use-contact-upload.query";
import  Logo  from "@components/ui/logo";
import Footer from "@components/footer/Footer";



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



const contactFormSchema = yup.object().shape({
  name: yup.string().required("error-name-required"),
  email: yup
    .string()
    .email("error-email-format")
    .required("error-email-required"),
  subject: yup.string().required("error-subject-required"),
  description: yup.string().required("error-description-required"),
});




interface Props {
    user: ContactUpload;
  }
  
  type UserFormValues = {
    name?: ContactUpload["name"];
    email?: ContactUpload["email"];
    subject?: ContactUpload["subject"];
    description?: ContactUpload["description"];
  };

export default function Appointment({user} : Props) {

    const { register, handleSubmit,formState: { errors },reset,control } = useForm<UserFormValues>(
        {
            defaultValues: {
              ...(user &&
                pick(user, [
                  "name",
                  'email',
                  'subject',
                  'description',
                ])),
            },
            resolver: yupResolver(contactFormSchema),
          }
        );
        
  const router = useRouter();

  const { t } = useTranslation("common");

  const { isLoading, data, error } = useCustomerQuery();

  const { mutate: storeContact } =useContactUploadMutation();

  if (error) return <ErrorMessage message={error.message} />;


  function onSubmit(values: any) {

    storeContact(
      {
        name: values.name,
        email: values.email,
        subject: values.subject,
        description: values.description,
      },

      {
        onSuccess: () => {
          toast.success(t("Thank You. Our team will contact you soon."));
          reset();
          setTimeout(() => {
            router.push("/home")
          }, 1000);
        },
      }
    );

  }
  
  return (
    
    <div className="w-full">
        <div className=" flex w-full p-3 h-16 shadow-lg sticky mt-0">
            <Logo/>
        </div>

        <div className="w-full">
            <div className="flex p-2  items-center ">
               {/* <Logo/> */}
               <img src='/bn.jpg' className="w-full object-contain h-full" />
            </div>
            <div>

            </div>
        </div>

      <div className="flex flex-col md:flex-row max-w-7xl w-full mx-auto   xl:py-14 xl:px-8 2xl:px-14">

        
        {/* Contact form */}
        <div className="w-full order-1 md:order-2 mb-8 md:mb-0 md:ms-7 lg:ms-9 p-5 md:p-8 bg-light">
                 <div className="text-center font-sans text-lg">
                     <p>
                         Book Now
                     </p>
                 </div>
          <form className="grid grid-cols-1 -mt-10 sm:grid-cols-2 gap-2" onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-2"> */}
              <Input
                label={t("text-name")}
                {...register("name")}
                variant="outline"
                error={t(errors.name?.message!)}
              />
              <Input
                label={t("text-email")}
                {...register("email")}
                type="email"
                variant="outline"
                error={t(errors.email?.message!)}
              />
           

            <Input
              label={t("Mobile Number")}
              {...register("subject")}
              variant="outline"
              className=""
              error={t(errors.subject?.message!)}
            />

            <Input
              label={t("City")}
              {...register("description")}
              variant="outline"
              className=""
              error={t(errors.description?.message!)}
            />
            

            <Button loading={isLoading} disabled={isLoading}>
              {t("text-submit")}
            </Button>

          </form>

          <div className="text-center font-sans text-lg">
              <img src='/salon-ad.jpeg' className="h-full object-cover"/>
              </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

// Appointment.Layout = Layout;


// export const getStaticProps = async ({ locale }: any) => {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ["common"])),
//     },
//   };
// };
