import { type ProductColor } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import SliderArrow from "../UI/SliderArrow";

export const ImageGallerySkeleton = ({
  animate = true,
}: {
  animate?: boolean;
}) => {
  return (
    <div
      className={`${
        animate && "animate-pulse"
      } flex w-full flex-col items-start gap-4 md:flex-row-reverse`}
    >
      <div className="relative w-full">
        <div className="aspect-square w-full bg-slate-200"></div>
        <div className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-slate-300 p-2 text-center"></div>
        <div className="absolute left-[calc(100%-1rem)] top-1/2 flex h-12 w-12 -translate-x-full -translate-y-1/2 items-center justify-center rounded-full bg-slate-300 p-2 text-center"></div>
      </div>
      <div className="flex gap-2 md:flex-col">
        {[...Array(3).keys()].map((i) => (
          <div
            className={` h-16 w-16 rounded-sm border bg-slate-200`}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

interface Props {
  images: { id: string; imageURL: string; color: ProductColor }[];
  selectedColor: ProductColor | null;
}

const ImageGallery = ({ images, selectedColor }: Props) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    setCurrentImage(0);
  }, [selectedColor]);

  const filteredImages = images.filter?.(
    (image) => image.color === selectedColor,
  );

  const isFirstImage = currentImage === 0;
  const isLastImage = currentImage === images.length - 1;

  return (
    <div className="flex w-full flex-col items-start gap-4 md:flex-row-reverse">
      <div className="relative w-full">
        <div className="aspect-square w-full ">
          <Image
            fill
            objectFit="fill"
            sizes="(max-width: 1024px) 100vw, 600px"
            className="rounded-md bg-gradient-to-b from-slate-200 to-slate-100"
            src={images[currentImage]?.imageURL ?? ""}
            alt="Product image"
          />
        </div>
        <SliderArrow
          containerClass="left-4"
          disabled={isFirstImage}
          onClick={() => setCurrentImage((prev) => (prev < 1 ? 0 : prev - 1))}
        />
        <SliderArrow
          containerClass="right-4"
          disabled={isLastImage}
          onClick={() =>
            setCurrentImage((prev) =>
              prev >= images.length - 1 ? images.length - 1 : prev + 1,
            )
          }
          arrowDirectionClass="rotate-180"
        />
      </div>
      <div className="flex gap-2 md:flex-col">
        {filteredImages.map((image, i) => (
          <Image
            onMouseOver={() => setCurrentImage(i)}
            className={`${
              i === currentImage ? "border-indigo-300" : "border-slate-200"
            } rounded-sm border bg-slate-200`}
            key={image.id}
            width={64}
            height={64}
            src={image.imageURL}
            alt="Product image gallery item"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
