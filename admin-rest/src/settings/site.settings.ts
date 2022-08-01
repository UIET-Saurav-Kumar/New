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
        label: "sidebar-nav-item-dashboard",
        icon: "DashboardIcon",
      },
      {
        href: ROUTES.SHOPS,
        label: "sidebar-nav-item-shops",
        icon: "ShopIcon",
      },
      {
        href: ROUTES.ADMIN_MY_SHOPS,
        label: "sidebar-nav-item-my-shops",
        icon: "MyShopIcon",
      },
      {
        href: ROUTES.PRODUCTS,
        label: "sidebar-nav-item-products",
        icon: "ProductsIcon",
      },

      {
        href: ROUTES.CONTACT,
        label: " Contact Queries",
        icon: "CategoriesIcon",
      },
       
      {
        href: ROUTES.MASTER_PRODUCT,
        label: "Master Products",
        icon: "MasterProductsIcon",
      },
      {
        href: ROUTES.ORDERS,
        label: "sidebar-nav-item-orders",
        icon: "OrdersIcon",
      },
   
      {
        href: ROUTES.CATEGORIES,
        label: "sidebar-nav-item-categories",
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
        label: "sidebar-nav-item-users",
        icon: "UsersIcon",
      },
      {
        href: ROUTES.ATTRIBUTES,
        label: "sidebar-nav-item-attributes",
        icon: "AttributeIcon",
      },
      {
        href: ROUTES.GROUPS,
        label: "sidebar-nav-item-groups",
        icon: "TypesIcon",
      },
      {
        href: ROUTES.TAGS,
        label: "sidebar-nav-item-tags",
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
        label: "sidebar-nav-item-order-status",
        icon: "OrdersStatusIcon",
      },
      {
        href: ROUTES.COUPONS,
        label: "sidebar-nav-item-coupons",
        icon: "CouponsIcon",
      },
      {
        href: ROUTES.TAXES,
        label: "sidebar-nav-item-taxes",
        icon: "TaxesIcon",
      },
      {
        href: ROUTES.SHIPPINGS,
        label: "sidebar-nav-item-shippings",
        icon: "ShippingsIcon",
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
        label: "sidebar-nav-item-withdraws",
        icon: "WithdrawIcon",
      },
      {
        href: ROUTES.SETTINGS,
        label: "sidebar-nav-item-settings",
        icon: "SettingsIcon",
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
        label: "sidebar-nav-item-dashboard",
        icon: "DashboardIcon",
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${ROUTES.ATTRIBUTES}`,
        label: "sidebar-nav-item-attributes",
        icon: "AttributeIcon",
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${ROUTES.PRODUCTS}`,
        label: "sidebar-nav-item-products",
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
        label: "sidebar-nav-item-orders",
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
      //   label: "sidebar-nav-item-delivery",
      //   icon: "ShippingIcon",
      //   permissions: adminOwnerAndStaffOnly,
      // },
      {
        href: (shop: string) => `/${shop}${ROUTES.STAFFS}`,
        label: "sidebar-nav-item-staffs",
        icon: "UsersIcon",
        permissions: adminAndOwnerOnly,
      },

      {
        href: (shop: string) => `/${shop}${ROUTES.WITHDRAWS}`,
        label: "sidebar-nav-item-withdraws",
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
