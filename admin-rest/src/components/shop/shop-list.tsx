import Pagination from "@components/ui/pagination";
import Image from "next/image";
import { Table } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import { siteSettings } from "@settings/site.settings";
import { useTranslation } from "next-i18next";
import { useIsRTL } from "@utils/locals";
import Badge from "@components/ui/badge/badge";
import Checkbox from "@components/ui/checkbox/checkbox";
import { ShopPaginator } from "@ts-types/generated";
import { useUpdateShopMutation } from "@data/shop/use-shop-update.mutation";
import { conforms, split } from "lodash";
import Avatar from 'react-avatar';

type IProps = {
  shops: ShopPaginator | null | undefined;
  onPagination: (current: number) => void;
};



const ShopList = ({ shops, onPagination }: IProps) => {
  const { data, paginatorInfo } = shops! ?? {};
  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();
  const { mutate: updateShop, isLoading: updating } = useUpdateShopMutation();

  const imageCheck = (logo: any , record:any) => {
    let check = false;
    let lastSplit = split(logo?.thumbnail, "/")[split(logo?.thumbnail, "/").length - 1];
    if (lastSplit != "") {
      check = true;
    }
    return (check ?    < Image        quality='40' src={logo?.thumbnail ?? siteSettings.product.placeholder} alt={record?.name} layout="fixed" width={42} height={42} className="rounded overflow-hidden" />:<Avatar name={record?.name} size={42} round={true} maxInitials={2} />);
  }

  console.log('shop address', shops?.data)

  function checkboxChanged(e:any){
    var id=e.target.id.split('_')[1];
    var value=(e.target.checked)?1:0;
    console.log(id)
    console.log(value);
    updateShop({
      variables: {
        id:id,
        input:{
          is_featured:value
        }
      }
    });
  }

  const columns = [
    {
      title: t("table:table-item-logo"),
      dataIndex: "logo",
      key: "logo",
      align: "center",
      width: 74,
      render: (logo: any, record: any) => (imageCheck(logo,record)),
    },
    {
      title: t("table:table-item-title"),
      dataIndex: "name",
      key: "name",
      align: alignLeft,
      render: (name: any) => <span className="whitespace-nowrap">{name}</span>,
    },
    {
      title: t("table:table-item-owner-name"),
      dataIndex: "owner",
      key: "owner",
      align: "center",
      render: (owner: any) => owner.name,
    },
    {
      title: t("table:table-item-city"),
      dataIndex: "address",
      key: "address",
      align: "center",
      render: (address: any) => <span className="whitespace-nowrap">{address?.city}</span>,
    },
    {
      title: t("table:table-item-total-products"),
      dataIndex: "products_count",
      key: "products_count",
      align: "center",
    },
    {
      title: t("table:table-item-total-orders"),
      dataIndex: "orders_count",
      key: "orders_count",
      align: "center",
    },
    {
      title: "Featured",
      dataIndex: "isfeatured",
      key: "isfeatured",
      align: "center",
      width: 74,
      render: (logo: any, record: any) => (
        <>
          <Checkbox
              onChange={checkboxChanged}
              id={"isFeatured_"+record.id}
              name={"isFeatured_"+record.id}
              height={42}
              width={42}
              checked={(record.is_featured==1)?"checked":""}
            />
        </>
      ),
    },
    {
      title: t("table:table-item-status"),
      dataIndex: "is_active",
      key: "is_active",
      align: "center",
      render: (is_active: boolean) => (
        <Badge
          textKey={is_active ? "common:text-active" : "common:text-inactive"}
          color={is_active ? "bg-accent" : "bg-red-500"}
        />
      ),
    },
    {
      title: t("table:table-item-actions"),
      dataIndex: "id",
      key: "actions",
      align: alignRight,
      render: (id: string, { slug, is_active,delivery_status }: any) => {
        return (
          <ActionButtons
            id={id}
            shopPage={true}
            approveButton={true}
            deliveryButton={delivery_status}
            detailsUrl={`/${slug}`}
            isShopActive={is_active}
          />
        );
      },
    },
  ];

  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          //@ts-ignore
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

export default ShopList;
