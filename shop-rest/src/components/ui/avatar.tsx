import cn from "classnames";
import Image from "next/image";

type AvatarProps = {
  className?: string;
  src: string;
  title: string;
  [key: string]: unknown;
};

const Avatar: React.FC<AvatarProps> = ({ src, className, title, ...rest }) => {
  return (
    <div
      className={cn(
        "relative cursor-pointer w-10 h-10 lg:w-14 lg:h-14 overflow-hidden rounded-full border border-border-100",
        className
      )}
      {...rest}
    >
         <Image        quality='40' alt={title} src={src} layout="fill"  />
    </div>
  );
};

export default Avatar;
