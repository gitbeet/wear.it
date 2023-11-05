/* eslint-disable @next/next/no-img-element */
import heroImage from "../../public/assets/landing-page--hero.jpg";
import Button from "~/components/UI/Button";
import { BsHandbag } from "react-icons/bs";
import Carousel from "~/components/UI/MultiPageCarousel";
import Image from "next/image";
import { api } from "~/utils/api";
import { formatCurrency } from "~/utilities/formatCurrency";
import SinglePageSlider from "~/components/UI/SinglePageSlider";

const sliderPromos = [
  {
    title: "-35% OFF your first order",
    image: "/assets/promo-image-first-order.jpg",
    button: (
      <Button
        ghost
        text="Sign up now"
        // icon={<BsHandbag className="h-5 w-5" />}
        onClick={() => void 0}
      />
    ),
  },
  {
    title: `FREE shipping on orders over ${formatCurrency(90)}`,
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
    <div className="relative z-10 ">
      <h1 className="text-7xl font-extrabold">Ready for winter?</h1>
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
      />
    </div>
  </section>
);

const EventSlider = () => {
  const { data: products, isLoading: isGettingProducts } =
    api.product.getAll.useQuery({
      color: ["RED"],
      size: undefined,
      slug: undefined,
      sort: undefined,
      type: undefined,
    });
  return (
    <section className="flex w-full items-center gap-16  py-8">
      <div className="">
        <h2 className="text-5xl font-extrabold">Cozy up!</h2>
        <div className="h-4"></div>
        <p className="text-xl font-light text-gray-700">
          Get Comfy with Our Winter Selection
        </p>
      </div>
      {products && (
        <div className="w-full overflow-hidden">
          <Carousel products={products} />
        </div>
      )}
    </section>
  );
};

export default function Home() {
  return (
    <section>
      <Hero />
      <EventSlider />
      <PromoSlider />
      <div className="h-32"></div>
    </section>
  );
}
