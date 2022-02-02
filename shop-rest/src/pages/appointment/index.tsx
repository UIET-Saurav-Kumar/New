
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
<<<<<<< HEAD



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
=======
import PromotionSlider from "@components/common/promotion-slider";




>>>>>>> 379c0a331c6e3cb535c58f9ce558ade9263f8959



const contactFormSchema = yup.object().shape({
<<<<<<< HEAD
  name: yup.string().required("error-name-required"),
  email: yup
    .string()
    .email("error-email-format")
    .required("error-email-required"),
  subject: yup.string().required("error-mobile-required"),
  description: yup.string().required("error-city-required"),
=======
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("invalid email address")
    .required("Email is required"),
  subject: yup.string().required("Mobile Number required"),
  description: yup.string().required("City required"),
>>>>>>> 379c0a331c6e3cb535c58f9ce558ade9263f8959
});




interface Props {
    user: ContactUpload;
  }
  
  type UserFormValues = {
    name?: ContactUpload["name"];
    email?: ContactUpload["email"];
    subject?: ContactUpload["subject"];
    description?: ContactUpload["description"];
<<<<<<< HEAD
    campaign?: ContactUpload["campaign"];
=======
>>>>>>> 379c0a331c6e3cb535c58f9ce558ade9263f8959
  };

