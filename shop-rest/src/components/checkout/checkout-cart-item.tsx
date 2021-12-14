
import usePrice from "@utils/use-price";
import cn from "classnames";
import { useTranslation } from "next-i18next";

interface Props {
  item: any;
  notAvailable?: boolean;
}

const CheckoutCartItem = ({ item, notAvailable }: Props) => {
  const { t } = useTranslation("common");
  const { price } = usePrice({
    amount: item.itemTotal,
  });

  function calculateTax(){
    var tax=JSON.parse(item.tax);
    if(tax){
      var itemTotal=(item.itemTotal)?item.itemTotal:0;
      var rate=(tax.rate)?tax.rate:0;
      var value=(parseFloat(rate)*parseFloat(itemTotal))/100;
      const {price:total}=usePrice({
        amount: value,
      })
      return total;
    }
  }

  return (
    <>
    
    <div className={cn("flex justify-between py-2")} key={item.id}>
      <p className="flex items-center justify-between text-base">
        <span
          className={cn("text-sm", notAvailable ? "text-red-500" : "text-body")}
        >
          <span
            className={cn(
              "text-sm font-bold",
              notAvailable ? "text-red-500" : "text-heading"
            )}
          >
            {item.quantity}
          </span>
          <span className="mx-2">x</span>
          <span>{item.name}</span> | <span>{item.unit}</span>
        </span>
      </p>
      <span
        className={cn("text-sm", notAvailable ? "text-red-500" : "text-body")}
      >
        {!notAvailable ? price : t("text-unavailable")}
      </span>
    </div>
    {
      calculateTax()&&(
        <div className={cn("flex justify-between py-2")} key={item.id}>
          <p className="flex items-center justify-between text-base">
            <span
              className={cn("text-sm", notAvailable ? "text-red-500" : "text-body")}
            >
              <span
                className={cn(
                  "text-sm",
                  notAvailable ? "text-red-500" : "text-heading"
                )}
              >
                Tax
              </span>

            </span>
          </p>
          <span
            className={cn("text-sm", notAvailable ? "text-red-500" : "text-body")}
          >
            {!notAvailable ? calculateTax() : t("text-unavailable")}
          </span>
        </div>
      )
    }
    
    </>
  );
};

export default CheckoutCartItem;
