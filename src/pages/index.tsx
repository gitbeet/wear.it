import heroImage from "../../public/assets/landing-page--hero-2.jpg";
import heroImageBlur from "../../public/assets/landing-page--hero-blur.jpg";
import Button from "~/components/UI/Button";
import { BsHandbag } from "react-icons/bs";
import Image from "next/image";
import { api } from "~/utils/api";
import SinglePageSlider from "~/components/UI/SinglePageSlider";
import bannerJackets from "../../public/assets/banner-small-jackets.jpg";
import bannerSneakers from "../../public/assets/banner-small--sneakers.jpg";
import bannerTShirts from "../../public/assets/banner-large--tShirts.jpg";
import ProductCardCarousel from "~/components/ProductCardCarousel";
import { FaSnowflake } from "react-icons/fa";
import SectionSpacer from "~/components/UI/SectionSpacer";
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

const PromoSlider = () => <SinglePageSlider slides={sliderPromos} />;

const Hero = () => (
  <section className="relative w-full  overflow-hidden py-16 lg:py-24">
    <div className="padding-x relative z-10">
      <h1 className="font-display text-7xl font-extrabold">
        <span className="">Ready</span> for winter?
      </h1>
      <div className="h-8"></div>
      <p className="max-w-lg text-xl font-light text-gray-700">
        Winter Wardrobe Wonders to Keep You Warm and Smiling All Season Long!
      </p>
      <div className="h-16"></div>
      <div className="w-fit">
        <Button
          text="Winter Collection"
          icon={<BsHandbag className="h-5 w-5" />}
          onClick={() => void 0}
        />
      </div>
    </div>
    <div className="absolute bottom-0 right-0 top-0  w-full">
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
          <FaSnowflake className="inline h-8 w-8" />
          <p className="shrink-0 font-display text-5xl font-extrabold">
            Cozy up!
          </p>
        </h2>
        <p className="text-xl font-light text-gray-700">
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
    <section>
      <h2 className="padding-x font-display text-2xl font-black">Trending</h2>
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
  <section className="padding-x grid w-full gap-4 lg:grid-cols-[1fr,1fr]">
    <Image
      height={800}
      src={bannerTShirts}
      alt="Up to -60% on womens t-shirts"
      className="rounded-md"
      placeholder="blur"
    />
    <div>
      <Image
        height={392}
        src={bannerJackets}
        alt="Browse jackets under 65%"
        className="rounded-md"
        placeholder="blur"
      />
      <div className="h-4"></div>
      <Image
        height={392}
        src={bannerSneakers}
        alt="Browse seakers from 30$"
        className="rounded-md"
        placeholder="blur"
      />
    </div>
  </section>
);

export default function Home() {
  return (
    <section>
      <Hero />
      <SectionSpacer />
      <EventSlider />
      <SectionSpacer />
      <PromoSlider />
      <SectionSpacer />
      <Trending />
      <SectionSpacer />
      <Promotions />
      <SectionSpacer />
    </section>
  );
}
