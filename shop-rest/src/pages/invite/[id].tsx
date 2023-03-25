
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import { useRegisterMutation } from "@data/auth/use-register.mutation";
import Logo from "@components/ui/logo";
import Alert from "@components/ui/alert";
import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useUI } from "@contexts/ui.context";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useModalAction } from "@components/ui/modal/modal.context";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useLocation } from "@contexts/location/location.context";

import { maskPhoneNumber } from "@utils/mask-phone-number";

import LoginForm from "./loginform";
import GetCurrentLocation from "@components/geoCode/get-current-location";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Label } from "@headlessui/react/dist/components/label/label";
import Radio from "@components/ui/radio/radio";
import http from "@utils/api/http";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import url from "@utils/api/server_url";
import { useCustomerQuery } from "@data/customer/use-customer.query";


type FormValues = {
  name: string;
  email: string;
  password: string;
  id:number;
  phone_number:number;
  current_location:string;
  date_of_birth:Date;
  occupation: string;
  gender: 'male' | 'female';
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
  };
};

  
const registerFormSchema = yup.object().shape({
  name: yup.string().required(" Name required"),
  email: yup
    .string()
    .email("error-email-format")
    .required(" Email required"),
  password: yup.string().required(" Password required"),
  phone_number:yup.string()
                .max(10, "Phone number should be of 10 digits only")
                .min(10, 'Phone number should be of 10 digits only')
                .required("error-contact-required")
                .matches(/^[0-9]{10}$/, "Invalid phone number"),
                current_location : yup.string().required('Please Enter your city'),
                date_of_birth: yup.string().required('Please enter your date of birth')
                // based on date of birth calculate age and if age is less than 18 then show error




                
});








 


