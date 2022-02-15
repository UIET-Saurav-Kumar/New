
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



export function SidebarMenuItem({ className, item, depth = 0 }: any) {

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

    const navigate = () =>
    // setOpen(false);
   displaySidebar && closeSidebar();
    
      router.push(
        {
          pathname,
          query: { ...query, category: slug , text: null || null },
          
        },
       
        undefined,
        {
          scroll: false,
        }
      );

    if (Array.isArray(items) && !!items.length) {

      toggleCollapse();
      navigate();

      displaySidebar && closeSidebar()
    } else {
     
      navigate();
      closeSidebar();
    }
  }

    let expandIcon;
    if (Array.isArray(items) && items.length) {
    
      expandIcon = !isOpen ? (
        <ExpandLessIcon className="w-4 h-4" />
        
      ) : (
        <ExpandMoreIcon className="w-4 h-4" />
      );
    }

  return (

    <>

      <div 
        // initial={false}
        // animate={{ backgroundColor: "black" }}/
        onClick={onClick}
        className="flex lg:grid lg:grid-cols-1 items-center  lg:w-16 relative top-0"
      >
        
        {/* <div className='flex items-center justify-between'> */}
          <button
            className={cn(
              "grid grid-cols-1  whitespace-normal items-center  py-1 text-start outline-none text-body-dark font-semibold  focus:outline-none focus:ring-0 focus:text-accent",
              isOpen ? "text-accent  transition duration-800 ease-in-out" : "text-body-dark",
              className ? className : "text-sm"
            )}
          >
          <div className='relative py-2 flex flex-col mx-auto h-auto  w-auto sm:w-20  px-2  place-items-center lg:grid-cols-2   lg:w-28  items-center'>
                {icon && (
                  <span className="flex  text-center  w-full items-center justify-center">
                    {getIcon({
                      iconList: CategoryIcons,
                      iconName: icon,
                      className: " w-6 h-6 lg:h-8 lg:w-8",
                    })}
                  </span>
                )}
                <div className="flex px-auto items-center">
                  <span className='text-xs w-auto whitespace-normal lg:whitespace-nowrap text-center'>{name}</span>
                  <span className="block lg:hidden text-center ">{expandIcon}</span>
                </div>
          </div>

        </button>
        {/* </div> */}

      </div>

    <div style={{zIndex:1000000}} className="text-lg">
      <AnimatePresence initial={false}>
        {Array.isArray(items) && isOpen ? (
          <li className='  z-100' style={{zIndex: 100000}}>
            <motion.ul
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0 },
              }}
              // transition={{ duration: 1, ease: [0.6, 0.1,0.1, 1.3] }}
              style={{zIndex: 10000}}  className="static lg:absolute text-xs z-100  bg-light text-left lg:text-center border-b
                                                  lg:top-16  w-auto  lg:px-auto lg:shadow-lg  text-light"
            >
              {items?.map((currentItem) => {
                const childDepth = depth + 1;

                return (

                  <SidebarMenuItem
                    key={`${currentItem.name}${currentItem.slug}`}
                    item={currentItem}
                    depth={childDepth}
                    className={cn("text-sm lg:text-lg text-body ")}
                  />
                );
              })}
            </motion.ul>
          </li>
        ) : null}
       </AnimatePresence>
      </div>
    </>
  );
}

function SidebarMenu({ items, className }: any) {
  // const router = useRouter();
  // const { pathname, query } = router;

  return (
    <>

    {/* web */}
      <ul  className='hidden lg:flex  lg:justify-evenly xl:justify-evenly 
                     w-full items-center'>
      {/* <ul className={cn("text-xs", className)}> */}
        {items?.map((item: any) => (
         <a>
           <SidebarMenuItem key={`${item.name}${item.slug}`} item={item} />
          </a>
        ))}
      </ul>

      {/* mobile */}
      <ul className='flex flex-col lg:hidden justify-between 
                      w-full items-start'>
      {/* <ul className={cn("text-xs", className)}> */}
        {items?.map((item: any) => (
        <a> 
        <SidebarMenuItem key={`${item.name}${item.slug}`} item={item} />
        </a> 
        ))}
      </ul>
    </>
  );
}

export default SidebarMenu;
