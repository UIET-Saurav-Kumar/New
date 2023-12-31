import ErrorMessage from '@components/ui/error-message';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import Link from '@components/ui/link';
import Button from '@components/ui/button';
import { productPlaceholder } from '@utils/placeholders';
import NotFound from '@components/ui/not-found';
import Rating from '@components/ui/rating-badge';
import usePrice from '@utils/use-price';
import { useRemoveFromWishlist, useWishlist } from '@utils/wishlist';
import type { Product } from '@ts-types/custom.types';
import { ROUTES } from "@utils/routes";
import { AddToCart } from './add-to-cart/add-to-cart';
import WishlistLoader from '@components/ui/loaders/wishlist-loader';
import { useModalAction } from '@components/ui/modal/modal.context';
import rangeMap from '@utils/range-map';
import AddToCartBtn from './add-to-cart/add-to-cart-btn';

function WishlistItem({ product }: { product: Product }) {
  
  const { t } = useTranslation('common');
  const { removeFromWishlist, isLoading } = useRemoveFromWishlist();
  const { price, basePrice } = usePrice({
    amount: product?.sale_price ? product?.sale_price : product?.price,
    baseAmount: product?.price,
  });
  const { price: minPrice } = usePrice({
    amount: product?.min_price,
  });
  const { price: maxPrice } = usePrice({
    amount: product?.max_price,
  });

  const { openModal } = useModalAction();

  function handleVariableProduct() {
    return openModal('PRODUCT_DETAILS', product?.slug);
  }

  // console.log('wishlist item', product);

  return (
    <div className='flex py-2 w-full'>
    <div className="flex w-full items-start space-x-4 border-b border-gray-200 py-5 first:pt-0 last:border-0 last:pb-0 rtl:space-x-reverse sm:space-x-5 xl:items-center">
      <div className="hidden sm:relative sm:flex h-16 w-16  items-center justify-center border border-gray-200 sm:h-[74px] sm:w-[74px]">
           < Image        quality='40'
          src={product?.image?.thumbnail ?? '/images/product-placeholder.png'}
          alt={product?.name}
          // layout="fill"
          className="absolute inset-0 object-cover"
          width={74}
          height={74}
          
        />
      </div>

      <div className="flex w-full flex-col items-start sm:flex-row sm:justify-between sm:space-x-4 rtl:sm:space-x-reverse xl:items-center">
        <div className="flex w-full flex-col sm:items-start">
         <div className='flex justify-between '> <Link
             href={`${ROUTES.PRODUCT}/${product?.slug}`}
            className=" text-md md:text-lg font-semibold text-heading transition-colors hover:text-accent"
          >
            {product?.name}
          </Link>
         
          </div>

          {/* <p className="mt-3 space-y-2 space-x-3.5 sm:space-y-0 rtl:sm:space-x-reverse"> */}
          <p className="mt-1.5 flex flex-col items-start space-y-3">
            <Link
              href={`${ROUTES.PRODUCT}/${product?.shop?.slug}`}
              className="inline-block w-auto text-sm font-semibold text-body-dark transition-colors hover:text-accent"
            >
              {product?.shop?.name}
            </Link>
            <Rating rating={product?.ratings} variant="xs" boxed />
          </p>
        </div>
        

        <div className="mt-4 flex w-full  justify-between space-y-3 xs:flex-row xs:space-y-0 sm:w-auto sm:flex-col sm:justify-end sm:space-y-3 md:mt-0">
          {product?.product_type === 'variable' ? (
            <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
              <span className="text-xl font-semibold text-heading">
                {minPrice}
              </span>
              <span> - </span>
              <span className="text-xl font-semibold text-heading">
                {maxPrice}
              </span>
            </div>
          ) : (
            <span className="flex   items-center sm:justify-end">
              <ins className="text-md md:text-xl font-light text-gray-900 no-underline">
                {price}
              </ins>
              {basePrice && (
                <del className="text-base font-normal text-muted ltr:ml-3 rtl:mr-3">
                  {basePrice}
                </del>
              )}
            </span>
          )}

          <div className="flex  items-center space-x-2 rtl:space-x-reverse sm:justify-between">
            {Number(product?.quantity) > 0 && (
              <div className='space-x-4'>
                {product?.product_type.toLowerCase() === 'variable' ? (
                  <AddToCartBtn
                    variant="text"
                    onClick={handleVariableProduct}
                  />
                ) : (
                 <div className='ml-3'> <AddToCart variant="radon" data={product} /></div>
                )}
              </div>
            )}

            {Number(product?.quantity) <= 0 && (
              <span className="whitespace-nowrap text-sm font-semibold text-red-300 sm:mt-0">
                {t('text-out-stock')}
              </span>
            )}
            <span className="flex h-7 w-px border-r border-dashed border-gray-300" />
            <button
              className="whitespace-nowrap text-sm font-semibold text-red-500 hover:underline sm:mt-0"
              onClick={() => removeFromWishlist(product?.slug)}
              disabled={isLoading}
            >
              {t('Remove')}
            </button>
          </div>
        </div>
      </div>
    </div>

     <div className=" sm:hidden    items-start   border-gray-200 ">
         < Image        quality='40'
        src={product?.image?.thumbnail ?? '/images/product-placeholder.png'}
        alt={product?.name}
        // layout="fill"
        className=" inset-0 object-cover"
        width={74}
        height={74}
      />
   </div>

   </div>
  );
}

const WishlistProducts: React.FC = () => {
  const { t } = useTranslation('common');
  const { wishlists, isLoading, isLoadingMore, error, hasMore, loadMore } =
    useWishlist();

    // console.log('wishlists',wishlists)

  if (error) return <ErrorMessage message={error.message} />;

  // loader
  if (!wishlists.length && isLoading) {
    return (
      <div className="flex w-full flex-col">
        <div className="mb-8 flex items-center justify-center sm:mb-10">
          <h1 className="text-center text-lg font-semibold text-heading sm:text-xl">
            {t('My Wishlist')}
          </h1>
        </div>
        {rangeMap(15, (i) => (
          <WishlistLoader key={i} uniqueKey={`favorite-${i}`} />
        ))}
      </div>
    );
  }

  if (!wishlists.length && !isLoading) {
    return (
      <div className="flex w-full flex-col">
        <div className="mb-8 flex items-center justify-between sm:mb-10">
          <h1 className="ml-auto text-center text-lg font-semibold text-heading sm:text-xl">
            {t('My Wishlist')}
          </h1>
        </div>
        <NotFound
          text="Not found"
          className="mx-auto w-full md:w-7/12"
        />
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full flex-col">
        <div className="mb-8 flex items-center justify-center sm:mb-10">
          <h1 className="text-center text-lg font-semibold text-heading sm:text-xl">
            {t('My Wishlist')}
          </h1>
        </div>
        {wishlists?.map((item) => (
          <WishlistItem key={item?.slug} product={item} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 flex w-full justify-center">
          <Button
            loading={isLoadingMore}
            disabled={isLoadingMore}
            onClick={loadMore}
          >
            {t('text-load-more')}
          </Button>
        </div>
      )}
    </>
  );
};

export default WishlistProducts;
