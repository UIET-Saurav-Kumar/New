
export const API_ENDPOINTS: Record<string, string> = {
  
  PRODUCTS: "products",
  SETTINGS: "settings",
  ANALYTICS: "total-users",
  CUSTOMER: "me",
  COUPONS: "coupons",
  CATEGORY: "categories",
  PARENT_CATEGORIES: "fetch-parent-category",
  TYPE: "types",
  UPLOAD: "attachments",
  BILL:"bill-attachment",
  ORDER: "orders",
  DELIVERY: "delivery",
  ORDER_STATUS: "order_status",
  LOGIN: "token",
  SOCIAL_LOGIN: "social-login-token",
  OTP_LOGIN: "otp-token",
  VERIFY_OTP_TOKEN: "verify-otp-token",

  
  REGISTER: "register",
  FORGET_PASSWORD: "forget-password",
  LOGOUT: "logout",
  CHANGE_PASSWORD: "Change Password",
  RESET_PASSWORD: "reset-password",
  VERIFY_FORGET_PASSWORD: "verify-forget-password-token",
  VERIFY_CHECKOUT: "checkout/verify",
  CONTACT: "contact",
  ADDRESS: "address",
  SHOPS: "all-shop",
  HOME_FEATURE_SHOPS:"fetch-feature-shops",
  HOME_FEATURE_STORES:"fetch-feature-stores",
  HOME_FEATURE_PRODUCTS:"fetch-feature-products",
  HOME_OFFERS:"fetch-offers",
  HOME_BRAND_OFFERS:"product-brand-offers",
  HOME_CATEGORIES:"fetch-home-categories",
  SEARCH:"search",
  REFERRAL_NETWORK:"referral-network",
  GET_WALLET_COMMISSION:"get-wallet-commission",
  USER_VERIFY:"user-verify",
  RESEND_CODE:"resend-code",
  SHOP_AVAILABILITY:'shop-availability',
  USER_WITHDRAWS:'user-withdraws',
  USER_INVOICE_UPLOAD: 'bill',
  BILL_ATTACHMENT:"bill-attachment",

  USER_CONTACT_UPLOAD: 'contact',

  USERS_WISHLIST: '/my-wishlists',
  WISHLIST: '/wishlists',
  USERS_WISHLIST_TOGGLE: '/wishlists/toggle',
  UPLOADS: '/attachments',
  MY_QUESTIONS: '/my-questions',
  MY_REPORTS: '/my-reports',

  PRODUCTS_REVIEWS: '/reviews',
  PRODUCTS_REVIEWS_ABUSE_REPORT: '/abusive_reports',
  PRODUCTS_QUESTIONS: '/questions',
  FEEDBACK: '/feedbacks',

  BILLER_INFO: 'biller-info',
  RECHARGE_PLANS:'recharge-plans',
  OPERATOR: 'get-operator',
  OPERATORS_LIST: 'operators-list',
  BILL_DETAILS: 'get-bill-details',
  WATER_BILL: 'get-water-biller-info',

  TERM_LIFE_INSURANCE: 'term-life-insurance',
   


  LOGS:'logs'
};
