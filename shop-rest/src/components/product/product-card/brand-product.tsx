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
import router from "next/router";
import WishlistButton from "../product-details/wishlist-button";
import { HeartFillIcon } from "@components/icons/heart-fill";
import { useEffect, useState } from "react";
import { useOrdersQuery } from "@data/order/use-orders.query";


type NeonProps = {
  product: any;
  className?: string;
  productSlug: string
};




const BrandProduct: React.FC<NeonProps> = ({ product, className, productSlug }) => {

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
  const [pageURL, setPageUrl] = useState('');

  useEffect(() => {
    setPageUrl(window.location.href)
  }, []);

  const { openModal } = useModalAction();


  const {
    data:ordersData,
   
  } = useOrdersQuery({});

  // const isSelected = !isEmpty(variations)
  //   ? !isEmpty(attributes) &&
  //     Object.keys(variations).every((variation) =>
  //       attributes.hasOwnProperty(variation)
  //     )
  //   : true;

  function handleProductQuickView() {
    return openModal("PRODUCT_DETAILS", product.slug);
  }
  function containsProduct(ordersData: any[], productId: number) {
    return ordersData?.some((order: any) => {
      return order?.products.some((product: any) => {
        return product?.id === productId;
      });
    });
  }

  return (

    <article
      // style={{maxWidth:"330px"}}
      className={cn(
        " relative product-card cart-type-neon rounded h-full bg-light overflow-hidden shadow-sm transition-all duration-200 hover:shadow ",
        className
      )}
    >
       <Link href={`${ROUTES.PRODUCT}/${slug}`}>
         
      <div
        className="relative flex items-center justify-center cursor-pointer w-auto h-48 p-4 xl:p-12 sm:h-64"
      >
        <span className="sr-only">{t("text-product-image")}</span>
        
             {/* <Image quality='40'
            priority={true}
            src={product.image?.thumbnail?? siteSettings?.product?.placeholderImage}
            alt={product.name}
            layout="fill"
            objectFit="contain"
            
            className="product-image"
          /> */}
          <img src={product.image?.thumbnail?? siteSettings?.product?.placeholderImage} alt={product.name} className="product-image object-contain  lg:w-60 lg:h-60" />
          

         {discount && (
          <div className="absolute top-3 end-3 md:top-4 md:end-4 rounded text-xs leading-6 
                          shadow-md font-semibold px-1.5 sm:px-2 md:px-2.5  bg-gradient-to-r from-gold to-yellow-500 text-white ">
            {discount}
          </div>
        )}
      </div>

      {/* <span className="absolute bottom-0 bg-gray-50 w-full py-1 px-3 lg:px-6 text-gray-500 lg:text-gray-600 text-xs lg:text-sm ">
        { orders_count !== 0  ?  orders_count + ' ' + 'bought' : null}
      </span> */}

      </Link>
      {/* End of product image */}

      <header className="p-3 md:p-6">

       
        {/* End of product price */}

        

        <h3
          className="text-xs font-bold flex-normal md:text-sm flex flex-col text-gray-900  truncate mb-2 cursor-pointer"
        >
           <span className=''>
             {name}
           </span>
           <span className="flex items-center justify-between">
             <p>{unit}</p>
             
             {/* <p className="font-light  text-gray-500">{orders_count + ' ' + 'sold'}</p> */}
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
        {/* End of product title */}
        {/* {product_type.toLowerCase() === 'variable' ? (
          <>
            {Number(quantity) > 0 && (
              <button
                onClick={()=>router.push(`${ROUTES.PRODUCT}/${slug}`)}
                className="group w-full h-7 md:h-9 flex items-center justify-between text-xs md:text-sm text-body-dark rounded bg-gray-100 transition-colors hover:bg-accent hover:border-accent hover:text-light focus:outline-none focus:bg-accent focus:border-accent focus:text-light"
              >
                <span className="flex-1">{t(' Grab')}</span>
                <span className="w-7 h-7 md:w-9 md:h-9 bg-gray-200 grid place-items-center rounded-te rounded-be transition-colors duration-200 group-hover:bg-accent-600 group-focus:bg-accent-600">
                  
                  <PlusIcon className="w-4 h-4 stroke-2" />
                </span>
              </button>
            )}
          </>
        ) : (
          <div className="flex items-center justify-between">
            {Number(quantity) > 0 && (
            <div className="flex  items-start  justify-between md:pt-3 ">
                <AddToCart  variant="single" data={product} />
                
              { product?.id ===  (14358 || 14110) ? containsProduct(ordersData?.pages?.[0].data, product?.id) ?
                 
                <span className="text-xs mt-2 lg:text-sm font-bold shadow-2xl bg-red-600 p-1 rounded px-1 text-white">
                  Sold out
                </span>
                 : null : '' }
            </div>
            )}
            <button onClick={()=>openModal('PRODUCT_DESCRIPTION',product?.description)} className="text-blue-800 border rounded-2xl p-2 px-3 text-sm lg:mt-3">
              Details
            </button>
          </div>
        )} */}

        {Number(quantity) <= 0 && (
          <div className="bg-red-500 rounded text-xs text-center text-light px-2 py-1.5 sm:py-2.5">
            {t('text-out-stock')}
          </div>
        )}
        
        {/* End of add to cart */}
      </header>
    </article>
  );
};

export default BrandProduct;
