// import Image from "next/image";
// import { useState } from "react";
// import { BsHeart, BsHeartFill } from "react-icons/bs";
// import { useFavoritesContext } from "~/context/favoritesContext";
// import { formatCurrency } from "~/utilities/formatCurrency";
// import type { SQLProductType } from "~/types";
// import { useRouter } from "next/router";
// const ProductCard = ({
//   product,
//   onClose,
// }: {
//   product: SQLProductType;
//   onClose?: () => void;
// }) => {
//   const { isFavorited } = useFavoritesContext();
//   const router = useRouter();
//   const [showColorVariations, setShowColorVariations] = useState(false);
//   const [currentImage, setCurrentImage] = useState(product.images[0]?.id);
//   const priceBeforeDiscount = formatCurrency(product.price);
//   const priceAfterDiscount = formatCurrency(
//     product.discount?.discountPercent
//       ? product.price - (product.price * product.discount.discountPercent) / 100
//       : product.price,
//   );
//   const currentImageColor = product.images.find(
//     (image) => image.id === currentImage,
//   )?.color;

//   const productLink = `/product/${product.id}/${product.images.find(
//     (image) => image.id === currentImage,
//   )?.color}`;

//   const [touched, setTouched] = useState(false);

//   const image = (
//     <Image
//       onClick={async () => {
//         if (!touched) return;

//         setTouched(true);
//         await router.push(productLink);
//       }}
//       fill
//       className={`   shadow-color relative cursor-pointer rounded-sm border border-transparent bg-slate-100 shadow-md transition-[border] duration-100 group-hover:border-indigo-200 md:rounded-md lg:rounded-lg`}
//       src={
//         product.images.find((image) => image.id === currentImage)?.imageURL ??
//         ""
//       }
//       alt="Product image"
//     />
//   );

//   const favoriteButton = (
//     <div
//       role="button"
//       className={`border ${
//         currentImageColor && isFavorited(currentImageColor, product.id)
//           ? "border-indigo-100"
//           : "border-transparent"
//       } pointer-events-none absolute right-[4%] top-[4%] z-10 flex h-8 w-8 items-center justify-center  rounded-full bg-slate-50 p-1.5 @2xs:h-10 @2xs:w-10 @2xs:p-2`}
//     >
//       {currentImageColor && isFavorited(currentImageColor, product.id) && (
//         <BsHeartFill className="h-full w-full text-indigo-400" />
//       )}
//       {currentImageColor && !isFavorited(currentImageColor, product.id) && (
//         <BsHeart className="h-full w-full text-slate-600" />
//       )}
//     </div>
//   );

//   const prices = product.discount?.discountPercent ? (
//     <div className="absolute bottom-2 left-4 text-slate-900 transition-transform duration-300 group-hover:-translate-y-1.5">
//       <p className="w-fit rounded-sm bg-teal-500 px-2 py-1 font-display font-bold text-white">
//         -{product.discount?.discountPercent}%
//       </p>
//       <div className="h-1.5"></div>
//       <div className=" flex gap-2 ">
//         <p className="rounded-sm bg-white  px-3 py-1  font-display  text-slate-400 line-through">
//           {priceBeforeDiscount}
//         </p>
//         <p className="w-fit rounded-sm bg-white  px-3 py-1 font-display font-bold text-pink-500">
//           {priceAfterDiscount}
//         </p>
//       </div>
//     </div>
//   ) : (
//     <p className="absolute bottom-2 left-4 w-fit bg-slate-50 px-3 py-1 font-display font-bold transition-transform duration-300 group-hover:-translate-y-1.5">
//       {priceBeforeDiscount}
//     </p>
//   );

//   const cardFooter = (
//     <div className=" min-h-[4rem] w-full self-start overflow-hidden pl-1 @xs:pl-1.5">
//       {/* Card footer images */}
//       <div
//         className={`${
//           showColorVariations ? "opacity-100" : "-translate-y-full opacity-0"
//         } absolute  flex w-full items-start gap-2 self-start transition-[opacity,transform] duration-[250ms]`}
//       >
//         <p className="line-clamp-1 font-semibold">{touched.toString()}</p>

