import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { useState, useEffect } from "react";
import { appRouter } from "~/server/api/root";
import { api } from "~/utils/api";
import SuperJSON from "superjson";
import { db } from "~/server/db";
import type { ProductSize, ProductColor } from "@prisma/client";
import Button, { ButtonSkeleton } from "~/components/ui/Button";
import ImageGallery, {
  ImageGallerySkeleton,
} from "~/components/pages/product/ImageGallery";
import { formatCurrency } from "../../utilities/formatCurrency";
import Link from "next/link";
import { NextSeo } from "next-seo";
import Spacer from "~/components/ui/Spacer";
import ExpandableProductSectionWrapper from "~/components/ui/expandable/ExpandableProductSectionWrapper";
import UserReviews from "~/components/pages/product/UserReviews";
import AddButtons from "~/components/pages/product/AddButtons";
import ReccomendedProducts from "~/components/pages/product/ReccomendedProducts";
import SelectColor from "~/components/pages/product/SelectColor";
import SelectSize from "~/components/pages/product/SelectSize";
import { useRouter } from "next/router";

const productPageSkeleton = (
  <>
    <Spacer type="header" />
    <section className="padding-x mx-auto flex w-[min(100%,1200px)] animate-pulse flex-col justify-between gap-4  lg:flex-row">
      <div className="w-full self-start">
        <ImageGallerySkeleton animate={false} />
      </div>
      <div className="flex shrink-0  flex-col gap-8 lg:w-[450px]">
        <div className="space-y-0.5">
          <p className="w-fit rounded-full bg-slate-300 text-2xl font-semibold leading-none text-transparent">
            Placeholder skeleton name
          </p>
          <div className="h-1"></div>

          <p className="w-fit rounded-full bg-slate-300 leading-none text-transparent">
            Placeholder skeleton category
          </p>
        </div>
        <div className="space-y-1 font-display">
          <p className="w-fit rounded-sm bg-slate-300 px-2 py-1 text-xl font-black text-transparent ">
            -35%
          </p>

          <div className="h-2"></div>
          <span className="w-fit rounded-full bg-slate-300 text-2xl leading-none text-transparent">
            $100 150%
          </span>
        </div>
        <div className="space-y-1">
          <p className="w-fit rounded-full bg-slate-300 font-display text-2xl leading-none text-transparent">
            Colors
          </p>
          <div className="h-2"></div>
          <div className="flex gap-2">
            {[...Array(3).keys()].map((i) => {
              return (
                <div
                  key={i}
                  className={`h-10 w-10 rounded-full bg-slate-300 `}
                ></div>
              );
            })}
          </div>
        </div>
        <div>
          <p className="w-fit rounded-full bg-slate-300 text-2xl leading-none text-transparent">
            Select Size
          </p>
          <div className="h-4"></div>
          <div className={` flex w-fit flex-wrap gap-2 rounded-sm `}>
            {[...Array(3).keys()].map((i) => (
              <span
                className={` w-16 rounded-[3px]  bg-slate-300 py-2 text-center font-display text-transparent`}
                key={i}
              >
                XL
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 ">
          <ButtonSkeleton />
          <ButtonSkeleton />
        </div>

        <div>
          <p className="w-fit rounded-full bg-slate-300 font-display text-2xl leading-none text-transparent">
            Description
          </p>
          <div className="h-3"></div>
          <p className="w-full rounded-full bg-slate-300 font-light leading-none text-transparent">
            test
          </p>
          <div className="h-1.5"></div>
          <p className="w-full rounded-full bg-slate-300 font-light leading-none text-transparent">
            test
          </p>
          <div className="h-1.5"></div>
          <p className="w-full rounded-full bg-slate-300 font-light leading-none text-transparent">
            test
          </p>
          <div className="h-1.5"></div>
          <p className="w-full rounded-full bg-slate-300 font-light leading-none text-transparent">
            test
          </p>
          <div className="h-1.5"></div>
          <p className="w-3/4 rounded-full bg-slate-300 font-light leading-none text-transparent">
            test
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <p className="w-fit rounded-full bg-slate-300 font-display text-2xl leading-none text-transparent">
              Reviews (100)
            </p>
            <div className="w-fit rounded-full bg-slate-300 font-display  leading-none text-transparent">
              (5.0) ooooo
            </div>
          </div>
        </div>
      </div>
    </section>
    <Spacer type="section" />
  </>
);

const Product = ({
  id,
  color,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
    color as ProductColor,
  );

  // Get product data
  const {
    data: productData,
    isLoading: isGettingProductData,
    error: getProductError,
  } = api.product.getSingleProduct.useQuery(
    { id },
    {
      staleTime: Infinity,
      refetchOnMount: false,
      keepPreviousData: true,
    },
  );

  // reset error state when product/color is changed
  useEffect(() => {
    setError(false);
  }, [id, color]);

  const { mutateAsync: addToHistory, isLoading: isAddingToHistory } =
    api.history.addToHistory.useMutation({});
  useEffect(() => {
    async function add() {
      try {
        await addToHistory({ productId: id });
      } catch (error) {
        throw new Error("Unexpected error");
      }
    }

    add()
      .then(() => console.log("Added to history"))
      .catch(() => console.log("Error while adding to history"));
  }, [id]);

  if (isGettingProductData) return productPageSkeleton;
  if (!productData)
    return (
      <div className=" flex h-full w-full grow flex-col items-center justify-center gap-8 ">
        <h1 className="text-4xl font-black">
          {getProductError?.message ?? "Something went wrong."}
        </h1>
        <p>
          There was a problem loading this page.Please reload or try again
          later.
        </p>
        <div className="flex w-fit items-center justify-center gap-2">
          <Button size="SM" text="Try again" onClick={() => router.reload()} />
          <Button
            size="SM"
            ghost
            text="Go back"
            onClick={() => router.back()}
          />
        </div>
      </div>
    );

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

  const handleSize = (size: ProductSize) => {
    setSelectedSize(size);
    setError(false);
  };

  const priceBeforeDiscount = formatCurrency(price);
  const priceAfterDiscount = formatCurrency(
    discount?.discountPercent && discount.active
      ? price - (price * discount?.discountPercent) / 100
      : price,
  );

  const selectedColorImages = images.filter(
    (image) => image.color === selectedColor,
  );

  const linkToCategory = `/products/${types[0]?.toLowerCase()}/${
    category.slug
  }`;

  return (
    <>
      <NextSeo
        title={productData.name}
        description={description}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/product/${id}/${selectedColor}`,
          title: name,
          description,
          site_name: "wear.it",
          images: [
            {
              url: productData.images[0]?.imageURL ?? "",
              width: 800,
              height: 600,
              alt: productData.name,
            },
          ],
        }}
      />
      <section className="padding-x mx-auto flex w-[min(100%,1200px)] flex-col justify-between gap-4 pt-8 md:pt-24 lg:flex-row">
        <div className="w-full self-start">
          <ImageGallery
            images={selectedColorImages}
            selectedColor={selectedColor}
          />
        </div>
        <div className="flex shrink-0 flex-col gap-8 lg:w-[450px]">
          <div>
            <p className="text-2xl font-semibold">{name}</p>
            <div className="h-1"></div>
            <Link href={linkToCategory}>
              <p className="text-slate-500 transition hover:text-slate-700 active:opacity-50">
                {category.name}
              </p>
            </Link>
          </div>
          <div className="font-display">
            {discount && discount?.active && (
              <p className="w-fit rounded-sm bg-teal-500 px-2 py-1 text-xl font-black text-slate-100 ">
                -{discount?.discountPercent}%
              </p>
            )}
            <div className="h-1"></div>
            <span className="text-2xl font-bold">{priceAfterDiscount}</span>
            {discount && discount?.active && (
              <span className="pl-2 text-xl  text-slate-500 line-through">
                {priceBeforeDiscount}
              </span>
            )}
          </div>
          <SelectColor
            productId={id}
            color={color}
            colors={colors}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
          <SelectSize
            error={error}
            handleSize={handleSize}
            sizes={sizes}
            selectedSize={selectedSize}
          />
          <AddButtons
            color={color}
            productId={id}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            setError={setError}
          />
          <ExpandableProductSectionWrapper
            headerChildren={
              <p className="text-2xl font-semibold">Description</p>
            }
          >
            <div className="h-2"></div>
            <p className="pl-2 font-light">{description}</p>
          </ExpandableProductSectionWrapper>
          <UserReviews productId={id} />
        </div>
      </section>
      <Spacer type="section" />
      <ReccomendedProducts />
    </>
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
      guestUserId: undefined,
      userId: null,
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
