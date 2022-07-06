import Button from "@components/ui/button";
import Card from "@components/ui/card";
import FileInput from "@components/ui/file-input";
import Input from "@components/ui/input";
import { useUpdateCustomerMutation } from "@data/customer/use-update-customer.mutation";
import { maskPhoneNumber } from "@utils/mask-phone-number";
import { Controller, useForm } from "react-hook-form";
import TextArea from "@components/ui/text-area";
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";
import { User } from "@ts-types/generated";
import pick from "lodash/pick";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import Radio from "@components/ui/radio/radio";

interface Props {
  user: User;
}

type UserFormValues = {
  name?: User["name"];
  profile?: User["profile"];
};

const ProfileForm = ({ user }: Props) => {

  const [birthDate, setBirthDate] = useState(null);
  console.log('user',user)
  const { t } = useTranslation("common");
  const { register, handleSubmit, setValue, control } = useForm<UserFormValues>(
    {
      defaultValues: {
        ...(user &&
          pick(user, [
            "name",
            'date_of_birth',
            'gender',
            "profile.bio",
            "profile.contact",
            "profile.avatar",
          ])),
      },
    }
  );
  const { mutate: updateProfile, isLoading: loading } =
    useUpdateCustomerMutation();
  function onSubmit(values: any) {
    updateProfile(
      {
        id: user.id,
        name: values.name,
        date_of_birth: values.date_of_birth,
        gender: values.gender,
        profile: {
          id: user?.profile?.id,
          ...values.profile,
          avatar: values.profile.avatar?.[0],
        },
      },
      {
        onSuccess: () => {
          toast.success(t("profile-update-successful"));
        },
      }
    );
  }

  //calculate the percentage og how much profile has been completed
  const profilePercentage = (user && user.profile)
    ? (Object.keys(user.profile).length / 7) * 100
    : 0;
    
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="flex mb-8">
        <Card className="w-full">
          <div className="mb-8">
            <FileInput control={control} name="profile.avatar" />
          </div>

          <div className="flex flex-col sm:flex-row sm:space-s-4 mb-6">
            <Input
              className="flex-1"
              label={t("text-name")}
              {...register("name")}
              variant="outline"
            />
            <Input
              {...register("profile.contact")}
              label={t("text-contact-number")}
              className="flex-1"
              onChange={(e) => {
                const value = maskPhoneNumber(e.target.value);
                //@ts-ignore
                setValue("profile.contact", value);
              }}
              variant="outline"
            />
          </div>

          <div className="space-y-4  col-span-1 sm:col-span-2">

            <div className=""> 

            <div className="flex  text-body-dark h-3  font-semibold text-xs leading-none mb-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-600 to-blue-600">
                  🎉Your Birthday present is awaiting  </span> 🥳</div>
              <Controller
                      control={control}
                      name="date_of_birth"
                      render={({ field: { onChange, onBlur, value } }) => (
                        //@ts-ignore
                <DatePicker 
                          selected={birthDate} onChange={(date) => {
                          setBirthDate(date);
                          // calender ?  openCalenderOnFocus(true) : ''
                            
                            setValue("date_of_birth", date);
                          }
                          } 
                          dateFormat= "dd/MM/yyyy"
                          placeholderText='eg..23/12/1996'
                          // {...register("date_of_birth")}
                          className="text-sm h-12 w-60 px-4 border border-border-base rounded focus:border-accent"
                          />
                      )}
                />

            </div>
        

          <div className="flex flex-col ">
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

          </div>

          <TextArea
            label={t("text-bio")}
            //@ts-ignore
            {...register("profile.bio")}
            variant="outline"
            className="mb-6 mt-4"
          />

          <div className="flex">
            <Button className="ms-auto" loading={loading} disabled={loading}>
              {t("text-save")}
            </Button>
          </div>
        </Card>
      </div>
    </form>
  );
};

export default ProfileForm;
