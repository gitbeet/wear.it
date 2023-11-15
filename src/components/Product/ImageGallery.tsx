import { type ProductColor } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";

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
  return (
    <div className="flex w-full flex-col items-start gap-4 md:flex-row-reverse">
      <div className="relative w-full">
        <div className="aspect-square w-full ">
          <Image
            fill
            objectFit="fill"
            sizes="(max-width: 1024px) 100vw, 600px"
            className=" bg-slate-200"
            src={images[currentImage]?.imageURL ?? ""}
            alt="Product image"
          />
        </div>
        <div
          onClick={() => setCurrentImage((prev) => (prev < 1 ? 0 : prev - 1))}
          role="button"
          className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-slate-100 p-2 text-center"
        >
          <FiChevronLeft className="h-8 w-8 text-gray-800" />
        </div>
        <div
          onClick={() =>
            setCurrentImage((prev) =>
              prev >= images.length - 1 ? images.length - 1 : prev + 1,
            )
          }
          role="button"
          className="absolute left-[calc(100%-1rem)] top-1/2 flex h-12 w-12 -translate-x-full -translate-y-1/2 items-center justify-center rounded-full bg-slate-100 p-2 text-center"
        >
          <FiChevronLeft className="text-gray-80 h-8 w-8 rotate-180" />
        </div>
      </div>
      <div className="flex gap-2 md:flex-col">
        {filteredImages.map((image, i) => (
          <Image
            onMouseOver={() => setCurrentImage(i)}
            className={`${
              i === currentImage ? "border-gray-400" : "border-gray-200"
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