//         {product.colors.map((color, i) => {
//           const thumbnailImage = product.images.find(
//             (image) => image.color === color.color,
//           );
//           return (
//             <Image
//               key={i}
//               onMouseOver={() => setCurrentImage(thumbnailImage?.id)}
//               className="relative z-[3]  h-10 w-10 bg-slate-100 @2xs:h-[56px] @2xs:w-[56px]"
//               width={56}
//               height={56}
//               src={thumbnailImage?.imageURL ?? ""}
//               alt={`${color.color} variation`}
//             />
//           );
//           // );
//         })}
//       </div>
//       {/* Card footer text */}
//       <div
//         className={`${
//           !showColorVariations ? "opacity-100" : "translate-y-full opacity-0"
//         } t absolute  min-h-[4rem]  w-full overflow-hidden  transition-[transform,opacity] duration-[250ms]`}
//       >
//         <p className="line-clamp-1 font-semibold">{product.name}</p>
//         <div className="h-1"></div>
//         <p className="text-slate-500">{product.category.name}</p>
//       </div>
//     </div>
//   );

//   return (
//     <article
//       onMouseOver={(e) => {
//         if (!touched) {
//           setTouched(true);
//           setShowColorVariations(true);
//           e.preventDefault();
//           return;
//         }
//       }}
//       onMouseLeave={() => {
//         setShowColorVariations(false);
//         setTouched(false);
//       }}
//       className="@container"
//     >
//       {/* <div
//         onClick={(e) => {
//           setTouched(true);
//           setShowColorVariations(true);
//           e.stopPropagation();
//         }}
//         className={` ${
//           touched && "pointer-events-none opacity-0"
//         } absolute inset-0 z-[2] cursor-pointer bg-pink-500/50`}
//       /> */}
//       <div
//         className={`group relative flex flex-col items-center justify-center  rounded-sm p-1 text-xs text-slate-800 @2xs:text-base`}
//       >
//         <div className="relative aspect-square w-full ">
//           {favoriteButton}
//           {image}
//           {prices}
//         </div>
//         <div className="h-4"></div>
//         {cardFooter}
//       </div>
//     </article>
//   );
// };

