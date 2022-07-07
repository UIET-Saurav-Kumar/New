
import Counter from "@components/ui/counter";
import AddToCartBtn from "@components/product/add-to-cart/add-to-cart-btn";
import { cartAnimation } from "@utils/cart-animation";
import { useCart } from "@contexts/quick-cart/cart.context";
import { generateCartItem } from "@contexts/quick-cart/generate-cart-item";
import { useCreateLogMutation } from "@data/log/use-create-log.mutation";
import { useLocation } from "@contexts/location/location.context";
import { useOrdersQuery } from "@data/order/use-orders.query";

interface Props {
  data: any;
  variant?: "helium" | "neon" | "argon" | "oganesson" | "single" | "big";
  counterVariant?:
    | "helium"
    | "neon"
    | "argon"
    | "oganesson"
    | "single"
    | "details";

      

          

  counterClass?: string;
  variation?: any;
  disabled?: boolean;
  onClick?: (e: any) => void;
}

export const AddToCart = ({
  onClick,
  data,
  variant = "helium",
  counterVariant,
  counterClass,
  variation,
  disabled,
}: Props) => {
  const {
    addItemToCart,
    removeItemFromCart,
    isInStock,
    isProductAvailable,
    getItemFromCart,
    isInCart,
  } = useCart();


  const item = generateCartItem(data, variation);
  const { mutate: createLog} = useCreateLogMutation();
  const {getLocation} =useLocation()

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

  // console.log('ear phone', containsProduct(ordersData?.pages?.[0].data, 14110));

  
  const handleAddClick = (
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    e.stopPropagation();
    onClick && onClick(e);
    addItemToCart(item, 1) 
    if (!isInCart(item.id)) {
      cartAnimation(e);
    }

    createLog({
      location:getLocation?.formattedAddress,
      product:item,
      type:'item-added'
    }, {
      onSuccess: (data: any) => {
        // console.log(data)
      },
    });
    

  };
  const handleRemoveClick = (e: any) => {
    e.stopPropagation();
    removeItemFromCart(item.id);

    createLog({
      location:getLocation?.formattedAddress,
      product:item,
      type:'item-removed'
    }, {
      onSuccess: (data: any) => {
        console.log(data)
      },
    });

  };

  console.log('item id',item)
  const outOfStock = isInCart(item?.id) && !isInStock(item.id) && !isProductAvailable(item.id) ;
  return !isInCart(item?.id) ? (

    <>
      <AddToCartBtn
        disabled={disabled || outOfStock || item.id === 14110 ? containsProduct(ordersData?.pages?.[0].data, 14110) : false}
        variant={variant}
        onClick={handleAddClick}
      />
    </>
  ) : (
    <>
      <Counter
        value={getItemFromCart(item.id).quantity}
        onDecrement={handleRemoveClick}
        onIncrement={(getItemFromCart(item.id).quantity !== data.quantity ? handleAddClick : null)}
        variant={counterVariant ? counterVariant : variant}
        className={counterClass}
        disabled={outOfStock || (item.id === 14110 ? (containsProduct(ordersData?.pages?.[0].data, 14110) ? disabled : null) : null)}
      />
    </>
  );
};