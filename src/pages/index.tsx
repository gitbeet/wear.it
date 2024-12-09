import heroImage from "../../public/assets/hero-3.png";
import Button from "~/components/UI/Button";
import Image from "next/image";
import { api } from "~/utils/api";
import bannerJackets from "../../public/assets/banner-small-jackets-2.jpg";
import bannerSneakers from "../../public/assets/banner-small--sneakers-2.jpg";
import bannerTShirts from "../../public/assets/banner-large--tShirts-2.jpg";
import { FaSnowflake } from "react-icons/fa";
import Link from "next/link";
import { NextSeo } from "next-seo";
import Spacer from "~/components/Spacer";
import ProductCardCarouselTest from "~/components/Carousel/ProductCardCarouselTest";
import { landingPageTrendingBreakPoints } from "~/utilities/swiperBreakPoints";

// const sliderPromos = [
//   {
//     title: "-35% OFF your first order",
//     image: "/assets/promo-image-first-order.jpg",
//     button: <Button text="Sign up now" onClick={() => void 0} />,
//   },
//   {
//     title: `FREE shipping on orders over $90`,
//     image: "/assets/promo-image-free-shipping.jpg",
//     button: (
//       <Button
//         text="Start shopping"
//         icon={<BsHandbag className="h-5 w-5" />}
//         onClick={() => void 0}
//       />
//     ),
//   },
// ];

const Hero = () => (
  <section className="relative w-full  overflow-hidden py-16 lg:py-24">
    <div className="padding-x relative z-10">
      <h1 className="font-display text-7xl font-black">
        <span className="gradient-main-text drop-shadow-sm">
          {/* <span className=" bg-gradient-to-r from-red-500 via-pink-500  to-indigo-600 bg-clip-text text-transparent"> */}
          Ready for winter?
        </span>
      </h1>
      <div className="h-8"></div>
      <p className="max-w-lg text-xl font-light text-slate-700">
        Winter Wardrobe Wonders to Keep You Warm and{" "}
        <b className="font-bold">Smiling All Season Long!</b>
      </p>
      <div className="h-16"></div>
      <div className="w-fit">
        <Button
          disabled
          text="Winter Collection"
          icon={<FaSnowflake className="h-5 w-5" />}
          onClick={() => void 0}
        />
      </div>
    </div>

    <div className="absolute inset-0 z-[1] bg-gradient-to-t from-white to-transparent to-35%" />
    <div className="absolute bottom-0 right-0 top-0  w-full  opacity-25 sm:block md:opacity-100">
      <Image
        fill
        objectFit="cover"
        className="ml-auto"
        src={heroImage}
        alt="Hero section image"
        placeholder="blur"
      />
    </div>
  </section>
);

const EventSlider = () => {
  const { data: products, isLoading: isGettingProducts } =
    api.product.getAllSQL.useQuery({
      // collectionId: 1,
      color: undefined,
      size: undefined,
      slug: undefined,
      sort: undefined,
      type: ["MEN", "WOMEN"],
    });

  return (
    <section className="padding-x flex w-full flex-col items-start gap-2 md:flex-row md:items-center lg:gap-16">
      <div>
        <h2 className="gradient-main-text-sm flex items-center  gap-2  py-1 font-display font-extrabold">
          {/* <FaSnowflake className="inline h-8 w-8 shrink-0 text-indigo-500" /> */}
          <p className=" py-1 font-display  text-5xl font-extrabold  drop-shadow-sm">
            Cozy up!
          </p>
        </h2>
        <div className="h-4"></div>
        <p className="text-xl font-light text-slate-700">
          <b className="font-bold">Get Comfy</b> with Our Winter Selection
        </p>
      </div>

      <div className="w-full overflow-hidden">
        <ProductCardCarouselTest
          paginationContainerId="landing-page--winter-event__pagination-container"
          data={products?.products}
          isLoading={isGettingProducts}
          infinite={true}
          autoplay={true}
          autoplayDelay={2500}
          speed={500}
        />
      </div>
    </section>
  );
};

const Trending = () => {
  const { data: products, isLoading: isGettingProducts } =
    api.product.getAllSQL.useQuery({
      color: undefined,
      size: undefined,
      slug: undefined,
      sort: undefined,
      type: ["MEN", "WOMEN"],
    });
  return (
    <section className="padding-x">
      <h2 className="font-display text-2xl font-black">Trending</h2>
      <div className="h-6 md:h-12"></div>
      <ProductCardCarouselTest
        autoplay={true}
        autoplayDelay={3000}
        infinite={true}
        paginationContainerId="landing-page--trending__pagination-container"
        data={products?.products}
        isLoading={isGettingProducts}
        speed={600}
        breakPoints={landingPageTrendingBreakPoints}
      />
    </section>
  );
};

const promotionsClass =
  "shadow-color rounded-md xl:rounded-xl shadow-md xl:shadow-lg";

const Promotions = () => (
  <section className="padding-x grid w-full gap-4 md:grid-cols-2">
    <Link href="/products/women/tshirts-tops" className="aspect-square w-full">
      <Image
        sizes="(max-width: 1024px) 100vw, 792px"
        src={bannerTShirts}
        alt="Up to -60% on womens t-shirts"
        className={promotionsClass}
        placeholder="blur"
      />
    </Link>

    <div>
      <Link
        href="/products/women/jackets?priceFrom=0&priceTo=65"
        className="w-full"
      >
        <Image
          sizes="(max-width: 768px) 100vw, 792px"
          width={800}
          height={392}
          src={bannerJackets}
          alt="Browse jackets under 65%"
          className={promotionsClass}
          placeholder="blur"
        />
      </Link>

      <div className="h-4"></div>
      <Link href="/products/women/sneakers?priceFrom=39" className="w-full">
        <Image
          sizes="(max-width: 768px) 100vw, 792px"
          width={800}
          height={392}
          src={bannerSneakers}
          alt="Browse seakers from 39$"
          className={promotionsClass}
          placeholder="blur"
        />
      </Link>
    </div>
  </section>
);

const MemberDeals = () => (
  <div className="padding-x gradient-main-tr shadow-color flex flex-col items-center justify-center gap-8  py-16 text-slate-50 shadow-lg 3xl:rounded-xl">
    <div className="space-y-4">
      <p className="text-center font-display text-5xl font-black">
        BECOME A MEMBER <br /> AND SAVE UP TO 70%
      </p>
      <p className="text-center text-xl">
        Embark on a Shopping Adventure: Unlock Exclusive Deals and Save up to
        70% on a Diverse Range of Products.
      </p>
    </div>
    <Link href="/sign-up">
      <Button
        onClick={() => void 0}
        text="Register Now"
        width="FIT"
        ghost
        light
        // icon={<BsHandbag />}
      />
    </Link>
  </div>
);

export default function Home() {
  return (
    <>
      <NextSeo
        title="Home"
        additionalMetaTags={[
          {
            name: "keywords",
            content: "wear.it",
          },
        ]}
        noindex={false}
        nofollow={false}
        canonical="/"
      />
      <section className="h-full w-full grow">
        <Hero />
        <div className="h-4 md:h-8"></div>
        <EventSlider />
        {/* <Spacer type="section" /> */}
        {/* <EventSlider /> */}
        <Spacer type="section" />
        <MemberDeals />
        <Spacer type="section" />
        <Trending />
        <Spacer type="section" />
        <Promotions />
      </section>
    </>
  );
}
