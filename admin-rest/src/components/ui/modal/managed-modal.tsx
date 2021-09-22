import Modal from "@components/ui/modal/modal";
import dynamic from "next/dynamic";
import { useModalAction, useModalState } from "./modal.context";
const TagDeleteView = dynamic(() => import("@components/tag/tag-delete-view"));
const TaxDeleteView = dynamic(() => import("@components/tax/tax-delete-view"));
const BanCustomerView = dynamic(() => import("@components/user/user-ban-view"));
const ShippingDeleteView = dynamic(
  () => import("@components/shipping/shipping-delete-view")
);
const CategoryDeleteView = dynamic(
  () => import("@components/category/category-delete-view")
);
const ShopCategoryDeleteView = dynamic(
  () => import("@components/shop-categories/category-delete-view")
);
const OfferDeleteView = dynamic(
  () => import("@components/offers/offer-delete-view")
);
const CouponDeleteView = dynamic(
  () => import("@components/coupon/coupon-delete-view")
);

const ProductDeleteView = dynamic(
  () => import("@components/product/product-delete-view")
);
const MasterProductDeleteView = dynamic(
  () => import("@components/master-products/product-delete-view")
);
const TypeDeleteView = dynamic(
  () => import("@components/group/group-delete-view")
);
const AttributeDeleteView = dynamic(
  () => import("@components/attribute/attribute-delete-view")
);

const ApproveShopView = dynamic(
  () => import("@components/shop/approve-shop-view")
);
const DisApproveShopView = dynamic(
  () => import("@components/shop/disapprove-shop-view")
);
const RemoveStaffView = dynamic(
  () => import("@components/shop/staff-delete-view")
);

const ExportImportView = dynamic(
  () => import("@components/product/import-export-modal")
);

const AttributeExportImport = dynamic(
  () => import("@components/attribute/attribute-import-export")
);
const AllProductsExportImport = dynamic(
  () => import("@components/product/import-export-modal-all-products")
);
const MasterProductsExportImport = dynamic(
  () => import("@components/product/import-export-modal-master-products")
);
const ShopsExportImport = dynamic(
  () => import("@components/product/import-export-modal-shop")
);

const ManagedModal = () => {
  const { isOpen, view } = useModalState();
  const { closeModal } = useModalAction();

  return (
    <Modal open={isOpen} onClose={closeModal}>
      
      {view === "DELETE_OFFER" && <OfferDeleteView />}
      {view === "DELETE_SHOP_CATEGORY" && <ShopCategoryDeleteView />}
      {view === "DELETE_PRODUCT" && <ProductDeleteView />}
      {view === "MASTER_DELETE_PRODUCT" && <MasterProductDeleteView />}
      {view === "DELETE_TYPE" && <TypeDeleteView />}
      {view === "DELETE_ATTRIBUTE" && <AttributeDeleteView />}
      {view === "DELETE_CATEGORY" && <CategoryDeleteView />}
      {view === "DELETE_COUPON" && <CouponDeleteView />}
      {view === "DELETE_TAX" && <TaxDeleteView />}
      {view === "DELETE_SHIPPING" && <ShippingDeleteView />}
      {view === "DELETE_TAG" && <TagDeleteView />}
      {view === "BAN_CUSTOMER" && <BanCustomerView />}
      {view === "SHOP_APPROVE_VIEW" && <ApproveShopView />}
      {view === "SHOP_DISAPPROVE_VIEW" && <DisApproveShopView />}
      {view === "DELETE_STAFF" && <RemoveStaffView />}
      {view === "EXPORT_IMPORT_PRODUCT" && <ExportImportView />}
      {view === "EXPORT_IMPORT_ATTRIBUTE" && <AttributeExportImport />}
      {view === "EXPORT_IMPORT_ADMIN_PRODUCT" && <AllProductsExportImport />}
      {view === "EXPORT_IMPORT_SHOPS" && <ShopsExportImport />}
      {view === "EXPORT_IMPORT_MASTER_PRODUCT" && <MasterProductsExportImport />}

    </Modal>
  );
};

export default ManagedModal;
