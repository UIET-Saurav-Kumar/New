
import Image from "next/image";
import Link from "@components/ui/link";
import cn from "classnames";
import { siteSettings } from "@settings/site.settings";
import { useSettings } from "@contexts/settings.context";
import Buylowcal from "@components/landing-page/buylowcal-home";

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({

  className,
  ...props
}) => {
  const { logo, siteTitle } = useSettings();

  return (

    <Link
      href={siteSettings.logo.href}
      // className={cn("inline-flex", className)}
      className='flex'
      {...props}
    >
      {/* <span
        className="overflow-hidden w-10 relative z-10"
        style={{
          width: siteSettings.logo.width,
          height: siteSettings.logo.height,
        }}
      > */}
      <img src='/only-logo.png' className='lg:w-20 w-12 sm:w-16' />

        {/* <img src={ siteSettings.logo.url} className='h-10 w-10' /> */}
      {/* </span> */}
    </Link>
  );
};

export default Logo;
