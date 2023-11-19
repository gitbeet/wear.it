import heroImage from "../../public/assets/hero-3.png";
import Button from "~/components/UI/Button";
import { BsHandbag } from "react-icons/bs";
import Image from "next/image";
import { api } from "~/utils/api";
import bannerJackets from "../../public/assets/banner-small-jackets-2.jpg";
import bannerSneakers from "../../public/assets/banner-small--sneakers-2.jpg";
import bannerTShirts from "../../public/assets/banner-large--tShirts-2.jpg";
import ProductCardCarousel from "~/components/ProductCardCarousel";
import { FaSnowflake } from "react-icons/fa";
import SectionSpacer from "~/components/UI/SectionSpacer";
import Link from "next/link";

const sliderPromos = [
  {
    title: "-35% OFF your first order",
    image: "/assets/promo-image-first-order.jpg",
    button: <Button text="Sign up now" onClick={() => void 0} />,
  },
  {
    title: `FREE shipping on orders over $90`,
    image: "/assets/promo-image-free-shipping.jpg",
    button: (
      <Button
        text="Start shopping"
        icon={<BsHandbag className="h-5 w-5" />}
        onClick={() => void 0}
      />
    ),
  },
];

const Hero = () => (
  <section className="relative w-full  overflow-hidden py-16 lg:py-24">
    <div className="padding-x relative z-10">
      <h1 className="font-display text-7xl font-black">
        <span className=" bg-gradient-to-r from-violet-500 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
          {/* <span className=" bg-gradient-to-r from-red-500 via-pink-500  to-indigo-600 bg-clip-text text-transparent"> */}
          Ready for winter?
        </span>
      </h1>
      <div className="h-8"></div>
      <p className="max-w-lg text-xl font-light text-slate-700">
        Winter Wardrobe Wonders to Keep You Warm and Smiling All Season Long!
      </p>
      <div className="h-16"></div>
      <div className="w-fit">
        <Button
          text="Winter Collection"
          icon={<FaSnowflake className="h-5 w-5" />}
          onClick={() => void 0}
        />
      </div>
    </div>

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
    api.product.getAll.useQuery({
      // collectionId: 1,
      color: undefined,
      size: undefined,
      slug: undefined,
      sort: undefined,
      type: ["MEN", "WOMEN"],
    });
  return (
    <section className="padding-x flex w-full flex-col items-start gap-6 md:flex-row md:items-center lg:gap-16">
      <div>
        <h2 className="flex items-center gap-2">
          <FaSnowflake className="inline h-8 w-8 text-indigo-500" />
          <p className="to-slateviolet-500 shrink-0 bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text  py-1 font-display  text-5xl font-extrabold text-transparent">
            Cozy up!
          </p>
        </h2>
        <div className="h-4"></div>
        <p className="text-xl font-light text-slate-700">
          Get Comfy with Our Winter Selection
        </p>
      </div>

      <div className="w-full overflow-hidden">
        <ProductCardCarousel
          numberOfItems={{ desktop: 3.5, desktopSmall: 2.5, tablet: 1.5 }}
          products={products?.products}
          isLoading={isGettingProducts}
        />
      </div>
    </section>
  );
};

const Trending = () => {
  const { data: products, isLoading: isGettingProducts } =
    api.product.getAll.useQuery({
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

      <div className="w-full overflow-hidden">
        <ProductCardCarousel
          numberOfItems={{ desktop: 4, desktopSmall: 3, tablet: 2 }}
          products={products?.products}
          isLoading={isGettingProducts}
        />
      </div>
    </section>
  );
};

const Promotions = () => (
  <section className="padding-x grid w-full gap-4 md:grid-cols-2">
    <div className="aspect-square w-full">
      <Image
        sizes="(max-width: 1024px) 100vw, 792px"
        src={bannerTShirts}
        alt="Up to -60% on womens t-shirts"
        className="rounded-md"
        placeholder="blur"
      />
    </div>

    <div>
      <Image
        sizes="(max-width: 768px) 100vw, 792px"
        width={800}
        height={392}
        src={bannerJackets}
        alt="Browse jackets under 65%"
        className="rounded-md"
        placeholder="blur"
      />

      <div className="h-4"></div>
      <Image
        sizes="(max-width: 768px) 100vw, 792px"
        width={800}
        height={392}
        src={bannerSneakers}
        alt="Browse seakers from 30$"
        className="rounded-md"
        placeholder="blur"
      />
    </div>
  </section>
);

const MemberDeals = () => (
  <div className="padding-x flex flex-col items-center justify-center gap-8 bg-gradient-to-br from-violet-500 to-indigo-500 py-16  text-slate-50 md:bg-gradient-to-tr md:via-indigo-500 md:to-violet-500">
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
    <section>
      <Hero />
      <div className="h-4 md:h-8"></div>
      <EventSlider />
      <SectionSpacer />
      <MemberDeals />
      {/* <PromoSlider /> */}
      <SectionSpacer />
      <Trending />
      <SectionSpacer />
      <Promotions />
      <SectionSpacer />
    </section>
  );
}