const RegisterForm = () => {

  const {getLocation} =useLocation()

  const defaultValues = {
    name: "",
    email: "",
    password: "",
    phone_number:"",
    current_location:getLocation?.formattedAddress,
    date_of_birth:'',
    occupation:'',
    gender:'male'
  };

  // console.log('getLoc', getLocation)

  const { t } = useTranslation("common");
  const { mutate, isLoading: loading } = useRegisterMutation();
  const [errorMsg, setErrorMsg] = useState("");
  const { query } = useRouter();

  const {data} = useCustomerQuery();

 
  const [userLocation, setUserLocation] = useState('');

  
  const memoizedLocation = useMemo(async () => {
    const { data: response } = await http.get(
      `${url}/${API_ENDPOINTS.IP_LOCATION}`
    );
    return response;
  }, []);
  
  useEffect(()=>{
    const getIpLocation = async () => {
      const response = await memoizedLocation;
      setUserLocation(response?.city+","+response?.region_name);
    }
    getIpLocation();
  },[ userLocation]);

  const [birthDate, setBirthDate] = useState(null);
  const {
    register,
    handleSubmit,
    setError,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(registerFormSchema),
  });
  const router = useRouter();
  const { authorize } = useUI();
  const { closeModal, openModal } = useModalAction();
  function handleNavigate(path: string) {
    router.push(`/${path}`);
    closeModal();
  }
  function getPhoneNumber(value:any){
    return value;
  }
  function onSubmit({ name, email, password ,phone_number, current_location, date_of_birth, gender, occupation}: FormValues) {
    mutate(
      {
        name,
        email,
        password,
        invited_by:query.id,
        phone_number,
        current_location : userLocation,
        date_of_birth,
        occupation,
        gender,
      },
      {
        onSuccess: (data) => {
          if(data.user){
            router.push('/auth/'+data.user.id+'?inviter='+query?.id);
          }
          return ;
          if (data?.token && data?.permissions?.length) {
            Cookies.set("auth_token", data.token);
            Cookies.set("auth_permissions", data.permissions);
            authorize();
            router.push('/');
            return;
          }
          if (!data.token) {
            setErrorMsg(t("error-credential-wrong"));
          }
        },
        onError: (error) => {
          const {
            response: { data },
          }: any = error ?? {};
          Object.keys(data).forEach((field: any) => {
            setError(field, {
              type: "manual",
              message: data[field][0],
            });
          });
        },
      }
    );
  }

  function changeLocation(data:any){

    // data.length ? setLocation(false) : setLocation(false)

    // console.log('address data',data)
    var location=JSON.stringify(data);
    // console.log(data?.formattedAddress);
    // document.getElementById("location_id").value = data?.formattedAddress;
    // setLocation(data?.formattedAddress);

    // if(location){
    //     setHasLoction(true);
        
    // }

    var { query ,pathname} = router;
    var pathname="/"+router.locale+pathname
    
    router.push(
    {
        pathname,
        query: query,
    },
    {
        pathname,
        query: query,
    },
    );
    // handleLocation()
}


  const [click, setClick] = useState(false);

  return (

    <div className="flex items-center h-full justify-center bg-white sm:bg-gray-100 " >
        
        { !click ? <div className="py-6 px-5 sm:p-8 bg-light  flex flex-col justify-center">
            
            <div className="flex justify-center">
                <Logo />
            </div>

              <p className="text-center text-sm md:text-base leading-relaxed px-2 sm:px-0 text-body mt-4 sm:mt-5 mb-7 sm:mb-10">
                  {/* {t("registration-helper")} */}
                  By signing up, you agree to our
                  <span
                    onClick={() => handleNavigate("terms")}
                    className="mx-1 underline cursor-pointer text-accent hover:no-underline"
                    >
                    {/* {t("Terms")} */}
                    Terms
                  </span>
                  &
                  <span
                    onClick={() => handleNavigate("privacy")}
                    className="ms-1 underline cursor-pointer text-accent hover:no-underline"
                    >
                    {/* {t("Policy")} */}
                    Policy
                  </span>
                  <h4 className="font-semibold text-magenta text-xl mt-5">Register form</h4>
              </p>

              
            {errorMsg && (
                <Alert
                  variant="error"
                  message={t(errorMsg)}
                  className="mb-6"
                  closeable={true}
                  onClose={() => setErrorMsg("")}
                />
            )}

    <form className="grid grid-cols-2 text-xs gap-2 lg:gap-4 -mt-16 place-content-center" 
            onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          // label={t("Name")}
          label={t("Name")}
          {...register("name")}
          type="text"
          variant="outline"
          className="mb-2 lg:mb-5"
          error={t(errors.name?.message!)}
        />
        <Input
    
          // label={t("Email")}
          label={t("Email")}
          {...register("email")}
          type="email"
          variant="outline"
          className="mb-2 lg:mb-5"
          error={t(errors.email?.message!)}
        />
        <PasswordInput
          label={t("Password")}
          {...register("password")}
          error={t(errors.password?.message!)}
          variant="outline"
          className="mb-2 col-span-1 sm:col-span-1 lg:mb-5"
        />


        <div className="col-span-1 sm:col-span-1">
        
        <div className="flex  text-body-dark h-3  font-semibold text-xs leading-none mb-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-600 to-blue-600">
              🎉Your Birthday present is awaiting  </span> 🥳</div>
          <Controller
                  control={control}
                  name="date_of_birth"
                  render={({ field: { onChange, onBlur, value } }) => (
                    //@ts-ignore
             <DatePicker
                        selected={birthDate}
                        onChange={(date) => {
                          setBirthDate((date));
                          setValue("date_of_birth", date);
                        }}
                        dateFormat="dd-MM-yyyy"
                        className="text-sm h-12 w-full px-4 border border-border-base rounded focus:border-accent"
                        showYearDropdown
                        showMonthDropdown
                        dropdownMode="select"
                        peekNextMonth
                        showWeekNumbers
                        minDate={new Date(1970,1,1)}
                        maxDate={new Date(2005,12,31)}
                        placeholderText={t(" DOB (min 18 years of age)")}
                        required
                        // className="w-full"
                  />          
                  )}
            />
        </div>


        <Input
          label={"Phone Number"}
          {...register("phone_number")}
          type="text"
          inputMode="numeric"
          variant="outline"
          className="mb-2 lg:mb-5 text-xs "
          onChange={(e) => setValue("phone_number", getPhoneNumber(e.target.value))}
          error={t(errors.phone_number?.message!)}
        />

        <div className="flex flex-col">
        <div className="flex   text-body-dark h-3  font-semibold text-xs leading-none mb-3">Gender
        </div>
          <div className="flex items-center space-x-4 lg:space-x-8  ">
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


          <Input
              // value={getLocation?.formattedAddress}
            label={"Current Location"} 
            {...register("current_location")} 
            type="text" 
            // onChange={(e)=>e?.target?.value}
            variant="outline" 
            className="col-span-1   text-xs " 
            required
          
            error={t(errors.current_location?.message!)} />

          <div className="flex flex-col  items-start col-span-2 ">
            <span className="text-xs text-gray-600 mb-2 font-semibold">Occupation</span>
              <select
                    className="  text-gray-600 py-3.5 w-full text-sm items-center mr-4 bg-white border border-gray-200 rounded flex "
                    // onChange={(e) => setOccupation(e.target.value)}
                    // value={occupation}
                    defaultValue="Search by"
                    // setValue={setValue}
                    {...register("occupation")}
                  
                  >
                    <option value="" disabled selected>Select your option</option>
                    <option value="Student">{t("Student")}</option>
                    {/* <option value="email">{t("form:input-label-email")}</option> */}
                    <option value="Employed">{t("Employed")}</option>
                    <option value='Self employed'>Self employed</option>
                    <option value='Home Maker'>Home Maker</option>
              </select> 
        </div>
         

      <div className="">
         {/* <GetCurrentLocation onChange={changeLocation} />   */}
         <div className="mt-15">
          <Button className="w-full h-12 mx-20  sm:mx-0 mt-10" 
          variant="outline"
          loading={loading} disabled={loading}>
            {t("Register")}
          </Button>
        </div>
      </div>
      

       
    </form>
            {/* End of forgot register form */}

            <div className="flex flex-col items-center justify-center  relative text-sm text-heading  sm:mt-11 mb-6 sm:mb-8">
                <hr className="w-full" />
                <span className="absolute start-2/4 -top-2.5 px-2 -ms-4 bg-light">
                {t("or")}
                </span>
            </div>
            <div className="text-sm sm:text-base text-body text-center">
                {t(" Already have an account?")}{" "}
                <button onClick={() => setClick(!click)}
                  className="ms-1 underline text-accent font-semibold transition-colors duration-200 focus:outline-none hover:text-accent-hover focus:text-accent-hover hover:no-underline focus:no-underline"
                  >
                  {t(" Login")}
                </button>
            </div>
        </div> : <LoginForm />}
    </div>
  );
};

export default RegisterForm;
