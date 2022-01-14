
import Counter from "@components/ui/counter";
import AddToCartBtn from "@components/product/add-to-cart/add-to-cart-btn";
import { cartAnimation } from "@utils/cart-animation";
import { useCart } from "@contexts/quick-cart/cart.context";
import { generateCartItem } from "@contexts/quick-cart/generate-cart-item";
import { useCreateLogMutation } from "@data/log/use-create-log.mutation";
import { useLocation } from "@contexts/location/location.context";

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
    getItemFromCart,
    isInCart,
  } = useCart();

  const item = generateCartItem(data, variation);
  const { mutate: createLog} = useCreateLogMutation();
  const {getLocation} =useLocation()

  const handleAddClick = (
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    e.stopPropagation();
    onClick && onClick(e);
    addItemToCart(item, 1);
    if (!isInCart(item.id)) {
      cartAnimation(e);
    }

    createLog({
      location:getLocation?.formattedAddress,
      product:item,
      type:'item-added'
    }, {
      onSuccess: (data: any) => {
        console.log(data)
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
  const outOfStock = isInCart(item?.id) && !isInStock(item.id);
  return !isInCart(item?.id) ? (

    <>
      <AddToCartBtn
        disabled={disabled || outOfStock}
        variant={variant}
        onClick={handleAddClick}
      />
    </>
  ) : (
    <>
      <Counter
        value={getItemFromCart(item.id).quantity}
        onDecrement={handleRemoveClick}
        onIncrement={handleAddClick}
        variant={counterVariant ? counterVariant : variant}
        className={counterClass}
        disabled={outOfStock}
      />
    </>
  );
};
