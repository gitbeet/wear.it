/* eslint-disable @next/next/no-img-element */
import heroImage from "../../public/assets/landing-page--hero.jpg";
import Button from "~/components/UI/Button";
import { BsHandbag } from "react-icons/bs";
import Carousel from "~/components/UI/MultiPageCarousel";
import Image from "next/image";
import { api } from "~/utils/api";
import { ProductColor } from "@prisma/client";

const Hero = () => (
  <section className="relative w-full  overflow-hidden py-24">
    <div className="relative z-10 ">
      <h1 className="text-7xl font-extrabold">Ready for winter?</h1>
      <div className="h-8"></div>
      <p className="max-w-lg text-xl">
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
    <section className="flex w-full items-center gap-16 pb-32 pt-8">
      <div className="">
        <h2 className="text-5xl font-extrabold">Cozy up!</h2>
        <div className="h-4"></div>
        <p>Get Comfy with Our Winter Selection</p>
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
    </section>
  );
}