export default function Appointment({user} : Props) {

    const { register, handleSubmit,formState: { errors },reset,control } = useForm<UserFormValues>(
        {
            defaultValues: {
              ...(user &&
                pick(user, [
<<<<<<< HEAD
                    'campaign',
=======
>>>>>>> 379c0a331c6e3cb535c58f9ce558ade9263f8959
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

<<<<<<< HEAD
  const { isLoading, data, error } = useCustomerQuery();

  const { mutate: storeContact } =useContactUploadMutation();

  if (error) return <ErrorMessage message={error.message} />;
=======
  // const { isLoading, data, error } = useCustomerQuery();

  const { mutate: storeContact } =useContactUploadMutation();

  // if (error) return <ErrorMessage message={error.message} />;
>>>>>>> 379c0a331c6e3cb535c58f9ce558ade9263f8959


  function onSubmit(values: any) {

    storeContact(
      {
<<<<<<< HEAD
          campaign: 'Salon',
=======
>>>>>>> 379c0a331c6e3cb535c58f9ce558ade9263f8959
        name: values.name,
        email: values.email,
        subject: values.subject,
        description: values.description,
      },

      {
        onSuccess: () => {
<<<<<<< HEAD
          toast.success(t("Thank You. Our team will get back to you soon."));
=======
          toast.success(t("Thank You. Our team will contact you soon."));
>>>>>>> 379c0a331c6e3cb535c58f9ce558ade9263f8959
          reset();
          setTimeout(() => {
            router.push("/home")
          }, 1000);
        },
      }
    );

  }
<<<<<<< HEAD
  
  return (
    
    <div className="w-full ">
=======

  function handleClick(e: any) {
    e.preventDefault();
    router.push("/shops?category=Salon - Spa");
  }
  
  return (
    
    <div className="w-full">
>>>>>>> 379c0a331c6e3cb535c58f9ce558ade9263f8959
        <div className=" flex w-full p-3 h-16 shadow-lg sticky mt-0">
            <Logo/>
        </div>

        <div className="w-full">
<<<<<<< HEAD
            <div className="flex p-2 h-96 items-center ">
               {/* <Logo/> */}
               <img src='/bn.jpg' className="h-full object-contain w-full" />
            </div>
            <div>

            </div>
=======
            <div className="flex p-2  items-center ">
               {/* <Logo/> */}
               <img src='/ad-banner.jpg' className=" block w-full object-contain " />
               {/* <img onClick={handleClick} src='/salon-chd.jpg' className="w-full cursor-pointer flex object-contain -mr-72 lg:object-contain  lg:h-100" /> */}
            </div>
            
        </div>
        <div className=" border-b space-y-4 mt-5 py-5">
              <p className="font-sans text-xl  pl-2 lg:pl-10 ">Top Salon Brands </p>
              <PromotionSlider/>

>>>>>>> 379c0a331c6e3cb535c58f9ce558ade9263f8959
        </div>

      <div className="flex flex-col md:flex-row max-w-7xl w-full mx-auto   xl:py-14 xl:px-8 2xl:px-14">

        
        {/* Contact form */}
<<<<<<< HEAD
        <div className="w-full order-1 md:order-2 mb-8 md:mb-0 md:ms-7 lg:ms-9 p-5 md:p-8 bg-light">
                 <div className="text-center font-sans text-lg">
                     <p>
                         Book Now
                     </p>
                 </div>
                 <div className="bg-gray-50 shadow-xl p-16">
          <form className="grid grid-cols-1 -mt-10 sm:grid-cols-2 gsp-2   lg:gap-10" onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-2"> */}
            {/* <Input
                label={t("Campaign")}
                {...register("campaign")}
                variant="outline"
                // value='Saloon'
                defaultValue='salon'
                error={t(errors.name?.message!)}
              /> */}
              <Input
                label={t("text-name")}
=======
        <div className="w-full order-1 md:order-2 drop-shadow-2xl  mb-8 md:mb-0 md:ms-7 lg:ms-9 p-5 md:p-8 bg-light">
          <div className="">
            
          </div>
                 <div className="text-center mb-8 font-sans w-full mx-auto flex items-center  font-normal text-lg lg:text-2xl">
                  
                     <p className="text-gray-700 flex  mx-auto items-center ">
                     {/* <img src='/hurry-up.png' className="w-24 h-24"/> */}
                         <p className="flex flex-col"><span><span className="text-red-600">Free</span>, Book your slot now</span>
                         <span className="text-red-600 rounded-full text-sm  animate-pulse">Only 10 slots left</span></p>
                     </p> 

                 </div>
          <form className="grid grid-cols-1 border shadow-xl -mt-8 p-4 sm:grid-cols-2 gap-1" onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-2"> */}
              <Input
                label={t("Name")}
>>>>>>> 379c0a331c6e3cb535c58f9ce558ade9263f8959
                {...register("name")}
                variant="outline"
                error={t(errors.name?.message!)}
              />
              <Input
<<<<<<< HEAD
                label={t("text-email")}
=======
                label={t("Email")}
>>>>>>> 379c0a331c6e3cb535c58f9ce558ade9263f8959
                {...register("email")}
                type="email"
                variant="outline"
                error={t(errors.email?.message!)}
              />
           
<<<<<<< HEAD

=======
>>>>>>> 379c0a331c6e3cb535c58f9ce558ade9263f8959
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
            
<<<<<<< HEAD
          </form>
          
          {/* <div className="mt-6 w-full justify-center  border flex"> */}
              <Button loading={isLoading} disabled={isLoading}>
                {t("text-submit")}
              </Button>
            {/* </div> */}
          </div>

         
        </div>
      </div>
      <div className=" flex w-full items-center font-sans text-lg px-11">
              <img src='/salon-ad.jpeg' className="h-full w-full object-cover"/>
              </div>
=======
            <Button className="mt-4" >
              {t("Submit")}
            </Button>

            <span className="font-sans flex w-full 
                             items-end text-green-600"> 
               <p className=" text-center  font-normal text-gray-700 text-sm mt-4 lg:text-right w-full"> 
                  Any queries?<p className=" text-center text-sm  text-gray-800 mt-4 lg:text-right w-full">
                  Call us/Whatsapp - <a href='tel:84279-90450' className="hover:underline text-blue-800"> 84279-90450</a>
               </p>
               </p>
               
            </span>

          </form>

          <div className="text-center mt-10 font-sans text-lg">
              <img src='/salon-ad.jpeg' className="h-full object-cover"/>
          </div>

        </div>
      </div>
>>>>>>> 379c0a331c6e3cb535c58f9ce558ade9263f8959
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
