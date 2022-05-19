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


type NeonProps = {
  product: any;
  className?: string;
  productSlug: string
};




const Neon2: React.FC<NeonProps> = ({ product, className, productSlug }) => {

  const { data, isLoading: loading } = useProductQuery(productSlug);



  const { t } = useTranslation("common");

  const { name,unit,slug, image,orders_count, quantity, min_price, max_price, product_type } =
    product ?? {};
  const { price, basePrice, discount } = usePrice({
    amount: product.sale_price ? product.sale_price : product.price!,
    baseAmount: product.price,
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

  return (

    <article
      style={{maxWidth:"330px"}}
      className={cn(
        "product-card cart-type-neon rounded h-full bg-light overflow-hidden shadow-sm transition-all duration-200 hover:shadow ",
        className
      )}
    >
       <Link href={`${ROUTES.PRODUCT}/${slug}`}>
         
      <div
        className="relative flex items-center justify-center cursor-pointer w-auto h-48 p-4 xl:p-12 sm:h-64"
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
                          shadow-md font-semibold px-1.5 sm:px-2 md:px-2.5  bg-gold text-white">
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

        {product_type.toLowerCase() === 'variable' ? (
          <div className="mb-2">
            <span className="text-sm md:text-base text-heading font-semibold">
              {minPrice}
            </span>
            <span> - </span>
            <span className="text-sm md:text-base text-heading font-semibold">
              {maxPrice}
            </span>
          </div>
        ) : (
          <div className="flex items-center  mb-2">
          <span className="text-sm md:text-base text-product-price font-bold">
            {basePrice ? basePrice : price}
          </span>
          {discount && (
            <del className="text-xs md:text-sm text-discount ms-2">{price}</del>
          )}
        </div>
        )}
        {/* End of product price */}

        <h3
          className="text-xs md:text-sm font-semibold text-gray-700 truncate mb-4 cursor-pointer"
        >
           <div className='flex flex-col'>{name}<h3>{unit}</h3>
           
           </div>
        </h3>
        {/* End of product title */}
        {product_type.toLowerCase() === 'variable' ? (
          <>
            {Number(quantity) > 0 && (
              <button
                onClick={()=>router.push(`${ROUTES.PRODUCT}/${slug}`)}
                className="group w-full h-7 md:h-9 flex items-center justify-between text-xs md:text-sm text-body-dark rounded bg-gray-100 transition-colors hover:bg-accent hover:border-accent hover:text-light focus:outline-none focus:bg-accent focus:border-accent focus:text-light"
              >
                <span className="flex-1">{t('text-add')}</span>
                <span className="w-7 h-7 md:w-9 md:h-9 bg-gray-200 grid place-items-center rounded-te rounded-be transition-colors duration-200 group-hover:bg-accent-600 group-focus:bg-accent-600">
                  <PlusIcon className="w-4 h-4 stroke-2" />
                </span>
              </button>
            )}
          </>
        ) : (
          <>
            {Number(quantity) > 0 && (
              <AddToCart variant="neon" data={product} />
            )}
          </>
        )}

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

export default Neon2;
