import { PlusIcon } from "@components/icons/plus-icon";
import CartIcon from "@components/icons/cart";
import { useTranslation } from "next-i18next";
import cn from "classnames";

type Props = {
  variant?: "helium" | "neon" | "argon" | "oganesson" | "single" | "big";
  onClick(event: React.MouseEvent<HTMLButtonElement | MouseEvent>): void;
  disabled?: boolean;
};

const AddToCartBtn: React.FC<Props> = ({ variant, onClick, disabled }) => {
  const { t } = useTranslation("common");

  switch (variant) {
    case "neon":
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          className="bg-btn  group w-full h-7 md:h-9 flex items-center justify-between text-xs 
                     md:text-sm text-body-dark rounded shadow-lg transition-colors hover:bg-plus 
                     hover:border-accent hover:text-light focus:outline-none focus:bg-yellow-500 
                     focus:border-accent focus:text-light"
        >
          <span className="flex-1 font-bold text-white">{t(" add")}</span>
              <span className="w-7 h-7 md:w-9 md:h-9 bg-plus grid place-items-center rounded-te rounded-be transition-colors duration-200 group-hover:bg-btn group-focus:bg-plus">
                <PlusIcon className="w-4 h-4 text-white stroke-2" />
          </span>
          
        </button>
      );
    case "argon":
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          className="w-7 h-7 md:w-9 md:h-9 flex items-center justify-center text-sm text-heading bg-light rounded border border-border-200 transition-colors hover:bg-accent hover:border-accent hover:text-light focus:outline-none focus:bg-accent focus:border-accent focus:text-light"
        >
          <PlusIcon className="w-5 h-5 stroke-2" />
        </button>
      );
    case "oganesson":
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          className="w-8 h-8  md:w-10 md:h-10 flex  border-2 items-center justify-center text-sm rounded-full text-light bg-accent shadow-500 transition-colors hover:bg-accent hover:border-accent hover:text-light focus:outline-none focus:bg-accent focus:border-accent focus:text-light"
        >
          <span className="sr-only">{t("text-plus")}</span>
          <PlusIcon className="w-5 h-5 md:w-6 border-4  md:h-6 stroke-2" />
        </button>
      );
    case "single":
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          className="order-5 sm:order-4 ml-2 py-2 px-1 xs:px-2 sm:px-3 border-2 border-border-100 flex items-center justify-center sm:justify-start text-sm font-semibold rounded-full text-accent hover:text-light bg-light hover:bg-accent hover:border-accent transition-colors duration-300 focus:outline-none focus:bg-accent focus:border-accent focus:text-light"
        >
          <CartIcon className="w-4 h-4 me-2.5" />
          <span>{t("Grab")}</span>
        </button>
      );
    case "big":
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          className={cn(
            "py-4 px-5 w-full flex items-center justify-center text-sm lg:text-base font-light rounded text-light bg-accent hover:bg-accent-hover transition-colors duration-300 focus:outline-none focus:bg-accent-hover",
            {
              "border !bg-gray-300 hover:!bg-gray-300 border-border-400 !text-body cursor-not-allowed":
                disabled,
            }
          )}
        >
          {/* <span>{t(" add-cart")}</span> */}
          <span>Add to cart</span>
        </button>
      );
    default:
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          title={disabled ? "Out Of Stock" : ""}
          className="w-7 h-7 md:w-9 md:h-9 flex items-center justify-center text-sm text-accent bg-light rounded border border-border-200 transition-colors hover:bg-accent hover:border-accent hover:text-light focus:outline-none focus:bg-accent focus:border-accent focus:text-light"
        >
          <span className="sr-only">{t("text-plus")}</span>
          <PlusIcon className="w-5 h-5 stroke-2" />
        </button>
      );
  }
};

export default AddToCartBtn;
