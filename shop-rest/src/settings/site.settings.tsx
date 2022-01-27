
import { FacebookIcon } from "@components/icons/facebook";
import { InstagramIcon } from "@components/icons/instagram";
import { LinkedInIcon } from "@components/icons/social/linkedin";
import { ROUTES } from "@utils/routes";
import { toUnicode } from "punycode";

var today = new Date();
var month = today.getMonth() ;
var date = today.getDate();
const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
  "July", "Aug", "Sep", "Oct", "Nov", "Dec"
];

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
    // { href: ROUTES.OFFERS, icon: null, label: "Offer" },
    // { href: ROUTES.HELP, label: "FAQ" },
    { href: ROUTES.CONTACT, label: "Contact" },
  ],

  authorizedLinks: [
    { href: ROUTES.PROFILE, label: "Profile" },
    { href: ROUTES.CHECKOUT, label: "Checkout" },
    { href: ROUTES.ORDERS, label: "Orders" },
    { href: ROUTES.INVITE_FRIENDS, label: "Invite Friends" },
    { href: ROUTES.REFERRAL_NETWORK, label: "Referral Network" },
    { href: ROUTES.WALLET, label: "Wallet" },
    { href: ROUTES.WITHDRAWS, label: "Withdraws" },
    { href: ROUTES.UPLOAD_INVOICE, label: "Upload Invoice" },
    { href: ROUTES.DELIVERY, label: "Deliveries" },
    { href: ROUTES.LOGOUT, label: "Logout" },
  ],  

  
  dashboardSidebarMenu: [

    {
      href: ROUTES.PROFILE,
      menulabel: "profile-sidebar-profile",
    },
    {
      href: ROUTES.CHANGE_PASSWORD,
      menulabel: "profile-sidebar-password",
    },
    
    {
      href: ROUTES.ORDERS,
      menulabel: "profile-sidebar-orders",
    },
    {
      href: ROUTES.INVITE_FRIENDS,
      menulabel: "Invite Friends",
    },
    {
      href: ROUTES.REFERRAL_NETWORK,
      menulabel: "Referral Network",
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
    // {
    //   href: ROUTES.HELP,
    //   menulabel: "profile-sidebar-help",
    // },
    {
      href: ROUTES.LOGOUT,
      menulabel: "profile-sidebar-logout",
    },

  ],

 
  deliverySchedule: [

    {
      id: "0",
      title: "  Today  " + '('  + date + ' ' +  monthNames[month ] + ')',
      is_delivery:false,
      description: "Visit around 10:00 AM to 2:00 PM",
    },

    {
      id: "0",
      title: "  Today  " + '('  + date + ' ' +  monthNames[month ] + ')',
      is_delivery:false,
      description: "Visit around 2:00 PM to 7:00 PM",
    },

    {
      id: "2",
      title:  'Tomorrow' + ' ' +  '('  + (month % 2 === 0 ? (date + 1 > 31 ? date + 1 - 31  : date + 1 ) : (date + 1 > 30 ? date + 1 - 30  : date + 1 )) + ' ' + 
               monthNames[date + 1 > 31 ? (month + 1 > 12 ? month + 1 - 12 : month + 1 ) : month] + ')',
      is_delivery:false,
      description: "Visit tomorrow",
    },

    {
      id: "3",
      title: day[weekDay + 2 >6 ? weekDay + 2 - 7 :weekDay + 2   ] + ' ' + '('  + (month % 2 === 0 ? (date + 2 > 31 ? date + 2 - 31  : date + 2 ) : '') + ' ' +  
             monthNames[date + 2 > 31 ? (month + 1 > 12 ? month + 1 - 12 : month + 1 ) : month] + ')',
      is_delivery:false,
      description: "Open 10AM to 7PM",
    },

    {
      id: "4",
      title:  day[weekDay + 3 >6 ? weekDay + 3 - 7 : weekDay + 3   ]  + ' ' +  '('  + (month % 2 === 0 ? (date + 3 > 31 ? date + 3 - 31  : date + 3 ) : '') + ' ' + 
              monthNames[date + 3 > 31 ? (month + 1 > 12 ? month + 1 - 12 : month + 1 ) : month] + ')',
      is_delivery:false,
      description: "Open 10AM to 7PM",
    },

    {
      id: "5",
      title: day[weekDay + 4 >6 ? weekDay + 4 - 7 : weekDay + 4   ]  + '  ' + '('  + (month % 2 === 0 ? (date + 4 > 31 ? date + 4 - 31  : date + 4 ) : '') + ' ' + 
             monthNames[date + 4 > 31 ? (month + 1 > 12 ? month + 1 - 12 : month + 1 ) : month] + ')',
      is_delivery:false,
      description: "Open 10AM to 7PM",
    },

    {
      id: "7",
      title: day[weekDay + 5 >6 ? weekDay + 5 - 7 : weekDay + 5   ]  + ' ' + '('  + (month % 2 === 0 ? (date + 5 > 31 ? date + 5 - 31  : date + 5 ) : '') + ' ' +  
      monthNames[date + 5 > 31 ? (month + 1 > 12 ? month + 1 - 12 : month + 1 ) : month] + ')',
      is_delivery:false,
      description: "Open 10AM to 7PM",
    },
    
    // {
    //   id: "1",
    //   title: "express-delivery",
    //   description: "90 min express delivery",
    // },

    {
      id: "6",
      title: "  Today  " + '('  + date + ' ' +  monthNames[month ] + ')',
      is_delivery:true,
      description: "Applicable if order is placed before 4PM",
    },
    
    {
      id: "6",
      title:  'Tomorrow' + ' ' +  '('  + (date + 1) + ' ' +  monthNames[month ] + ')',
      is_delivery:true,
      description: "Delivery between 11AM and 4PM",
    },
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

  allCategories: [

    {
      href: ROUTES.FRUITS,
      label: 'Fruits',
       src: '/transparent-fruit.png',
    },

    {
      href: ROUTES.GROCERY,
      label: 'Groceries',
       src: '/transparent-grocery.png',
    },

    {
      href: ROUTES.VEGETABLES,
      label: 'Vegetables',
      src: '/vegetables.jpg',
    },

    {
      href: ROUTES.PHARMACY,
      label: 'Pharmacy',
      src: '/pharmacy-transparent.png',
    },

    {
      href: ROUTES.SALOONSPA,
      label: 'Salon & Spa',
      src: '/salonspa.jpg',
    },

    {
      href: ROUTES.TAKEAWAYS,
      label: 'Takeaways',
      src: '/transparent-delivery-man.png',
    },

    {
      href: ROUTES.UTILITIES,
      label: 'Utilities',
      src: '/transparent-bill.png',
    },

    {
      href: ROUTES.RESTRAUNTS,
      label: 'Restraunts',
      src: '/restraunts.jpg',
    },
  ],
   
   featuredShops : [
     {
       href: '/',
       label: 'Pirates of Grill',
       image: '/pirates-grill.jpg',
       location: 'Sector 34 A',
       type: 'restraunt '
     },

     {
      href: '/',
      label: 'Hot Million',
      image: '/hot-millions.jpg',
      location: 'Sector 22 A',
      type: 'restraunt '
    },

    {
      href: '/',
      label: 'Nick Bakers',
      image: '/nick-bakers.jpeg',
      location: 'Sector 34 A',
      type: 'Bakery'
    },

    {
      href: '/',
      label: 'Pirates of Grill',
      image: '/pirates-grill.jpg',
      location: 'Sector 34 A',
      type: 'restraunt '
    },

    {
      href: '/',
      label: 'Barbeque Nation',
      image: '/barbeque-nation.jpg',
      location: 'Centra Mall',
      type: 'restraunt '
    },

    {
      href: '/',
      label: 'Hot Million',
      image: '/hot-millions.jpg',
      location: 'Sector 22 A',
      type: 'restraunt '
    },

    {
      href: '/',
      label: 'Sip n dine',
      image: '/sip-dine.jpg',
      location: 'Sector 18',
      type: 'restraunt '
    },

    {
      href: '/',
      label: 'The cove',
      image: '/cove.jpg',
      location: 'Sector 17',
      type: 'restraunt '
    },
    
   ],

   featuredEStores:  
   [
     {
      href: '/',
      image: '/amazon-transparent.png',
      discount: '10%',
     },

     {
      href: '/',
      image: '/ajio.png',
      discount: '20%',
     },

     {
      href: '/',
      image: '/myntra.png',
      discount: '5%',
     },

     {
      href: '/',
      image: '/ajio.png',
      discount: '20%',
     },

     {
      href: '/',
      image: '/wow.png',
      discount: '15%',
     },

     {
      href: '/',
      image: '/big-bazaar.png',
      discount: '15%',
     },

     {
      href: '/',
      image: '/myntra.png',
      discount: '5%',
     },

     {
      href: '/',
      image: '/ajio.png',
      discount: '20%',
     },

     {
      href: '/',
      image: '/wow.png',
      discount: '15%',
     },

     {
      href: '/',
      image: '/big-bazaar.png',
      discount: '15%',
     },

     {
      href: '/',
      image: '/beardo.png',
      discount: '15%',
     },
     {
      href: '/',
      image: '/myntra.png',
      discount: '5%',
     },
   ],

   featuredProducts :[
     {
       href:'/',
       label: 'Bru Instant Coffee',
       image: '/product5.jpg',
       
     },
     {
      href:'/',
      label: 'Bru Instant Coffee',
      image: '/product1.jpg',
      
    },
    {
      href:'/',
      label: 'Bru Instant Coffee',
      image: '/product2.jpg',
      
    },
    {
      href:'/',
      label: 'Bru Instant Coffee',
      image: '/product3.jpg',
      
    },
    {
      href:'/',
      label: 'Bru Instant Coffee',
      image: '/product6.jpg',
      
    },
    {
      href:'/',
      label: 'Bru Instant Coffee',
      image: '/product5.jpg',
      
    },
    {
      href:'/',
      label: 'Bru Instant Coffee',
      image: '/product1.jpg',
      
    },
    {
      href:'/',
      label: 'Bru Instant Coffee',
      image: '/product2.jpg',
      
    },
    {
      href:'/',
      label: 'Bru Instant Coffee',
      image: '/product4.jpg',
      
    },
    {
      href:'/',
      label: 'Bru Instant Coffee',
      image: '/product6.jpg',
      
    },
    {
      href:'/',
      label: 'Bru Instant Coffee',
      image: '/product5.jpg',
      
    },
    {
     href:'/',
     label: 'Bru Instant Coffee',
     image: '/product1.jpg',
     
   },
   ],

   amazonShops: [
    {
      image: '/images/amazon-delivery.jpeg',
      label: 'Amazon Delivery',
      offers: 'upto 70% off + Upto 5% ',
      href:'https://www.amazon.in/?&_encoding=UTF8&tag=buylowcal03-21&linkCode=ur2&linkId=8db7d97e00d6324c5a867b3dea611ff5&camp=3638&creative=24630'
    },
    {
      image: '/images/amazon-deals.jpeg',
      label: 'Amazon Deals',
      offers: 'upto 70% off + Upto 5% ',
      href:'https://www.amazon.in/gp/goldbox/ref=nav_topnav_deals?ie=UTF8&amp;ref=nav_topnav_deals&amp;pf_rd_m=A1VBAL9TL5WCBF&amp;pf_rd_s=&amp;pf_rd_r=PCB4JNXP3GMZ6JP1ZWYE&amp;pf_rd_t=36701&amp;pf_rd_p=5b42e6ae-1ba8-4d9f-b00b-b2fe636d1de6&amp;pf_rd_i=desktop&_encoding=UTF8&tag=buylowcal03-21&linkCode=ur2&linkId=c48ee088097b32c3e6067da0597df286&camp=3638&creative=24630 ',
      
    },
    {
      image: '/images/amazon-books.jpeg',
      label: ' Amazon Books',
      offers: 'upto 70% off + Upto 5% ',
      href:'https://www.amazon.in/gp/browse.html?node=976389031&amp;ref_=nav_em_sbc_books_all_0_2_17_2&_encoding=UTF8&tag=buylowcal03-21&linkCode=ur2&linkId=13e406b2e42ac04e70723867864d9d25&camp=3638&creative=24630',
    },
    {
     image: '/images/amazon-computer.jpeg',
     label: ' Amazon Computer & Accessories',
     offers: 'upto 70% off + Upto 5% ',
     href:'https://www.amazon.in/gp/browse.html?node=976392031&amp;ref_=nav_em_sbc_mobcomp_all_comp_0_2_8_14&_encoding=UTF8&tag=buylowcal03-21&linkCode=ur2&linkId=dcf7f9a4f281df1f15870fc83b235eb4&camp=3638&creative=24630',
   },
   {
     image: '/images/amazon-fashion.jpeg',
     label: ' Amazon Fashion',
     offers: 'upto 70% off + Upto 5% ',
     href:'https://www.amazon.in/gp/browse.html?node=6648217031&amp;ref_=nav_em_sbc_mfashion_af_0_2_10_22&_encoding=UTF8&tag=buylowcal03-21&linkCode=ur2&linkId=29595ef5992d6b701c2cb8f7f4b9b6f8&camp=3638&creative=24630',
   },
   {
     image: '/images/amazon-beauty.jpeg',
     label: ' Amazon Beauty ',
     offers: 'upto 70% off + Upto 5% ',
     href:'https://www.amazon.in/gp/browse.html?node=1355016031&amp;ref_=nav_em_sbc_bhg_beauty_all_0_2_13_2&_encoding=UTF8&tag=buylowcal03-21&linkCode=ur2&linkId=c87bc1332759e7c406c06be62b15177b&camp=3638&creative=24630',
   },

   {
     image: '/images/amazon-home.jpeg',
     label: ' Amazon Home & Kitchen',
     offers: 'upto 70% off + Upto 5% ',
     href:'https://www.amazon.in/gp/browse.html?node=976442031&amp;ref_=nav_em_sbc_hk_all_0_2_12_15&_encoding=UTF8&tag=buylowcal03-21&linkCode=ur2&linkId=d8ab788f398e6338c3a19dbcd9585f21&camp=3638&creative=24630',
   },
   {
     image: '/images/amazon-sports.jpeg',
     label: ' Amazon Sports',
     offers: 'upto 70% off + Upto 5% ',
     href:'https://www.amazon.in/gp/browse.html?node=1984443031&amp;ref_=nav_em_sbc_sportslugg_all_sports_0_2_14_15&_encoding=UTF8&tag=buylowcal03-21&linkCode=ur2&linkId=4773c1b228872523af990b805cb92d4a&camp=3638&creative=24630',
   },
  ],
};

export const InvitedUsers = [

  { 
     id:'9056',
     name: 'Vinender Singh',
     mobileNumber: '90182-47362',
     status: 'accepted',
     purchases: '₹ 1500 in last 1 month',
     level: '1',
 },

 {
  id:'9496',
     name: 'Koshim',
     mobileNumber: '90182-47362',
     status: 'accepted',
     purchases: '₹ 2000 in last 1 month',
     level: '2',
 },

 {
  id:'1102',
     name: 'Sahil',
     mobileNumber: '80183-65263',
     status: 'accepted',
     purchases: '₹ 2000 in last 1 month',
     level: '3',
 },

 {
  id:'2026',
     name: 'Dev Ed',
     mobileNumber: '70182-65262',
     status: 'pending',
     purchases: '₹ 1030 in last 1 month',
     level: '4',
     date : '20/June/2021',

 },

 {
  id:'1016',
     name: 'Web Dev',
     mobileNumber: '70340-69872',
     status: 'pending',
     purchases: '₹ 200 in last 1 month',
     level: '2',
     date : '20/June/2021',
 },

 {
  id:'70856',
     name: 'Aman',
     mobileNumber: '90182-47362',
     status: 'accepted',
     purchases: '₹ 1160 in last 1 month',
     level: '3',
     date : '20/June/2021',
 },

 {
  id:'1095',
     name: 'Sharma',
     mobileNumber: '80183-65263',
     status: 'accepted',
     purchases: '₹ 350 in last 1 month',
     level: '4',
     date : '20/June/2021',
 },

 {
  id:'9306',
     name: 'Dev Ed',
     mobileNumber: '70182-65262',
     status: 'pending',
     purchases: '₹ 600 in last 1 month',
     level: '2',
     date : '20/June/2021',

 },

 {
  id:'9394',
     name: 'Web Dev',
     mobileNumber: '70340-69872',
     status: 'pending',
     purchases: 'null',
     level: '3',
     date : '20/June/2021',
 },

 {
  id:'4006',
     name: 'Guest',
     mobileNumber: '70340-69872',
     status: 'pending',
     purchases: 'null',
     level: '4',
     date : '20/June/2021',
 },
]
