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
import Avatar from 'react-avatar';


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
    
    const imageCheck = (logo: any , record:any, imgsize:any, imgDim:any, classname: string) => {
      console.log(logo)
      let check = false;
      let splitLength = logo?.split("/").length;
      let lastSplit = logo?.split("/")[splitLength - 1];
      if (lastSplit != "") {
        check = true;
      }
      return (check ?    < Image        quality='40' src={logo} alt={record?.name} className={classname} width={300} height={300} />:<Avatar name={record?.name} size={imgsize} round={imgDim} maxInitials={2} />);
    }

  return (
    <>
      
        <div className="mt-2 xs+++:mt-0 sm:mt-0 bg-white relative h-full w-full border
                        rounded-lg xs+++:rounded-r-none flex items-center overflow-hidden">

          {/* <Scrollbar className={cn("w-full", styles.scrollbar_height)}> */}

            <div className="w-full -space-y-8 p-3 grid grid-cols-2  gap-x-8 gap-y-0  
                             sm:grid-cols-1 lg:grid-cols-1 items-center">

              <div className="w-full h-52  rounded-lg flex justify-center flex-col space-y-2 mt-0 sm:-mt-6 relative mx-auto 
                              overflow-hidden mb-8">
                  {imageCheck(data?.logo?.thumbnail, data, '250', false,'object-contain sm:object-contain rounded md:object-contain lg:object-contain  ')}              
                  
                   {/* <span className="text-sm sm:hidden text-center font-light tracking-wide  text-gray-600 ">

                      {data && data?.address.street_address}

                  </span> */}

              </div>

              <h3 className="text-lg flex flex-col space-y-4 sm:text-lg w-full lg:text-xl lg:tracking-wide  sm:mt-6 pt-4 font-bold mt-0 
                             lg:mt-6 lg:pt-4 text-center font-serif text-heading mb-2">
                  {data?.name}
                   {/* <span className="text-sm hidden mt-2 sm:block lg:hidden text-center font-light tracking-wide  text-gray-600">

                      {data && data?.address.street_address}

                  </span> */}
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
