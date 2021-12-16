import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import cn from "classnames";
import { ExpandLessIcon } from "@components/icons/expand-less-icon";
import { ExpandMoreIcon } from "@components/icons/expand-more-icon";
import { getIcon } from "@utils/get-icon";
import * as CategoryIcons from "@components/icons/category";
import { useUI } from "@contexts/ui.context";
import { useEffect, useState } from "react";
import { useModalAction, useModalState } from "./modal/modal.context";



function SidebarMenuItem({ className, item, depth = 0 }: any) {

  const router = useRouter();

  const active = router?.query?.category;

  const isActive =
    active === item.slug ||
    item?.children?.some((_item: any) => _item.slug === active);

  const [isOpen, setOpen] = useState<boolean>(isActive);

  useEffect(() => {
    setOpen(isActive);
  }, [isActive]);
  const { slug, name, children: items, icon } = item;
  const { displaySidebar, closeSidebar } = useUI();

  function toggleCollapse() {
    setOpen((prevValue) => !prevValue);
  }

  const { closeModal } = useModalAction();

  

  function onClick() {
   
    const { pathname, query } = router;
    closeModal()
    const navigate = () =>
      router.push(
        {
          pathname,
          query: { ...query, category: slug || 'all' },
        },
        undefined,
        {
          scroll: false,
        }
      );

    if (Array.isArray(items) && !!items.length) {
      toggleCollapse();
      navigate();
    } else {
      navigate();
      displaySidebar && closeSidebar();
    }
  }

  let expandIcon;
  if (Array.isArray(items) && items.length) {
    expandIcon = !isOpen ? (
      <ExpandLessIcon className="w-3 h-3" />
    ) : (
      <ExpandMoreIcon className="w-3 h-3" />
    );
  }

  return (
    <>
      <div 
        // initial={false}
        // animate={{ backgroundColor: "black" }}/
        onClick={onClick}
        
        className="flex items-center relative top-0  w-full py-1 rounded-md"
      >
        
        {/* <div className='flex items-center justify-between'> */}
          <button
          className={cn(
            "flex flex-col lg:flex  items-center divide-y py-1 text-start outline-none text-body-dark font-semibold  focus:outline-none focus:ring-0 focus:text-accent",
            isOpen ? "text-accent  transition duration-800 ease-in-out" : "text-body-dark",
            className ? className : "text-sm"
          )}
        >
         <div className='grid grid-cols-1  w-auto sm:w-20 px-2 place-items-center lg:flex  mx-auto items-center'>
         {icon && (
              <span className="flex text-center w-8 h-8 items-center justify-center">
                {getIcon({
                  iconList: CategoryIcons,
                  iconName: icon,
                  className: "max-h-full  max-w-full",
                })}
              </span>
            )}
            <div className=" flex items-center">
              <span className='text-xs text-center'>{name}</span>
              <span className=" text-center mx-auto">{expandIcon}</span>
            </div>
          </div>
        </button>
        {/* </div> */}

      </div>
      <AnimatePresence initial={false}>
        {Array.isArray(items) && isOpen ? (
          <li>
            <motion.ul
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 1, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="text-xs text-light"
            >
              {items?.map((currentItem) => {
                const childDepth = depth + 1;
                return (
                  <SidebarMenuItem
                    key={`${currentItem.name}${currentItem.slug}`}
                    item={currentItem}
                    depth={childDepth}
                    className={cn("text-sm text-body ")}
                  />
                );
              })}
            </motion.ul>
          </li>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function SidebarMenu({ items, className }: any) {

  return (
    <ul className='flex flex-col lg:flex justify-between 
                    w-full items-center lg:items-start'>
     {/* <ul className={cn("text-xs", className)}> */}
      {items?.map((item: any) => (
        <SidebarMenuItem key={`${item.name}${item.slug}`} item={item} />
      ))}
    </ul>
  );
}

export default SidebarMenu;
