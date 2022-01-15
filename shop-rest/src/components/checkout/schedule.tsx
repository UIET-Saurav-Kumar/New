import SectionWithCardGroup from "@components/common/section-with-card-group";
import { useCheckout } from "@contexts/checkout.context";
import { siteSettings } from "@settings/site.settings";
import { useEffect } from "react";
import { useCart } from "@contexts/quick-cart/cart.context";

interface Props {
  count: number;
}

const Schedule = ({ count }: Props) => {
  const { updateDeliveryTime } = useCheckout();
  const { items } = useCart();

  function isDeliveryAvailable():Boolean{
    var delivery_status=false;
    items.forEach(element=>{
      if(element.shop.delivery_status==1){
        delivery_status=true;
      }
    })
    return delivery_status;
  }

  useEffect(() => {
    updateDeliveryTime(siteSettings.deliverySchedule[0]);
  }, []);

  function handleSelect(item: any) {
    updateDeliveryTime(item);
  }
  return (
    <SectionWithCardGroup
      count={count}
      heading="Delivery or Appointment Schedule"
      items={siteSettings.deliverySchedule}
      onSelect={handleSelect}
      delivery_status={isDeliveryAvailable()}
    />
  );
};

export default Schedule;
