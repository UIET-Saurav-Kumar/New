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
 // dynamically import containProduct function from pages/orders
 

 

type NeonProps = {
  product: any;
  className?: string;
  productSlug: string
};


const Neon: React.FC<NeonProps> = ({ product, className, productSlug }) => {

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

  console.log('quantity', product.quantity)

  return (

    <article
      // style={{maxWidth:"330px"}}
      className={cn(
        "product-card cart-type-neon rounded h-auto p-2 bg-light overflow-hidden shadow-sm transition-all duration-200 hover:shadow ",
        className
      )}
    >
       <Link href={`${ROUTES.PRODUCT}/${slug}`}>
      <div
        className="relative flex items-center justify-center cursor-pointer w-auto h-20 lg:h-48 p-4 xl:p-12 sm:h-64"
      >
        <span className="sr-only">{t("text-product-image")}</span>

        
        
          <Image
            src={product.image?.thumbnail?? siteSettings?.product?.placeholderImage}
            alt={product.name}
            layout="fill"
            objectFit="contain"
            className="product-image"
          />

        {discount && (
          <div className="absolute top-3 end-3 md:top-4 md:end-4 rounded text-xs leading-6 
                          shadow-md font-semibold px-1.5 sm:px-2 md:px-2.5  bg-gradient-to-r from-gold to-yellow-500 text-white ">
            {discount}
          </div>
        )}
      </div>
      </Link>
      {/* End of product image */}

      <header className="py-1 md:p-6">

        {product_type.toLowerCase() === 'variable' ? (
          <div className="flex items-center  mb-2">
            <span className="text-xs md:text-base text-gold font-bold">
              {minPrice}
            </span>
            <span className="text-magenta font-bold"> {!minPrice ? `Starting ${basePrice}` : '-'} </span>
            <span className="text-xs md:text-base text-magenta font-bold">
              {maxPrice}
            </span>
          </div>
        ) : (
          <div className="flex items- justify-between  mb-2">
             <>
              <div className="grid grid-cols-1 md:flex  md:items-center  place-items-"> 
                  <span className="text-sm md:text-base text-product-price font-bold">
                      {basePrice ? basePrice : price}
                  </span>
                  {/* <span>
                      <RatingsBadge rating={product?.ratings} variant="xs" boxed />
                  </span> */}
                  {discount ? (
                    <del className="text-xs md:text-sm text-gold ms-2">
                      {price}
                    </del>
                  ) : <del className="text-xs md:text-sm h-4 text-discount ms-2">
                  
                </del>
                } 

            </div>
            </>
          <WishlistButton className="h-5" productId={product?.id} />
        </div>
        )}
        {/* End of product price */}

        <h3
          className="text-xs font-semibold flex-normal md:text-sm flex flex-col   text-gray-700  truncate mb-2 cursor-pointer"
        >
           <span className=''>
             {name}
           </span>
           <span className="flex items-center justify-between">
             <p>{unit}</p>
             {/* <p className="font-light  text-gray-500">{orders_count + ' ' + 'sold'}</p> */}
           </span>
        </h3>
        
        {/* End of product title */}
        {product_type.toLowerCase() === 'variable' ? (
          <>
            {Number(quantity) > 0 && (

             <Link href={(`${ROUTES.PRODUCT}/${slug}`)}> 
             <AddToCart  variant="organesson" data={product} />
              {/* <button
                onClick={()=>router.push(`${ROUTES.PRODUCT}/${slug}`)}
                className="group w-full h-7 md:h-9 flex items-center justify-between text-xs md:text-sm text-white rounded bg-magenta transition-colors hover:bg-gold hover:border-gold hover:text-light focus:outline-none focus:bg-gold focus:border-accent focus:text-light"
              >
                <span className="flex-1">{t('text-add')}</span>
                <span className="w-7 h-7 md:w-9 md:h-9 bg-gold grid place-items-center rounded-te rounded-be transition-colors duration-200 group-hover:bg-magenta group-focus:bg-magenta">
                  <PlusIcon className="w-4 h-4 stroke-2" />
                </span>
              </button> */}
              </Link>
            )}
          </>
        ) : (
          <>
            {Number(quantity) > 0 && (
             <div className="md:pt-3 ">
                <AddToCart  variant="organesson" data={product} />
               { product.id === 14110 ? containsProduct(ordersData?.pages?.[0].data, 14110) ?
                <span className='text-xs mt-2 lg:text-sm text-red-600'>Offer expired</span>
                : '' : ''}
               
             </div>
            )}
          </>
        )}



        {/* {Number(quantity) <= 0 && (
          <div className="bg-red-500 rounded text-xs text-center text-light px-2 py-1.5 sm:py-2.5">
            {t('text-out-stock')}
          </div>
        )} */}

         {Number(quantity) !== product.quantity && (
          <div className="bg-red-500 rounded text-xs text-center text-light px-2 py-1.5 sm:py-2.5">
            {t('text-out-stock')}
          </div>
        )}
        
        {/* End of add to cart */}
      </header>
    </article>
  );
};

export default Neon;
