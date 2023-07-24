
import { FacebookIcon } from "@components/icons/facebook";
import { InstagramIcon } from "@components/icons/instagram";
import { IShopIcon } from "@components/icons/shop-icon";
import { LinkedInIcon } from "@components/icons/social/linkedin";
import { ROUTES } from "@utils/routes";
import { toUnicode } from "punycode";

var today = new Date();

var month = today.getMonth() ;

var date = today.getDate();

const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
  "July", "Aug", "Sep", "Oct", "Nov", "Dec"
];

// var myFutureDate=  new Date(today);
// var dt = new Date();
var tomorrow = new Date();
var day3 = new Date();
var day4 = new Date();
var day5 = new Date();
var day6 = new Date();
var day7 = new Date();

tomorrow.setDate(tomorrow.getDate() + 1);
day3.setDate(day3.getDate() + 2);
day4.setDate(day4.getDate() + 3);
day5.setDate(day5.getDate() + 4);
day6.setDate(day6.getDate() + 5);
day7.setDate(day7.getDate() + 6);

var weekDay = today.getDay();

const day = 
[
  'Sunday',
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];


export const siteSettings = {

  name: "BuyLowcal",
  description: "BuyLowcal is a technology platform that connects the nearest local shops with consumers. Consumer Intelligence and Behaviour Analytics",
  logo: {
    url: "/transparent-logo.png",
    alt: "buylowcal.com",
    href: "/home",
    width: 128,
    height: 52,
  },

  defaultLanguage: "en",
  currencyCode: "INR",
  product: {
    placeholderImage: "/product-placeholder.svg",
    cardMaps: {
      grocery: "Neon",
      furniture: "Neon",
      bag: "Neon",
      makeup: "Neon",
      book: "Neon",
      medicine: "Neon",
      default: "Neon",
    },
  },

  author: {
    name: "Buylowcal",
    websiteUrl: "https://buylowcal.com",
    address: `Lowcal Ventures Pvt Ltd
    Plot No: 130 | Phase-1 | Industrial Area | Chandigarh`,
    phone: "+91 77430 42380",
    social: [
      {
        link: "https://www.facebook.com/buylowcal/",
        icon: <FacebookIcon width="16px" height="16px" />,
        hoverClass: "text-social-facebook",
      },
      {
        link: "https://www.instagram.com/buylowcal/?hl=en",
        icon: <InstagramIcon width="16px" height="16px" />,
        hoverClass: "text-social-instagram",
      },
      // {
      //   link: "https://www.twitter.com",
      //   icon: <TwitterIcon width="16px" height="16px" />,
      //   hoverClass: "text-social-twitter",
      // },
      {
        link: "https://in.linkedin.com/company/buylowcal",
        icon: <LinkedInIcon width="16px" height="16px" />,
        hoverClass: "text-social-linkedin",
      },
    ],
  },


  headerLinks: [
    { href: ROUTES.SHOPS, icon: null, label: "Shops" },
    {href: ROUTES.CREATE_SHOP, icon: null, label: "Business Access"},
    // { href: ROUTES.WISHLIST, label: "Wishlist" },
    

    //questions
    // { href: ROUTES.QUESTIONS, label: "Questions" },
    // { href: ROUTES.EVENTS, label: "Magazines" },
    // { href: ROUTES.ORDERS, label: "Orders" },
    // { href: ROUTES.INVITE_FRIENDS, label: "Invite Friends" },
    // { href: ROUTES.REFERRAL_NETWORK, label: "Your Community" },
    // { href: ROUTES.WALLET, label: "Wallet" },
    // { href: ROUTES.WITHDRAWS, label: "Withdraws" },
    // { href: ROUTES.UPLOAD_INVOICE, label: "Upload Invoice" },
    // { href: ROUTES.DELIVERY, label: "Deliveries" },

    // { href: ROUTES.OFFERS, icon: null, label: "Offer" },
    // { href: ROUTES.HELP, label: "FAQ" },
    { href: ROUTES.CONTACT, label: "Contact" },
    //wishlists

  ],

  authorizedLinks: [
    { href: ROUTES.PROFILE, label: "Profile" },
    { href: ROUTES.UPLOAD_IMAGES, label: "Upload Images" },
    { href: ROUTES.MESSAGES, label: "Messages" },
    { href: ROUTES.CHECKOUT, label: "Checkout" },
    { href: ROUTES.WISHLIST, label: 'My wishlist' },
    { href: ROUTES.QUESTIONS, label: 'My Questions' },
    { href: ROUTES.EVENTS, label: "Magazines" },
    { href: ROUTES.ORDERS, label: "Orders" },
    { href: ROUTES.INVITE_FRIENDS, label: "Invite Friends" },
    { href: ROUTES.REFERRAL_NETWORK, label: "Your Community" },
    { href: ROUTES.WALLET, label: "Wallet" },
    { href: ROUTES.WITHDRAWS, label: "Withdraws" },
    { href: ROUTES.UPLOAD_INVOICE, label: "Upload Invoice" },
    { href: ROUTES.DELIVERY, label: "Deliveries" },
    { href: ROUTES.CREATE_SHOP,  label: "Business Access"},
    { href: ROUTES.UTILITY_PAYMENTS,  label: "Utility Payments"},
    { href: ROUTES.LOGOUT, label: "Logout" },
  ],  

  
  dashboardSidebarMenu: [

    {
      href: ROUTES.PROFILE,
      menulabel: " Profile",
    },
    {
      href: ROUTES.UPLOAD_IMAGES,
      menulabel: "My Images",
    },
    {
      href: ROUTES.MESSAGES,
      menulabel: " Messages",
    },
    {
      href: ROUTES.CHANGE_PASSWORD,
      menulabel: "Change Password",
    },
    {
      href: ROUTES.EVENTS,
      menulabel: "Magazines",
    },
    // {
    //   href: ROUTES.WISHLIST,
    //   menulabel: 'My wishlist',
    // },
    // {
    //   href: ROUTES.QUESTIONS,
    //   menulabel: 'My Questions',
    // },
    {
      href: ROUTES.ORDERS,
      menulabel: "My Orders",
    },
    {
      href: ROUTES.INVITE_FRIENDS,
      menulabel: "Invite Friends",
    },
    {
      href: ROUTES.REFERRAL_NETWORK,
      menulabel: "Your Community",
    },
    // {
    //   href: ROUTES.REFERRAL_ACTIVITY,
    //   menulabel: "Referral Activity",
    // },
    {
      href: ROUTES.WALLET,
      menulabel: "Wallet",
    },
    {
      href: ROUTES.WITHDRAWS,
      menulabel: "Withdraws",
    },
    {
      href: ROUTES.UPLOAD_INVOICE,
      menulabel: "Upload Invoice",
    },
    {
      href: ROUTES.DELIVERY,
      menulabel: "Delivery",
    },
    {
      href: ROUTES.UTILITY_PAYMENTS,
      menulabel: "Utility Payments",
    },
    {
      href: ROUTES.REPORTS,
      label: 'My Reports',
    },
    {
      href: ROUTES.HELP,
      menulabel: "Help",
    },
    {
      href: ROUTES.LOGOUT,
      menulabel: "Logout",
    },
  ],

 
  deliverySchedule: [

    {
      id: "0",
      title: "    " + '('  + date + ' ' +  monthNames[month ] + ')',
      is_delivery:false,
      description: "Visit around 10:00 AM to 2:00 PM",
    },

    {
      id: "0",
      title: "    " + '('  + date + ' ' +  monthNames[month ] + ')',
      is_delivery:false,
      description: "Visit around 2:00 PM to 7:00 PM",
    },

    {
      id: "2",
      title:  '' + ' ' +  '('  + 
      tomorrow.toDateString().split(' ')[2]  + ' ' + tomorrow.toDateString().split(' ')[1] + ' ' + tomorrow.toDateString().split(' ')[0] + ')'
             ,
      is_delivery:false,
      description: "Visit tomorrow",
    },

    {
      id: "3",
      title:  day3.toDateString().split(' ')[0]  + ' ' + '(' + ' ' + day3.toDateString().split(' ')[2]  + ' ' + day3.toDateString().split(' ')[1] + ' ' + ')',
      is_delivery:false,
      description: "Open 10AM to 7PM",
    },

    {
      id: "4",
      title:   day4.toDateString().split(' ')[0]  + ' ' + '(' + ' ' + day4.toDateString().split(' ')[2]  + ' ' + day4.toDateString().split(' ')[1] + ' ' + ')',
      is_delivery:false,
      description: "Open 10AM to 7PM",
    },

    {
      id: "5",
      title: day5.toDateString().split(' ')[0]  + ' ' + '(' + ' ' + day5.toDateString().split(' ')[2]  + ' ' + day5.toDateString().split(' ')[1] + ' ' + ')',
      is_delivery:false,
      description: "Open 10AM to 7PM",
    },

    {
      id: "7",
      title:  day6.toDateString().split(' ')[0]  + ' ' + '(' + ' ' + day6.toDateString().split(' ')[2]  + ' ' + day6.toDateString().split(' ')[1] + ' ' + ')',
      is_delivery:false,
      description: "Open 10AM to 7PM",
    },
    
    // {
    //   id: "1",
    //   title: "express-delivery",
    //   description: "90 min express delivery",
    // },

    // {
    //   id: "6",
    //   title: "  Today  " + '('  + date + ' ' +  monthNames[month ] + ')',
    //   is_delivery:true,
    //   description: "Applicable if order is placed before 4PM",
    // },
    
    // {
    //   id: "6",
    //   title:  'Tomorrow' + ' ' +  '('  + (month % 2 === 0 ? (date + 1 > 31 ? date + 1 - 31  : date + 1 ) : (date + 1 > 30 ? date + 1 - 30  : date + 1 )) + ' ' + 
    //            monthNames[date + 1 > 31 ? (month + 1 > 12 ? month + 1 - 12 : month + 1 ) : month] + ')',
    //   is_delivery:true,
    //   description: "Delivery between 11AM and 4PM",
    // },
  ],
  
  homePageSidenav: [
    {
        href: ROUTES.ALLCATEGORIES,
        label: 'All Categories'
    },
    {
      href: ROUTES.SELLER,
      label: 'Sell on Buylowcal'
   },
   {
    href: ROUTES.INVITE_FRIENDS,
    label: 'Invite Friends',
   },
   {
    href: ROUTES.REFERRAL_ACTIVITY,
    label: 'Invitations Status',
   },
   {
    href: ROUTES.REFERRAL_NETWORK,
    label: 'User Network',
   },
   {
    href: ROUTES.ORDERS,
    label: 'My Orders',
   },
   {
    href: ROUTES.PROFILE,
    label: 'My Account',
   },
   
   {
    href: ROUTES.NOTIFICATONS,
    label: 'Notifications',
   },
   {
    href: ROUTES.HELP,
    label: 'Guide & Help Center',
   },
   {
    href: ROUTES.PRIVACY,
    label: 'Privacy Policy',
   },
  ],
 
};

