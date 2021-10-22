import cn from "classnames";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { formatAddress } from "@utils/format-address";
import { isEmpty } from "lodash";
import ReadMore from "@components/ui/truncate";
import { useModalAction } from "@components/ui/modal/modal.context";
import Scrollbar from "@components/ui/scrollbar";
import styles from "./profile-card.module.css";
import { getIcon } from "@utils/get-icon";
import * as socialIcons from "@components/icons/social";

type ShopProfileCardProps = {
  data: any;
  className?: string;
  cardClassName?: string;
  style?: any;
};

  const ShopProfileCard: React.FC<ShopProfileCardProps> = ({
    data,
    className,
    cardClassName,
  }) => {
    const { t } = useTranslation("common");
    const { openModal } = useModalAction();

    function handleMoreInfoModal() {
      return openModal("SHOP_INFO", data);
    }
    console.log('shop data', data.address.street_address);

  return (
    <>
      {/* <div
        className={cn(
          "items-center hidden lg:grid-cols-1 lg:w-full bg-light   py-0 px-6 sticky top-[15px] z-10",
          cardClassName
        )}
      >
        <div className="w-10 h-10 rounded-lg relative mx-auto overflow-hidden me-4 flex-shrink-0">

          <Image
            alt={t("logo")}
            src={data?.logo?.original! ?? "/product-placeholder.svg"}
            layout="fill"
            objectFit="contain"
          />

        </div>

        <div className="w-full ">

          <h3 className="text-base font-semibold text-heading">{data?.name}</h3>

            <button
              className="text-sm font-semibold transition text-accent hover:text-accent-hover"
              onClick={handleMoreInfoModal}
            >
              {t("text-more-info")}
            </button>

        </div>
      </div> */}

     
        <div className="mt-2 xs+++:mt-0 sm:mt-0 bg-white relative h-full w-full border
                        rounded-lg xs+++:rounded-r-none flex items-center overflow-hidden">

          {/* <Scrollbar className={cn("w-full", styles.scrollbar_height)}> */}

            <div className="w-full -space-y-8 p-3 grid grid-cols-2  gap-x-8 gap-y-0  
                             sm:grid-cols-1 lg:grid-cols-1 items-center">

              <div className="w-full h-34 rounded-lg flex justify-center flex-col space-y-2 mt-0 sm:-mt-8 relative mx-auto 
                              overflow-hidden mb-8">

                  

                  <img
                    alt = {t("logo")}
                    src = {data?.logo?.original! ?? "/product-placeholder.svg"}
                    // layout="fill"
                    className='object-contain sm:object-contain  rounded md:object-contain 
                               lg:object-cover mx-auto w-28 h-28 lg:h-40 lg:w-40'
                    // objectFit = "fill"
                  />
                   <span className="text-sm sm:hidden text-center font-light tracking-wide  text-gray-600 ">

                      {data && data?.address.street_address}

                  </span>

              </div>

              <h3 className="text-lg flex flex-col space-y-4 sm:text-lg w-full lg:text-xl lg:tracking-wide  sm:mt-6 pt-4 font-bold mt-0 
                             lg:mt-8 lg:pt-8 text-center text-heading mb-2">
                  {data?.name}
                   <span className="text-sm hidden mt-2 sm:block lg:hidden text-center font-light tracking-wide  text-gray-600">

                      {data && data?.address.street_address}

                  </span>
              </h3>

             
              
                    <div className=" absolute flex  items-center  bottom-2 right-4  ">
                        {data?.settings?.socials.map((item: any, index: number) => (
                        <a
                            key={index}
                            href={item?.url}
                            target="_blank"
                            className={`text-muted focus:outline-none me-6 last:me-0 transition-colors duration-300 hover:${item.hoverClass}`}
                        >
                            {getIcon({
                            iconList: socialIcons,
                            iconName: item?.icon,
                            className: "lg:w-6 lg:h-6 w-6 h-6 opacity-85",
                            })}
                        </a>
                        ))}
                        <div className=''>

                        </div>
                    </div>
                
            </div>

          {/* </Scrollbar> */}
        </div>

    </>
  );
};

export default ShopProfileCard;