// export default ProductCard;

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useFavoritesContext } from "~/context/favoritesContext";
import { formatCurrency } from "~/utilities/formatCurrency";
import type { SQLProductType } from "~/types";
console.log("first");
const ProductCard = ({
  product,
  onClick,
}: {
  product: SQLProductType;
  onClick?: () => void;
}) => {
  const { isFavorited } = useFavoritesContext();
  const [showColorVariations, setShowColorVariations] = useState(false);
  const [currentImage, setCurrentImage] = useState(product.images[0]?.id);
  const priceBeforeDiscount = formatCurrency(product.price);
  const priceAfterDiscount = formatCurrency(
    product.discount?.discountPercent
      ? product.price - (product.price * product.discount.discountPercent) / 100
      : product.price,
  );
  const currentImageColor = product.images.find(
    (image) => image.id === currentImage,
  )?.color;

  const productLink = `/product/${product.id}/${product.images.find(
    (image) => image.id === currentImage,
  )?.color}`;

  /* 
  - rendering 2 images to prevent the flickering of conditionally rendering 2 different image elements based on showColorVariations
  - bottom image is non interactive 
  - top image is a link to the product page 
  - the top image becomes visible upon clicking/tapping the card
  */

  const mainImage = (
    <Image
      fill
      className="absolute inset-0 z-[0] rounded-lg border border-transparent bg-slate-100 transition-[border] duration-100 group-hover:border-indigo-200"
      src={
        product.images.find((image) => image.id === currentImage)?.imageURL ??
        ""
      }
      alt="Product image"
    />
  );

  const mainImageLink = (
    <Link
      className={` ${
        showColorVariations ? "opacity-100" : "pointer-events-none opacity-0"
      } absolute inset-0 z-[1]`}
      onClick={onClick}
      href={productLink}
    >
      <Image
        fill
        className="rounded-lg border border-transparent bg-slate-100 transition-[border] duration-100 group-hover:border-indigo-200"
        src={
          product.images.find((image) => image.id === currentImage)?.imageURL ??
          ""
        }
        alt="Product image"
      />
    </Link>
  );

  const favoriteButton = (
    <div
      role="button"
      className={`border ${
        currentImageColor && isFavorited(currentImageColor, product.id)
          ? "border-indigo-100"
          : "border-transparent"
      } pointer-events-none absolute right-[4%] top-[4%] z-10 flex h-8 w-8 items-center justify-center  rounded-full bg-slate-50 p-1.5 @2xs:h-10 @2xs:w-10 @2xs:p-2`}
    >
      {currentImageColor && isFavorited(currentImageColor, product.id) && (
        <BsHeartFill className="h-full w-full text-indigo-400" />
      )}
      {currentImageColor && !isFavorited(currentImageColor, product.id) && (
        <BsHeart className="h-full w-full text-slate-600" />
      )}
    </div>
  );

  const prices = product.discount?.discountPercent ? (
    <div className="absolute bottom-2 left-4 text-slate-900 transition-transform duration-300 group-hover:-translate-y-1.5">
      <p className="w-fit rounded-sm bg-teal-500 px-2 py-1 font-display font-bold text-white">
        -{product.discount?.discountPercent}%
      </p>
      <div className="h-1.5"></div>
      <div className=" flex gap-2 ">
        <p className="rounded-sm bg-white  px-3 py-1  font-display  text-slate-400 line-through">
          {priceBeforeDiscount}
        </p>
        <p className="w-fit rounded-sm bg-white  px-3 py-1 font-display font-bold text-pink-500">
          {priceAfterDiscount}
        </p>
      </div>
    </div>
  ) : (
    <p className="absolute bottom-2 left-4 w-fit bg-slate-50 px-3 py-1 font-display font-bold transition-transform duration-300 group-hover:-translate-y-1.5">
      {priceBeforeDiscount}
    </p>
  );

  const thumbnails = (
    <div className="relative min-h-[4rem] w-full self-start overflow-hidden pl-1 @xs:pl-1.5">
      <div
        className={`${
          showColorVariations ? "opacity-100" : "-translate-y-full opacity-0"
        } absolute  flex w-full items-start gap-2 self-start transition-[opacity,transform] duration-[250ms]`}
      >
        {product.colors.map((color, i) => {
          const image = product.images.find(
            (image) => image.color === color.color,
          );
          return showColorVariations ? (
            <Image
              onClick={onClick}
              onMouseOver={() => setCurrentImage(image?.id)}
              className="h-10 w-10  bg-slate-100 @2xs:h-[56px] @2xs:w-[56px]"
              width={56}
              height={56}
              src={image?.imageURL ?? ""}
              alt={`${color.color} variation`}
            />
          ) : (
            <div key={i}>
              <Image
                onMouseOver={() => setCurrentImage(image?.id)}
                className="h-10 w-10 cursor-pointer bg-slate-100 @2xs:h-[56px] @2xs:w-[56px]"
                width={56}
                height={56}
                src={image?.imageURL ?? ""}
                alt={`${color.color} variation`}
              />
            </div>
          );
        })}
      </div>
      <div
        className={`${
          !showColorVariations ? "opacity-100" : "translate-y-full opacity-0"
        } t absolute  min-h-[4rem]  w-full overflow-hidden  transition-[transform,opacity] duration-[250ms]`}
      >
        <p className="line-clamp-1 font-semibold">{product.name}</p>
        <div className="h-1"></div>
        <p className="text-slate-500">{product.category.name}</p>
      </div>
    </div>
  );

  return (
    <article
      onMouseOver={() => setShowColorVariations(true)}
      onMouseLeave={() => setShowColorVariations(false)}
      className="@container"
    >
      <div
        className={` group flex flex-col items-center justify-center  rounded-sm p-1  text-xs text-slate-800 @2xs:text-base`}
      >
        <div className="relative aspect-square w-full ">
          {favoriteButton}
          {mainImageLink}
          {mainImage}
          {prices}
        </div>
        <div className="h-4"></div>
        {thumbnails}
      </div>
    </article>
  );
};

export default ProductCard;
