import Button from "@components/ui/button";
import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import { Controller, useForm } from "react-hook-form";
import Card from "@components/common/card";
import Description from "@components/ui/description";
import { useCreateUserMutation } from "@data/user/use-user-create.mutation";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { customerValidationSchema } from "./user-validation-schema";
import Radio from "@components/ui/radio/radio";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


type FormValues = {
  name: string;
  email: string;
  password: string;
  phone_number: number;
  current_location: string;
  gender:string,
  date_of_birth: Date,
  occupation:string,
};

const defaultValues = {
  email: "",
  password: "",
  phone_number: '',
  current_location: '',
  gender:'',
  date_of_birth:'',
  occupation: ''
};

const CustomerCreateForm = () => {
  const { t } = useTranslation();
  const { mutate: registerUser, isLoading: loading } = useCreateUserMutation();
  const [birthDate, setBirthDate] = useState(null);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    control,

    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(customerValidationSchema),
  });

  async function onSubmit({ name, email, password,phone_number,current_location,gender,date_of_birth,occupation }: FormValues) {
    registerUser(
      {
        variables: {
          name,
          email,
          password,
          phone_number,
          current_location,
          gender,
          date_of_birth,
          occupation,
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
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t("form:form-title-information")}
          details={t("form:customer-form-info-help-text")}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t("form:input-label-name")}
            {...register("name")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.name?.message!)}
          />
          <Input
            label={t("form:input-label-email")}
            {...register("email")}
            type="email"
            variant="outline"
            className="mb-4"
            error={t(errors.email?.message!)}
          />
         
          <Input
            label={t("Phone number")}
            {...register("phone_number")}
            type="number"
            variant="outline"
            className="mb-4"
            error={t(errors.phone_number?.message!)}
          />

           <div className="col-span-2 my-3 sm:col-span-1">
        
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
                        minDate={new Date(1900, 1, 1)}
                        maxDate={new Date()}
                        placeholderText={t("your date of birth")}
                        // className="w-full"
                  />    
                      )}
                />
        </div>

         <div className="flex flex-col my-3">
            <div className="flex   text-body-dark h-3  font-semibold text-xs leading-none mb-3">
              Gender
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

          <div className="flex flex-col  items-start ">
            <span className="text-xs text-gray-600 mb-2 font-semibold">Occupation</span>
              <select
                    className="  text-gray-600 py-3.5 w-full text-sm items-center mr-4 bg-white border border-gray-200 rounded flex "
                    // onChange={(e) => setOccupation(e.target.value)}
                    // value={occupation}
                    defaultValue="Search by"
                    // setValue={setValue}
                    {...register("occupation")}
                  >
                    
                    <option value="Student">{t("Student")}</option>
                    {/* <option value="email">{t("form:input-label-email")}</option> */}
                    <option value="Employed">{t("Employed")}</option>
                    <option value='Self employed'>Self employed</option>
                    <option value='Home Maker'>Home Maker</option>
              </select> 
        </div>

            <Input
              // value='Chandigarh'
              label={"Current Location"} 
              {...register("current_location")} 
              type="text" 
              variant="outline" 
              className="col-span-2 text-xs  my-3" 
              error={t(errors.current_location?.message!)} />


            <PasswordInput
              label={t("form:input-label-password")}
              {...register("password")}
              error={t(errors.password?.message!)}
              variant="outline"
              className="mb-4"
            />
          </Card>
        </div>

      <div className="mb-4 text-end">
        <Button loading={loading} disabled={loading}>
          {t("form:button-label-create-customer")}
        </Button>
      </div>
    </form>
  );
};

export default CustomerCreateForm;
