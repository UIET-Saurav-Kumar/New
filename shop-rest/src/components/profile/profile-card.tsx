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
      <div
        className={cn(
          "flex items-center md:hidden  w-48 bg-light border-b  py-4 px-6 sticky top-[15px] z-10",
          cardClassName
        )}
      >
        <div className="w-10 h-10 rounded-lg relative mx-auto border  overflow-hidden me-4 flex-shrink-0">

          <Image
            alt={t("logo")}
            src={data?.logo?.original! ?? "/product-placeholder.svg"}
            layout="fill"
            objectFit="contain"
            
          />

        </div>

        <div className="w-full">

          <h3 className="text-base font-semibold text-heading">{data?.name}</h3>

            <button
              className="text-sm font-semibold transition text-accent hover:text-accent-hover"
              onClick={handleMoreInfoModal}
            >
              {t("text-more-info")}
            </button>

        </div>
      </div>

      <aside
        className={cn(
          "bg-light rounded h-full w-full md:w-48 2xl:w-56 hidden md:block flex-shrink-0",
          className
        )}
      >
        <div className="max-h-full overflow-hidden">

          <Scrollbar className={cn("w-full", styles.scrollbar_height)}>

            <div className="w-full border-b border-gray-200 p-7 flex flex-col items-center">

              <div className="w-full h-34 rounded-lg flex relative mx-auto items-center  overflow-hidden mb-8">

                <Image

                  alt = {t("logo")}
                  src = {data?.logo?.original! ?? "/product-placeholder.svg"}
                  // layout="fill"
                  objectFit = "contain"
                  width = {150}
                  height = {150}
                  
                />
                
              </div>

              <h3 className="text-md font-semibold text-heading mb-2">
                {data?.name}
              </h3>

              {/* {data?.description && (
                <p className="text-xs text-body mb-2 text-center leading-relaxed">
                  <ReadMore character={70}>{data?.description}</ReadMore>
                </p>
              )} */}

              {/* <div className="flex items-center justify-start mt-3">
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
                      className: "w-4 h-4",
                    })}
                  </a>
                ))}
              </div> */}
            </div>

            {/* <div className="p-7">
              <div className="mb-7 last:mb-0 flex flex-col">
                <span className="text-sm text-heading font-semibold mb-2">
                  {t("text-address")}
                </span>
                <span className="text-sm text-body">
                  {!isEmpty(formatAddress(data?.address))
                    ? formatAddress(data?.address)
                    : t("common:text-no-address")}
                </span>
              </div>

              <div className="mb-7 last:mb-0 flex flex-col">
                <span className="text-sm text-heading font-semibold mb-2">
                  {t("text-phone")}
                </span>
                <span className="text-sm text-body">
                  {data?.settings?.contact
                    ? data?.settings?.contact
                    : t("text-no-contact")}
                </span>
              </div>
              {data?.settings?.website && (
                <div className="flex flex-col">
                  <span className="text-sm text-heading font-semibold mb-2">
                    {t("text-website")}
                  </span>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-body">
                      {data?.settings?.website}
                    </span>
                    <a
                      href={data?.settings?.website}
                      target="_blank"
                      className="text-sm text-accent font-semibold hover:text-accent-hover focus:outline-none focus:text-accent-hover"
                    >
                      {t("text-visit-site")}
                    </a>
                  </div>
                </div>
              )}
            </div> */}
          </Scrollbar>
        </div>
      </aside>
    </>
  );
};

export default ShopProfileCard;
