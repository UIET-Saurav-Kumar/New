import ShopLayout from "@components/layouts/shop";
import Button from "@components/ui/button";
import Input from "@components/ui/input";
import TextArea from "@components/ui/text-area";
import Label from "@components/ui/label";
import { adminOwnerAndStaffOnly } from "@utils/auth-utils";
import Multiselect from "multiselect-react-dropdown";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import Card from "@components/common/card";
import { useUsersQuery } from "@data/user/use-users.query";
import SelectInput from "@components/ui/select-input";
import { useForm } from "react-hook-form";
import AsyncSelect from 'react-select/async';
import { useAuthBrandCreateMutation } from "@data/auth_brands/use-auth-brand-create.mutations";
import { useIsRTL } from "@utils/locals";

const brands = [
    { id: 1, name: 'ITC' },
    { id: 2, name: 'HUL' },
    { id: 3, name: 'Nestle' },
    { id: 4, name: 'Dabur' },
    { id: 5, name: 'Britannia' },
  ];
  
  const users = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' },
  ];

 


const BrandAuthorization = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      getValues,
      setValue,
      control,
    } = useForm();

    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loadedOptions, setLoadedOptions] = useState([]);
    const [page, setPage] = useState(1);
     

    const { data, isLoading: loading, error } = useUsersQuery({
      limit: 50,
      page,
      text: searchTerm,
    });

    const mutation = useAuthBrandCreateMutation();

    useEffect(() => {
        if (data) {
          setLoadedOptions(
            data?.users?.data?.map((user) => ({
              label: `${user.name} - ${user.phone_number}`,
              value: user.id,
            }))
          );
        }
      }, [data]);

    const loadUsers = (inputValue, callback) => {
      setSearchTerm(inputValue);
      callback(loadedOptions);
    };

    const onSubmit = (data) => {
      mutation.mutate({
        user_id: selectedUser.value,
        user_name: selectedUser.label.split('-')[0].trim(),
        brands: selectedBrands.map(brand => brand.name)
      });
    };

    

    return (
      <div className="flex flex-col space-y-2">
        <Card className="">
          <div className="md:w-1/4 mb-4 md:mb-0">
            <h1 className="text-lg font-semibold text-heading whitespace-nowrap">
            Add Authorized brands
            </h1>
          </div>
        </Card>

        <form
          className="grid grid-cols-2 p-4 place-content-center bg-white gap-4 items-center justify-between  spacce-x-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="sm:col-span-2">
            <Label>Users</Label>
            <AsyncSelect cacheOptions defaultOptions loadOptions={loadUsers} onChange={setSelectedUser} />
          </div>

          <div className="">
            <Label>Select brand</Label>
            <Multiselect displayValue="name" options={brands} onSelect={setSelectedBrands} />
          </div>

          <Button className="" type="submit" color="primary">
            Submit
          </Button>
        </form>
      </div>
    );
};

  
  

export default BrandAuthorization;

  
  BrandAuthorization.authenticate = {
    permissions: adminOwnerAndStaffOnly,
  };
  
  BrandAuthorization.Layout = ShopLayout;
  
  export const getServerSideProps = async ({ locale }: any) => ({
    props: {
      ...(await serverSideTranslations(locale, ["table", "common", "form"])),
    },
  });
  