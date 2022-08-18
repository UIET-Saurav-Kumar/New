import Image from "next/image";
import cn from "classnames";
import { siteSettings } from "@settings/site.settings";
import usePrice from "@utils/use-price";
import { AddToCart } from "@components/product/add-to-cart/add-to-cart";
import { useTranslation } from "next-i18next";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useProductQuery } from "@data/product/use-product.query";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import { PlusIcon } from "@heroicons/react/outline";
import { min } from "lodash";
import router from "next/router";
import WishlistButton from "../product-details/wishlist-button";
import RatingsBadge from "@components/ui/rating-badge";
import { useOrdersQuery } from "@data/order/use-orders.query";
import { useEffect, useState } from "react";
 // dynamically import containProduct function from pages/orders
 

 

type NeonProps = {
  product: any;
  className?: string;
  productSlug: string
};


const OfferCard: React.FC<NeonProps> = ({ product, className, productSlug }) => {

  const { data, isLoading: loading } = useProductQuery(productSlug);

  const { t } = useTranslation("common");

  const { name,unit,slug, image,orders_count, quantity, min_price, max_price, product_type } =
    product ?? {};
    
  const { price, basePrice, discount } = usePrice({
    amount: product.price ? product.price : product.price!,
    baseAmount: product.sale_price,
  });
  
  const { price: minPrice } = usePrice({
    amount: min_price,
  });

  const { price: maxPrice } = usePrice({
    amount: max_price,
  });

  const { openModal } = useModalAction();

  // const isSelected = !isEmpty(variations)
  //   ? !isEmpty(attributes) &&
  //     Object.keys(variations).every((variation) =>
  //       attributes.hasOwnProperty(variation)
  //     )
  //   : true;

  function handleProductQuickView() {
    return openModal("PRODUCT_DETAILS", product.slug);
  }

  const {
    data:ordersData,
   
  } = useOrdersQuery({});

  function containsProduct(ordersData: any[], productId: number) {
    return ordersData?.some((order: any) => {
      return order?.products.some((product: any) => {
        return product?.id === productId;
      });
    });
  }

  // console.log('quantity', product.quantity)

  const [pageURL, setPageUrl] = useState('');

  useEffect(() => {
    setPageUrl(window.location.href)
  }, []);

  // date in am and pm format
  

  return (

    <article
      // style={{maxWidth:"330px"}}
      className={cn(
        "product-card cart-type-neon space-y-4 w-auto md:w-60 lg:w-full rounded h-auto p-2 bg-light overflow-hidden shadow-sm transition-all duration-200 hover:shadow ",
        className
      )}
    >
       <Link href={`${ROUTES.SHOPS}/${product?.shop?.slug}`}>
      <div
        className="relative flex items-center justify-center cursor-pointer w-auto h-20 lg:h-48 p-4 xl:p-12 sm:h-64"
      >
        <span className="sr-only">{t("text-product-image")}</span>

             {/* <Image 
             quality='40'
            src={product?.image?.thumbnail ?? siteSettings?.product?.placeholderImage}
            alt={product?.name}
            layout="fill"
            objectFit="contain"
            className="product-image"
          /> */}
          <img src={product?.image?.thumbnail ?? siteSettings?.product?.placeholderImage} alt={product?.name} className="product-image object-contain" />

        
      </div>
      </Link>
      {/* End of product image */}

      <header className="py-1 md:p-6">

        
        <h3
          className="text-xs font-bold flex-normal md:text-sm flex flex-col   text-gray-900  truncate mb-2 cursor-pointer"
        >
           <span className=''>
             {name}
           </span>
           
           { pageURL.includes('home') ? (
           <div className='flex flex-col sm:flex-row justify-between text-xs  md:text-sm text-gray-900  mt-2 font-light'>
           <Link href={`/shops/${product?.shop?.slug}`}><span className="text-10 hover:text-indigo-700 font-semibold  bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-purple-600 to-blue-600"> {product?.shop?.name} </span></Link>
            <span className="font-light  bg-clip-text text-transparent bg-gradient-to-r from-yellow-700 via-red-600 to-yellow-600">{product?.shop?.address?.city}</span>
            {/* <span className="font-light text-gray-800">{'sold' + ' ' + orders_count}</span> */}
          </div>) :
            null
        }
        </h3>
        
        
      </header>
    </article>
  );
};

export default OfferCard;
