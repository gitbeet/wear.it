import Image from "next/image";
import { FaSnowflake } from "react-icons/fa";
import Button from "~/components/UI/Button";
import heroImage from "../../../../public/assets/hero.jpg";

const Hero = () => (
  <section className="relative py-16 md:py-20 lg:py-32">
    <div className="padding-x container-mine relative z-10 mx-auto">
      <h1 className="font-display text-7xl font-black">
        <span className="bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text  text-transparent">
          Ready for winter?
        </span>
      </h1>
      <div className="h-8"></div>
      <p className="max-w-lg rounded-md p-4 text-2xl font-light text-slate-700 ">
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

    <div className="absolute inset-0 z-[1] bg-gradient-to-r from-white from-10% to-transparent to-75%" />
    <div className="absolute inset-0 bottom-0 left-0 right-0 top-0 opacity-25 lg:opacity-75 ">
      <Image
        fill
        objectFit="cover"
        src={heroImage}
        alt="Hero section image"
        placeholder="blur"
      />
    </div>
  </section>
);

export default Hero;
