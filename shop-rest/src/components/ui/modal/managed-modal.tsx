import dynamic from "next/dynamic";
import Modal from "@components/ui/modal/modal";
import { useModalAction, useModalState } from "./modal.context";
import ShopProfileCard from "@components/profile/profile-card";
import CategoryDropdownSidebar from "@components/category/category-dropdown-sidebar";
import ShopPaymentForm from "@components/shop/shop-payment-form";
import RechargePlans from "@components/home-page-product-section/bill-payment-services/recharge-plans-modal/recharge-plans";
import RechargePlanDetails from "@components/home-page-product-section/bill-payment-services/recharge-plan-details-modal";


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

const InStoreOfferMessage = dynamic(
  () => import("@components/ui/in-store-offer-msg")
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


const PaymentModal = dynamic(
  ()=> import('@components/home-page-product-section/bill-payment-services/bill-payment-modal/modal')
)


const SearchBarModal = dynamic(() => import("@components/common/search-bar-modal"));
const PaymentDetailsModal = dynamic( ()=> import('@components/home-page-product-section/bill-payment-services/bill-payment-modal/payment-details-modal'))

const ManagedModal = () => {
  const { isOpen, view, data } = useModalState();
  const { closeModal } = useModalAction();

  return (
    
    <Modal open={isOpen} onClose={closeModal}>
      {view === "LOGIN_VIEW" && <Login />}
      {view === "REGISTER" && <Register data={data}  />}
      {view === "FORGOT_VIEW" && <ForgotPassword />}
      {view === "ADD_OR_UPDATE_ADDRESS" && <CreateOrUpdateAddressForm />}
      {view === "DELETE_ADDRESS" && <AddressDeleteView />}
      {view === 'OTP_LOGIN' && <OtpLoginView />}
      {view === 'IN_STORE_OFFER' && <InStoreOfferMessage />}
      {view === "SHOP_MOBILE_CATEGORIES" && <CategoryDropdownSidebar />}
      {view === "SHOP_PAYMENT_FORM" && <ShopPaymentForm />}
      {view === 'REVIEW_RATING' && <ReviewRating />}
      {view === 'ABUSE_REPORT' && <AbuseReport data={data} />}
      {view === 'QUESTION_FORM' && <QuestionForm />}
      {view === 'REVIEW_IMAGE_POPOVER' && <ReviewImageModal />}
      {view === 'BILL_PAYMENT' && <PaymentModal />}
      {/* { view=== 'SEARCH_BAR_MODAL' && <SearchBarModal />} */}
      {view === 'RECHARGE_PLANS' && <RechargePlans data={data} />}
      {view === "PRODUCT_DETAILS" && (
        <ProductDetailsModalView productSlug={data} />
      )}

      {view === 'RECHARGE_PLAN_DETAILS' && <RechargePlanDetails data={data} close={closeModal}/> }

       { view === 'BILL_PAYMENT_DETAILS' && <PaymentDetailsModal data={data} />}
       
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
