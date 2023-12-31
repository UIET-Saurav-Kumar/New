import dynamic from "next/dynamic";
import Modal from "@components/ui/modal/modal";
import { useModalAction, useModalState } from "./modal.context";
import ShopProfileCard from "@components/profile/profile-card";
import CategoryDropdownSidebar from "@components/category/category-dropdown-sidebar";
import ShopPaymentForm from "@components/shop/shop-payment-form";
import RechargePlans from "@components/home-page-product-section/bill-payment-services/recharge-plans-modal/recharge-plans";
import RechargePlanDetails from "@components/home-page-product-section/bill-payment-services/recharge-plan-details-modal";
import UpiScanner from "@components/upi-scanner/upi-scanner";
import QuizValidatorModal from "@components/quiz/quiz-validator-modal";
import ChatScreen from "src/pages/user/messages/chat-screen";
import UserMessageList from "src/pages/user/messages";
  
     

const Login = dynamic(() => import("@components/auth/login"));
const Register = dynamic(() => import("@components/auth/register"));
const ForgotPassword = dynamic(
  () => import("@components/auth/forget-password/forget-password")
);
const OtpLoginView = dynamic(() => import('@components/auth/otp-login'));

const UpiPayment = dynamic(() => import("@components/checkout/upi-payment"))

const ProductDetailsModalView = dynamic(
  () => import("@components/product/product-details-modal-view")
);

const ProductDescriptionModal = dynamic(()=> import('@components/product/product-card/product-description-modal'))

const CardDetails = dynamic(()=> import('@components/home-page-product-section/user-cards/card-details'))

const UpiPaymentForm  = dynamic(() => import("@components/upi-scanner/upi-payment-form"));

const Scanner = dynamic(() => import("@components/layout/scanner"));

const GoogleReviews = dynamic(
  () => import("@components/google-reviews/reviews")
);

const CreateOrUpdateAddressForm = dynamic(
  () => import("@components/address/address-form")
);

const QuizResultModal= dynamic(()=> import("@components/quiz/quiz-result-modal"))

const InStoreOfferMessage = dynamic(
  () => import("@components/ui/in-store-offer-msg")
);

const ShopImageModal = dynamic(
  ()=> import('@components/shop/shop-image-modal')
);

const OtpRegisterForm = dynamic(()=> import('@components/auth/otp-register'));

const OfferImageView = dynamic(()=> import("@components/common/offer-image-view"))

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
    
    <Modal open={isOpen} onClose={closeModal} view={view}>

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
      {view === 'SHOP_IMAGE_POPOVER' && <ShopImageModal data={data} />}

      {view === "GOOGLE_REVIEWS" && (
        <GoogleReviews data={data}  />
      )}

      {view == 'OFFER_IMAGE_VIEW' && <OfferImageView data={data}/>}

      {view === 'UPI_FORM' && <UpiPaymentForm data={data}/> }

      {view === 'UPI_APPS' && <UpiPayment data={data}/>}

      {view === 'UPI_SCANNER_APPS' && <UpiScanner data={data}/>}

      {view === 'SCANNER' && <Scanner data={data}/>}

      {view  === 'QUIZ_VALIDATOR' && <QuizValidatorModal/>}

      {view === 'OTP_REGISTER' && <OtpRegisterForm data={data}/>}

      {view === 'QUIZ_RESULT_MODAL' && <QuizResultModal data={data}/>}

      {view === 'RECHARGE_PLAN_DETAILS' && <RechargePlanDetails  data={data} close={closeModal}/> }

      {view === 'BILL_PAYMENT_DETAILS' && <PaymentDetailsModal data={data} />}

      {view == 'PRODUCT_DESCRIPTION' && <ProductDescriptionModal data={data}/> }

      {view == 'CARD_DETAILS' && <CardDetails data={data}/> }

      {view == 'USER_MESSAGE_LIST' && <UserMessageList/>}

       
      {/* {view == 'CHAT_SCREEN' && <ChatScreen last_message={data}/> } */}

       
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
