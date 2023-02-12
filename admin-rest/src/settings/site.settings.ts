import { adminAndOwnerOnly, adminOwnerAndStaffOnly } from "@utils/auth-utils";
import { ROUTES } from "@utils/routes";

export const siteSettings = {
  name: "BuyLowcal",
  description: "BuyLowcal is a technology platform that connects the nearest local shops with consumers. Consumer Intelligence and Behaviour Analytics",
  logo: {
    url: "/transparent-logo.png",
    alt: "buylowcal.com",
    href: "/",
    width: 128,
    height: 52,
  },

  defaultLanguage: "en",
  author: {
    name: "Buylowcal",
    websiteUrl: "https://buylowcal.com",
    address: `Lowcal Ventures Pvt Ltd
    Plot No: 130 | Phase-1 | Industrial Area | Chandigarh`,
    phone: "+91 77430 42380",
  },

  headerLinks: [],
  authorizedLinks: [
    {
      href: ROUTES.PROFILE_UPDATE,
      labelTransKey: "authorized-nav-item-profile",
    },
    {
      href: ROUTES.LOGOUT,
      labelTransKey: "authorized-nav-item-logout",
    },
  ],
  
  currencyCode: "INR",
  sidebarLinks: {
    admin: [
      {
        href: ROUTES.DASHBOARD,
        label: "Dashboard",
        icon: "DashboardIcon",
      },
      {
        href: ROUTES.TERM_LIFE_INSURANCE,
        label: "Insurance",
        icon: "DashboardIcon",
      },
      {
        href: ROUTES.WHATSAPP_CAMPAIGN,
        label: 'Whatsapp Campaign',
        icon: 'DashboardIcon',
      },
      {
        href: ROUTES.SHOPS,
        label: "Shops",
        icon: "ShopIcon",
      },
      {
        href: ROUTES.ALL_SHOP_VISITORS,
        label: "Shop visitors",
        icon: "ShopIcon",
      },
      {
        href: ROUTES.ADMIN_MY_SHOPS,
        label: "My shops",
        icon: "MyShopIcon",
      },
      {
        href: ROUTES.PRODUCTS,
        label: "Products",
        icon: "ProductsIcon",
      },

      {
        href: ROUTES.CONTACT,
        label: " Contact Queries",
        icon: "CategoriesIcon",
      },

      {
        href: ROUTES.QUIZ,
        label: "Quiz",
        icon: "CategoriesIcon",
      },
       
      {
        href: ROUTES.MASTER_PRODUCT,
        label: "Master Products",
        icon: "MasterProductsIcon",
      },
      {
        href: ROUTES.ORDERS,
        label: "Orders",
        icon: "OrdersIcon",
      },
   
      {
        href: ROUTES.CATEGORIES,
        label: "Categories",
        icon: "CategoriesIcon",
      },
      {
        href: ROUTES.SHOP_CATEGORIES,
        label: "Shop Categories",
        icon: "ShopCategoriesIcon",
      },
      {
        href: ROUTES.OFFERS,
        label: " Offers",
        icon: "Offers",
      },
      {
        href: ROUTES.BRAND_OFFERS,
        label: " Brand Offers",
        icon: "Offers",
      },
      {
        href: ROUTES.USERS,
        label: "Users",
        icon: "UsersIcon",
      },
      {
        href: ROUTES.ATTRIBUTES,
        label: "Attributes",
        icon: "AttributeIcon",
      },
      {
        href: ROUTES.GROUPS,
        label: "Groups",
        icon: "TypesIcon",
      },
      {
        href: ROUTES.TAGS,
        label: "Tags",
        icon: "TagIcon",
      },
      {
        href: ROUTES.DELIVERY,
        label: "Delivery",
        icon: "Delivery",
      },
      {
        href: ROUTES.QUESTIONS,
        label: "Questions",
        icon: "QuestionIcon",
      },
      {
        href: ROUTES.REVIEWS,
        label: "Reviews",
        icon: "ReviewIcon",
      },
      {
        href: ROUTES.INVOICES_REWARD,
        label: "Invoice Rewards",
        icon: "Offers",
      },
      {
        href: ROUTES.INVOICES_REWARD_DATA,
        label: "Invoice Rewards Data",
        icon: "UsersIcon",
      },
      {
        href: ROUTES.DELIVERY_COST,
        label: "Delivery Cost",
        icon: "DeliveryCost",
      },
      {
        href: ROUTES.ORDER_STATUS,
        label: "Order Status",
        icon: "OrdersStatusIcon",
      },
      {
        href: ROUTES.COUPONS,
        label: "Coupons",
        icon: "CouponsIcon",
      },
      {
        href: ROUTES.TAXES,
        label: "Taxes",
        icon: "TaxesIcon",
      },
      {
        href: ROUTES.SHIPPINGS,
        label: "Shippings",
        icon: "ShippingsIcon",
      },
      {
        href: ROUTES.UTILITY_PAYMENTS,
        label: "Utility Payments",
        icon: "Offers",
      },
      {
        href: ROUTES.COMMISSION,
        label: "Commission",
        icon: "Commission",
      },
      {
        href: ROUTES.SIGNUP_OFFERS,
        label: "Signup Offers",
        icon: "SignupOffer",
      },
      {
        href: ROUTES.WITHDRAWS,
        label: "Withdraws",
        icon: "WithdrawIcon",
      },
      {
        href: ROUTES.SETTINGS,
        label: "Settings",
        icon: "SettingsIcon",
      },
      {
        href: ROUTES.SMS_LOG,
        label: "SMS Logs",
        icon: "Logs",
      },
      {
        href: ROUTES.LOGS,
        label: "Business Intelligence",
        icon: "Logs",
      },
    ],
    
    shop: [
      {
        href: (shop: string) => `${ROUTES.DASHBOARD}${shop}`,
        label: "Dashboard",
        icon: "DashboardIcon",
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${ROUTES.SHOP_VISITORS}`,
        label: "Shop Visitors",
        icon: "AttributeIcon",
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${ROUTES.ATTRIBUTES}`,
        label: "attributes",
        icon: "AttributeIcon",
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${ROUTES.PRODUCTS}`,
        label: "products",
        icon: "ProductsIcon",
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${ROUTES.MASTER_PRODUCT}`,
        label: "Master Product",
        icon: "MasterProductsIcon",
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${ROUTES.OFFERS}`,
        label: "Special Offers",
        icon: "Offers",
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${ROUTES.BRAND_OFFERS}`,
        label: "Brand Offers",
        icon: "Offers",
        permissions: adminOwnerAndStaffOnly,
      },

      {
        href: (shop: string) => `/${shop}${ROUTES.REVIEWS}`,
        label: "All Reviews",
        icon: "ReviewIcon",
        permissions: adminAndOwnerOnly,
      },
      {
        href: (shop: string) => `/${shop}${ROUTES.QUESTIONS}`,
        label: "All Questions",
        icon: "QuestionIcon",
        permissions: adminAndOwnerOnly,
      },
      {
        href: (shop: string) => `/${shop}${ROUTES.ORDERS}`,
        label: "orders",
        icon: "OrdersIcon",
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${ROUTES.DELIVERY}`,
        label: "Delivery",
        icon: "Delivery",
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${ROUTES.SHOP_DELIVERY_CONFIG}`,
        label: "Delivery Config",
        icon: "DeliveryConfig",
        permissions: adminOwnerAndStaffOnly,
      },
      // {
      //   href: (shop: string) => `/${shop}${ROUTES.DELIVERY}`,
      //   label: "delivery",
      //   icon: "ShippingIcon",
      //   permissions: adminOwnerAndStaffOnly,
      // },
      {
        href: (shop: string) => `/${shop}${ROUTES.STAFFS}`,
        label: "staffs",
        icon: "UsersIcon",
        permissions: adminAndOwnerOnly,
      },

      {
        href: (shop: string) => `/${shop}${ROUTES.WITHDRAWS}`,
        label: "withdraws",
        icon: "AttributeIcon",
        permissions: adminAndOwnerOnly,
      },
      {
        href: (shop: string) => `/${shop}${ROUTES.WHATSAPP_CAMPAIGN}`,
        label: "Whatsapp Campaign",
        icon: "AttributeIcon",
        permissions: adminAndOwnerOnly,
      },
    ],
  },

  product: {
    placeholder: "/product-placeholder.svg",
  },
  avatar: {
    placeholder: "/avatar-placeholder.svg",
  },

};
