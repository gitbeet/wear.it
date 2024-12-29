/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import { type ImageProps } from "next/image";
const ProductCardImage = (props: ImageProps) => {
  return (
    <div className="border border-slate-200 transition-[border]  duration-100 group-hover:border-slate-300 @2xs:rounded-md">
      <Image
        {...props}
        fill
        className={`"absolute inset-0 ${props.className}`}
      />
    </div>
  );
};

export default ProductCardImage;
