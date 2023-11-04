import Image from "next/image";
import { useState } from "react";

interface Props {
  images: { id: string; imageURL: string }[];
}

const ImageGallery = ({ images }: Props) => {
  const [currentImage, setCurrentImage] = useState(images[0]);

  return (
    <div className="flex h-[500px] gap-4">
      <div className="flex flex-col gap-2">
        {images.map((image) => (
          <Image
            onMouseOver={() => setCurrentImage(image)}
            className={`${
              image.id === currentImage?.id
                ? "border-gray-400"
                : "border-gray-200"
            } rounded-sm border bg-slate-200`}
            key={image.id}
            width={64}
            height={64}
            src={image.imageURL}
            alt="Product image gallery item"
          />
        ))}
      </div>
      <Image
        className="bg-slate-200"
        src={currentImage?.imageURL ?? ""}
        alt="Product image"
        width={550}
        height={550}
      />
    </div>
  );
};

export default ImageGallery;
