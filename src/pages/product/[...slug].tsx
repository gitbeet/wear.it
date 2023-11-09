import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { createServerSideHelpers } from "@trpc/react-query/server";
import React, { useState, useEffect } from "react";
import { appRouter } from "~/server/api/root";
import { api } from "~/utils/api";
import SuperJSON from "superjson";
import { db } from "~/server/db";
import LoadingPage from "~/components/loading";
import { colorOptions } from "~/components/Filters/ColorFilter";
import type { ProductSize, ProductColor } from "@prisma/client";
import Button from "~/components/UI/Button";
import ImageGallery from "~/components/Product/ImageGallery";
import { BsHandbag, BsHeart, BsHeartFill } from "react-icons/bs";
import { formatCurrency } from "../../utilities/formatCurrency";
import { useRouter } from "next/router";
import Link from "next/link";
import { useModalsContext } from "~/context/modalsContext";
const Product = ({
  id,
  color,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { setShowBagModal } = useModalsContext();
  const ctx = api.useUtils();
  const { data: userFavorites, isLoading: isGettingFavorites } =
    api.favorite.getByUserId.useQuery();
  const { mutate: addToFavorites, isLoading: isFaving } =
    api.favorite.favorite.useMutation({
      onSuccess: () => {
        void ctx.invalidate();
      },
    });
  const { mutate, isLoading: isAddingToCart } = api.cart.addItem.useMutation({
    onSuccess: () => {
      void ctx.invalidate();
      setShowBagModal(true);
    },
  });

  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
    color as ProductColor,
  );
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [error, setError] = useState<boolean>(false);

  const { data: productData, isLoading: isGettingProductData } =
    api.product.getSingleProduct.useQuery({ id });

  const primaryColor = productData?.colors[0];

  useEffect(() => {
    if (!primaryColor) return;
    if (!router.query.slug?.[1]) {
      void router.push(
        `/product/${productData?.id}/${primaryColor}`,
        undefined,
        {
          shallow: false,
          scroll: true,
        },
      );
      return;
    }
    const isColorValid =
      productData?.colors.findIndex(
        (color) => color === router.query.slug?.[1],
      ) !== -1;
    if (!isColorValid) {
      void router.push(
        `/product/${productData?.id}/${primaryColor}`,
        undefined,
        {
          shallow: false,
          scroll: true,
        },
      );
      return;
    }
    setSelectedColor(router.query.slug[1] as ProductColor);
  }, [
    productData?.colors,
    router.query,
    primaryColor,
    router,
    productData?.id,
  ]);

  if (isGettingProductData) return <LoadingPage />;
  if (!productData) return <h1>Something went wrong.</h1>;
  const {
    colors,
    name,
    price,
    sizes,
    description,
    category,
    images,
    discount,
    types,
  } = productData;

  const priceBeforeDiscount = formatCurrency(price);
  const priceAfterDiscount = formatCurrency(
    discount?.discountPercent && discount.active
      ? price - (price * discount?.discountPercent) / 100
      : price,
  );

  async function handleColor(color: ProductColor) {
    await router.push(`/product/${productData?.id}/${color}`, undefined, {
      shallow: false,
      scroll: true,
    });
  }

  const isFavorited =
    userFavorites?.findIndex(
      (fav) => fav.color === selectedColor && fav.productId === productData.id,
    ) !== -1;

  return (
    <div>
      <section className="mx-auto flex max-w-[1200px] justify-between  pt-24">
        {/* IMAGE BLOCK */}
        <ImageGallery
          images={images.filter((image) => image.color === selectedColor)}
          selectedColor={selectedColor}
        />
        {/* INFO BLOCK */}
        <div className="flex w-[450px] flex-col gap-6">
          <div>
            <p className="text-2xl font-semibold">{name}</p>
            <div className="h-1"></div>
            <Link
              href={`/products/${types[0]?.toLowerCase()}/${category.slug}`}
            >
              <p className="text-gray-500">{category.name}</p>
            </Link>
          </div>
          <div className="font-display">
            {discount && discount?.active && (
              <p className="w-fit rounded-sm bg-teal-500 px-2 py-1 text-xl font-black text-gray-100 ">
                -{discount?.discountPercent}%
              </p>
            )}
            <div className="h-1"></div>
            <span className="text-2xl font-bold">{priceAfterDiscount}</span>
            {discount && discount?.active && (
              <span className="pl-2 text-xl  text-gray-500 line-through">
                {priceBeforeDiscount}
              </span>
            )}
          </div>
          <div>
            <p className="font-display text-2xl font-semibold">Colors</p>
            <div className="h-2"></div>
            <div className="flex gap-2">
              {colors.map((c, i) => (
                <div
                  key={i}
                  role="button"
                  onClick={async () => {
                    await handleColor(c);
                  }}
                  className={`h-8 w-8 rounded-full ${colorOptions.find(
                    (option) => option.name === c,
                  )?.color} border-[2px] outline outline-2 ${
                    selectedColor === c
                      ? "border-gray-100 outline-gray-500 "
                      : "border-gray-200 outline-transparent "
                  }`}
                ></div>
              ))}
            </div>
          </div>
          <div>
            <p
              className={`${
                error ? "text-red-500" : "text-gray-800"
              } text-2xl font-semibold`}
            >
              Select Size
            </p>
            <div className="h-4"></div>
            <div
              className={`${
                error ? "border-red-500" : "border-transparent"
              } flex w-fit gap-2 rounded-sm border`}
            >
              {sizes.map((s, i) => (
                <span
                  role="button"
                  onClick={() => {
                    setSelectedSize(s);
                    setError(false);
                  }}
                  className={`${
                    s === selectedSize
                      ? "border-gray-800  text-gray-800"
                      : "border-gray-300  text-gray-500"
                  } font-display w-16 rounded-[3px] border py-2 text-center font-bold`}
                  key={i}
                >
                  {s}
                </span>
              ))}
            </div>

            <p
              className={`${
                error ? "visible" : "pointer-events-none invisible"
              } pt-2 text-sm text-red-500`}
            >
              Please select a size
            </p>
          </div>
          <div className="flex flex-col gap-4 pt-4">
            <Button
              disabled={isAddingToCart}
              text="Add to Bag"
              onClick={() => {
                if (!selectedColor) return;
                if (!selectedSize) {
                  setError(true);
                  return;
                }
                mutate({
                  color: selectedColor,
                  size: selectedSize,
                  productId: productData.id,
                  quantity: 1,
                  type: "INCREMENT",
                });
              }}
              icon={<BsHandbag />}
            />
            {selectedColor && (
              <Button
                text={isFavorited ? "Added to favorites" : "Add to Favorites"}
                onClick={() =>
                  addToFavorites({
                    color: selectedColor,
                    productId: productData.id,
                  })
                }
                ghost
                icon={isFavorited ? <BsHeartFill /> : <BsHeart />}
              />
            )}
          </div>

          <div>
            <p className="text-2xl font-semibold">Description</p>
            <div className="h-2"></div>
            <p className="pl-2 font-light">{description}</p>
          </div>
          <p className="text-2xl font-semibold">Reviews (420)</p>
        </div>
      </section>
      <div className="h-32"></div>
      {/* RECCOMENDED BLOCK */}
      <section className="h-[300px] w-full border border-black"></section>
    </div>
  );
};

export default Product;

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const slug = context.params?.slug;
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      db,
    },
    transformer: SuperJSON,
  });

  if (!slug?.[0]) {
    throw new Error("no slug");
  }

  await helpers.product.getSingleProduct.prefetch({ id: slug[0] });
  return {
    props: {
      trpcState: helpers.dehydrate(),
      id: slug[0],
      color: slug[1] ?? "",
    },
  };
};
