
import { FacebookIcon } from "@components/icons/facebook";
import { InstagramIcon } from "@components/icons/instagram";
import { TwitterIcon } from "@components/icons/twitter";
import { YouTubeIcon } from "@components/icons/youtube";
import { ROUTES } from "@utils/routes";

export const siteSettings = {

  name: "PickBazar",
  description: "",
  logo: {
    url: "/transparent-logo.png",
    alt: "PickBazar",
    href: "/home",
    width: 128,
    height: 52,
  },

  defaultLanguage: "en",
  currencyCode: "USD",
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
    name: "RedQ, Inc.",
    websiteUrl: "https://redq.io",
    address: "115 E 9th St, New York, CA 90079,USA",
    phone: "+971-321-4841-78",
    social: [
      {
        link: "https://www.facebook.com",
        icon: <FacebookIcon width="16px" height="16px" />,
        hoverClass: "text-social-facebook",
      },
      {
        link: "https://www.instagram.com",
        icon: <InstagramIcon width="16px" height="16px" />,
        hoverClass: "text-social-instagram",
      },
      {
        link: "https://www.twitter.com",
        icon: <TwitterIcon width="16px" height="16px" />,
        hoverClass: "text-social-twitter",
      },
      {
        link: "https://www.youtube.com",
        icon: <YouTubeIcon width="16px" height="16px" />,
        hoverClass: "text-social-youtube",
      },
    ],
  },


  headerLinks: [
    { href: ROUTES.SHOPS, icon: null, label: "Shops" },
    { href: ROUTES.OFFERS, icon: null, label: "Offer" },
    // { href: ROUTES.HELP, label: "FAQ" },
    { href: ROUTES.CONTACT, label: "Contact" },
  ],

  authorizedLinks: [
    { href: ROUTES.PROFILE, label: "Profile" },
    { href: ROUTES.CHECKOUT, label: "Checkout" },
    { href: ROUTES.ORDERS, label: "Orders" },
    { href: ROUTES.INVITE_FRIENDS, label: "Invite Friends" },
    { href: ROUTES.REFERRAL_ACTIVITY, label: "Referral Status" },
    { href: ROUTES.REFERRAL_NETWORK, label: "Referral Network" },
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
    {
      href: ROUTES.REFERRAL_ACTIVITY,
      menulabel: "Referral Activity",
    },
    {
      href: ROUTES.HELP,
      menulabel: "profile-sidebar-help",
    },
    {
      href: ROUTES.LOGOUT,
      menulabel: "profile-sidebar-logout",
    },

  ],


  deliverySchedule: [
    {
      id: "0",
      title: "Self Pickup",
      description: "",
    },
    {
      id: "1",
      title: "express-delivery",
      description: "90 min express delivery",
    },
    {
      id: "2",
      title: "8am-11am",
      description: "8.00 AM - 11.00 AM",
    },
    {
      id: "3",
      title: "11am-2pm",
      description: "11.00 AM - 2.00 PM",
    },
    {
      id: "4",
      title: "2pm-5pm",
      description: "2.00 PM - 5.00 PM",
    },
    {
      id: "5",
      title: "5pm-8pm",
      description: "5.00 PM - 8.00 PM",
    },
    {
      id: "6",
      title: "next day",
      description: "Next Day",
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