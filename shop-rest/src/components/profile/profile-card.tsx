
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

      <aside
        className={cn(
          "bg-gray-50 sm:bg-white shadow-md  sm:shadow-none px-2 rounded mt-0  lg:mt-0  h-36 items-center border sm:border-none sm:h-64 lg:h-72 w-full sm:1/3 md:w-auto lg:w-56 xl:w-56 2xl:w-56 flex-shrink-0",
          className
        )}
      >
        <div className="h-full w-full  flex items-center  overflow-hidden">

          <Scrollbar className={cn("w-full", styles.scrollbar_height)}>

            <div className="w-full -space-y-8 p-0 grid grid-cols-2  gap-x-8 gap-y-0  
                            xs+++:grid-cols-1 lg:grid-cols-1 items-center">

              <div className="w-full h-34 rounded-lg flex relative mx-auto 
                              items-center overflow-hidden mb-8">

                  <img
                    alt = {t("logo")}
                    src = {data?.logo?.original! ?? "/product-placeholder.svg"}
                    // layout="fill"
                    className='object-cover sm:object-contain md:object-contain 
                               lg:object-fill mx-auto w-20 h-20  sm:h-36 sm:w-36'
                    // objectFit = "fill"
                  />
                
              </div>

              <h3 className="text-md font-semibold   text-center text-heading mb-2">
                {data?.name}
                <div className=' -mt-4  '>
                    <div className="flex items-center w-full  justify-end p-2 mt-3">
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
                            className: "lg:w-8 lg:h-8 w-6 h-6 opacity-85 ",
                            })}
                        </a>
                        ))}
                    </div>
                </div>
                
              </h3>
              

            </div>

          </Scrollbar>
        </div>

      </aside>
    </>
  );
};

export default ShopProfileCard;
