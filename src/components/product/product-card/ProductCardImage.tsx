/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import { type ImageProps } from "next/image";
import { base64String } from "~/components/pages/product/ImageGallery";
const ProductCardImage = (props: ImageProps) => {
  return (
    <div className="border border-slate-200 transition-[border]  duration-100 group-hover:border-slate-300 @2xs:rounded-md">
      <Image
        {...props}
        fill
        className={`"absolute inset-0 ${props.className}`}
        placeholder="blur"
        blurDataURL={base64String}
      />
    </div>
  );
};

export default ProductCardImage;
