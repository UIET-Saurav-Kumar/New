import Image from "next/image";
import cn from "classnames";
import usePrice from "@utils/use-price";
import { siteSettings } from "@settings/site.settings";
import { AddToCart } from "@components/product/add-to-cart/add-to-cart";
import { useTranslation } from "next-i18next";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useEffect,useState } from "react";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";


type HeliumProps = {
  product: any;
  className?: string;
};

const Helium: React.FC<HeliumProps> = ({ product, className }) => {
  const { t } = useTranslation("common");
  const { name, image, unit,slug, quantity, orders_count} = product ?? {};
  const { openModal } = useModalAction();
  const { price, basePrice, discount } = usePrice({
    amount: product.price,
    baseAmount: product.sale_price,
  });

  function handleProductQuickView() {
    return openModal("PRODUCT_DETAILS", product.slug);
  }
  const [pageURL, setPageUrl] = useState('');

  useEffect(() => {
    setPageUrl(window.location.href)
  }, []);


  return (

    <article
      className={cn(
        "relative product-card cart-type-helium border rounded h-full bg-light overflow-hidden transition-shadow duration-200 hover:shadow-sm",
        className
      )}
    >
      <Link href={`${ROUTES.PRODUCT}/${slug}`}>

      <div
        // onClick={handleProductQuickView}
        className="relative flex items-center justify-center w-auto h-24 sm:h-64"
        role="button"
      >
        <span className="sr-only">{t("text-product-image")}</span>

        <Image
          src={image?.original ?? siteSettings?.product?.placeholderImage}
          alt={name}
          layout="fill"
          objectFit="contain"
          className="product-image"
        />
        {discount && (
          <div className="absolute top-3 end-3 md:top-4 md:end-4 rounded-full text-xs leading-6 font-semibold px-1.5 sm:px-2 md:px-2.5 bg-yellow-500 text-light">
            {discount}
          </div>
        )}
      </div>

      <span className="absolute bottom-0 bg-gray-50 w-full py-1 px-3 lg:px-6 text-gray-500 lg:text-gray-600 text-xs lg:text-sm ">
        { orders_count !== 0  ?  orders_count + ' ' + 'bought' : null}
        </span>


      </Link>
      {/* End of product image */}

      <header className="p-3 md:p-6 relative">

        <h3
          onClick={handleProductQuickView}
          role="button"
          className="text-heading text-sm font-semibold truncate mb-2"
        >
          {name}
        </h3>

        <p className="text-muted text-xs">{unit}</p>

        { pageURL.includes('salon-products') || pageURL.includes('salon-page') ? (
          <div className=' flex justify-between text-xs text-gray-600 mb-4 h-4 mt-2 font-light'>
            {product?.shop?.name} 
            {/* <span className="font-light text-gray-800">{'sold' + ' ' + orders_count}</span> */}
          </div> ) :
            null
        }

        {/* End of product info */}

        <div className="flex items-center justify-between min-h-6 mt-7 md:mt-8 relative">
         
          <div className="relative">
            {discount && (
              <del className="text-xs text-muted text-opacity-75 absolute -top-4 md:-top-5 italic">
                {price}
              </del>
            )}
            <span className="text-accent text-sm md:text-base font-semibold">
              {basePrice ? basePrice : price}
            </span>
          </div>

          

          {/* End of product price */}

          {quantity > 0 ? (
            <AddToCart data={product} variant="single" />
            
          ) : (
            <div className="bg-red-500 rounded text-xs text-light px-2 py-1">
              {t("text-out-stock")}
            </div>
          )}
          {/* End of add to cart */}
        </div>

      </header>
    </article>
  );
};

export default Helium;
