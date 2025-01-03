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
} from "~/components/product/ImageGallery";
import { BsHandbag, BsHeart, BsHeartFill } from "react-icons/bs";
import { formatCurrency } from "../../utilities/formatCurrency";
import { useRouter } from "next/router";
import Link from "next/link";
import { useModalsContext } from "~/context/modalsContext";
import { useFavoritesContext } from "~/context/favoritesContext";
import Rating from "~/components/review/Rating";
import Review from "~/components/review/Review";
import CreateReviewWizard from "~/components/review/CreateReviewWizard";
import { useUser } from "@clerk/nextjs";
import { NextSeo } from "next-seo";
import { colorOptions } from "~/maps";
import Spacer from "~/components/ui/Spacer";
import { useCartContext } from "~/context/cartContext";
import ProductCardCarousel from "~/components/carousel/ProductCardCarousel";
import { ReccomendedProductsBreakPoints } from "~/utilities/swiperBreakPoints";
import ExpandableProductSectionWrapper from "~/components/ui/expandable/ExpandableProductSectionWrapper";

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
  const { setShowBagModal } = useModalsContext();
  const { isFavorited } = useFavoritesContext();
  const { dbCart, isGettingCart, isFetching } = useCartContext();
  const router = useRouter();
  const ctx = api.useUtils();
  const { user, isSignedIn } = useUser();
  // const { cookies } = useCartContext();
  // Get product data
  const {
    data: productData,
    isLoading: isGettingProductData,
    error: getProductError,
  } = api.product.getSingleProduct.useQuery({ id });
  // Add to history
  const { mutateAsync: addToHistory, isLoading: isAddingToHistory } =
    api.history.addToHistory.useMutation({
      onSuccess: () => setAddedToHistory(true),
    });
  // Add to favorites

  const { mutate: addToFavorites, isLoading: isFaving } =
    api.favorite.favorite.useMutation({
      onSuccess: () => {
        void ctx.invalidate();

        if (!productData) return;
        const isItemFavorited = isFavorited(
          color as ProductColor,
          productData?.id,
        );
        if (isItemFavorited) return;
        window.scrollTo({ top: 0, behavior: "smooth" });
        setShowBagModal({ show: true, type: "favorite" });
      },
    });
  // Add to cart
  const { mutate, isLoading: isAddingToCart } = api.cart.addItem.useMutation({
    onSuccess: () => {
      void ctx.invalidate();
      setShowBagModal({ show: true, type: "cart" });
    },
  });
  // Get Reviews
  const { data: reviews, isLoading: isGettingReviews } =
    api.review.getReviewsByProductId.useQuery({
      productId: id,
    });
  // Get reccomended products
  const { data: reccomendedProducts, isLoading: isGettingReccomended } =
    api.product.getAllSQL.useQuery({
      collectionId: undefined,
      color: undefined,
    });

  const hasUserCommented =
    reviews?.findIndex((review) => review.author.id === user?.id) !== -1;

  const [addedtoHistory, setAddedToHistory] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
    color as ProductColor,
  );
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [error, setError] = useState<boolean>(false);

  const primaryColor = productData?.colors[0]?.color;

  const totalReviewsCount = reviews?.length ?? undefined;
  const totalScore =
    reviews?.reduce((acc, x) => acc + x.review.rate, 0) ?? undefined;
  const averageReviewsRating =
    !totalReviewsCount || !totalScore
      ? undefined
      : totalScore / totalReviewsCount;

  useEffect(() => {
    if (!productData || addedtoHistory || isAddingToHistory) return;
    async function add() {
      if (!productData) return;
      try {
        await addToHistory({ productId: productData.id });
        setAddedToHistory(true);
      } catch (error) {
        throw new Error("Unexpected error");
      }
    }

    add()
      .then(() => setAddedToHistory(true))
      .catch((err) => console.log(err));

    return () => void 0;
  }, [productData]);

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
        (color) => color.color === router.query.slug?.[1],
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

  const isAlreadyInCart =
    dbCart?.cartItems.findIndex(
      (item) =>
        item.product.id === id &&
        item.color === selectedColor &&
        item.size === selectedSize,
    ) !== -1;

  if (isGettingProductData) return productPageSkeleton;
  if (!productData)
    return (
      <div>
        <h1>{getProductError?.message ?? "Something went wrong."}</h1>
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

  const handleSize = (size: ProductSize) => {
    setSelectedSize(size);
    setError(false);
  };

  const handleAddToBag = () => {
    if (!selectedColor) return;
    if (!selectedSize) {
      setError(true);
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    mutate({
      color: selectedColor,
      size: selectedSize,
      productId: productData.id,
      quantity: 1,
      // type: "INCREMENT",
    });
  };

  const handleAddToFavorites = () => {
    if (!selectedColor) return;

    addToFavorites({
      color: selectedColor,
      productId: productData.id,
    });
  };
  const isItemFavorited = isFavorited(selectedColor, productData.id);
  const favoriteButtonText = isItemFavorited
    ? "Added to Wishlist"
    : "Add to Wishlist";
  const favoriteButtonIcon = isItemFavorited ? <BsHeartFill /> : <BsHeart />;

  const colorsSection = (
    <div>
      <p className="font-display text-2xl font-semibold">Colors</p>
      <div className="h-2"></div>
      <div className="flex gap-2">
        {colors.map((c, i) => {
          const tailwindColor = colorOptions.find(
            (option) => option.color === c.color,
          )?.colorClass;
          return (
            <button
              aria-label={`Select ${c.name} variant`}
              key={i}
              onClick={async () => {
                await handleColor(c.color);
              }}
              className={`h-8 w-8 rounded-full border-[2px] outline outline-2 ${tailwindColor} ${
                selectedColor === c.color
                  ? "border-slate-100 outline-indigo-300"
                  : "border-slate-200 outline-transparent  hover:outline-slate-400"
              } active:opacity-50`}
            ></button>
          );
        })}
      </div>
    </div>
  );

  const reviewsSection = (
    <ExpandableProductSectionWrapper
      headerChildren={
        <>
          <p className="text-2xl font-semibold">
            Reviews ({totalReviewsCount})
          </p>
          <div className="flex items-center gap-4">
            <div className=" flex items-center gap-2">
              <p className="flex gap-1">
                <span>{averageReviewsRating?.toFixed(1)}</span>
              </p>
              <Rating
                handleRate={() => void 0}
                isHoverable={false}
                averageRating={averageReviewsRating}
              />
            </div>
          </div>
        </>
      }
    >
      <>
        <div className="h-4"></div>
        {!hasUserCommented && isSignedIn && (
          <CreateReviewWizard productId={id} />
        )}
        <div className="pl-2">
          {reviews?.map((review) => (
            <Review key={review.review.id} review={review} />
          ))}
        </div>
      </>
    </ExpandableProductSectionWrapper>
  );

  const sizesSection = (
    <div>
      <p
        className={`${
          error ? "text-red-500" : "text-slate-800"
        } text-2xl font-semibold`}
      >
        Select Size
      </p>
      <div className="h-4"></div>
      <div
        className={`${
          error ? "border-red-500" : "border-transparent"
        } flex w-fit flex-wrap gap-2 rounded-sm border`}
      >
        {sizes.map((s, i) => (
          <button
            aria-label={`Select size ${s.size}`}
            onClick={() => handleSize(s.size)}
            className={`${
              s.size === selectedSize
                ? "border-slate-800  text-slate-800"
                : "border-slate-300 text-slate-500  hover:border-slate-400"
            } w-16 rounded-[3px] border py-2 text-center font-display font-bold shadow-sm transition active:opacity-50`}
            key={i}
          >
            {s.size}
          </button>
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
  );
  const buttonsSection = (
    <>
      <div className="relative flex flex-col gap-4">
        {isAlreadyInCart && (
          <p
            id="reason-add-button-disabled"
            className="text-right text-red-500"
          >
            Product is already in bag
          </p>
        )}
        <Button
          aria-describedby="reason-add-button-disabled"
          text="Add to Bag"
          icon={<BsHandbag />}
          onClick={handleAddToBag}
          disabled={
            isAddingToCart ||
            isFaving ||
            isAlreadyInCart ||
            isGettingCart ||
            isFetching
          }
        />
        <Button
          text={favoriteButtonText}
          icon={favoriteButtonIcon}
          onClick={handleAddToFavorites}
          disabled={isFaving || isAddingToCart || isGettingCart || isFetching}
          ghost
        />
      </div>
    </>
  );

  const descriptionSection = (
    <ExpandableProductSectionWrapper
      headerChildren={<p className="text-2xl font-semibold">Description</p>}
    >
      <div className="h-2"></div>
      <p className="pl-2 font-light">{description}</p>
    </ExpandableProductSectionWrapper>
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
          url: `https://t3-ecommerce-five.vercel.app/product/${id}/${selectedColor}`,
          title: name,
          description,
          site_name: "wear.it",
          images: [
            {
              url: "",
              width: 800,
              height: 600,
              alt: `Hero image for contact page`,
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
          {colorsSection}
          {sizesSection}
          {buttonsSection}
          {descriptionSection}
          {reviewsSection}
        </div>
      </section>
      <Spacer type="section" />
      <section className="padding-x container-mine mx-auto">
        <h2 className="font-display text-2xl font-black">
          You might also like
        </h2>
        <div className="h-12"></div>
        <ProductCardCarousel
          autoplay={true}
          autoplayDelay={2500}
          infinite={true}
          paginationContainerId="product-page--reccomended__pagination-container"
          speed={600}
          data={reccomendedProducts?.products}
          isLoading={isGettingReccomended}
          breakPoints={ReccomendedProductsBreakPoints}
        />
      </section>
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
