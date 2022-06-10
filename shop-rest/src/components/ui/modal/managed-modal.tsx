import dynamic from "next/dynamic";
import Modal from "@components/ui/modal/modal";
import { useModalAction, useModalState } from "./modal.context";
import ShopProfileCard from "@components/profile/profile-card";
import CategoryDropdownSidebar from "@components/category/category-dropdown-sidebar";
import ShopPaymentForm from "src/pages/shops/shop-payment-form";


const Login = dynamic(() => import("@components/auth/login"));
const Register = dynamic(() => import("@components/auth/register"));
const ForgotPassword = dynamic(
  () => import("@components/auth/forget-password/forget-password")
);
const OtpLoginView = dynamic(() => import('@components/auth/otp-login'));


const ProductDetailsModalView = dynamic(
  () => import("@components/product/product-details-modal-view")
);

const CreateOrUpdateAddressForm = dynamic(
  () => import("@components/address/address-form")
);
const ReviewRating = dynamic(() => import('@components/reviews/review-form'));
const QuestionForm = dynamic(
  () => import('@components/questions/question-form')
);
const AbuseReport = dynamic(() => import('@components/reviews/abuse-report'));
const ReviewImageModal = dynamic(
  () => import('@components/reviews/review-image-modal')
);
const AddressDeleteView = dynamic(
  () => import("@components/address/address-delete-view")
);

const SearchBarModal = dynamic(() => import("@components/common/search-bar-modal"));

const ManagedModal = () => {
  const { isOpen, view, data } = useModalState();
  const { closeModal } = useModalAction();

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {view === "LOGIN_VIEW" && <Login />}
      {view === "REGISTER" && <Register />}
      {view === "FORGOT_VIEW" && <ForgotPassword />}
      {view === "ADD_OR_UPDATE_ADDRESS" && <CreateOrUpdateAddressForm />}
      {view === "DELETE_ADDRESS" && <AddressDeleteView />}
      {view === 'OTP_LOGIN' && <OtpLoginView />}
      {view === "SHOP_MOBILE_CATEGORIES" && <CategoryDropdownSidebar />}
      {view === "SHOP_PAYMENT_FORM" && <ShopPaymentForm />}
      {view === 'REVIEW_RATING' && <ReviewRating />}
      {view === 'ABUSE_REPORT' && <AbuseReport data={data} />}
      {view === 'QUESTION_FORM' && <QuestionForm />}
      {view === 'REVIEW_IMAGE_POPOVER' && <ReviewImageModal />}
      {/* { view=== 'SEARCH_BAR_MODAL' && <SearchBarModal />} */}
      {view === "PRODUCT_DETAILS" && (
        <ProductDetailsModalView productSlug={data} />
      )}
       
      {view === "SHOP_INFO" && (
        <ShopProfileCard
          data={data}
          cardClassName="!hidden"
          className="!flex flex-col !w-screen !h-screen !rounded-none"
        />
      )}
    </Modal>
  );
};

export default ManagedModal;
