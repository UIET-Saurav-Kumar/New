
import cn from "classnames";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { formatAddress } from "@utils/format-address";
import { isEmpty } from "lodash";
import ReadMore from "@components/ui/truncate";
import { useModalAction } from "@components/ui/modal/modal.context";
import Scrollbar from "@components/ui/scrollbar";
import styles from "@components/profile/profile-card.module.css";
import { getIcon } from "@utils/get-icon";
import * as socialIcons from "@components/icons/social";
import Input from "@components/ui/input";
import Button from "@components/ui/button";
import TextArea from "@components/ui/text-area";
import CategoryDropdownSidebar from "./category-dropdown-sidebar";


type ShopCategoryCardProps = {
  data: any;
  className?: string;
  cardClassName?: string;
  style?: any;
};

const ShopCategoryCard: React.FC<ShopCategoryCardProps> = ({
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
    <div className='mt-1'>

      <div
        className={cn(
          "flex md:sticky items-center  w-full bg-light  py-4 px-6  z-10 ",
          cardClassName
        )}
      >
        
       
        {/* <div className="w-16 h-16 rounded-lg relative mx-auto border border-gray-100 bg-gray-200 overflow-hidden me-4 flex-shrink-0">

          
        </div> */}

        {/* <div className="w-full">
        
        </div> */}


      <aside
        className={cn(
          "bg-transparent rounded h-full w-full md:w-60 2xl:w-60 hidden lg:block flex-shrink-0",
          className
        )}
      >

        <div className="max-h-full overflow-hidden">
          <Scrollbar className={cn("w-full", styles.scrollbar_height)}>

            <div className="w-full  p-0 flex flex-col items-center">
          
              <h4 className='-ml-36 text-gray-800 font-bold  '>Categories</h4>
              <ul className='text-gray-500'>
                <CategoryDropdownSidebar/>
              </ul>

            </div>

            <div className=' p-3'>
            <form className='' noValidate>
            
          </form>

        </div>

          </Scrollbar>

        </div>
      </aside>
      </div>
    </div>
  );
};

export default ShopCategoryCard;
