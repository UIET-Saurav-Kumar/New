
import Pagination from "@components/ui/pagination";
import Image from "next/image";
import { Table } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import { siteSettings } from "@settings/site.settings";
import { UserPaginator } from "@ts-types/generated";
import { useMeQuery } from "@data/user/use-me.query";
import { useTranslation } from "next-i18next";
import { useIsRTL } from "@utils/locals";
// import { useCustomerQuery } from "@data/customer/use-customer.query";
import { useRouter } from "next/router";
import {useWalletCommissionQuery} from '@data/user/use-wallet-commission-query'
import dayjs from "dayjs";



type IProps = {
  customers: UserPaginator | null | undefined;
  onPagination: (current: number) => void;
};
const CustomerList = ({ customers, onPagination }: IProps) => {

  const router = useRouter();

  const { data, paginatorInfo } = customers!;
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const { data:walletData,isLoading:loading } = useWalletCommissionQuery({
    limit: 10 as number,
    search:"",
});
  // const { data:customerData } = useCustomerQuery();
  console.log(' customer data',data)

  
  const columns = [
    {
      title: t("table:table-item-avatar"),
      dataIndex: "profile",
      key: "profile",
      align: "center",
      width: 74,
      render: (profile: any, record: any) => (
        <Image
          src={profile?.avatar?.thumbnail ?? siteSettings?.avatar?.placeholder}
          alt={record?.name}
          layout="fixed"
          width={42}
          height={42}
          className="rounded overflow-hidden"
        />
      ),
    },
    {
      title: t("table:table-item-title"),
      dataIndex: "name",
      key: "name",
      align: alignLeft,
    },
    {
      title: t("table:table-item-email"),
      dataIndex: "email",
      key: "email",
      align: alignLeft,
    },

    {
      //current_location
      title: t("City"),
      dataIndex: "current_location",
      key: "current_location",
      align: alignLeft,
    },

    {
      //date_of_birth
      title: t("Date of Birth"),
      dataIndex: "date_of_birth",
      key: "date_of_birth",
      align: alignLeft,
      render: (date_of_birth: any) => {
        return date_of_birth && dayjs(date_of_birth).format("DD/MM/YYYY");
      }
    },

    //calculate age from date_of_birth
    {
      title: t("Age"),
      dataIndex: "date_of_birth",
      key: "date_of_birth",
      align: alignLeft,
      render: (date_of_birth: any) => {
        return date_of_birth && dayjs().diff(date_of_birth, "year");
      }
    
    },

    
    {
       
      title:'Gender',
      dataIndex:'gender',
      key:'gender',
      align:alignLeft,
      
    },
    // {
    //   title: ("Role"),
    //   dataIndex: "role",
    //   key: "role",
    //   align: alignLeft,
    // },
    {
      title: ("Phone no."),
      dataIndex: "phone_number",
      key: "phone_number",
      align: alignLeft,
    },
    
    {
      title: 'Created on',
      dataIndex: 'created_at',
      key: 'created_at',
      align: alignLeft,
      render: (created_at:any) => {
       return   <span className="font-semibold">{dayjs(created_at).format("DD-MM-YYYY") + ' | ' + dayjs(created_at).format("h:mm a")}</span>
      }
    },
   
    {
      title: t("table:table-item-status"),
      dataIndex: "is_active",
      key: "is_active",
      align: "center",
      render: (is_active: boolean) => (is_active ? "Active" : "Inactive"),
    },

    {
      title: t("table:table-item-actions"),
      dataIndex: "id",
      key: "actions",
      align: "center",
      render: (id: string, { is_active }: any) => {
        const { data } = useMeQuery();
        return (
          <>
            {data?.id != id && (
              <ActionButtons
                id={id}
                userStatus={true}
                isUserActive={is_active}
              />
            )}
          </>
        );
      },
    },
    
    // action button which on click will display users wallet details
    {
      title: t("table:Wallet"),
      dataIndex: "id",
      key: "wallet",
      align: "center",
      render: (id: string, { is_active }: any) => {
        // const { data } = useMeQuery();
        const { data, paginatorInfo } = customers!;
        return (
          <>
            {data?.id != id && (
              <ActionButtons
                id={id}
                //redirect to wallet details
                walletData={walletData}
                detailsUrl={`${router.asPath}/${id}`}

               
                // isUserActive={is_active}
                // wallet={true}
              />
            )}
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        {/* @ts-ignore */}
        <Table
          columns={columns}
          emptyText={t("table:empty-table-data")}
          data={data}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      </div>

      {!!paginatorInfo.total && (
        <div className="flex justify-end items-center">
          <Pagination
            total={paginatorInfo.total}
            current={paginatorInfo.currentPage}
            pageSize={paginatorInfo.perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  );
};

export default CustomerList;
