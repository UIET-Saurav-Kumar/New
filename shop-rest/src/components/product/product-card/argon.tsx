import Image from "next/image";
import cn from "classnames";
import { siteSettings } from "@settings/site.settings";
import { AddToCart } from "@components/product/add-to-cart/add-to-cart";
import usePrice from "@utils/use-price";
import { useTranslation } from "next-i18next";
import { useModalAction } from "@components/ui/modal/modal.context";
import router from "next/router";
import { PlusIcon } from "@heroicons/react/outline";
import { ROUTES } from "@utils/routes";
import Link from "next/link";

type ArgonProps = {
  product: any;
  className?: string;
};

const Argon: React.FC<ArgonProps> = ({ product, className }) => {
  const { t } = useTranslation("common");
  const { name, image, quantity, product_type, slug  } = product ?? {};
  const { openModal } = useModalAction();
  const { price, basePrice, discount  } = usePrice({
    amount: product.price,
    baseAmount: product.sale_price,
  });
  function handleProductQuickView() {
    return openModal("PRODUCT_DETAILS", product.slug);
  }

  const nameTruncated = name.length > 40 ? name.substring(0, 40) + "..." : name;


  return (
    
    <Link href={(`${ROUTES.PRODUCT}/${slug}`)}><article
      className={cn(
        "product-card cart-type-argon border rounded bg-light overflow-hidden shadow-sm transition-all duration-200  h-full",
        className
      )}
      // onClick={handleProductQuickView}
      // onClick={() => router.push(`${ROUTES.PRODUCT}/${slug}`)}
      role="button"
    >
      <div className="relative flex items-center justify-center w-auto h-48 sm:h-52">
       
        <span className="sr-only">{t("text-product-image")}</span>
            <Image  lazyBoundary='50px'  loading='eager' quality='40'
            src={image?.original ?? siteSettings?.product?.placeholderImage}
            alt={name}
            layout="fill"
            objectFit="contain"
            priority={true}
            className="product-image"
          />
        {discount && (
          <div className="absolute top-0 start-0 md:top-4 md:start-4 rounded text-xs leading-6 font-semibold px-1.5 sm:px-2 md:px-2.5 bg-accent text-light">
            {discount}
          </div>
        )}

        {product_type?.toLowerCase() === 'variable' ? (
          <>
            {Number(quantity) > 0 && (
              <button
                onClick={()=>router.push(`${ROUTES.PRODUCT}/${slug}`)}
                className="group w-full h-7 md:h-9 flex items-center justify-between text-xs md:text-sm text-body-dark rounded bg-gray-100 transition-colors hover:bg-accent hover:border-accent hover:text-light focus:outline-none focus:bg-accent focus:border-accent focus:text-light"
              >
                <span className="flex-1">{t(' add')}</span>
                <span className="w-7 h-7 md:w-9 md:h-9 bg-gray-200 grid place-items-center rounded-te rounded-be transition-colors duration-200 group-hover:bg-accent-600 group-focus:bg-accent-600">
                  <PlusIcon className="w-4 h-4 stroke-2" />
                </span>
              </button>
            )}
          </>
        ) : (

        <div className="absolute top-0 border-2 rounded border-gray-400 end-0 md:top-4 md:end-4">
            {quantity > 0 ? (
              <AddToCart variant="argon" data={product} />
            ) : (
              <div className="bg-red-500 rounded text-xs text-light px-2 py-1">
                {t("text-out-stock")}
              </div>
            )}
        </div>
        )}

      </div>
      {/* End of product image */}

      <header className="p-3 md:p-6">
        <div className="flex    mb-2">
          <span className="text-sm md:text-base text-heading  font-semibold">
            {basePrice ? basePrice : price}
          </span>
          {discount && (
            <del className="text-sm md:text-base text-body ms-2">{price}</del>
          )}
        </div>
        {/* End of product price */}

        <h3 className="text-xs whitespace-wrap h-4 mb-2 md:text-sm text-body">{nameTruncated}</h3>
        {/* End of product title */}
      </header>
    </article></Link>
  );
};

export default Argon;
