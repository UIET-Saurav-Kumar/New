import { Table } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import { useTranslation } from "next-i18next";
import { useIsRTL } from "@utils/locals";
import Pagination from "@components/ui/pagination";
import { UserPaginator } from "@ts-types/generated";

type IProps = {
  staffs: UserPaginator | null | undefined;
  onPagination: (current: number) => void;
};

const StaffList = ({ staffs, onPagination }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();
  const { data, paginatorInfo } = staffs!;

  const columns = [
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
      title: t("table:table-item-status"),
      dataIndex: "is_active",
      key: "is_active",
      align: "center",
      render: (is_active: boolean) =>
        is_active ? t("Active") : t("Inactive"),
    },
    {
      title: t("table:table-item-actions"),
      dataIndex: "id",
      key: "actions",
      align: alignRight,
      render: (id: string) => {
        return <ActionButtons id={id} deleteModalView="DELETE_STAFF" />;
      },
    },
  ];

  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          // @ts-ignore
          columns={columns}
          emptyText={t("table:empty-table-data")}
          data={data!}
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
            showLessItems
          />
        </div>
      )}
    </>
  );
};

export default StaffList;
