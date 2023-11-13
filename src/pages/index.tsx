import heroImage from "../../public/assets/landing-page--hero.jpg";
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
const sliderPromos = [
  {
    title: "-35% OFF your first order",
    image: "/assets/promo-image-first-order.jpg",
    button: <Button ghost text="Sign up now" onClick={() => void 0} />,
  },
  {
    title: `FREE shipping on orders over $90`,
    image: "/assets/promo-image-free-shipping.jpg",
    button: (
      <Button
        ghost
        text="Start shopping"
        icon={<BsHandbag className="h-5 w-5" />}
        onClick={() => void 0}
      />
    ),
  },
];

const blurImageData =
  "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";

const PromoSlider = () => <SinglePageSlider slides={sliderPromos} />;

const Hero = () => (
  <section className="relative w-full  overflow-hidden py-24">
    <div className="padding-x relative z-10">
      <h1 className="font-display text-7xl font-extrabold">
        Ready for winter?
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
        className="ml-auto opacity-50 lg:opacity-100"
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
    <section className="padding-x  w-full items-center gap-16  md:flex">
      <div>
        <h2 className="font-display text-5xl font-extrabold">Cozy up!</h2>
        <div className="h-4"></div>
        <p className="text-xl font-light text-gray-700">
          Get Comfy with Our Winter Selection
        </p>
      </div>

      <div className="w-full overflow-hidden">
        <ProductCardCarousel
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
      <div className="h-12"></div>

      <div className="w-full overflow-hidden">
        <ProductCardCarousel
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
      alt="jejw"
      className="rounded-md"
      placeholder="blur"
    />
    <div>
      <Image
        height={392}
        src={bannerJackets}
        alt="jejw"
        className="rounded-md"
        placeholder="blur"
      />
      <div className="h-4"></div>
      <Image
        height={392}
        src={bannerSneakers}
        alt="jejw"
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
      <div className="h-12 md:h-4"></div>
      <EventSlider />
      <div className="h-16"></div>
      <PromoSlider />
      <div className="h-16"></div>
      <Trending />
      <div className="h-16"></div>
      <Promotions />
      <div className="h-16"></div>
    </section>
  );
}
