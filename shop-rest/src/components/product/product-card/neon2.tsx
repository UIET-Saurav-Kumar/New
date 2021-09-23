import Image from "next/image";
import cn from "classnames";
import { siteSettings } from "@settings/site.settings";
import usePrice from "@utils/use-price";
import { AddToCart } from "@components/product/add-to-cart/add-to-cart";
import { useTranslation } from "next-i18next";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useProductQuery } from "@data/product/use-product.query";

type NeonProps = {
  product: any;
  className?: string;
  productSlug: string
};






const Neon2: React.FC<NeonProps> = ({ product, className, productSlug }) => {

  const { data, isLoading: loading } = useProductQuery(productSlug);



  const { t } = useTranslation("common");

  const { name, quantity, unit } = product ?? {};

  const { price, basePrice, discount } = usePrice({
    amount: product.price,
    baseAmount: product.sale_price,
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
        "product-card cart-type-neon rounded h-full bg-light overflow-hidden shadow-sm transition-all duration-200 hover:shadow transform hover:-translate-y-0.5",
        className
      )}
    >
      <div
        className="relative flex items-center justify-center cursor-pointer w-auto h-48 p-4 xl:p-12 sm:h-64"
        onClick={handleProductQuickView}
      >
        <span className="sr-only">{t("text-product-image")}</span>
        <Image
          src={product.image?.original?? siteSettings?.product?.placeholderImage}
          alt={product.name}
          layout="fill"
          // height={420}
          // width={420}
          objectFit="fill"
          className="product-image"
        />
        {discount && (
          <div className="absolute top-3 end-3 md:top-4 md:end-4 rounded text-xs leading-6 font-semibold px-1.5 sm:px-2 md:px-2.5 bg-accent text-light">
            {discount}
          </div>
        )}
      </div>
      {/* End of product image */}

      <header className="p-3 md:p-6">

        <div className="flex items-center  mb-2">
          <span className="text-sm md:text-base text-heading font-semibold">
            {basePrice ? basePrice : price}
          </span>
          {discount && (
            <del className="text-xs md:text-sm text-muted ms-2">{price}</del>
            
          )}
        </div>
        {/* End of product price */}

        <h3
          className="text-xs md:text-sm text-body truncate mb-4 cursor-pointer"
          onClick={handleProductQuickView}
        >
           <div className='flex flex-col'>{name}<h3>{unit}</h3></div>
        </h3>
        {/* End of product title */}

        {quantity > 0 ? (
          <AddToCart variant="neon" data={product} />
        ) : (
          <div className="bg-red-500 rounded text-xs text-center text-light px-2 py-1.5 sm:py-2.5">
            {t("text-out-stock")}
          </div>
        )}
        {/* End of add to cart */}
      </header>
    </article>
  );
};

export default Neon2;
