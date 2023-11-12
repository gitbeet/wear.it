import heroImage from "../../public/assets/landing-page--hero.jpg";
import Button from "~/components/UI/Button";
import { BsHandbag } from "react-icons/bs";
import Carousel from "~/components/UI/MultiPageCarousel";
import Image from "next/image";
import { api } from "~/utils/api";
import SinglePageSlider from "~/components/UI/SinglePageSlider";
import bannerJackets from "../../public/assets/banner-small-jackets.jpg";
import bannerSneakers from "../../public/assets/banner-small--sneakers.jpg";
import bannerTShirts from "../../public/assets/banner-large--tShirts.jpg";
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
      />
    </div>
  </section>
);

const EventSlider = () => {
  const { data: products, isLoading: isGettingProducts } =
    api.product.getAll.useQuery({
      collectionId: 1,
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
        <Carousel products={products?.products} isLoading={isGettingProducts} />
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
        <Carousel products={products?.products} isLoading={isGettingProducts} />
      </div>
    </section>
  );
};

const Promotions = () => (
  <section className="padding-x grid w-full gap-4 lg:grid-cols-[1fr,1fr]">
    <Image height={800} src={bannerTShirts} alt="jejw" className="rounded-md" />
    <div>
      <Image
        height={392}
        src={bannerJackets}
        alt="jejw"
        className="rounded-md"
      />
      <div className="h-4"></div>
      <Image
        height={392}
        src={bannerSneakers}
        alt="jejw"
        className="rounded-md"
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
