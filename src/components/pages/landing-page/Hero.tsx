import Image from "next/image";
import { FaSnowflake } from "react-icons/fa";
import Button from "~/components/ui/Button";
import heroImage from "../../../../public/assets/hero.jpg";

const Hero = () => (
  <section className=" padding-section relative flex min-h-[60dvh] items-center justify-center overflow-hidden rounded-b-3xl">
    <div className="padding-x container-mine z-10 mx-auto flex w-full flex-col items-center justify-center text-center">
      <h1>
        <span className="bg-gradient-to-r from-slate-50 to-white bg-clip-text font-display text-6xl font-black text-transparent  md:text-7xl">
          Ready for winter?
        </span>
      </h1>
      <div className="h-6"></div>
      <p className="max-w-lg rounded-md p-4 text-xl font-light text-slate-50 md:text-2xl ">
        Winter Wardrobe Wonders to Keep You Warm and{" "}
        <b className="font-bold">Smiling All Season Long!</b>
      </p>
      <div className="h-12"></div>
      <div className="w-fit">
        <Button
          // disabled
          ghost
          light
          text="Winter Collection"
          icon={<FaSnowflake className="h-5 w-5" />}
          onClick={() => void 0}
        />
      </div>
    </div>
    <div className="absolute inset-0 bg-slate-700" />
    <Image
      fill
      src={heroImage}
      alt="Hero section image"
      placeholder="blur"
      className="absolute scale-x-[-1] object-cover  opacity-30"
    />
  </section>
);

export default Hero;
